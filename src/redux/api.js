// src/api/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    // Products endpoints
    // Orders endpoints
    // Admins endpoints
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useSendOtpMutation,
  useResetPasswordMutation,
  useTokenRefreshMutation,
  useLogoutMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRecommendedProductsQuery,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useMarkOrderAsPaidMutation,
  useGetUsersQuery,
  useGetUsersStaffQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useCreateCategoryMutation,
  useMarkOrderAsDeliveredMutation,
} = api;
