import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../../utils/formatPrice";
import { addToCart } from "../../../redux/slice/cartSlice";
import { IconButton, Rating } from "@mui/material";
import { AddShoppingCart, } from "@mui/icons-material";

const ShowProduct = ({ data }) => {
  const dispatch = useDispatch();
  const types = [...new Set(data.map((item) => item.type))];
  const elementRefs = useRef(types.map(() => React.createRef()));

  // const scrollToTop = (index) => {
  //   elementRefs.current[index].current.scrollIntoView({ behavior: "smooth" });
  // };

  return types.map((type, index) => (
    <div key={type} className="container" ref={elementRefs.current[index]}>
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
  ));
};

export default ShowProduct;
