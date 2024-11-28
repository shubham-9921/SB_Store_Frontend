import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarResponseType,
  LineResponseType,
  PieResponseType,
  StatsResponseType,
} from "../../types/apiTypes";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponseType, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pies: builder.query<PieResponseType, string>({
      query: (id) => `pies?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResponseType, string>({
      query: (id) => `bar?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<LineResponseType, string>({
      query: (id) => `line?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useStatsQuery, useBarQuery, usePiesQuery, useLineQuery } =
  dashboardApi;
