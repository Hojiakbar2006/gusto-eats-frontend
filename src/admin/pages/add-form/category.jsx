import React from "react";
import "./style.css";
import { RouteNav } from "../../components";
import { Input, Button, Form } from "antd";
import { useCreateCategoryMutation } from "../../../app/api/endpoints/forAdmin";

export default function CategoryAdd() {
  const [uploadCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const response = await uploadCategory(data);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"back"} pageName={"Category"} />
      <form
        onSubmit={handleSubmit}
        className="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Input required name="name" placeholder="Category Name" autoFocus />
        <Form.Item>
          <Input
            name="image"
            type="file"
            size="large"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Add Product
        </Button>
      </form>
    </div>
  );
}
