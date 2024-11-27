import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatsResponseType } from "../../types/apiTypes";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponseType, string>({
      query: (id) => `stats?id=${id}`,
    }),
    pies: builder.query<string, string>({
      query: (id) => `pies?id=${id}`,
    }),
    bar: builder.query<string, string>({
      query: (id) => `bar?id=${id}`,
    }),
    line: builder.query<string, string>({
      query: (id) => `line?id=${id}`,
    }),
  }),
});

export const { useStatsQuery, useBarQuery, usePiesQuery, useLineQuery } =
  dashboardApi;
