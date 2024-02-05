import * as endpoints from "../../../utils/endpoint";
import apiService from "../apiService";

export const productApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => endpoints.PRODUCTS(query),
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
