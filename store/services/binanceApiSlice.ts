import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartDataItem {
  time: number;
  price: number;
}

interface Args {
  symbol: string;
  limit: string;
  interval: string;
}

export const binanceApi = createApi({
  reducerPath: "binanceChartsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getbinancesCharts: build.query<ChartDataItem[], Args>({
      query: ({ symbol, limit, interval }) => ({
        url: "binance/charts",
        params: {
          symbol: symbol,
          interval: interval,
          limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetbinancesChartsQuery } = binanceApi;