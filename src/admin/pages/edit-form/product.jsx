import React, { useState } from "react";
import { RouteNav } from "../../components";
import { Form, Input, Select, Button, Flex } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../../app/api/endpoints/product";
import { useUpdateProductMutation } from "../../../app/api/endpoints/forAdmin";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProductEdit() {
  const { id } = useParams();

  const { data: categoriesData = [] } = useGetCategoriesQuery();
  const { data: productData, isLoading: productIsLoading } =
    useGetProductByIdQuery(id);
  const [editProduct, { isLoading: updateIsLoading }] =
    useUpdateProductMutation();
  const { data: product } = useGetProductsQuery();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState(null);
  const [copied, setCopied] = useState(false);

  const types = [
    ...new Set(
      product?.products
        .filter((item) =>
          selectedCategory ? item.category === selectedCategory : item
        )
        .map((item) => item.type)
    ),
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("countInStock", values.countInStock);
    formData.append("image", img);

    try {
      const response = await editProduct({ formData, id });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  if (productIsLoading) {
    return "as";
  }

  return (
    <div className="dashboard-container comp-container add-form">
      <RouteNav route={"back"} pageName={"Product"} />
      <Form
        onFinish={handleSubmit}
        className="add-form"
        style={{ display: "flex", flexDirection: "column" }}
        encType="multipart/form-data"
      >
        <Form.Item
          name="name"
          initialValue={productData?.name}
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Product name" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          initialValue={productData?.description}
          rules={[
            { required: true, message: "Please input product description!" },
          ]}
        >
          <Input.TextArea placeholder="Product description" size="large" />
        </Form.Item>
        <Form.Item
          name="category"
          initialValue={productData?.category}
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
        <Form.Item>
          <div>
            Other types:
            {Array.from(types).map((item) => (
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
        </Form.Item>
        <Form.Item
          name="type"
          initialValue={productData?.type}
          rules={[{ required: true, message: "Please input product type!" }]}
        >
          <Input placeholder="Product type" size="large" />
        </Form.Item>
        <Form.Item
          name="price"
          initialValue={productData?.price}
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <Input type="number" placeholder="Product price" size="large" />
        </Form.Item>
        <Form.Item
          name="discount"
          initialValue={productData?.discount}
          rules={[
            { required: true, message: "Please input product discount!" },
          ]}
        >
          <Input type="number" placeholder="Product discount" size="large" />
        </Form.Item>
        <Form.Item
          name="countInStock"
          initialValue={productData?.countInStock}
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
        <Flex wrap="wrap" gap="small">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={updateIsLoading}
            icon={updateIsLoading && <LoadingOutlined />}
          >
            Update Product
          </Button>
          <Button size="large" type="primary" danger htmlType="button">
            Delete Product
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
