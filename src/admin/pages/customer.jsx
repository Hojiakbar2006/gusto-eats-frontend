import React from "react";
import Table from "../components/table/table";
import { Skeleton } from "@mui/material";
import { useGetUsersQuery } from "../../app/api/endpoints/forAdmin";

export default function Customer() {
  const { data } = useGetUsersQuery();
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index + 1);

  console.log(data);
  return (
    <div className="dashboard-container comp-container">
      <div className="route comp-container">
        <h2>Users</h2>
        <button>{"Add >>>"}</button>
      </div>
      <div className="table-card comp-container">
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
              }) ??
              skeletonArray.map((item) => (
                <tr key={item}>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
