import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartDataItem {
  time: number;
  price: number;
}
interface HuobiResponse {
  id: number;
  open: number;
  close: number;
  low: number;
  high: number;
  amount: number;
  vol: number;
  count: number;
}
interface huobiKlineResponse {
  data: HuobiResponse[];
}
interface Args {
  symbol: string;
  period: string;
  size: number;
}
export const huobiApi = createApi({
  reducerPath: "huobiChartsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.huobi.pro/" }),
  endpoints: (build) => ({
    gethuobisCharts: build.query<ChartDataItem[], Args>({
      query: ({ symbol, period, size }) => ({
        url: "market/history/kline",
        params: {
          symbol: symbol,
          size: size,
          period: period,
        },
      }),
      transformResponse: (response: huobiKlineResponse): ChartDataItem[] => {
        const rawList = response?.data || [];
        return rawList
          .map((item: HuobiResponse) => {
            return {
              time: item.id * 1000,
              price: parseInt(item.close.toString()),
            };
          })
          .reverse();
      },
    }),
  }),
});

export const { useGethuobisChartsQuery } = huobiApi;
