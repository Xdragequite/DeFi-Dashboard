import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OkxChartParams {
  instId: string;
  bar: string;
  limit: number;
}

export interface ChartDataItem {
  time: number;
  price: number;
}

interface OkxApiResponse {
  code: string;
  msg: string;
  data: string[][];
}

export const okxApi= createApi({
  reducerPath: "okxApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.okx.com" }),
  endpoints: (builder) => ({
    getOkxCharts: builder.query<ChartDataItem[], OkxChartParams>({
      query: ({ instId, bar, limit }) => ({
        url: "/api/v5/market/candles",
        params: {
          instId: instId.toUpperCase(),
          bar,
          limit: limit,
        },
      }),
      transformResponse: (response: OkxApiResponse): ChartDataItem[] => {
        return response.data
          .map((item) => {
            return {
              time: parseInt(item[0]),
              price: parseInt(item[4]),
            };
          })
          .reverse();
      },
    }),
  }),
});

export const { useGetOkxChartsQuery } = okxApi;
