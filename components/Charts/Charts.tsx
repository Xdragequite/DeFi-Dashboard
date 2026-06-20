import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartDataItem } from "@/store/services/bybitApiSlice";
import DropdownSymbol from "../DropdownSymbol";

interface TimeFrames {
  label: string;
  apiLabel: string;
  interval: string;
  limit: string;
}

interface DataCharts {
  data: ChartDataItem[] | undefined;
  symbol: string;
  onChangeTimeframe: (interval: string, limit: string, symbol: string) => void;
  currentInterval: string;
  timeframes: TimeFrames[];
  symbols: string[];
  onChangeCurrentSymbol: (symbol: string) => void;
}

const ByBitCharts = ({
  data,
  symbol,
  onChangeTimeframe,
  currentInterval,
  timeframes,
  symbols,
  onChangeCurrentSymbol,
}: DataCharts) => {
  const priceChange = useMemo(() => {
    if (!data || data.length < 2) return null;
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    const difference = lastPrice - firstPrice;
    const percentage = (difference / firstPrice) * 100;
    return {
      value: percentage.toFixed(2),
      isPositive: percentage >= 0,
    };
  }, [data]);

  return (
    <div className="w-full max-w-6xl rounded-lg border border-[#2b2f3a] bg-[#17181e] p-6 font-sans shadow-xl h-min">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-5 ml-[4.5rem]">
          <DropdownSymbol
            symbols={symbols}
            onChangeCurrentSymbol={onChangeCurrentSymbol}
            symbol={symbol}
          ></DropdownSymbol>

          <span
            className={`text-sm font-semibold x ${priceChange?.isPositive ? "text-[#03c087]" : "text-[#d80137]"}`}
          >
            {priceChange?.isPositive
              ? `+${priceChange?.value}%`
              : `${priceChange?.value}%`}
          </span>
        </div>
        <div className="flex space-x-2 text-xs text-gray-400">
          {timeframes.map((item, index) => {
            const isActive = currentInterval === item.interval;
            return (
              <span
                onClick={() =>
                  onChangeTimeframe(item.interval, item.limit, symbol)
                }
                key={index}
                className={`hover:bg-slate-800 rounded-sm p-3 cursor-pointer ${isActive ? "bg-slate-800" : "bg-slate-700"}`}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} className="p-1">
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`${priceChange?.isPositive ? "#03c087" : "#d80137"}`}
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor={`${priceChange?.isPositive ? "#03c087" : "#d80137"}`}
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#262933" />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#707a8a", fontSize: 11 }}
              tickMargin={12}
              tickFormatter={(timestamp) => {
                return new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />

            <YAxis
              domain={[
                (dataMin) => dataMin - dataMin * 0.01,
                (dataMax) => dataMax + dataMax * 0.01,
              ]}
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#707a8a", fontSize: 11 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e2026",
                borderColor: "#2b2f3a",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#707a8a" }}
              itemStyle={{
                color: `${priceChange?.isPositive ? "#03c087" : "#d80137"}`,
                fontWeight: 600,
              }}
              formatter={(value) => [`$${value}`, "Price"]}
              labelFormatter={(labelTimestamp) => {
                return new Date(labelTimestamp).toLocaleString([], {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={`${priceChange?.isPositive ? "#03c087" : "#d80137"}`}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ByBitCharts;
