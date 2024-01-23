import React from "react";
import { Banner, Category, ShowProduct } from "../components";
import { LinearProgress } from "@mui/material";
import { useGetProductsQuery } from "../redux/services/productApi";

export default function Menu() {
  const { data, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }
  return (
    <>
      <Banner />
      <Category />
      <div className="container">
        <div className="comp-container" style={{ padding: "20px" }}>
          <ShowProduct data={data.products} img_url={false} />
        </div>
      </div>
    </>
  );
}
