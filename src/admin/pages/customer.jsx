import React from "react";
import { Table } from "antd";
import { useGetUsersQuery } from "../../app/api/endpoints/forAdmin";
import { RouteNav } from "../components";
import { FormatDate } from "../../utils/formatDate";

export default function Customer() {
  const { data } = useGetUsersQuery();

  console.log(data);

  return (
    <div className="dashboard-container comp-container">
      <RouteNav pageName="Customer" route="add" />

      <Table
        dataSource={data?.message ? [] : data}
        loading={!data}
        rowKey="id"
        pagination={{
          pageSize: 5, // 1 sahifada ko'rsatiladigan ma'lumotlar soni
          total: data?.length, // Jami ma'lumotlar soni
          showSizeChanger: false, // Ko'rsatiladigan ma'lumotlar sonini o'zgartirish imkoniyati
          showQuickJumper: false, // Tezkor o'tish uchun o'zgartirish imkoniyati
          showTotal: (total) => `Jami ${total} ta Employee`,
        }}
      >
        {" "}
        <Table.Column title="Name" dataIndex="first_name" key="first_name" />
        <Table.Column title="Last Name" dataIndex="last_name" key="last_name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column
          title="Phone Number"
          dataIndex="phone_number"
          key="phone_number"
        />
        <Table.Column
          title="Last login"
          dataIndex="last_login"
          key="last_login"
          render={(text) => FormatDate(new Date(text))}
        />
        <Table.Column
          title="Created at"
          dataIndex="date_joined"
          key="date_joined"
          render={(text) => FormatDate(new Date(text))}
        />
      </Table>
    </div>
  );
}
