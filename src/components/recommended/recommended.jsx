import React from "react";
import "./recommended.css";
import { Link } from "react-router-dom";
import { Button, IconButton, LinearProgress, Rating } from "@mui/material";
import { useGetRecommendedProductsQuery } from "../../redux/services/productApi";
import { addToCart } from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../utils/formatPrice";
import { AddShoppingCart } from "@mui/icons-material";

export default function Recommended() {
  const { data, isLoading, error } = useGetRecommendedProductsQuery();
  const dispatch = useDispatch();
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
            <div className="food-container">
              {data?.map((item) => {
                const description = item.description
                  .split(" ")
                  .slice(0, 12)
                  .join(" ");
                const img =
                  item.image && !item.image.startsWith("http")
                    ? `${process.env.REACT_APP_BASE_URL}${item.image}`
                    : item.image;
                return (
                  <div className="box" key={item.id}>
                    <figure>
                      <img src={img} alt="" />

                      {item.discount !== 0 && (
                        <div className="chip">{item.discount}%</div>
                      )}
                    </figure>
                    <div className="box-items">
                      <h2>{item.name}</h2>
                      <p>{description}</p>
                      <Rating name="read-only" value={3} readOnly />

                      <div className="group">
                        <p>{FormatPrice(item.price)}</p>
                        <IconButton
                          variant="outlined"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          <AddShoppingCart sx={{ color: "#0b5dd6" }} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/menu">
              <Button variant="outlined">for more {">>"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
