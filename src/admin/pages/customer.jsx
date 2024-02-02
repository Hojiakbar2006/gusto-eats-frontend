import React from "react";
import Table from "../components/table/table";
import { LinearProgress } from "@mui/material";
import { useGetUsersQuery } from "../../redux/services/forAdminApi";

export default function Customer() {
  const { data, isLoading } = useGetUsersQuery();
  if (isLoading) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }
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
            {data.message ? (
              <h2 style={{ padding: "20px" }}>{data.message}</h2>
            ) : (
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
