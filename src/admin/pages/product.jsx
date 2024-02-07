import React from "react";
import Table from "../../common/table/table";
import { useGetProductsQuery } from "../../app/api/endpoints/product";
import { FormatDate } from "../../utils/formatDate";
import { RouteNav, SkeletonComp } from "../components";

export default function Product() {
  const { data } = useGetProductsQuery();

  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"add"} pageName={"Product"} />
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
            const date = FormatDate(new Date(item.createdAt));

            return (
              <tr key={item.id}>
                <td>
                  <figure style={{ width: "50px" }}>
                    <img width="100%" src={item.image} alt="" />
                  </figure>
                </td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{date}</td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
              </tr>
            );
          }) ?? <SkeletonComp sk_count={9} tab_col={6} />}
        </tbody>
      </Table>
    </div>
  );
}
