import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Sales";
import SalesForm from "./SalesForm";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Delete(id)
          .then(() => {
            fetchData();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          })
          .catch(() => {
            Swal.fire("Gagal", "Terjadi kesalahan saat menghapus.", "error");
          });
      }
    });
  };

  const handleFormSubmit = (data) => {
    if (data.id) {
      UpdateData(data.id, data)
        .then(() => {
          setFormVisible(false);
          fetchData();
          Swal.fire("Berhasil", "Data Sales berhasil diperbarui.", "success");
        })
        .catch((err) => {
          Swal.fire("Gagal", err.message || "Gagal menambahkan Sales", "error");
        });
    } else {
      const { id, ...dataWithoutId } = data;
      postData(dataWithoutId)
        .then(() => {
          setFormVisible(false);
          fetchData();
          Swal.fire("Berhasil", "Sales baru berhasil ditambahkan.", "success");
        })
        .catch((err) => {
          Swal.fire("Gagal", err.message || "Gagal menambahkan Sales", "error");
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
