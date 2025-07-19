import React, { useState, useEffect } from "react";

function PromoForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
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
      <h3>{form.id ? "Edit Promo" : "Tambah Promo"}</h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="nama customer"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="email"
        required
      />
      <input
        name="phone"
        type="number"
        value={form.phone}
        onChange={handleChange}
        placeholder="no telepon"
        required
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="alamat lengkap"
        required
      />

      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
}

export default PromoForm;
