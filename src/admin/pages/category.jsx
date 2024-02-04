import React from "react";
import { useGetCategoriesQuery } from "../../redux/services/productApi";
import Table from "../components/table/table";
import { Skeleton } from "@mui/material";

export default function Category() {
  const { data } = useGetCategoriesQuery();
  const skeletonArray = Array.from({ length: 6 }, (_, index) => index + 1);

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
            {data?.map((item) => {
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
            }) ??
              skeletonArray.map((item) => (
                <tr key={item}>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                  <td>
                    <Skeleton width="100%" height={30} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
