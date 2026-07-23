import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  RefreshCcw
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AiMarketAnalysisEngine() {
  const [selectedAsset, setSelectedAsset] = useState('NVDA');

  const patternDetections = [
    { pattern: "Institutional Order Flow Velocity", asset: "NVDA", signal: "BULLISH", confidence: "95%", note: "Order book shows large block bids above 50 EMA" },
    { pattern: "Sector Rotation into Semiconductors", asset: "TECH SECTOR", signal: "ACCUMULATION", confidence: "92%", note: "Capital shifting from Energy into Tech" },
    { pattern: "Volatility Compression Zone", asset: "BTC", signal: "CONSOLIDATION", confidence: "88%", note: "Narrowing Bollinger Bands indicate imminent breakout" }
  ];

  return (
    <div className="space-y-8 py-6">
      
      {/* ── 1. TOP AI MARKET ANALYSIS HERO ───────────────────────── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-purple/20 via-brand-surfaceElevated to-brand-cyan/20 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-purple text-xs font-heading font-bold uppercase tracking-widest">
              <Cpu size={14} />
              Volume 4.3.2 • Quantitative Market Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              AI Pattern Recognition & Intelligence Engine
            </h2>
            <p className="text-sm text-brand-textSecondary max-w-xl">
              Real-time pattern detection, technical indicator explanations, and multi-market order flow scoring with full transparent confidence ratings.
            </p>
          </div>

          <div className="bg-dark-900/90 border border-white/10 rounded-2xl p-4 min-w-[220px] text-center shadow-xl">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Engine Confidence Score</p>
            <p className="text-3xl font-mono font-black text-brand-cyan mt-1">94.8%</p>
            <p className="text-[11px] text-brand-success font-semibold mt-0.5">High Analytical Clarity</p>
          </div>
        </div>

        {/* AI Disclaimer */}
        <div className="bg-brand-surface/60 border border-brand-cyan/20 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-brand-textSecondary">
          <Info size={16} className="text-brand-cyan shrink-0 mt-0.5" />
          <p>
            <span className="font-bold text-white">Transparency Notice:</span> Confidence scores measure analytical confidence in historical pattern explanations—not future price predictions. Financial trading carries market risk.
          </p>
        </div>
      </div>

      {/* ── 2. AUTOMATED PATTERN RECOGNITION MATRIX ────────────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-brand-cyan" />
              Detected Market Patterns & Order Flow
            </h3>
            <p className="text-xs text-brand-textMuted mt-0.5">Automated neural scanner scanning cross-market tick data</p>
          </div>
          <button 
            onClick={() => toast.success('Pattern scanner updated')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-surfaceElevated border border-white/10 text-xs text-white font-bold hover:border-brand-cyan/40 transition-all cursor-pointer"
          >
            <RefreshCcw size={14} className="text-brand-cyan" />
            Rescan Feeds
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patternDetections.map((pat, idx) => (
            <div 
              key={idx}
              className="bg-dark-950/80 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 rounded-2xl p-5 backdrop-blur-xl shadow-xl transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand-cyan">{pat.asset}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-success/15 text-brand-success border border-brand-success/30">
                  {pat.signal}
                </span>
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-white">{pat.pattern}</p>
                <p className="text-xs text-brand-textSecondary mt-1">{pat.note}</p>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-brand-textMuted">
                <span>Confidence:</span>
                <span className="font-bold text-white">{pat.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
