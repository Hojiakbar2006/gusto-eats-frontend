import React, { useRef } from "react";
import { Banner, Category, ShowProduct } from "../components";
import { Skeleton } from "@mui/material";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category");
  const query = queryParams.get("query");

  const { data, isLoading } = useGetProductsQuery(
    `${query ? "query" : "category"}=${query ? query : category}`
  );
  const types = [...new Set(data?.products.map((item) => item.type) ?? null)];
  const elementRefs = useRef(types.map(() => React.createRef()));

  return (
    <>
      <Banner />

      {!isLoading ? (
        <Category />
      ) : (
        <div className="container">
          <div className="comp-container">
            <div className="category">
              <Skeleton width="100%" height={50} />
            </div>
          </div>
        </div>
      )}
      <ShowProduct
        data={data?.products}
        types={types}
        elementRefs={elementRefs}
        isLoading={isLoading}
      />
    </>
  );
}
