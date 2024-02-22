import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Avatar, Badge, Button, Dropdown, Menu } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../app/slice/cartSlice";
import { openCart } from "../../../app/slice/toggleCartSlice";
import logo from "../../../assets/icons/logo.png";
import { removeAdminStatus, removeTokens } from "../../../app/slice/authSlice";

const Navbar = () => {
  const [visible, setVisible] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const access_token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);



  const menu = (
    <Menu>
      <Menu.Item
        key="my-orders"
        onClick={() => navigate("/my-orders")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          dispatch(removeTokens());
          dispatch(removeAdminStatus());
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav>
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="list-items">
        <NavLink to="/menu/">Menu</NavLink>
        <Badge
          count={cart.cartItems.length}
          onClick={() => dispatch(openCart())}
        >
          <ShoppingCartOutlined
            style={{ cursor: "pointer", fontSize: "30px" }}
          />
        </Badge>
        {access_token ? (
          <div>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              visible={visible}
              onVisibleChange={(v) => setVisible(v)}
            >
              <Avatar
                size="large"
                icon={
                  <UserOutlined
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  />
                }
              />
            </Dropdown>
          </div>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={<UserOutlined />}
            onClick={() => navigate("/login/")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
