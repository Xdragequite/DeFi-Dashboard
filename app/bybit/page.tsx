'use client'
import Charts from '../../components/Charts/Charts'
import { useGetBybitsChartsQuery } from '@/store/services/bybitApiSlice'
const page = () => {
  const { data, error, isLoading } = useGetBybitsChartsQuery({
    symbol:'BTCUSDT',
    limit:'60,'
  })
  return (
    <> 
    <Charts></Charts>
    <div>{data?.length}</div>
    </>

  )
}

export default page