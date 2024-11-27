import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllUserResponseType,
  DeleteUserReqType,
  MessageresponceType,
  UserResponceType,
} from "../../types/apiTypes";
import { UserType } from "../../types/types";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageresponceType, UserType>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    allUsers: builder.query<AllUserResponseType, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    deleteUsers: builder.mutation<MessageresponceType, DeleteUserReqType>({
      query: ({ userId, id }) => ({
        url: `${id}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponceType } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUsersMutation } =
  userAPI;
