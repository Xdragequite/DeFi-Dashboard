import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartDataItem {
  time: number;
  price: number;
}
interface mexcKlineResponse {
  result: string[][];
}
interface Args {
  symbol: string;
  limit: string;
  interval: string;
}
export const mexcApi = createApi({
  reducerPath: "mexcChartsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.mexc.com" }),
  endpoints: (build) => ({
    getmexcsCharts: build.query<ChartDataItem[], Args>({
      query: ({ symbol, limit, interval }) => ({
        url: "/api/v3/klines",
        params: {
          symbol: symbol,
          interval: interval,
          limit: limit,
        },
      }),
      transformResponse: (response: any[][]): ChartDataItem[] => {
        return response
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

export const { useGetmexcsChartsQuery } = mexcApi;
