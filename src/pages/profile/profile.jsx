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
          {order ? <h1>No order</h1> : <div></div>}
        </div>
      </div>
    </div>
  );
}
