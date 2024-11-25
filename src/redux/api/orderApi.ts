import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrderResponseType,
  MessageresponceType,
  NewOrderType,
  OrderDetailResponseType,
  UpdateOrderResponseType,
} from "../../types/apiTypes";
// myorder , all , update, delete
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageresponceType, NewOrderType>({
      query: (order) => ({
        url: `new`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    myOrders: builder.query<AllOrderResponseType, string>({
      query: (userId) => ({
        url: `myorder?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    allOrders: builder.query<AllOrderResponseType, string>({
      query: (userId) => `all?id=${userId}`,
      providesTags: ["order"],
    }),
    orderDetails: builder.query<OrderDetailResponseType, string>({
      query: (id) => id,
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation<MessageresponceType, UpdateOrderResponseType>(
      {
        query: ({ userId, orderId }) => ({
          url: `${orderId}?id=${userId}`,
          method: "PUT",
        }),
        invalidatesTags: ["order"],
      }
    ),
    deleteOrder: builder.mutation<MessageresponceType, UpdateOrderResponseType>(
      {
        query: ({ userId, orderId }) => ({
          url: `${orderId}?id=${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["order"],
      }
    ),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
