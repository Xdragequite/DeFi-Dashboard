import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const bybitTestData = [
  { time: "00:00", price: 63200 },
  { time: "04:00", price: 63550 },
  { time: "08:00", price: 62900 },
  { time: "12:00", price: 64100 },
  { time: "16:00", price: 63800 },
  { time: "20:00", price: 64500 },
  { time: "24:00", price: 65200 },
];

const ByBitCharts = () => {
  return (
    <div className="w-full max-w-4xl rounded-lg border border-[#2b2f3a] bg-[#17181e] p-6 font-sans shadow-xl h-min">
      
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-gray-200">BTC/USDT</span>
          <span className="text-sm font-semibold text-[#03c087]">+3.16%</span>
        </div>
        <div className="flex space-x-2 text-xs text-gray-400">
          <span className="rounded bg-[#262933] px-2 py-1 text-gray-200 cursor-pointer">1H</span>
          <span className="px-2 py-1 hover:text-gray-200 cursor-pointer">4H</span>
          <span className="px-2 py-1 hover:text-gray-200 cursor-pointer">1D</span>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={bybitTestData} margin={{ top: 10, right: -5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#03c087" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#03c087" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              stroke="#262933" 
            />
            
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#707a8a', fontSize: 11 }}
              dy={10}
            />
            
            <YAxis 
              domain={['dataMin', 'dataMax']}
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#707a8a', fontSize: 11 }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e2026', 
                borderColor: '#2b2f3a', 
                borderRadius: '6px',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#707a8a' }}
              itemStyle={{ color: '#03c087', fontWeight: 600 }}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#03c087" 
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