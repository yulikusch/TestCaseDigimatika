import React, { useEffect, useState } from "react";
import { Delete, postData, getData, UpdateData } from "../../Service/Products";
import { getData as getDataKategori } from "../../Service/ProductCategory";
import { getData as getDataSalesDetail } from "../../Service/SalesDetail";
import { getData as getDataSales } from "../../Service/Sales";
import { getData as getDataTransaksi } from "../../Service/Transaksi";

function Index() {
  const [DataProduct, SetDataProduct] = useState([]);
  const [DataKategoriProduct, SetDataKategoriProduct] = useState([]);
  const [DataSalesDetail, SetDataSalesDetail] = useState([]);
  const [DataSales, SetDataSales] = useState([]);
  const [DataTransaksi, SetDataTransaksi] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = () => {
    getData()
      .then((data) => SetDataProduct(data))
      .catch(() => SetDataProduct([]));

    getDataKategori()
      .then((DataKategori) => SetDataKategoriProduct(DataKategori))
      .catch(() => SetDataKategoriProduct([]));
    getDataSalesDetail()
      .then((dataDetail) => SetDataSalesDetail(dataDetail))
      .catch(() => SetDataSalesDetail([]));
    getDataSales()
      .then((datasales) => SetDataSales(datasales))
      .catch(() => SetDataSales([]));
    getDataTransaksi()
      .then((dataTrans) => SetDataTransaksi(dataTrans))
      .catch(() => SetDataTransaksi([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
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
      <h2 className="title">Data Sales Detail</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={() => window.history.back()}>← Kembali</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Sales</th>
              <th>Nama Produk</th>
              <th>Kategori Produk</th>
              <th>Qty</th>
              <th>Harga</th>
              <th>Diskon</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {DataSalesDetail.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {DataSales.find((userid) => userid.id === item.sales_id)
                    ?.nama || "-"}
                </td>
                <td>
                  {DataProduct.find((data) => data.id === item.product_id)
                    ?.name || "-"}
                </td>
                <td>
                  {(() => {
                    const product = DataProduct.find(
                      (data) => data.id === item.product_id
                    );
                    const kategori = DataKategoriProduct.find(
                      (kat) => kat.id === product?.product_category_id
                    );
                    return kategori?.name || "-";
                  })()}
                </td>
                <td>{item.qty}</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>Rp {item.discount.toLocaleString()}</td>
                <td>Rp {item.subtotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
