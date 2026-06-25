import { NextResponse } from 'next/server';


export interface ChartDataItem {
  time: number;
  price: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const interval = searchParams.get('interval');
    const limit = searchParams.get('limit');

    if (!symbol || !interval || !limit) {
      return NextResponse.json(
        { error: 'Missing required parameters: symbol, interval, limit' },
        { status: 400 }
      );
    }

    const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const response = await fetch(binanceUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from Binance' },
        { status: response.status }
      );
    }
    const rawData: string[][] = await response.json();

    const formattedData: ChartDataItem[] = rawData
      .map((item) => ({
        time: parseInt(item[0]), 
        price: parseFloat(item[4]), 
      }))
      .reverse();

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}