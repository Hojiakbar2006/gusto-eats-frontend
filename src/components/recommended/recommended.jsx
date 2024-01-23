import React from "react";
import "./recommended.css";
import { Link } from "react-router-dom";
import { Button, LinearProgress } from "@mui/material";
import { ShowProduct } from "..";
import { useGetRecommendedProductsQuery } from "../../redux/services/productApi";

export default function Recommended() {
  const { data: products, isLoading, error } = useGetRecommendedProductsQuery();
  if (isLoading) {
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="comp-container">
          <div className="recommended">
            <div className="title">
              <h1>Recommended foods</h1>
              <p>We recommend you the most popular and discounted foods </p>
            </div>
            <ShowProduct data={products} img_url={true} />
            <Link to="/menu">
              <Button variant="outlined">for more {">>"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
