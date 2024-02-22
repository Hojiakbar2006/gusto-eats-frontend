import React from "react";
import { Link } from "react-router-dom";
import { Card, Table } from "antd";
import { useDispatch } from "react-redux";
import { setOrder } from "../../app/slice/orderItemSlice";
import { useGetOrdersQuery } from "../../app/api/endpoints/order";
import { useGetStatsQuery } from "../../app/api/endpoints/forAdmin";
import { FormatDate } from "../../utils/formatDate";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data } = useGetStatsQuery();
  const { data: orders } = useGetOrdersQuery();

  return (
    <div className="dashboard-container comp-container">
      <div className="route comp-container">
        <h2>Dashboard</h2>
      </div>
      <div className="card-container">
        {data?.map(({ id, entity, count, link }) => (
          <Card
            key={id}
            className="custom-card"
            bodyStyle={{ padding: 20 }}
            title={<Link to={link}>{entity}</Link>}
          >
            <h2>{count}</h2>
          </Card>
        )) ?? (
          <>
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="custom-card" loading={true} />
            ))}
          </>
        )}
      </div>
      <Table dataSource={orders} loading={!orders} rowKey="id">
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(text, record) => (
            <span
              onClick={() => {
                dispatch(setOrder({ open: true, order: record }));
              }}
            >
              {text}
            </span>
          )}
        />
        <Table.Column
          title="Phone Number"
          dataIndex="phone_number"
          key="phone_number"
        />
        <Table.Column
          title="Address"
          dataIndex={["shippingAddress", "address"]}
          key="address"
        />
        <Table.Column
          title="Created At"
          dataIndex="createdAt"
          key="createdAt"
          render={(text) => FormatDate(new Date(text))}
        />
        <Table.Column title="Total" dataIndex="totalPrice" key="totalPrice" />
      </Table>
    </div>
  );
}
