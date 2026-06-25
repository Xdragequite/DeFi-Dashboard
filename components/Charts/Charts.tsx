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
    const firstPrice = data[0]?.price;
    const lastPrice = data[data.length - 1]?.price;
    const difference = lastPrice - firstPrice;
    const percentage = (difference / firstPrice) * 100;
    return {
      value: percentage.toFixed(2),
      isPositive: percentage >= 0,
    };
  }, [data]);


  const chartColor = priceChange?.isPositive ? "#03c087" : "#d80137";

  return (
    <div className="w-full max-w-6xl rounded-xl border border-[#2b2f3a] bg-[#17181e] p-6 font-sans shadow-2xl h-min">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <DropdownSymbol
            symbols={symbols}
            onChangeCurrentSymbol={onChangeCurrentSymbol}
            symbol={symbol}
          />
          <span
            className={`text-base font-bold px-2.5 py-1 rounded ${
              priceChange?.isPositive 
                ? "text-[#03c087] bg-[#03c087]/10" 
                : "text-[#d80137] bg-[#d80137]/10"
            }`}
          >
            {priceChange?.isPositive ? `+${priceChange?.value}%` : `${priceChange?.value}%`}
          </span>
        </div>

        <div className="flex space-x-1.5 bg-[#20222b] p-1 rounded-lg border border-[#2b2f3a] w-max self-end sm:self-auto">
          {timeframes.map((item, index) => {
            const isActive = currentInterval === item.interval;
            return (
              <button
                onClick={() => onChangeTimeframe(item.interval, item.limit, symbol)}
                key={index}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-[#2e3241] text-white shadow"
                    : "text-gray-400 hover:text-white hover:bg-[#252835]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-96 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.2} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#23262f" strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#707a8a", fontSize: 11 }}
              tickMargin={12}
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <YAxis

              domain={[
                (dataMin) => dataMin - dataMin * 0.001,
                (dataMax) => dataMax + dataMax * 0.001,
              ]}
              orientation="right" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#707a8a", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ stroke: "#2b2f3a", strokeWidth: 1, strokeDasharray: "4 4" }}
              contentStyle={{
                backgroundColor: "#1e2026",
                borderColor: "#2b2f3a",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              }}
              labelStyle={{ color: "#707a8a", marginBottom: "4px" }}
              itemStyle={{
                color: chartColor,
                fontWeight: 600,
              }}
              formatter={(value) => [`$${value}`, "Цена"]}
              labelFormatter={(labelTimestamp) =>
                new Date(labelTimestamp).toLocaleString([], {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ByBitCharts;