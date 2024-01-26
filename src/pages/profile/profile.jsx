import React from "react";
import "./profile.css";
import { useGetProfileQuery } from "../../redux/services/authApi";
import { LinearProgress } from "@mui/material";
import { UpdateProfileForm } from "../../components";
import { useGetOrdersQuery } from "../../redux/services/orderApi";

export default function Profile() {
  const {
    data: profile,
    isLoading: profileLoad,
    isError: p,
  } = useGetProfileQuery();
  const { data: order, isLoading: orderLoad, isError: o } = useGetOrdersQuery();

  console.log(order);

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
        <div className="comp-container">
          {order.length > 0 ? (
            <div>
              <table className="order-table" border="1px">
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
              </table>
            </div>
          ) : (
            <h1>No order</h1>
          )}
        </div>
      </div>
    </div>
  );
}
