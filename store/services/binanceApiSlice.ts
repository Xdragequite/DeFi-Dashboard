import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ChartDataItem {
    time : number,
    price: number,
}
interface binanceKlineResponse{
    result : string[][],
}
interface Args{
    symbol:string,
    limit:string,
    interval:string,
}
export const binanceApi = createApi({
  reducerPath: 'binanceChartsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.binance.com/api/v3/' }),
  endpoints: (build) => ({
    getbinancesCharts : build.query<ChartDataItem[],Args>({
        query : ({symbol,limit,interval}) => ({
            url:'klines',
            params : {
                symbol: symbol , 
                interval: interval, 
                limit: limit, 
            }
        }),
        transformResponse : (response:binanceKlineResponse):ChartDataItem[] =>{
            const rawList = response?.result || []
            return rawList.map((item)=>{
                return {
                    time: parseInt(item[0]),
                    price : parseInt(item[4]),
                }
            }).reverse();
        }
    }),
  }),
})

export const {useGetbinancesChartsQuery} = binanceApi
