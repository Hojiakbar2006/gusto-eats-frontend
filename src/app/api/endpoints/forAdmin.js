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
      query: (updatedData) => ({
        url: endpoints.UPDATE_PRODUCT,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["product_update"],
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
  useGetStatsQuery,
  useMarkOrderAsDeliveredMutation,
  useUpdateProductMutation,
  useCreateCategoryMutation,
  useCreateProductMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
} = forAdminApi;
