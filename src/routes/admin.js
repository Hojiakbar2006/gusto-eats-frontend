import React from "react";
import "../admin/pages/style.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar, SideBar } from "../admin/components";
import {
  Product,
  Dashboard,
  Category,
  Customer,
  Employee,
  ProductAdd,
  ProductEdit,
  Profile,
} from "../admin/pages";
import CategoryAdd from "../admin/pages/add-form/category";
import { Button, Result } from "antd";
import SendOrder from "../admin/pages/receiver";
import Receiver from "../admin/pages/receiver";
import ReceiverAdd from "../admin/pages/add-form/receiver";

export default function Admin() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className="main-row">
            <SideBar />
            <Routes>
              <Route
                path="*"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary">Back Home</Button>}
                  />
                }
              />
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/add" element={<ProductAdd />} />
              <Route path="/product/:id" element={<ProductEdit />} />
              <Route path="/category/add" element={<CategoryAdd />} />
              <Route path="/category" element={<Category />} />
              <Route path="/receiver" element={<Receiver />} />
              <Route path="/receiver/add" element={<ReceiverAdd />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/staff-users" element={<Employee />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}
