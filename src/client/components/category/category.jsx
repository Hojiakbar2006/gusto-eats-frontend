import React, {  useEffect, useRef } from "react";
import "./category.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/api/endpoints/product";
import { Badge, Button, Skeleton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../app/slice/cartSlice";
import { openCart } from "../../../app/slice/toggleCartSlice";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const catRef = useRef(null);
  const isAtTopRef = useRef(false);
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const category = new URLSearchParams(useLocation().search).get("category");
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (isLoading || isError) {
    return (
      <div className="container" ref={catRef}>
        <div className="comp-container">
          <div className="category">
            <Skeleton.Button style={{ width: "100%", height: 50 }} />
          </div>
        </div>
      </div>
    );
  }

  console.log(isAtTopRef);

  return (
    <div className="cat-container">
      <div className="container">
        <div className="comp-container">
          <div className="category">
            <div>
              <Button
                className={category === null ? "cat-btn active" : "cat-btn"}
                onClick={() => navigate("")}
              >
                All
              </Button>
              {data?.map((item) => (
                <Button
                  className={
                    item.name === category ? "cat-btn active" : "cat-btn"
                  }
                  key={item.id}
                  onClick={() => navigate(`?category=${item.name}`)}
                  icon={<img width="30px" src={item.image} alt="" />}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <Badge
              style={{ display: `${isAtTopRef ? "" : "none"}` }}
              count={cart.cartItems.length}
              onClick={() => dispatch(openCart())}
            >
              <ShoppingCartOutlined
                style={{
                  display: `${isAtTopRef ? "" : "none"}`,
                  cursor: "pointer",
                  fontSize: "30px",
                  marginLeft: "20px",
                }}
              />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
