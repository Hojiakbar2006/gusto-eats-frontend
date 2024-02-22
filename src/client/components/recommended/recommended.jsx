import React from "react";
import "./recommended.css";
import { Link } from "react-router-dom";
import { Button, Rate, Skeleton } from "antd";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../../utils/formatPrice";
import { addToCart } from "../../../app/slice/cartSlice";
import { useGetRecommendedProductsQuery } from "../../../app/api/endpoints/product";

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
                    <p>{item.description}</p>
                    <Rate disabled defaultValue={3} />

                    <div className="group">
                      <p>{FormatPrice(item.price)}</p>
                      <Button
                        type="primary"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }) ??
              skeletonArray.map((item) => (
                <div className="box" key={item}>
                  <figure>
                    <Skeleton.Image style={{ borderRadius: 8 }} />
                  </figure>
                  <div className="box-items">
                    <Skeleton.Input style={{ width: "100%" }} active />
                    <Skeleton.Input style={{ width: "100%" }} active />
                    <Skeleton.Button style={{ width: 100 }} active />
                    <div className="group">
                      <Skeleton.Button style={{ width: 80 }} active />
                      <Skeleton.Avatar size="large" active />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Link to="/menu">
            <Button type="primary" shape="round">
              for more &gt;&gt;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
