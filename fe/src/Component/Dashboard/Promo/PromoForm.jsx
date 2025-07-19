import React, { useState, useEffect } from "react";

function PromoForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    discount: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        start_date: initialData.start_date?.slice(0, 10) || "",
        end_date: initialData.end_date?.slice(0, 10) || "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{form.id ? "Edit Promo" : "Tambah Promo"}</h3>
      <input
        name="code"
        value={form.code}
        onChange={handleChange}
        placeholder="code promo"
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
        name="discount"
        type="number"
        value={form.discount}
        onChange={handleChange}
        placeholder="Diskon"
        required
      />
      <input
        name="start_date"
        type="date"
        value={form.start_date}
        onChange={handleChange}
        placeholder="Tanggal Awal"
        required
      />
      <input
        name="end_date"
        type="date"
        value={form.end_date}
        onChange={handleChange}
        placeholder="Tanggal Berakhir"
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
