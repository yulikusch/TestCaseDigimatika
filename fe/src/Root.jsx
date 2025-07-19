import { Routes, Route } from "react-router-dom";

import Index from "./Component/Index";
import Login from "./Component/Login/Index";
import Dashboard from "./Component/Dashboard/Index";
import Product from "./Component/Dashboard/Product/Index";
import Kategori from "./Component/Dashboard/Kategori/Index";
import Promo from "./Component/Dashboard/Promo/Index";
import Custemer from "./Component/Dashboard/Custumer/Index";
import Sales from "./Component/Dashboard/Sales/Index";
import ProtectedRoute from "./ProtectedRoute";

export default function Root() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/product-category" element={<Kategori />} />
        <Route path="/Promo" element={<Promo />} />
        <Route path="/customer" element={<Custemer />} />
        <Route path="/sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}
