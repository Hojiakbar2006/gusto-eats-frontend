import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setAdminStatus, setTokens } from "../app/slice/authSlice";
import { Form, Input, Button, Typography } from "antd";
import { useLoginMutation } from "../app/api/endpoints/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveLogin = (accessToken, refreshToken, isAdmin) => {
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(setAdminStatus(isAdmin));
  };

  const onFinish = async (values) => {
    try {
      const { data, error } = await login(values);
      if (data) {
        message.success("Login successful");
        if (data.is_admin) {
          navigate("/");
        }
        saveLogin(data.access_token, data.refresh_token, data.is_admin);
      }
      if (error) {
        const errorMessage =
          error.status === 400
            ? "Invalid user credentials"
            : "User credentials not found";
        message.error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div
        className="comp-container"
        style={{
          display: "grid",
          minHeight: "63.5vh",
          placeItems: "center",
        }}
      >
        <Form
          className="comp-container"
          style={{ width: "400px", padding: "20px" }}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              Log in
            </Button>
            <Link to="/register">Don't have an account? Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
