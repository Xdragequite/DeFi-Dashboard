'use client'
import Charts from '../../components/Charts/Charts'
import { useGetbinancesChartsQuery } from '@/store/services/binanceApiSlice';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChartDataItem } from '../api/binance/charts/route';
import { useChartFetch } from '../hooks/useChartFetch';
import useSWR from 'swr';

export interface CurrentChart {
  interval: string,
  symbol: string,
  limit: string,
}
const TIMEFRAMES = [
  { label: "1H",  interval: "1m",  limit: "60", apiLabel: '' }, 
  { label: "6H",  interval: "5m",  limit: "72", apiLabel: '' }, 
  { label: "12H", interval: "15m", limit: "48", apiLabel: '' }, 
  { label: "1D",  interval: "30m", limit: "48", apiLabel: '' }, 
  { label: "1M",  interval: "1d",  limit: "30", apiLabel: '' }, 
];
const symbols: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'SOLUSDT',
  'BNBUSDT',
];
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  return res.json();
};

const page = () => {

  const [timeframe, setTimeframe] = useState<CurrentChart>({
    interval: '1m',
    symbol: 'BTCUSDT',
    limit: '60',
  });
  const apiUrl = `/api/binance/charts?symbol=${timeframe.symbol}&interval=${timeframe.interval}&limit=${timeframe.limit}`;
  // const { data, isLoading, error } = useChartFetch(`/api/binance/charts?symbol=${timeframe.symbol}&interval=${timeframe.interval}&limit=${timeframe.limit}`);
  const { data, error, isLoading, isValidating } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true, 
    dedupingInterval: 60000, 
    revalidateOnFocus: false, 
  });
  
  const changeTimeFrame = (interval: string, limit: string, symbol: string) => (
    setTimeframe((prev) => ({
      ...prev,
      interval: interval, symbol: symbol, limit: limit
    }))
  );
  const changeCurrentSymbol = (symbol: string) => {
    setTimeframe((prev) => ({ ...prev, symbol: symbol }));
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-red-500">
        <p>Could not gather graphic data</p>
      </div>
    )
  }

  return <Charts data={data} symbol={timeframe.symbol} onChangeCurrentSymbol={changeCurrentSymbol} onChangeTimeframe={changeTimeFrame} currentInterval={timeframe.interval} timeframes={TIMEFRAMES} symbols={symbols} />
}

export default page