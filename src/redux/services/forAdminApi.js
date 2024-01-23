import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHeader } from "./header";
import * as endpoints from "../../utils/endpoint";

export const forAdminApi = createApi({
  reducerPath: "forAdminApi",
  baseQuery: fetchBaseQuery(authHeader()),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => endpoints.USERS,
    }),
    getUsersStaff: builder.query({
      query: () => endpoints.USERS_STAFF,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: endpoints.CREATE_PRODUCT,
        method: "POST",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: endpoints.DELETE_PRODUCT(id),
        method: "DELETE",
      }),
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: endpoints.CREATE_CATEGORY,
        method: "POST",
        body,
      }),
    }),
    // eslint-disable-next-line no-dupe-keys
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: endpoints.DELETE_CATEGORY(id),
        method: "DELETE",
      }),
    }),
    markOrderAsDelivered: builder.mutation({
      query: (id) => ({
        url: endpoints.MARK_ORDER_AS_DELIVERED(id),
        method: "PATCH",
      }),
    }),
  }),
});

//Auto generated hook - starts with use & ends on query
export const {
  useGetUsersQuery,
  useGetUsersStaffQuery,
  useMarkOrderAsDeliveredMutation,
  useCreateCategoryMutation,
  useCreateProductMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
} = forAdminApi;
