import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar comp-container">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/product">Product</NavLink>
      <NavLink to="/category">Category</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      <NavLink to="/staff-users">Staff Users</NavLink>
    </div>
  );
}
