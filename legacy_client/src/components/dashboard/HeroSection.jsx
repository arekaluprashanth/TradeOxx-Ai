import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity, 
  TrendingUp, 
  BarChart2, 
  Layers
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';

export default function HeroSection({ onLaunchAi, onWatchDemo }) {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);
  
  // Active demo ticker
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const activeAsset = assets[activeAssetIndex] || { symbol: 'BTC', name: 'Bitcoin', price: 64820.50, changePercent: 4.25 };
  const currentQuote = quotes[activeAsset.symbol] || activeAsset;

  // Cycle demo ticker every 4s
  useEffect(() => {
    if (assets.length === 0) return;
    const interval = setInterval(() => {
      setActiveAssetIndex((prev) => (prev + 1) % Math.min(assets.length, 6));
    }, 4000);
    return () => clearInterval(interval);
  }, [assets]);

  // Subtle Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Headline words for staggered reveal
  const headlineText = "The Future of Intelligent Trading.";
  const headlineWords = headlineText.split(" ");

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-[28px] bg-dark-950 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300"
    >
      {/* Animated Mesh Aurora Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-blue/20 rounded-full filter blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-purple/15 rounded-full filter blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-cyan/20 rounded-full filter blur-[100px] animate-pulse-slow" />
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-12 items-center">
        
        {/* ── LEFT COLUMN: VALUE PROPOSITION ─────────────────────── */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* AI Confidence Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-surfaceElevated/90 border border-brand-cyan/30 shadow-glow-cyan"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
            <Sparkles size={14} className="text-brand-cyan" />
            <span className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest">
              TradeOXX AI 2.0 • Autonomous Quant Engine
            </span>
          </motion.div>

          {/* Staggered Word-by-Word Space Grotesk Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.1] text-balance">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 + 0.1 }}
                className={word === 'Intelligent' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-blue inline-block mr-3' : 'inline-block mr-3'}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Supporting Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-brand-textSecondary max-w-xl font-normal leading-relaxed"
          >
            Empowering professional traders with real-time neural order flow, predictive market intelligence, and institutional-grade algorithmic execution.
          </motion.p>

          {/* CTA Action Button Group */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onLaunchAi || (() => {
                const el = document.getElementById('charts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              })}
              className="relative group px-7 py-4 rounded-btn bg-brand-gradient text-white font-heading font-bold text-sm tracking-wider uppercase shadow-glow-blue overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch AI Engine
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onWatchDemo || (() => {
                const el = document.getElementById('strategy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              })}
              className="px-6 py-4 rounded-btn bg-brand-surface/80 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 text-white font-heading font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                <Play size={12} className="ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust Badges Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-brand-cyan shrink-0" />
              <span className="text-xs font-semibold text-brand-textSecondary">AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-success shrink-0" />
              <span className="text-xs font-semibold text-brand-textSecondary">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-brand-warning shrink-0" />
              <span className="text-xs font-semibold text-brand-textSecondary">Real-Time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand-purple shrink-0" />
              <span className="text-xs font-semibold text-brand-textSecondary">Fast Insights</span>
            </div>
          </motion.div>

          {/* Statistics Counter Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-4 pt-2"
          >
            <div className="bg-brand-surface/60 border border-white/5 rounded-2xl p-3.5">
              <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Sim Volume</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-white mt-0.5">$2.4B+</p>
            </div>
            <div className="bg-brand-surface/60 border border-white/5 rounded-2xl p-3.5">
              <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Tick Latency</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-brand-cyan mt-0.5">&lt; 1.0ms</p>
            </div>
            <div className="bg-brand-surface/60 border border-white/5 rounded-2xl p-3.5">
              <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold tracking-widest">Signal Score</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-brand-success mt-0.5">94.8%</p>
            </div>
          </motion.div>

        </div>

        {/* ── RIGHT COLUMN: INTERACTIVE AI COMMAND CENTER ─────────── */}
        <div className="lg:col-span-5 relative perspective-1000">
          <motion.div
            style={{ rotateX, rotateY }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative rounded-[24px] bg-brand-surface/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl space-y-6 overflow-hidden"
          >
            {/* Header HUD */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white">{currentQuote.symbol} / USD</p>
                  <p className="text-[10px] text-brand-textMuted uppercase tracking-wider font-semibold">Neural Model HUD</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-mono font-bold text-white">{formatCurrency(currentQuote.price)}</p>
                <p className={`text-xs font-mono font-bold ${currentQuote.changePercent >= 0 ? 'text-brand-success' : 'text-brand-danger'}`}>
                  {currentQuote.changePercent >= 0 ? '+' : ''}{currentQuote.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* AI Confidence Meter Widget */}
            <div className="bg-brand-bgSecondary/80 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-brand-textSecondary uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu size={14} className="text-brand-cyan" />
                  AI Model Confidence
                </span>
                <span className="font-mono font-bold text-brand-cyan">94.8%</span>
              </div>
              {/* Progress Ring / Bar */}
              <div className="w-full h-2.5 bg-dark-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '94.8%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan rounded-full shadow-glow-cyan"
                />
              </div>
              <p className="text-[11px] text-brand-textMuted font-medium leading-normal">
                Order flow momentum confirms bullish breakout probability. Target: +8.4% upside.
              </p>
            </div>

            {/* Mini Sparkline Chart Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading font-bold text-white">Live Execution Sparkline</span>
                <span className="text-[10px] font-mono text-brand-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-ping" />
                  HIGH LIQUIDITY
                </span>
              </div>
              <div className="h-28 w-full bg-dark-900/60 rounded-2xl border border-white/5 p-2 relative flex items-end justify-between gap-1 overflow-hidden">
                {[45, 52, 48, 65, 58, 72, 68, 85, 92, 88, 96, 100].map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.04 }}
                    className="flex-1 bg-gradient-to-t from-brand-cyan/20 to-brand-cyan rounded-t-sm hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Floating Order Execution Signal Card */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-brand-surfaceElevated/90 border border-brand-purple/40 rounded-2xl p-3.5 shadow-glow-purple flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-xs font-heading font-bold text-white">BUY SIGNAL GENERATED</p>
                  <p className="text-[10px] font-mono text-brand-textMuted">Confidence: 96.2% • Vol: High</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-success/20 text-brand-success border border-brand-success/30">
                ACTIVE
              </span>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
