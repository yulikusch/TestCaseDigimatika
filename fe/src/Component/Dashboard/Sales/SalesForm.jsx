import React, { useState, useEffect } from "react";

function SalesForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    id: null,
    nama: "",
    email: "",
    password: "",
    level: "",
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
        password: "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit}>
      <h3>{form.id ? "Edit Sales" : "Tambah Sales"}</h3>
      <input
        name="nama"
        value={form.nama}
        onChange={handleChange}
        placeholder="nama sales"
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
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        placeholder={
          form.id ? "Biarkan kosong jika tidak diubah" : "Masukkan password"
        }
        required={!form.id}
      />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? "🙈" : "👁️"}
      </button>
      <select name="level" value={form.level} onChange={handleChange} required>
        <option value="">-- Pilih Level --</option>
        <option value="Admin">Admin</option>
        <option value="Sales">Sales</option>
        <option value="Manager">Manager</option>
      </select>

      <button type="submit">Simpan</button>
      <button type="button" onClick={onCancel}>
        Batal
      </button>
    </form>
  );
}

export default SalesForm;
