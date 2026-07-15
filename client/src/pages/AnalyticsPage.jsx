import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import { BarChart3, } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-green/10 via-accent-cyan/5 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent-green/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-green/15 border border-accent-green/20 flex items-center justify-center text-accent-green shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <BarChart3 size={22} />
            </div>
            <div>
              <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Analytics Engine</p>
              <h1 className="text-3xl font-black text-white mt-0.5">Performance Intelligence</h1>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-dark-900/60 border border-white/5 rounded-2xl px-4 py-2.5 min-w-[120px]">
              <span className="text-[10px] text-dark-400 block uppercase font-bold tracking-wider">Alpha Score</span>
              <span className="text-sm font-mono font-bold text-accent-green mt-0.5 block">+1.24%</span>
            </div>
            <div className="bg-dark-900/60 border border-white/5 rounded-2xl px-4 py-2.5 min-w-[120px]">
              <span className="text-[10px] text-dark-400 block uppercase font-bold tracking-wider">Sharpe Ratio</span>
              <span className="text-sm font-mono font-bold text-accent-cyan mt-0.5 block">2.35</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-850/80 rounded-3xl border border-white/5 p-1 shadow-2xl">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
