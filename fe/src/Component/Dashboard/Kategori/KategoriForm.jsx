import React, { useState, useEffect } from "react";

function KategoriForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
}

export default KategoriForm;
