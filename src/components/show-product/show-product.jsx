import React from "react";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../utils/formatPrice";
import { addToCart } from "../../redux/slice/cartSlice";
import { IconButton, Rating } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

export default function ShowRecommended({ data, img_url }) {
  const dispatch = useDispatch();
  const types = [...new Set(data.map((item) => item.type))];

  return types.map((type) => {
    return (
      <div className="container" key={type}>
        <div className="comp-container" style={{ padding: "20px" }}>
          <div className="title">
            <h1 style={{ marginBottom: "30px" }}>{type}</h1>
          </div>
          <div className="food-container">
            {data
              .filter((item) => item.type === type)
              .map((item) => {
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
        </div>
      </div>
    );
  });
}
