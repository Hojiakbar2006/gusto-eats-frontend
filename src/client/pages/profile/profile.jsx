import React from "react";
import "./profile.css";
import Table from "../../../common/table/table";
import { LinearProgress } from "@mui/material";
import { UpdateProfileForm } from "../../components";
import { useGetProfileQuery } from "../../../app/api/endpoints/auth";
import { useGetOrdersQuery } from "../../../app/api/endpoints/order";

export default function Profile() {
  const {
    data: profile,
    isLoading: profileLoad,
    isError: p,
  } = useGetProfileQuery();
  const { data: order, isLoading: orderLoad, isError: o } = useGetOrdersQuery();

  if (profileLoad || orderLoad) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }
  if (p || o) {
    return <h1>Some thiing went error</h1>;
  }
  return (
    <div className="container">
      <div className="profile">
        <UpdateProfileForm data={profile} />
        {order.length > 0 ? (
          <div className="table-card comp-container">
            <Table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Phone number</td>
                  <td>Address</td>
                  <td>Total price</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {order.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.shippingAddress.address}</td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <h1>No order</h1>
        )}
      </div>
    </div>
  );
}
