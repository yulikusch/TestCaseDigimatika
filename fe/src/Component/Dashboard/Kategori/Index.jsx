import React, { useEffect, useState } from "react";
import {
  Delete,
  postData,
  getData,
  UpdateData,
} from "../../Service/ProductCategory";
import KategoriForm from "./KategoriForm";
import Swal from "sweetalert2";

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
          Swal.fire(
            "Berhasil",
            "Data Kategori berhasil diperbarui.",
            "success"
          );
        })
        .catch((err) => {
          Swal.fire(
            "Gagal",
            err.message || "Gagal menambahkan Kategori",
            "error"
          );
        });
    } else {
      const { id, ...dataWithoutId } = data;
      postData(dataWithoutId)
        .then(() => {
          setFormVisible(false);
          fetchData();
          Swal.fire(
            "Berhasil",
            "Kategori baru berhasil ditambahkan.",
            "success"
          );
        })
        .catch((err) => {
          Swal.fire(
            "Gagal",
            err.message || "Gagal menambahkan Kategori",
            "error"
          );
        });
    }
  };

  return (
    <div className="container">
      <h2 className="title">Data Kategori</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handleAdd}>+ Tambah Kategori</button>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>

      {formVisible && (
        <KategoriForm
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
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataProduct.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
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
