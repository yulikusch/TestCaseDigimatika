import React, { useState, useEffect } from "react";

function ProductForm({
  initialData = null,
  onSubmit,
  onCancel,
  DataKategoriProduct,
}) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    product_category_id: 0,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "product_category_id" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{form.id ? "Edit Produk" : "Tambah Produk"}</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nama"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Deskripsi"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Harga"
        required
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stok"
        required
      />

      <select
        name="product_category_id"
        value={form.product_category_id}
        onChange={handleChange}
        required
      >
        <option value="">Pilih Kategori</option>
        {DataKategoriProduct.map((kategori) => (
          <option key={kategori.id} value={kategori.id}>
            {kategori.name}
          </option>
        ))}
      </select>

      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
}

export default ProductForm;
