import React from "react";
import { useGetCategoriesQuery } from "../../app/api/endpoints/product";
import Table from "../../common/table/table";
import { RouteNav, SkeletonComp } from "../components";

export default function Category() {
  const { data } = useGetCategoriesQuery();

  console.log(data);
  return (
    <div className="dashboard-container comp-container">
      <RouteNav route={"add"} pageName={"Category"} />
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
          }) ?? <SkeletonComp sk_count={9} tab_col={2} />}
        </tbody>
      </Table>
    </div>
  );
}
