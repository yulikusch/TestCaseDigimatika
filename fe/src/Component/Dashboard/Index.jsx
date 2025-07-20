import React from "react";
import "../Style/Dashboard.css";
import CardSection from "../Dashboard/cardsection";
// import TransaksiForm from "./TransaksiForm";
import { useNavigate } from "react-router-dom";
import TransaksiForm from "./TransaksiForm";
const Index = () => {
  const userName = localStorage.getItem("name") || "User";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <h1 className="title">Selamat datang, {userName}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <CardSection />

      <div className="section">
        <h2 className="subtitle">Transaksi Data</h2>
      </div>
      <TransaksiForm />
    </div>
  );
};

export default Index;
