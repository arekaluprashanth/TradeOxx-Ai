"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useMarketStore } from '@/store/useMarketStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, ChevronRight, Activity, Globe } from 'lucide-react';

export default function MarketsDashboardPage() {
  const { overview, isLoading, fetchOverview } = useMarketStore();

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (isLoading || !overview) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Market Overview</h1>
          <p className="text-brand-textSecondary text-sm">Global indices, gainers, and market sentiment.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/markets/screener">
            <button className="px-4 py-2 bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/20 rounded-lg text-sm font-bold transition-colors">
              Open Screener
            </button>
          </Link>
        </div>
      </div>

      {/* Major Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overview.indices.map((idx, i) => {
          const isUp = idx.change >= 0;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-brand-textSecondary">{idx.name}</span>
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-brand-textMuted">
                    <Globe size={16} />
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-2 tracking-tight">
                  {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-sm font-bold flex items-center gap-1 ${isUp ? 'text-brand-success' : 'text-brand-danger'}`}>
                  {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {isUp ? '+' : ''}{idx.change.toFixed(2)}%
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-success" />
              Top Gainers
            </CardTitle>
            <Link href="/dashboard/markets/screener" className="text-sm text-brand-cyan hover:underline flex items-center">
              View All <ChevronRight size={14} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <tbody>
                {overview.topGainers.map((asset, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/markets/${asset.symbol}`} className="block">
                        <div className="font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">
                      ${asset.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant="success">+{asset.change.toFixed(2)}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingDown size={18} className="text-brand-danger" />
              Top Losers
            </CardTitle>
            <Link href="/dashboard/markets/screener" className="text-sm text-brand-cyan hover:underline flex items-center">
              View All <ChevronRight size={14} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <tbody>
                {overview.topLosers.map((asset, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/markets/${asset.symbol}`} className="block">
                        <div className="font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">
                      ${asset.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant="destructive">{asset.change.toFixed(2)}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Market Heatmap Placeholder for V1.0 */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={18} className="text-brand-purple" />
              Sector Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-xl bg-gradient-to-br from-brand-success/10 via-brand-bgPrimary to-brand-danger/10 border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <p className="text-brand-textMuted font-medium mb-2">Interactive Heatmap loading...</p>
                <p className="text-xs text-brand-textSecondary max-w-sm mx-auto">This visualization requires the full dataset connection in V2.0 to plot the S&P 500 components accurately.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
