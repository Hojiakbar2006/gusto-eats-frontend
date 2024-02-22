import React from "react";
import { AddToCart, Footer, Navbar } from "../client/components";
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import { Home, Menu, Cart, Profile } from "../client/pages";
import { Button, Result } from "antd";
import Login from "../auth/login";
import Register from "../auth/register";
import PrivateRoute from "../utils/privateRoute";

export default function Client() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="container">
                <Result
                  className="comp-container"
                  style={{ padding: "50px" }}
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={
                    <Button type="primary">
                      <Link to="/">Back Home</Link>
                    </Button>
                  }
                />
              </div>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/my-orders/" element={<Profile />} />
            <Route path="/cart/" element={<Cart />} />
          </Route>
            <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu/" element={<Menu />} />
        </Routes>
        <Footer />
        <AddToCart />
      </Router>
    </>
  );
}
