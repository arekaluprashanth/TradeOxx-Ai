import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  Zap,
  BarChart2,
  PieChart,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';
import AssetModal from '../trading/AssetModal';

export default function GlobalMarketOverview() {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeMarketRegion, setActiveMarketRegion] = useState('ALL');

  // Derive Global Indices
  const indices = useMemo(() => assets.filter(a => a.category === 'index'), [assets]);

  // Global Region Snapshots
  const regionSnapshots = [
    { name: "US Markets", symbol: "S&P 500", price: "5,450.20", change: "+1.25%", status: "OPEN", trend: "up" },
    { name: "Indian Markets", symbol: "NIFTY 50", price: "24,520.80", change: "+0.85%", status: "OPEN", trend: "up" },
    { name: "European Markets", symbol: "FTSE 100", price: "8,210.40", change: "-0.15%", status: "OPEN", trend: "down" },
    { name: "Asian Markets", symbol: "Nikkei 225", price: "38,910.00", change: "+1.42%", status: "CLOSED", trend: "up" },
    { name: "Crypto Market", symbol: "Bitcoin", price: "$64,820.50", change: "+4.25%", status: "24/7 LIVE", trend: "up" },
    { name: "Forex FX", symbol: "USD/INR", price: "83.52", change: "+0.04%", status: "24/5 LIVE", trend: "up" }
  ];

  // Sector Heatmap dataset
  const sectors = [
    { name: "Technology", weight: "32%", change: "+4.25%", color: "bg-brand-success/20 border-brand-success/40 text-brand-success" },
    { name: "Finance", weight: "20%", change: "+1.80%", color: "bg-brand-success/15 border-brand-success/30 text-brand-success" },
    { name: "Healthcare", weight: "15%", change: "+0.45%", color: "bg-brand-surface border-white/10 text-white" },
    { name: "Energy", weight: "12%", change: "-1.20%", color: "bg-brand-danger/15 border-brand-danger/30 text-brand-danger" },
    { name: "Consumer", weight: "11%", change: "+2.15%", color: "bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan" },
    { name: "Industrials", weight: "10%", change: "-0.60%", color: "bg-brand-danger/15 border-brand-danger/30 text-brand-danger" }
  ];

  // Economic Calendar dataset
  const economicEvents = [
    { event: "US Federal Reserve FOMC Rate Decision", date: "Today 18:30 GMT", impact: "HIGH", region: "US" },
    { event: "India CPI Inflation YoY Release", date: "Tomorrow 12:00 GMT", impact: "MED", region: "IN" },
    { event: "European Central Bank Rate Speech", date: "Jul 24 14:00 GMT", impact: "HIGH", region: "EU" }
  ];

  return (
    <div className="space-y-10 py-6">
      
      {/* ── 1. TOP MARKET INTELLIGENCE HERO SUMMARY ────────────── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-cyan/20 via-brand-purple/15 to-brand-surfaceElevated border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-heading font-bold uppercase tracking-widest">
              <Globe size={14} />
              Volume 4.2.3 • Global Market Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Global Market Command & Radar
            </h2>
            <p className="text-sm text-brand-textSecondary max-w-xl">
              Unified cross-border market intelligence covering US, Indian, European, Asian, Crypto, and Forex liquidities.
            </p>
          </div>

          <div className="bg-dark-900/90 border border-white/10 rounded-2xl p-4 min-w-[200px] text-center shadow-xl">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Overall Market Mood</p>
            <p className="text-2xl font-mono font-black text-brand-success mt-1">88% BULLISH</p>
            <p className="text-[11px] text-brand-cyan font-semibold mt-0.5">High Tech Momentum</p>
          </div>
        </div>

        {/* Global Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-white/5">
          <div className="bg-dark-900/60 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase">Risk Index</p>
            <p className="font-mono font-bold text-brand-success mt-0.5">Low (1.8 / 10)</p>
          </div>
          <div className="bg-dark-900/60 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase">Market Volatility</p>
            <p className="font-mono font-bold text-brand-cyan mt-0.5">Low (14.2 VIX)</p>
          </div>
          <div className="bg-dark-900/60 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase">Active Sector</p>
            <p className="font-mono font-bold text-brand-purple mt-0.5">Technology (+4.25%)</p>
          </div>
          <div className="bg-dark-900/60 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase">Feed Refresh</p>
            <p className="font-mono font-bold text-white mt-0.5">Continuous 1.0s</p>
          </div>
        </div>
      </div>

      {/* ── 2. GLOBAL REGIONAL MARKET SNAPSHOTS ──────────────────── */}
      <div className="space-y-4">
        <h3 className="text-xs font-heading font-bold text-brand-textMuted uppercase tracking-widest flex items-center gap-2">
          <Globe size={14} className="text-brand-cyan" />
          Regional Market Snapshots
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionSnapshots.map((reg, idx) => (
            <div 
              key={idx}
              className="bg-brand-surface/70 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 rounded-2xl p-4 backdrop-blur-xl shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{reg.name}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${reg.status.includes('OPEN') || reg.status.includes('LIVE') ? 'bg-brand-success/15 text-brand-success border border-brand-success/30' : 'bg-white/10 text-brand-textMuted'}`}>
                  {reg.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <div>
                  <p className="text-[11px] text-brand-textMuted">{reg.symbol}</p>
                  <p className="text-lg font-mono font-bold text-white mt-0.5">{reg.price}</p>
                </div>
                <p className={`text-xs font-mono font-bold ${reg.trend === 'up' ? 'text-brand-success' : 'text-brand-danger'}`}>
                  {reg.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. INTERACTIVE SECTOR HEATMAP ─────────────────────────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-base font-heading font-bold text-white">Global Sector Heatmap</h3>
            <p className="text-xs text-brand-textMuted mt-0.5">Real-time sector weight distribution & 24H performance</p>
          </div>
          <span className="text-xs font-mono font-bold text-brand-cyan">6 Active Sectors</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((sec, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all hover:scale-105 ${sec.color}`}
            >
              <p className="text-xs font-heading font-bold">{sec.name}</p>
              <p className="text-lg font-mono font-black mt-2">{sec.change}</p>
              <p className="text-[10px] opacity-70 mt-0.5">Weight: {sec.weight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. ECONOMIC CALENDAR TIMELINE ─────────────────────────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-xs font-heading font-bold text-brand-purple uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} />
            Global Economic Calendar & Central Bank Schedule
          </h3>
          <span className="text-[10px] font-mono text-brand-textMuted">Upcoming Events</span>
        </div>

        <div className="space-y-3">
          {economicEvents.map((ev, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple font-mono font-bold">
                  {ev.region}
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{ev.event}</p>
                  <p className="text-[10px] text-brand-textMuted font-mono">{ev.date}</p>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${ev.impact === 'HIGH' ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30' : 'bg-brand-warning/20 text-brand-warning border border-brand-warning/30'}`}>
                {ev.impact} IMPACT
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Modal Drawer */}
      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />

    </div>
  );
}
