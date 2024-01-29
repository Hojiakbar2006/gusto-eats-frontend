import React from "react";
import { Banner, Category, ShowProduct } from "../components";
import { LinearProgress } from "@mui/material";
import { useGetProductsQuery } from "../redux/services/productApi";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category");
  const query = queryParams.get("query");

  const { data, isLoading } = useGetProductsQuery(
    `${query ? "query" : "category"}=${query ? query : category}`
  );

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
      <ShowProduct data={data?.products} img_url={false} />
    </>
  );
}
