import React from "react";
import { useGetCategoriesQuery } from "../../redux/services/productApi";
import Table from "../components/table/table";
import { LinearProgress } from "@mui/material";

export default function Category() {
  const { data, isLoading } = useGetCategoriesQuery();
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
        <h2>Product</h2>
        <button>{"Add >>>"}</button>
      </div>
      <div className="table-card comp-container">
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <figure style={{ width: "50px" }}>
                      <img width="100%" src={item.image} alt="" />
                    </figure>
                  </td>
                  <td>{item.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
