'use client'
import Charts from '../../components/Charts/Charts'
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useGethuobisChartsQuery } from '@/store/services/huobiApiSlice';

export interface CurrentChart {
  period: string;
  symbol: string;
  size: number;
}
const TIMEFRAMES = [
  { label: "1H",  interval: "1min",  limit: "60", apiLabel: '' },
  { label: "6H",  interval: "5min",  limit: "72", apiLabel: '' },
  { label: "12H", interval: "15min", limit: "48", apiLabel: '' },
  { label: "1D",  interval: "60min", limit: "12", apiLabel: '' },
  { label: "1M",  interval: "1day",  limit: "30", apiLabel: '' },
];
const symbols: string[] = [
  'BTCUSDT',
  'ETHUSDT',
  'SOLUSDT',
  'BNBUSDT',

];
const page = () => {
  const [timeframe, setTimeframe] = useState<CurrentChart>({
    period: '1min',     
    symbol: 'BTCUSDT',  
    size: 60,           
  });
  const { data, error, isLoading } = useGethuobisChartsQuery({
    symbol: timeframe.symbol.toLowerCase(), 
    period: timeframe.period,
    size: timeframe.size,
  });

  const changeTimeFrame = (interval:string,limit:string,symbol:string) => (
    setTimeframe((prev)=>({...prev,
      period:interval,symbol:symbol,size:Number(limit)}))
  );
  const changeCurrentSymbol = (symbol:string) => {
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

  return <Charts data={data} symbol={timeframe.symbol} onChangeCurrentSymbol={changeCurrentSymbol}  onChangeTimeframe={changeTimeFrame} currentInterval={timeframe.period} timeframes={TIMEFRAMES} symbols={symbols}/>
}

export default page