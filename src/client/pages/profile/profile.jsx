import React from "react";
import "./profile.css";
import { Table } from "antd";
import { UpdateProfileForm } from "../../components";
import { useGetProfileQuery } from "../../../app/api/endpoints/auth";
import { useGetOrdersQuery } from "../../../app/api/endpoints/order";

export default function Profile() {
  const { isError: pError } = useGetProfileQuery();
  const {
    data: orders,
    isLoading: orderLoad,
    isError: oError,
  } = useGetOrdersQuery();

  if (pError || oError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="container">
      <div className="profile">
        <UpdateProfileForm />

        <div className="comp-container">
          <Table
            rowKey="id"
            dataSource={orders}
            loading={orderLoad}
            pagination={{
              pageSize: 7,
              total: orders?.length,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total) => `Jami ${total} ta Buyurtma`,
            }}
          >
            <Table.Column title="Name" dataIndex="name" key="name" />
            <Table.Column
              title="Phone number"
              dataIndex="phone_number"
              key="phone_number"
            />
            <Table.Column
              title="Address"
              dataIndex="shippingAddress.address"
              key="address"
            />
            <Table.Column
              title="Total price"
              dataIndex="totalPrice"
              key="totalPrice"
            />
          </Table>
        </div>
      </div>
    </div>
  );
}
