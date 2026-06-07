import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CharDataItem {
    time : string,
    price: number,
}
interface BybitKlineResponse{
    result : {
        list : string[][],
    }
}
interface Args{
    symbol:string,
    limit:string,
}

export const bybitApi = createApi({
  reducerPath: 'bybitChartsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.bybit.com/v5/' }),
  endpoints: (build) => ({
    getBybitsCharts : build.query<CharDataItem[],Args>({
        query : ({symbol,limit}) => ({
            url:'market/kline',
            params : {
                category: 'spot',
                symbol: symbol , 
                interval: '60',
                limit: limit,
            }
        }),
        transformResponse : (response:BybitKlineResponse):CharDataItem[] =>{
            const rawList = response.result.list || []
            return rawList.map((item)=>{
                return {
                    time: new Date(parseInt(item[0])).toLocaleString([],{
                        hour:'2-digit',
                        minute:'2-digit',
                    }),
                    price : parseInt(item[4]),
                }
            }).reverse();
        }
    }),
  }),
})

export const {useGetBybitsChartsQuery} = bybitApi
