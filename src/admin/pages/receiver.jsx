import React from "react";
import { RouteNav } from "../components";
import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


export default function Receiver() {

  return (
    <div className="dashboard-container comp-container">
      <RouteNav pageName="Receiver" route="add" />
      <Table
        // dataSource={data ?? []}
        // loading={!data}
        rowKey="id"
        pagination={{
          pageSize: 5,
          // total: data?.length,
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
                // onClick={() => navigate(`/product/${record.id}`)}
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                danger
                // onClick={() => handleDelete(record.id)}
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
