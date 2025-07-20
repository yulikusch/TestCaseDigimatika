import React, { useState, useEffect } from "react";
import { getData } from "../Service/Customer";
import { getData as getProduct } from "../Service/Products";
import { getData as getSales } from "../Service/Sales";
import { postData } from "../Service/SalesDetail";

const TransaksiForm = () => {
  const [customer, setCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [product, setProduct] = useState("");
  const [productList, setProductList] = useState([]);
  const [sales, setsales] = useState("");
  const [salesList, setsalesList] = useState([]);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getData();
        setCustomerList(response);
      } catch (error) {
        console.error("Gagal mengambil data customer", error);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        setProductList(response);
      } catch (error) {
        console.error("Gagal mengambil data produk", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales();
        setsalesList(response);
      } catch (error) {
        console.error("Gagal mengambil data sales", error);
      }
    };
    fetchSales();
  }, []);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setProduct(selectedProductId);

    const selected = productList.find(
      (p) => p.id === parseInt(selectedProductId)
    );
    if (selected) {
      setPrice(selected.price || 0);
    }
  };

  const handleAddDetail = () => {
    if (!product || qty <= 0 || price <= 0) return;

    const selected = productList.find((p) => p.id === parseInt(product));

    const newDetail = {
      productId: parseInt(product),
      productName: selected?.name || "",
      qty,
      price,
      subtotal: qty * price,
    };

    setDetails([...details, newDetail]);
    setProduct("");
    setQty(1);
    setPrice(0);
  };

  const total = details.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = async () => {
    const payload = {
      sales_id: parseInt(sales),
      customer_id: parseInt(customer),
      details: details.map((d) => ({
        product_id: d.productId,
        qty: d.qty,
        price: d.price,
        // subtotal: d.subtotal,
      })),
    };

    try {
      const result = await postData(payload);
      console.log("Berhasil simpan:", result);
      alert("Transaksi berhasil disimpan!");
      setDetails([]);
      setCustomer("");
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi.");
    }
  };

  return (
    <div className="transaksi-form">
      <div className="row">
        <div className="col">
          <label>Customer:</label>
          <select
            className="form-control"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          >
            <option value="">-- Pilih Customer --</option>
            {customerList.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <label>Sales:</label>
          <select
            className="form-control"
            value={sales}
            onChange={(e) => setsales(e.target.value)}
          >
            <option value="">-- Pilih Sales --</option>
            {salesList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr />
      <h4>Tambah Produk</h4>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select value={product} onChange={handleProductChange}>
          <option value="">-- Pilih Produk --</option>
          {productList.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value))}
          placeholder="Qty"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="Harga"
        />
        <button onClick={handleAddDetail}>Tambah</button>
      </div>

      {/* Tabel Detail Produk */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: Rp {total.toLocaleString()}</h4>
      <button onClick={handleSubmit}>Simpan Transaksi</button>
    </div>
  );
};

export default TransaksiForm;
