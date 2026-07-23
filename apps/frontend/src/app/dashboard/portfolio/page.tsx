"use client";

import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { PerformanceChart, AllocationChart } from '@/components/portfolio/PortfolioCharts';
import { HoldingsTable } from '@/components/portfolio/HoldingsTable';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Activity } from 'lucide-react';

export default function PortfolioPage() {
  const { holdings, summary, isLoading, fetchPortfolioData } = usePortfolioStore();

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  if (isLoading || !summary) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white mb-8">Main Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Skeleton className="col-span-8 h-[400px] rounded-2xl" />
          <Skeleton className="col-span-4 h-[400px] rounded-2xl" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-2xl" />
      </div>
    );
  }

  const isPositiveToday = summary.todayChange >= 0;
  const isPositiveTotal = summary.totalUnrealizedGain >= 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Main Portfolio</h1>
          <p className="text-brand-textSecondary text-sm">USD • Managed by you</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-brand-cyan text-brand-bgPrimary rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
            + Add Asset
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-brand-surfaceElevated to-brand-bgPrimary border-brand-cyan/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-brand-textSecondary">Total Balance</span>
              <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <Wallet size={16} />
              </div>
            </div>
            <div className="text-3xl font-heading font-black text-white mb-2">
              ${summary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-brand-textSecondary">Today's Change</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-textMuted">
                <Activity size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {isPositiveToday ? '+' : '-'}${Math.abs(summary.todayChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-bold flex items-center gap-1 ${isPositiveToday ? 'text-brand-success' : 'text-brand-danger'}`}>
              {isPositiveToday ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(summary.todayChangePercent).toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-brand-textSecondary">Total Return</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-textMuted">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {isPositiveTotal ? '+' : '-'}${Math.abs(summary.totalUnrealizedGain).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-bold flex items-center gap-1 ${isPositiveTotal ? 'text-brand-success' : 'text-brand-danger'}`}>
              {isPositiveTotal ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(summary.totalReturnPercent).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <PerformanceChart />
        <AllocationChart holdings={holdings} />
      </div>

      {/* Table */}
      <HoldingsTable holdings={holdings} />
    </div>
  );
}
