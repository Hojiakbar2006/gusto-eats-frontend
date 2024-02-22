import React from "react";
import { Table, Button, Space } from "antd";
import { useGetProductsQuery } from "../../app/api/endpoints/product";
import { FormatDate } from "../../utils/formatDate";
import { RouteNav } from "../components";
import { useDeleteProductMutation } from "../../app/api/endpoints/forAdmin";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Product() {
  const { data } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"add"} pageName={"Product"} />
      <Table
        dataSource={data?.products}
        loading={!data}
        rowKey="id"
        pagination={{
          pageSize: 5, // 1 sahifada ko'rsatiladigan ma'lumotlar soni
          total: data?.length, // Jami ma'lumotlar soni
          showSizeChanger: false, // Ko'rsatiladigan ma'lumotlar sonini o'zgartirish imkoniyati
          showQuickJumper: false, // Tezkor o'tish uchun o'zgartirish imkoniyati
          showTotal: (total) => `Jami ${total} ta Product`,
        }}
      >
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text) => <img style={{ width: 50 }} src={text} alt="" />}
        />
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Type" dataIndex="type" key="type" />
        <Table.Column
          title="Created At"
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => FormatDate(new Date(text))}
        />
        <Table.Column title="Total" dataIndex="price" key="price" />
        <Table.Column title="Rating" dataIndex="rating" key="rating" />
        <Table.Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space>
              <Button
                type="primary"
                onClick={() => navigate(`/product/${record.id}`)}
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(record.id)}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
