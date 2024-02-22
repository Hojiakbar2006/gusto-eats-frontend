import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      text: "Dashboard",
      to: "/",
    },
    {
      key: "product",
      icon: <ShoppingOutlined />,
      text: "Product",
      to: "/product",
    },
    {
      key: "category",
      icon: <AppstoreOutlined />,
      text: "Category",
      to: "/category",
    },
    {
      key: "customers",
      icon: <UserOutlined />,
      text: "Customers",
      to: "/customers",
    },
    {
      key: "staff-users",
      icon: <TeamOutlined />,
      text: "Staff Users",
      to: "/staff-users",
    },
  ];

  return (
    <div className="side-bar comp-container">
      <Menu mode="inline">
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{ marginBottom: 20 }}
          >
            <NavLink to={item.to}>{item.text}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default SideBar;
