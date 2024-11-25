import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryResponceType,
  DeleteProductReqType,
  MessageresponceType,
  NewProductReqType,
  ProductDetailsResponseType,
  ProductResponceType,
  SearchProducstResType,
  SearchQueryType,
  UpdateProductReqType,
} from "../../types/apiTypes";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),

  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<ProductResponceType, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<ProductResponceType, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    categories: builder.query<CategoryResponceType, string>({
      query: () => `category`,
      providesTags: ["product"],
    }),
    searchProducsts: builder.query<SearchProducstResType, SearchQueryType>({
      query: ({ search, price, page, sort, category }) => {
        let queryString = `all?search=${search}&price=${price}`;

        if (category) queryString += `&category=${category}`;
        if (page) queryString += `&page=${page}`;
        if (sort) queryString += `&sort=${sort}`;

        return queryString;
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<MessageresponceType, NewProductReqType>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    productdetails: builder.query<ProductDetailsResponseType, string>({
      query: (id) => id,
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation<MessageresponceType, UpdateProductReqType>({
      query: ({ userId, productId, formData }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<MessageresponceType, DeleteProductReqType>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProducstsQuery,
  useCreateProductMutation,
  useProductdetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
