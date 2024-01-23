import React from "react";
import { AddToCart, Footer, Login, Navbar, Register } from "../components";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Home, Menu, Cart, Profile } from "../pages";

export default function Client() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/my-orders/" element={<Profile />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu/" element={<Menu />} />
          <Route path="/cart/" element={<Cart />} />
        </Routes>
        <Footer />
        <AddToCart />
      </Router>
    </>
  );
}
