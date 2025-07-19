import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Promo";
import PromoForm from "./PromoForm";

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
      <h2 className="title">Data Promo</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handleAdd}>+ Tambah Promo</button>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>

      {formVisible && (
        <PromoForm
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
              <th>Code</th>
              <th>Deskripsi</th>
              <th>Diskon</th>
              <th>Tanggal Mulai</th>
              <th>Berakhir</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataProduct.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.description}</td>
                <td>{item.discount}</td>
                <td>
                  {new Date(item.start_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.end_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

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
