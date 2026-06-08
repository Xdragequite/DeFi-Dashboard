'use client'
import Charts from '../../components/Charts/Charts'
import { useGetBybitsChartsQuery } from '@/store/services/bybitApiSlice'
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export interface CurrentChart {
  interval:string,
  symbol:string,
  limit:string,
}
const TIMEFRAMES = [
  { label: "1H",  interval: "1",  limit: "60", apiLabel: '' },
  { label: "6H",  interval: "5",  limit: "72", apiLabel: '' },
  { label: "12H", interval: "15", limit: "48", apiLabel: '' },
  { label: "1D",  interval: "30", limit: "48", apiLabel: '' },
  { label: "1M",  interval: "D",  limit: "30", apiLabel: '' },
];
const page = () => {
  const [timeframe, setTimeframe] = useState<CurrentChart>({
    interval:'1',
    symbol:'BTCUSDT',
    limit:'60',
  });
  const { data, error, isLoading } = useGetBybitsChartsQuery({
    symbol:timeframe.symbol,
    limit:timeframe.limit,
    interval: timeframe.interval,
  });
  const changeTimeFrame = (interval:string,limit:string,symbol:string) => (
    setTimeframe((prev)=>({...prev,
      interval:interval,symbol:symbol,limit:limit}))
  );
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

  return <Charts data={data} symbol="BTCUSDT" onChangeTimeframe={changeTimeFrame} currentInterval={timeframe.interval} timeframes={TIMEFRAMES}/>
}

export default page