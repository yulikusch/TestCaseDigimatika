import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Customer";
import CustomerForm from "./CustomerForm";

function Index() {
  const [DataProduct, SetDataProduct] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = () => {
    getData()
      .then((data) => SetDataProduct(data))
      .catch(() => SetDataProduct([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      Delete(id).then(() => fetchData());
    }
  };

  const handleFormSubmit = (product) => {
    if (product.id) {
      UpdateData(product.id, product).then(() => {
        setFormVisible(false);
        fetchData();
      });
    } else {
      postData(product).then(() => {
        setFormVisible(false);
        fetchData();
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Data Customer</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handleAdd}>+ Tambah Customer</button>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>

      {formVisible && (
        <CustomerForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormVisible(false)}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataProduct.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
