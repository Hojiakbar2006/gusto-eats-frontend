import React from "react";
import Table from "../../common/table/table";
import { useGetUsersQuery } from "../../app/api/endpoints/forAdmin";
import { SkeletonComp } from "../components";

export default function Customer() {
  const { data } = useGetUsersQuery();

  console.log(data);
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
          </tr>
        </thead>
        <tbody>
          {data?.message ? (
            <h2 style={{ padding: "20px" }}>{data.message}</h2>
          ) : (
            data?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                </tr>
              );
            }) ?? <SkeletonComp sk_count={9} tab_col={4} />
          )}
        </tbody>
      </Table>
    </div>
  );
}
