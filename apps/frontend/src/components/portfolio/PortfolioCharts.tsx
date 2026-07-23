"use client";

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const performanceData = [
  { date: 'Jan', value: 100000 },
  { date: 'Feb', value: 102000 },
  { date: 'Mar', value: 98000 },
  { date: 'Apr', value: 105000 },
  { date: 'May', value: 112000 },
  { date: 'Jun', value: 110000 },
  { date: 'Jul', value: 124688 },
];

const COLORS = ['#00F0FF', '#7000FF', '#00A3FF', '#4ade80'];

export function PerformanceChart() {
  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader>
        <CardTitle>Performance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#ffffff40" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000)}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#02050E', borderColor: '#ffffff20', borderRadius: '8px' }}
                itemStyle={{ color: '#00F0FF' }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function AllocationChart({ holdings }: { holdings: any[] }) {
  const data = useMemo(() => {
    return holdings.map(h => ({
      name: h.symbol,
      value: h.marketValue
    })).sort((a, b) => b.value - a.value);
  }, [holdings]);

  if (!holdings.length) return null;

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#02050E', borderColor: '#ffffff20', borderRadius: '8px' }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
            <span className="text-sm text-brand-textSecondary">Total Assets</span>
            <span className="text-2xl font-bold text-white">{holdings.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
