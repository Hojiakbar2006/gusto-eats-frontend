import React from "react";
import "../admin/pages/style.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar, SideBar } from "../admin/components";
import { Product, Dashboard, Category, Customer, Employee } from "../admin/pages";

export default function Admin() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className="main-row">
            <SideBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/staff-users" element={<Employee />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}
