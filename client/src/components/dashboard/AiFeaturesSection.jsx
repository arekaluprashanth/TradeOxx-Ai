import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Brain,
  Zap,
  Activity,
  ShieldCheck,
  Lock,
  TrendingUp,
  BarChart3,
  Search,
  Eye,
  Sliders,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Award
} from 'lucide-react';

export default function AiFeaturesSection() {
  const [activeStep, setActiveStep] = useState(0);

  // Workflow steps for Section 4
  const workflowSteps = [
    { title: "1. Data Ingestion", desc: "Aggregates multi-market ticks, order books, and global news feeds.", icon: Database },
    { title: "2. Neural Analysis", desc: "Convolutional neural nets process price action & volume spikes.", icon: Cpu },
    { title: "3. Pattern Recognition", desc: "Detects historical fractal patterns and institutional accumulation.", icon: Brain },
    { title: "4. Risk Evaluation", desc: "Computes Value-at-Risk (VaR), volatility bands, and stop levels.", icon: ShieldCheck },
    { title: "5. Confidence Scoring", desc: "Assigns probability percentage to signal accuracy.", icon: Activity },
    { title: "6. Decision Support", desc: "Delivers clear buy/sell alerts directly to user dashboard.", icon: CheckCircle2 }
  ];

  // Core feature cards for Section 3
  const featureList = [
    { icon: Brain, title: "AI Market Analysis", desc: "Continuous deep learning model scans global markets for hidden Alpha." },
    { icon: Zap, title: "Real-Time Alerts", desc: "Instant low-latency notifications on price breakouts and volume anomalies." },
    { icon: Search, title: "Pattern Recognition", desc: "Automated identification of head-and-shoulders, flags, and harmonic ratios." },
    { icon: Activity, title: "Confidence Scoring", desc: "Statistical probability score assigned to every quantitative signal." },
    { icon: ShieldCheck, title: "Risk Assessment", desc: "Automated risk-reward calculation with dynamic stop-loss recommendations." },
    { icon: BarChart3, title: "Portfolio Insights", desc: "Deep analytics on Sharpe ratio, max drawdown, and asset diversification." },
    { icon: Eye, title: "Market Sentiment", desc: "Real-time sentiment scoring from news feeds, social metrics, and liquidity." },
    { icon: Layers, title: "Multi-Market Support", desc: "Unified coverage across Stocks, Crypto, Mutual Funds, and Forex." }
  ];

  return (
    <div className="space-y-20 py-8">
      
      {/* ── SECTION 1: WHY TRADEOXX AI ───────────────────────────── */}
      <section className="relative overflow-hidden rounded-[28px] bg-brand-surface/80 border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-cyan text-xs font-heading font-bold uppercase tracking-widest">
            <Sparkles size={14} className="text-brand-cyan" />
            Why TradeOXX AI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            Trade Smarter. Decide Faster. Stay Ahead.
          </h2>
          <p className="text-base sm:text-lg text-brand-textSecondary font-normal leading-relaxed">
            TradeOXX AI accelerates market evaluation, identifies high-probability trade setups, eliminates emotional bias, and provides actionable decision support.
          </p>
        </div>

        {/* Workflow Progression Visualizer */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3 pt-6 border-t border-white/5">
          {[
            { label: "Market Data", sub: "Multi-Feed Ticks", color: "text-white" },
            { label: "AI Analysis", sub: "Neural Engine", color: "text-brand-cyan" },
            { label: "Prediction Engine", sub: "Pattern Matching", color: "text-brand-purple" },
            { label: "Confidence Score", sub: "94.8% Score", color: "text-brand-blue" },
            { label: "Decision Support", sub: "Clear Execution", color: "text-brand-success" }
          ].map((item, idx) => (
            <div key={idx} className="bg-brand-bgSecondary/90 border border-white/5 rounded-2xl p-4 text-center relative group hover:border-brand-cyan/40 transition-all">
              <span className="text-[10px] text-brand-textMuted uppercase font-mono font-bold">Step 0{idx + 1}</span>
              <p className={`text-sm font-heading font-bold ${item.color} mt-1`}>{item.label}</p>
              <p className="text-[11px] text-brand-textSecondary mt-0.5">{item.sub}</p>
              {idx < 4 && (
                <ArrowRight size={14} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/20 z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: AI INTELLIGENCE ENGINE (SIGNATURE CORE) ───── */}
      <section className="relative overflow-hidden rounded-[28px] bg-dark-950 border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/15 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-heading font-bold text-brand-purple uppercase tracking-widest">Neural Core Engine</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">The Brain Behind the Trading Desk</h2>
          <p className="text-sm text-brand-textSecondary">
            Continuously ingesting price feeds, volume spikes, and order flow metrics to deliver real-time quantitative intelligence.
          </p>
        </div>

        {/* Animated AI Glowing Core Hub */}
        <div className="relative z-10 grid gap-8 md:grid-cols-3 items-center">
          {/* Left Inward Streams */}
          <div className="space-y-4">
            <div className="bg-brand-surface/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database size={14} className="text-brand-cyan" /> Inward Feed
              </p>
              <p className="text-xs text-brand-textSecondary mt-1">Multi-exchange tick stream & order book depth</p>
            </div>
            <div className="bg-brand-surface/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Eye size={14} className="text-brand-purple" /> Sentiment Stream
              </p>
              <p className="text-xs text-brand-textSecondary mt-1">Global news sentiment & institutional flow</p>
            </div>
          </div>

          {/* Center Neural Core Visual */}
          <div className="relative flex items-center justify-center py-6">
            <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan p-1 animate-pulse-slow shadow-glow-purple">
              <div className="w-full h-full bg-dark-950 rounded-full flex flex-col items-center justify-center p-4 text-center border border-white/20">
                <Cpu size={36} className="text-brand-cyan animate-bounce" />
                <span className="text-xs font-heading font-bold text-white mt-2">NEURAL CORE</span>
                <span className="text-[10px] font-mono text-brand-success font-bold mt-0.5">ACTIVE • 99.9%</span>
              </div>
            </div>
          </div>

          {/* Right Outward Signals */}
          <div className="space-y-4">
            <div className="bg-brand-surface/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-brand-success" /> Signal Output
              </p>
              <p className="text-xs text-brand-textSecondary mt-1">Automated buy/sell trade execution tickets</p>
            </div>
            <div className="bg-brand-surface/80 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-xs font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-warning" /> Risk Shield
              </p>
              <p className="text-xs text-brand-textSecondary mt-1">Dynamic stop loss & VaR position limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CORE FEATURES GRID ─────────────────────────── */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest">Capabilities</p>
          <h2 className="text-3xl font-heading font-black text-white">Engineered For Performance</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-brand-surface/70 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 rounded-[24px] p-6 backdrop-blur-xl shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{feat.title}</h3>
                <p className="text-xs text-brand-textSecondary mt-2 leading-relaxed font-normal">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 4: WORKFLOW TIMELINE ─────────────────────────── */}
      <section className="rounded-[28px] bg-brand-surface/60 border border-white/10 p-8 sm:p-12 backdrop-blur-xl space-y-8">
        <div>
          <p className="text-xs font-heading font-bold text-brand-purple uppercase tracking-widest">Execution Protocol</p>
          <h2 className="text-3xl font-heading font-black text-white mt-1">How TradeOXX AI Analyzes Markets</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  activeStep === idx
                    ? 'bg-brand-surfaceElevated border-brand-cyan shadow-glow-cyan'
                    : 'bg-dark-900/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeStep === idx ? 'bg-brand-cyan text-dark-950 font-bold' : 'bg-white/5 text-brand-textSecondary'}`}>
                    <Icon size={16} />
                  </div>
                  <h4 className="text-sm font-heading font-bold text-white">{step.title}</h4>
                </div>
                <p className="text-xs text-brand-textSecondary mt-2 leading-normal">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: COMPETITIVE ADVANTAGES ─────────────────────── */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Traditional Manual Trading */}
        <div className="bg-dark-950/80 border border-white/5 rounded-[24px] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-brand-danger">
            <XCircle size={20} />
            <h3 className="text-lg font-heading font-bold text-white">Traditional Manual Trading</h3>
          </div>
          <ul className="space-y-3 text-xs text-brand-textSecondary">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-danger" /> Emotional panic selling during high volatility</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-danger" /> Slow manual charting across multiple screens</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-danger" /> Information overload & paralysis by analysis</li>
          </ul>
        </div>

        {/* TradeOXX AI Advantage */}
        <div className="bg-brand-surfaceElevated border border-brand-cyan/40 rounded-[24px] p-6 sm:p-8 space-y-4 shadow-glow-cyan">
          <div className="flex items-center gap-2 text-brand-success">
            <CheckCircle2 size={20} />
            <h3 className="text-lg font-heading font-bold text-white">TradeOXX AI Advantage</h3>
          </div>
          <ul className="space-y-3 text-xs text-brand-textSecondary">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-success" /> 100% Data-driven quantitative execution</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-success" /> Sub-millisecond tick scanning & pattern recognition</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-success" /> Automated Value-at-Risk & confidence scoring</li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 6 & 7: CONFIDENCE & TRANSPARENCY ──────────────── */}
      <section className="rounded-[28px] bg-gradient-to-r from-brand-surface via-brand-surfaceElevated to-brand-surface border border-white/10 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-success/15 text-brand-success text-xs font-heading font-bold">
            <ShieldCheck size={14} />
            Transparent & Secure
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">Traders Stay in 100% Control</h3>
          <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
            TradeOXX AI functions as your quantitative co-pilot. All AI signals include explicit risk ratings, confidence percentages, and historical backtests.
          </p>
        </div>

        <div className="bg-dark-950 border border-white/10 rounded-2xl p-6 text-center min-w-[220px] shadow-2xl">
          <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Model Accuracy Score</p>
          <p className="text-4xl font-mono font-black text-brand-cyan mt-1">94.8%</p>
          <p className="text-[11px] text-brand-success font-semibold mt-1">Verified Backtest Score</p>
        </div>
      </section>

    </div>
  );
}
