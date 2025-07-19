import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Sales";
import SalesForm from "./SalesForm";

function Index() {
  const [DataSales, SetDataSales] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingSales, setEditingSales] = useState(null);

  const fetchData = () => {
    getData()
      .then((data) => SetDataSales(data))
      .catch(() => SetDataSales([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingSales(null);
    setFormVisible(true);
  };

  const handleEdit = (Sales) => {
    setEditingSales(Sales);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      Delete(id).then(() => fetchData());
    }
  };

  const handleFormSubmit = (Sales) => {
    if (Sales.id) {
      UpdateData(Sales.id, Sales).then(() => {
        setFormVisible(false);
        fetchData();
      });
    } else {
      // ⛔️ Jangan kirim "id: null"
      const { id, ...dataWithoutId } = Sales;
      postData(dataWithoutId).then(() => {
        setFormVisible(false);
        fetchData();
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Data Sales</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handleAdd}>+ Tambah Sales</button>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>

      {formVisible && (
        <SalesForm
          initialData={editingSales}
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
              <th>Level</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataSales.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.email}</td>
                <td>{item.level}</td>
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
