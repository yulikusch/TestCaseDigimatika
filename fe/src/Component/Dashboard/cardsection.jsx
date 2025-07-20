// src/components/CardSection.jsx
import React from "react";

const caardsection = () => {
  return (
    <div className="card-row">
      <a href="/product-category" className="card">
        Product Category
      </a>
      <a href="/customer" className="card">
        Customer
      </a>
      <a href="/promo" className="card">
        Promo
      </a>
      <a href="/product" className="card">
        Product
      </a>
      <a href="/sales" className="card">
        Sales
      </a>
      <a href="/sales-detail" className="card">
        Sales Detail
      </a>
    </div>
  );
};

export default caardsection;
