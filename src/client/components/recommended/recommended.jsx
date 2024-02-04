import React from "react";
import "./recommended.css";
import { Link } from "react-router-dom";
import { Button, IconButton, Rating, Skeleton } from "@mui/material";
import { useGetRecommendedProductsQuery } from "../../../redux/services/productApi";
import { addToCart } from "../../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../../utils/formatPrice";
import { AddShoppingCart } from "@mui/icons-material";

export default function Recommended() {
  const { data } = useGetRecommendedProductsQuery();
  const dispatch = useDispatch();
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
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
            }) ??
              skeletonArray.map((item) => (
                <div className="box" key={item}>
                  <figure>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: 8 }}
                    />
                  </figure>
                  <div className="box-items">
                    <Skeleton variant="text" width="100%" height={40} />
                    <Skeleton variant="text" width="100%" height={80} />
                    <Skeleton variant="rectangular" width={100} height={20} />
                    <div className="group">
                      <Skeleton variant="rectangular" width={80} height={30} />
                      <Skeleton variant="circular" width={50} height={50} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Link to="/menu">
            <Button variant="outlined">for more {">>"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
