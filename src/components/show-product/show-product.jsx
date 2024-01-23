import { Button, Rating } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

export default function Showproduct({ data, img_url }) {
  const dispatch = useDispatch();

  return (
    <div className="food-container">
      {data.map((item) => {
        const description = item.description.split(" ").slice(0, 9).join(" ");
        const img =
          item.image && !item.image.startsWith("http")
            ? `${process.env.REACT_APP_BASE_URL}${item.image}`
            : item.image;
        return (
          <div className="box" key={item.id}>
            <figure>
              {img_url ? (
                <img src={img} alt="" />
              ) : (
                <img src={item.image} alt="" />
              )}

              {item.discount !== 0 && (
                <div className="chip">{item.discount}%</div>
              )}
            </figure>
            <div className="box-items">
              <h2>{item.name}</h2>
              <p>{description}</p>
              <Rating name="read-only" value={3} readOnly />

              <div className="group">
                <p>{item.price}</p>
                <Button
                  sx={{ height: "40px", bgcolor: "#0b5dd6" }}
                  disableElevation
                  variant="contained"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
