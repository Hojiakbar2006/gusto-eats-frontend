import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHeader } from "./header";
import * as endpoints from "../../utils/endpoint";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery(authHeader()),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => endpoints.PRODUCTS,
    }),
    getRecommendedProducts: builder.query({
      query: () => endpoints.RECOMMENDED_PRODUCTS,
    }),
    getProductById: builder.query({
      query: (id) => endpoints.PRODUCT_BY_ID(id),
    }),

    getCategories: builder.query({
      query: () => endpoints.CATEGORIES,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRecommendedProductsQuery,
  useGetCategoriesQuery,
} = productApi;
