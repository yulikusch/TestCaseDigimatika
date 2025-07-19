import React, { useEffect, useState } from "react";
import { getData as getCustomers } from "../Service/Customer";
import { getData as getProducts } from "../Service/Products";
import { getData as getPromos } from "../Service/Promo";

const TransaksiForm = ({ onSubmit }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedPromoId, setSelectedPromoId] = useState("");

  useEffect(() => {
    getCustomers().then(setCustomers);
    getProducts().then(setProducts);
    getPromos().then(setPromos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      customer_id: selectedCustomerId,
      product_id: selectedProductId,
      promo_id: selectedPromoId,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="form-transaksi">
      <h2>Input Transaksi</h2>

      <div className="form-group">
        <label>Customer</label>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          required
        >
          <option value="">-- Pilih Customer --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {c.email} - {c.phone} - {c.address}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Produk</label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          required
        >
          <option value="">-- Pilih Produk --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.id} - {p.name} - {p.description}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Promo</label>
        <select
          value={selectedPromoId}
          onChange={(e) => setSelectedPromoId(e.target.value)}
        >
          <option value="">-- Pilih Promo (opsional) --</option>
          {promos.map((promo) => (
            <option key={promo.id} value={promo.id}>
              {promo.code} - {promo.description} - Diskon: {promo.discount}%
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit Transaksi</button>
    </form>
  );
};

export default TransaksiForm;
