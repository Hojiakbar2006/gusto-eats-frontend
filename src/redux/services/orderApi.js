import * as endpoints from "../../utils/endpoint";
import apiService from "./apiService";

export const orderApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => endpoints.ORDERS,
    }),

    getOrderById: builder.query({
      query: (id) => endpoints.ORDER_BY_ID(id),
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: endpoints.CREATE_ORDER,
        method: "POST",
        body,
      }),
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: endpoints.DELETE_ORDER(id),
        method: "DELETE",
      }),
    }),

    markOrderAsPaid: builder.mutation({
      query: (id) => ({
        url: endpoints.MARK_ORDER_AS_PAID(id),
        method: "PATCH",
      }),
    }),
  }),
});

//Auto generated hook - starts with use & ends on query
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useMarkOrderAsPaidMutation,
} = orderApi;
