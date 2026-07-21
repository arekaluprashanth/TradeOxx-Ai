import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Cpu,
  Activity,
  ShieldCheck,
  Zap,
  BarChart2,
  PieChart,
  Star,
  Eye,
  Clock,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';
import ChartToolbar from '../charts/ChartToolbar';
import ChartContainer from '../charts/ChartContainer';

export default function LiveDashboardPreview() {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);
  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const setActiveSymbol = useMarketStore((state) => state.setActiveSymbol);

  // Active AI Prediction selection
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('BTC');

  const selectedAsset = assets.find(a => a.symbol === selectedAssetSymbol) || assets[0] || {
    symbol: 'BTC', name: 'Bitcoin', price: 64820.50, changePercent: 4.25, change: 2640.20
  };
  const activeQuote = quotes[selectedAsset.symbol] || selectedAsset;

  // Demo AI signals list
  const liveSignals = [
    { symbol: 'BTC', action: 'BUY', confidence: 96.2, risk: 'Low', time: '2m ago', target: '+8.4%' },
    { symbol: 'ETH', action: 'BUY', confidence: 92.8, risk: 'Low', time: '5m ago', target: '+6.1%' },
    { symbol: 'NVDA', action: 'ACCUMULATE', confidence: 89.4, risk: 'Med', time: '12m ago', target: '+11.2%' },
    { symbol: 'TSLA', action: 'HOLD', confidence: 84.1, risk: 'Med', time: '18m ago', target: 'Neutral' },
  ];

  return (
    <div className="space-y-12 py-6">
      
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-heading font-bold uppercase tracking-widest">
          <Activity size={14} className="animate-pulse" />
          Volume 3.3 • Live Product Intelligence
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
          Live AI Market Command Station
        </h2>
        <p className="text-sm sm:text-base text-brand-textSecondary font-normal">
          Real-time order flow tracking, neural predictive signals, and interactive candlestick visualization in one unified environment.
        </p>
      </div>

      {/* ── TOP TICKER BAR (BTC, ETH, GOLD, NASDAQ, NIFTY) ─────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {assets.slice(0, 6).map((asset) => {
          const quote = quotes[asset.symbol] || asset;
          const isPos = quote.changePercent >= 0;
          const isSelected = selectedAsset.symbol === quote.symbol;

          return (
            <motion.div
              key={asset.symbol}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedAssetSymbol(quote.symbol);
                setActiveSymbol(quote.symbol);
              }}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-brand-surfaceElevated border-brand-cyan shadow-glow-cyan'
                  : 'bg-brand-surface/70 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">{quote.symbol}</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isPos ? 'bg-brand-success/15 text-brand-success' : 'bg-brand-danger/15 text-brand-danger'}`}>
                  {isPos ? '+' : ''}{quote.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm font-mono font-bold text-white mt-1">{formatCurrency(quote.price)}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── MAIN DASHBOARD GRID ─────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* LEFT 7 COLS: INTERACTIVE CHART & AI PREDICTION PANEL ─── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Prediction Panel Widget */}
          <div className="bg-gradient-to-r from-brand-surfaceElevated via-brand-surface to-brand-surfaceElevated border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                  <Cpu size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-white">{activeQuote.symbol} Neural Prediction Desk</h3>
                  <p className="text-xs text-brand-textMuted">AI Horizon: 24 Hours • Sub-Millisecond Analysis</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-bold px-3 py-1 rounded-full bg-brand-success/20 text-brand-success border border-brand-success/40">
                  BULLISH MOMENTUM
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-3.5">
                <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Confidence</p>
                <p className="text-lg font-mono font-bold text-brand-cyan mt-1">94.8%</p>
              </div>
              <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-3.5">
                <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Risk Index</p>
                <p className="text-lg font-mono font-bold text-brand-success mt-1">LOW (1.8/10)</p>
              </div>
              <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-3.5">
                <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Target Upside</p>
                <p className="text-lg font-mono font-bold text-brand-success mt-1">+8.4%</p>
              </div>
              <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-3.5">
                <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Stop Loss</p>
                <p className="text-lg font-mono font-bold text-brand-danger mt-1">-2.1%</p>
              </div>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <p className="text-xs text-brand-textMuted uppercase font-heading font-bold tracking-widest">Technical Charting</p>
                <h4 className="text-xl font-heading font-black text-white">{activeQuote.symbol} Candlestick Analysis</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
                <span className="text-xs font-mono font-bold text-brand-success">LIVE TICK FEED</span>
              </div>
            </div>
            <ChartToolbar />
            <ChartContainer />
          </div>
        </div>

        {/* RIGHT 4 COLS: CONFIDENCE ENGINE, SIGNALS & SENTIMENT ─────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Confidence Meter Ring */}
          <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-4 text-center">
            <h4 className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest">Market Sentiment & Confidence</h4>
            
            {/* Meter Arc */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="58" stroke="currentColor" strokeWidth="10" className="text-dark-900" fill="transparent" />
                <circle
                  cx="72" cy="72" r="58"
                  stroke="currentColor" strokeWidth="10"
                  strokeDasharray={364}
                  strokeDashoffset={364 * (1 - 0.948)}
                  strokeLinecap="round"
                  className="text-brand-cyan transition-all duration-1000 shadow-glow-cyan"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-black text-white">94.8%</span>
                <span className="text-[10px] text-brand-textMuted uppercase font-bold">Bullish Alignment</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
              <div className="bg-dark-900/60 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-brand-textMuted uppercase">Volatility</p>
                <p className="font-mono font-bold text-white">Low (14%)</p>
              </div>
              <div className="bg-dark-900/60 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-brand-textMuted uppercase">Momentum</p>
                <p className="font-mono font-bold text-brand-success">Strong (+82)</p>
              </div>
            </div>
          </div>

          {/* Recent AI Signals Queue */}
          <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} className="text-brand-cyan" />
                Recent AI Signals
              </h4>
              <span className="text-[10px] font-mono text-brand-textMuted">Auto-Updating</span>
            </div>

            <div className="space-y-3">
              {liveSignals.map((sig, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/5 hover:border-brand-cyan/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold text-xs">
                      {sig.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-heading font-bold text-white">{sig.symbol} • {sig.action}</p>
                      <p className="text-[10px] text-brand-textMuted font-mono">Conf: {sig.confidence}% • {sig.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-success">{sig.target}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
