import * as endpoints from "../../../utils/endpoint";
import apiService from "../apiService";

export const forAdminApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => endpoints.USERS,
    }),
    getUsersStaff: builder.query({
      query: () => endpoints.USERS_STAFF,
    }),
    getStats: builder.query({
      query: () => endpoints.GET_STATS,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: endpoints.CREATE_PRODUCT,
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({data, id}) => ({
        url: endpoints.UPDATE_PRODUCT(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product_update"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: endpoints.DELETE_PRODUCT(id),
        method: "DELETE",
      }),
      invalidatesTags: ["product_update"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: endpoints.CREATE_CATEGORY,
        method: "POST",
        body,
      }),
      invalidatesTags: ["category_update"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: endpoints.DELETE_CATEGORY(id),
        method: "DELETE",
      }),
      invalidatesTags: ["category_update"],
    }),
    markOrderAsDelivered: builder.mutation({
      query: (id) => ({
        url: endpoints.MARK_ORDER_AS_DELIVERED(id),
        method: "PATCH",
      }),
    }),
    invalidatesTags: ["order_update"],
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersStaffQuery,
  useGetStatsQuery,
  useMarkOrderAsDeliveredMutation,
  useUpdateProductMutation,
  useCreateCategoryMutation,
  useCreateProductMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
} = forAdminApi;
