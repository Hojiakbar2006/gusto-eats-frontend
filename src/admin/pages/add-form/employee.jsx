import React from "react";
import "./style.css";
import { RouteNav } from "../../components";
import { Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useCreateUserMutation } from "../../../app/api/endpoints/forAdmin";

export default function EmployeeAdd() {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const formFinish = async (values) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    formData.append("password", values.password);
    formData.append("is_staff", true);

    try {
      const response = await createUser(formData);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <div className="dashboard-container comp-container add-form">
      <RouteNav route={"back"} pageName={"User"} />
      <Form
        onFinish={formFinish}
        className="add-form"
        style={{ display: "flex", flexDirection: "column" }}
        encType="multipart/form-data"
      >
        <Form.Item
          name="first_name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="Firstname" size="large" />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Lastname" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          rules={[
            { required: true, message: "Please input user phone number!" },
          ]}
        >
          <Input type="tel" placeholder="Phone number" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input user password!" }]}
        >
          <Input type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            icon={isLoading && <LoadingOutlined />}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
