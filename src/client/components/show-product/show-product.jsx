import React from "react";
import { useDispatch } from "react-redux";
import { FormatPrice } from "../../../utils/formatPrice";
import { addToCart } from "../../../app/slice/cartSlice";
import { Rate, Skeleton, Button } from "antd";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../../app/api/endpoints/product";

const ShowProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const category = new URLSearchParams(location.search).get("category");
  const query = new URLSearchParams(location.search).get("query");

  const { data, isLoading, isError } = useGetProductsQuery(
    `${query ? "query" : "category"}=${query ? query : category}`
  );

  const types = data?.products
    ? [...new Set(data?.products.map((item) => item.type))]
    : [];
  const skeletonArray = Array.from({ length: 3 }, (_, index) => index + 1);

  if (isLoading || isError) {
    return skeletonArray.map((item) => (
      <div className="container" key={item}>
        <div className="comp-container" style={{ padding: "20px" }}>
          <div className="title">
            <Skeleton
              style={{ width: "200px", height: "50px", marginBottom: "30px" }}
            />
          </div>
          <div className="food-container">
            {skeletonArray.map((_, index) => (
              <div key={index} className="box">
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
        </div>
      </div>
    ));
  }

  return types?.length > 0 ? (
    types.map((type) => (
      <div key={type} className="container">
        <div className="comp-container" style={{ padding: "20px" }}>
          <div className="title">
            <h1 style={{ marginBottom: "30px" }}>{type}</h1>
          </div>
          <div className="food-container">
            {data.products
              ?.filter((item) => item.type === type)
              ?.map((item) => {
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
              })}
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
