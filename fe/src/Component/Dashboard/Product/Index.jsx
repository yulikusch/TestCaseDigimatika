import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Products";
import { getData as getDataKategori } from "../../Service/ProductCategory";
import ProductForm from "./ProductForm";

function Index() {
  const [DataProduct, SetDataProduct] = useState([]);
  const [DataKategoriProduct, SetDataKategoriProduct] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = () => {
    getData()
      .then((data) => SetDataProduct(data))
      .catch(() => SetDataProduct([]));

    getDataKategori()
      .then((DataKategori) => SetDataKategoriProduct(DataKategori))
      .catch(() => SetDataKategoriProduct([]));
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
      <h2 className="title">Data Produk</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handleAdd}>+ Tambah Produk</button>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>

      {formVisible && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormVisible(false)}
          DataKategoriProduct={DataKategoriProduct}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {DataProduct.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>{item.stock}</td>
                <td>
                  {" "}
                  {DataKategoriProduct.find(
                    (kategori) => kategori.id === item.product_category_id
                  )?.name || "-"}
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
