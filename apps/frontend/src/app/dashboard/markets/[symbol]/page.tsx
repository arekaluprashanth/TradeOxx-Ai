"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMarketStore } from '@/store/useMarketStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AdvancedChart } from '@/components/markets/AdvancedChart';
import { AIAnalysisPanel } from '@/components/markets/AIAnalysisPanel';
import { TrendingUp, TrendingDown, Star, Share2 } from 'lucide-react';

export default function AssetDetailPage() {
  const params = useParams();
  const symbol = (params.symbol as string).toUpperCase();
  const { activeAssetHistory, isLoading, fetchAssetHistory } = useMarketStore();
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');

  useEffect(() => {
    fetchAssetHistory(symbol, '1D');
  }, [symbol, fetchAssetHistory]);

  if (isLoading || !activeAssetHistory.length) {
    return (
      <div className="space-y-6 h-[calc(100vh-8rem)]">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-12">
          <Skeleton className="col-span-12 lg:col-span-9 h-full rounded-2xl" />
          <Skeleton className="col-span-12 lg:col-span-3 h-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const latest = activeAssetHistory[activeAssetHistory.length - 1];
  const previous = activeAssetHistory[activeAssetHistory.length - 2];
  const change = latest.close - previous.close;
  const changePercent = (change / previous.close) * 100;
  const isUp = change >= 0;

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-black text-white text-xl">
            {symbol[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">{symbol}</h1>
              <span className="text-sm font-medium text-brand-textMuted px-2 py-0.5 bg-white/5 rounded border border-white/10">NASDAQ</span>
            </div>
            <p className="text-brand-textSecondary text-sm font-medium">Technology Sector</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="text-3xl font-black text-white font-heading">
              ${latest.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-bold flex items-center justify-end gap-1 ${isUp ? 'text-brand-success' : 'text-brand-danger'}`}>
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {isUp ? '+' : '-'}${Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
            </div>
          </div>
          
          <div className="flex gap-2 border-l border-white/10 pl-6">
            <button className="p-2.5 bg-white/5 hover:bg-white/10 text-brand-textSecondary hover:text-brand-cyan rounded-lg transition-colors">
              <Star size={18} />
            </button>
            <button className="p-2.5 bg-white/5 hover:bg-white/10 text-brand-textSecondary hover:text-white rounded-lg transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[600px] pb-12">
        
        {/* Chart Column */}
        <Card className="col-span-12 lg:col-span-9 flex flex-col overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between py-3 bg-white/[0.02] border-b border-white/5">
            <div className="flex gap-1">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(tf => (
                <button 
                  key={tf}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${tf === '1D' ? 'bg-white/10 text-white' : 'text-brand-textMuted hover:text-white hover:bg-white/5'}`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setChartType('candlestick')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${chartType === 'candlestick' ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-brand-textMuted hover:text-white hover:bg-white/5'}`}
              >
                Candles
              </button>
              <button 
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${chartType === 'line' ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-brand-textMuted hover:text-white hover:bg-white/5'}`}
              >
                Line
              </button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative">
            <AdvancedChart data={activeAssetHistory} type={chartType} />
          </CardContent>
        </Card>

        {/* AI & Analytics Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <AIAnalysisPanel symbol={symbol} />
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Market Cap', value: '$2.84T' },
                { label: 'Volume', value: latest.volume.toLocaleString() },
                { label: 'Avg Vol (3m)', value: '54.2M' },
                { label: '52 Wk High', value: '$199.62' },
                { label: '52 Wk Low', value: '$164.08' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-brand-textMuted">{stat.label}</span>
                  <span className="font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
