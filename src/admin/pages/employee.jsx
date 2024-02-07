import React from "react";
import Table from "../../common/table/table";
import { useGetUsersStaffQuery } from "../../app/api/endpoints/forAdmin";
import { FormatDate } from "../../utils/formatDate";
import { SkeletonComp } from "../components";

export default function Employee() {
  const { data } = useGetUsersStaffQuery();

  return (
    <div className="dashboard-container comp-container">
      <div className="route comp-container">
        <h2>Users</h2>
        <button>{"Add >>>"}</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Last login</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {data?.message ? (
            <h2 style={{ padding: "20px" }}>{data.message}</h2>
          ) : (
            data?.map((item) => {
              const date_joined = FormatDate(new Date(item.date_joined));
              const last_login = FormatDate(new Date(item.last_login));
              return (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>{last_login}</td>
                  <td>{date_joined}</td>
                </tr>
              );
            }) ?? <SkeletonComp sk_count={9} tab_col={6} />
          )}
        </tbody>
      </Table>
    </div>
  );
}
