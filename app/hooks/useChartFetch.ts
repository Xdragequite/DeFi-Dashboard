import { useEffect, useState } from "react";
import { ChartDataItem } from "../api/binance/charts/route";

interface ChartFetchReponse {
  data: ChartDataItem[] | null;
  isLoading: boolean;
  error: any;
}

export function useChartFetch(url: string): ChartFetchReponse {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [url]);
  return { data, isLoading, error };
}
