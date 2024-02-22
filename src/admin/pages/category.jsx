import React from "react";
import { Table, Space, Button } from "antd";
import { useGetCategoriesQuery } from "../../app/api/endpoints/product";
import { RouteNav } from "../components";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "../../app/api/endpoints/forAdmin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Category() {
  const { data } = useGetCategoriesQuery();

  const [deleteCategory, { error }] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  console.log(error);

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"add"} pageName={"Category"} />
      <Table
        dataSource={data ?? []}
        loading={!data}
        rowKey="id"
        pagination={{
          pageSize: 5,
          total: data?.length,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: (total) => `Total ${total} categories`,
        }}
      >
        <Table.Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text) => <img src={text} alt="" style={{ width: "50px" }} />}
        />
        <Table.Column title="Name" dataIndex="name" key="name" />
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
