import React, { useState } from "react";
import "./style.css";
import { RouteNav } from "../../components";
import { Form, Input, Select, Button } from "antd";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../../app/api/endpoints/product";
import { LoadingOutlined } from "@ant-design/icons";
import { useCreateProductMutation } from "../../../app/api/endpoints/forAdmin";

export default function ProductAdd() {
  const { data: categoriesData = [] } = useGetCategoriesQuery();
  const [img, setImg] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: product } = useGetProductsQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [uploadProduct] = useCreateProductMutation();

  const types = [
    ...new Set(
      product?.products
        .filter((item) => item.category === selectedCategory)
        .map((item) => item.type)
    ),
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Or any other duration you prefer
  };

  const formFinish = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("countInStock", values.countInStock);
    formData.append("image", img);

    try {
      const response = await uploadProduct(formData);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container comp-container add-form">
      <RouteNav route={"back"} pageName={"Product"} />
      <Form
        onFinish={formFinish}
        className="add-form"
        style={{ display: "flex", flexDirection: "column" }}
        encType="multipart/form-data"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Product name" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Please input product description!" },
          ]}
        >
          <Input.TextArea placeholder="Product description" />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            size="large"
            placeholder="Select a category"
            onChange={(value) => setSelectedCategory(value)}
          >
            {categoriesData.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Please input product type!" }]}
        >
          <div>
            {" "}
            <div>
              Other types:
              {types?.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => copyToClipboard(item)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginLeft: "15px",
                  }}
                >
                  {item}
                </button>
              ))}
              {copied ? (
                <span style={{ marginLeft: "10px" }}>{"(: "}Copied!</span>
              ) : null}
            </div>
            <Input placeholder="Product type" size="large" />
          </div>
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input type="number" placeholder="Product price" size="large" />
        </Form.Item>
        <Form.Item
          name="discount"
          rules={[
            { required: true, message: "Please input product discount!" },
          ]}
        >
          <Input type="number" placeholder="Product discount" size="large" />
        </Form.Item>
        <Form.Item
          name="countInStock"
          rules={[{ required: true, message: "Please input product stock!" }]}
        >
          <Input type="number" placeholder="Product Stock" size="large" />
        </Form.Item>
        <Form.Item>
          <Input
            name="image"
            type="file"
            size="large"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            icon={isLoading&&<LoadingOutlined />}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
