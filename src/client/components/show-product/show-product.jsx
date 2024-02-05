import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../../utils/formatPrice";
import { addToCart } from "../../../app/slice/cartSlice";
import { IconButton, Rating, Skeleton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

const ShowProduct = ({ data, types, isLoading }) => {
  const dispatch = useDispatch();
  const skeletonArray = Array.from({ length: 9 }, (_, index) => index + 1);
  const elementRefs = useRef(types.map(() => React.createRef()));
  const scrollToTop = (index) => {
    elementRefs.current[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return skeletonArray.map((item) => (
      <div className="container" key={item}>
        <div className="comp-container" style={{ padding: "20px" }}>
          <div className="food-container">
            {skeletonArray.map((_, index) => (
              <div key={index} className="box">
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
        </div>
      </div>
    ));
  }

  return types.length > 0 ? (
    types.map((type, index) => (
      <div
        key={type}
        className="container"
        ref={elementRefs.current[index]}
        onClick={() => scrollToTop(index)}
      >
        <div className="comp-container" style={{ padding: "20px" }}>
          <div className="title">
            <h1 style={{ marginBottom: "30px" }}>{type}</h1>
          </div>
          <div className="food-container">
            {data
              .filter((item) => item.type === type)
              .map((item) => (
                <div key={item.id} className="box">
                  <figure>
                    <img src={item.image} alt="" />
                    {item.discount !== 0 && (
                      <div className="chip">{item.discount}%</div>
                    )}
                  </figure>
                  <div className="box-items">
                    <h2>{item.name}</h2>
                    <p>{item.description.split(" ").slice(0, 12).join(" ")}</p>
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
              ))}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="container">
      <div className="comp-container" style={{ padding: "30px" }}>
        <h1>No Product</h1>
      </div>
    </div>
  );
};

export default ShowProduct;
