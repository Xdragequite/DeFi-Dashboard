import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartDataItem {
  time: number;
  price: number;
}
interface BybitKlineResponse {
  result: {
    list: string[][];
  };
}
interface Args {
  symbol: string;
  limit: string;
  interval: string;
}
export const bybitApi = createApi({
  reducerPath: "bybitChartsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bybit.com/v5/" }),
  endpoints: (build) => ({
    getBybitsCharts: build.query<ChartDataItem[], Args>({
      query: ({ symbol, limit, interval }) => ({
        url: "market/kline",
        params: {
          category: "spot",
          symbol: symbol,
          interval: interval,
          limit: limit,
        },
      }),
      transformResponse: (response: BybitKlineResponse): ChartDataItem[] => {
        const rawList = response?.result?.list || [];
        return rawList
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

export const { useGetBybitsChartsQuery } = bybitApi;
