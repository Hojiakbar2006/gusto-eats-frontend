import React, { useRef, useState } from "react";
import { Banner, Category, ShowProduct } from "../components";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../app/api/endpoints/product";

export default function Menu() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const query = queryParams.get("query");

  const { data, isLoading } = useGetProductsQuery(
    `${query ? "query" : "category"}=${query ? query : category}`
  );
  const types = data?.products
    ? [...new Set(data.products.map((item) => item.type))]
    : [];

  const elementRefs = useRef(types.map(() => React.createRef()));

  const [isAboveViewport, setIsAboveViewport] = useState(false);

  return (
    <>
      <Banner />

      <Category setIsAboveViewport={setIsAboveViewport} />

      <ShowProduct
        data={data?.products}
        types={types}
        elementRefs={elementRefs}
        isLoading={isLoading}
        isAboveViewport={isAboveViewport}
      />
    </>
  );
}
