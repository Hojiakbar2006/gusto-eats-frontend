import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeAdminStatus, removeTokens } from "../../../app/slice/authSlice";
import { logo } from "../../../utils/helper";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.accessToken);

  const handleMenuItemClick = (destination) => {
    navigate(destination);
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch(removeTokens());
    dispatch(removeAdminStatus());
    navigate("/");
    setVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => handleMenuItemClick("/profile/")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav>
      <Link to="/">
        <img width="200px" src={logo} alt="Logo" />
      </Link>
      <div className="list_items">
        {access_token ? (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={visible}
            onVisibleChange={(v) => setVisible(v)}
          >
            <Avatar
              size="large"
              icon={
                <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />  
              }
            />
          </Dropdown>
        ) : (
          <Button
            type="primary"
            style={{ height: "40px", backgroundColor: "#0b5dd6" }}
            icon={<UserOutlined />}
            onClick={() => navigate("/login/")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
