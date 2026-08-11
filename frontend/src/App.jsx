import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./pages/nav";
import Home from "./pages/home";
import ProductDetails from "./pages/ProductDetail";
import About from "./pages/About";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminProductList from './pages/admin/AdminProductList';

import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path ="/admin/Dashboard" element={<AdminDashboard />} />
        <Route path ="/admin/addProduct" element={<AdminProductForm />} />
        <Route path ="/admin/productList" element={<AdminProductList />} />


      </Routes>
    </>
  );
}

export default App;
