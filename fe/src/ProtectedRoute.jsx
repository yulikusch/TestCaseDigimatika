import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ requiredLevel }) => {
  const token = localStorage.getItem("token");
  const userLevel = localStorage.getItem("level");

  if (!token || !userLevel) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.clear();
      Swal.fire({
        title: "Sesi Berakhir",
        text: "Sesi login Anda telah habis. Silakan login kembali.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return <Navigate to="/login" replace />;
    }

    if (requiredLevel && userLevel !== requiredLevel) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Anda tidak diizinkan mengakses halaman ini.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ render child routes di sini
};

export default ProtectedRoute;
