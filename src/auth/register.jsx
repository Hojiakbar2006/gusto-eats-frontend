import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { Form, Input, Button, Typography } from "antd";
import { useRegisterMutation } from "../app/api/endpoints/auth";

const { Title } = Typography;

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data, error } = await register(values);

      if (data) {
        message.success("Registration successful");
        navigate("/login/");
      }
      if (error) {
        if (Boolean(error.data.email)) {
          message.error(`${error.data.email}`);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="container">
      <div
        className="comp-container"
        style={{
          display: "grid",
          placeItems: "center",
          padding: "50px",
        }}
      >
        <Form
          className="comp-container"
          style={{ width: "400px", padding: "20px" }}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            Sign up
          </Title>
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input size="large" placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input size="large" placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input size="large" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password size="large" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
              className="register-form-button"
              loading={isLoading}
            >
              Register
            </Button>
            <Link to="/login">Already have an account? Sign In</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
