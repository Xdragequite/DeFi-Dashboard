'use client'
import Charts from '../../components/Charts/Charts'
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useGetOkxChartsQuery } from '@/store/services/okxApiSlice';

export interface CurrentChart {
  interval:string,
  symbol:string,
  limit:string,
}
const TIMEFRAMES = [
  { label: "1H",  interval: "1m",  limit: "60", apiLabel: '' },
  { label: "6H",  interval: "5m",  limit: "72", apiLabel: '' },
  { label: "12H", interval: "15m", limit: "48", apiLabel: '' },
  { label: "1D",  interval: "30m", limit: "48", apiLabel: '' },
  { label: "1M",  interval: "1D",  limit: "30", apiLabel: '' },
];
const symbols: string[] = [
  'BTC-USDT',
  'ETH-USDT',
  'SOL-USDT',
  'BNB-USDT',
];
const page = () => {
  const [timeframe, setTimeframe] = useState<CurrentChart>({
    interval:'1m',
    symbol:'BTC-USDT',
    limit:'60',
  });

  const { data, error, isLoading } = useGetOkxChartsQuery({
    instId:timeframe.symbol,
    bar: timeframe.interval,
    limit:Number(timeframe.limit),

  });
  const changeTimeFrame = (interval:string,limit:string,symbol:string) => (
    setTimeframe((prev)=>({...prev,
      interval:interval,symbol:symbol,limit:limit}))
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

  return <Charts data={data} onChangeCurrentSymbol={changeCurrentSymbol} symbol={timeframe.symbol} onChangeTimeframe={changeTimeFrame} currentInterval={timeframe.interval} timeframes={TIMEFRAMES} symbols={symbols}/>
}

export default page