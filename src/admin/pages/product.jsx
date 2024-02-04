import React from "react";
import { useGetProductsQuery } from "../../redux/services/productApi";
import Table from "../components/table/table";
import { Skeleton } from "@mui/material";

export default function Product() {
  const { data } = useGetProductsQuery();
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index + 1);

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
              <th>Type</th>
              <th>Created At</th>
              <th>Total</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.map((item) => {
              const date = new Date(item.createdAt);

              // Format the date using Intl.DateTimeFormat
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                // second: "numeric",
                // timeZoneName: "short",
              }).format(date);

              return (
                <tr key={item.id}>
                  <td>
                    <figure style={{ width: "50px" }}>
                      <img width="100%" src={item.image} alt="" />
                    </figure>
                  </td>
                  <td>{item.name}</td>
                  {/* <td>{item.phone_number}</td> */}
                  <td>{item.type}</td>
                  <td>{formattedDate}</td>
                  <td>{item.price}</td>
                  <td>{item.rating}</td>
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
