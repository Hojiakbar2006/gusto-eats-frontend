import * as endpoints from "../../../utils/endpoint";
import apiService from "../apiService";

export const productApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => endpoints.PRODUCTS(query),
      providesTags: ["product_update"],
    }),
    getRecommendedProducts: builder.query({
      query: () => endpoints.RECOMMENDED_PRODUCTS,
      providesTags: ["product_update"],
    }),
    getProductById: builder.query({
      query: (id) => endpoints.PRODUCT_BY_ID(id),
    }),

    getCategories: builder.query({
      query: () => endpoints.CATEGORIES,
      providesTags: ["category_update"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRecommendedProductsQuery,
  useGetCategoriesQuery,
} = productApi;
