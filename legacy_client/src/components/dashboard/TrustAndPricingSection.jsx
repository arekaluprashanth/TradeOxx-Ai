import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Zap,
  CheckCircle2,
  Users,
  Award,
  Star,
  Play,
  ArrowRight,
  Sparkles,
  Check,
  HelpCircle,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Button } from '../ui/Button';

export default function TrustAndPricingSection() {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Realistic testimonials dataset
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Senior Equity Trader",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      story: "TradeOXX AI completely changed how I evaluate order flow. The sub-millisecond tick analysis catches volume anomalies 10-15 minutes before news hits mainstream channels.",
      highlight: "Saved 12+ hours of manual charting per week."
    },
    {
      name: "Elena Rostova",
      role: "Crypto Portfolio Manager",
      country: "Switzerland",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      story: "The confidence scoring system is remarkably accurate. Rather than relying on gut feeling, I now have verifiable backtested odds for every position I enter.",
      highlight: "Sharpe Ratio increased by +1.4."
    },
    {
      name: "David Chen",
      role: "Quantitative Analyst",
      country: "Singapore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      story: "As a developer, I appreciate the transparency of TradeOXX AI. It doesn't promise magic; it provides probabilistic decision support backed by high-frequency data.",
      highlight: "100% disciplined, emotion-free trading."
    }
  ];

  // Auto rotate testimonials every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="space-y-24 py-10">
      
      {/* ── 1. TRUST INDICATORS & COMMUNITY STATS ───────────────── */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-success/15 border border-brand-success/30 text-brand-success text-xs font-heading font-bold uppercase tracking-widest">
            <ShieldCheck size={14} />
            Institutional Grade Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
            Trusted by Modern Traders Worldwide
          </h2>
          <p className="text-sm text-brand-textSecondary">
            Engineered with strict zero-knowledge security, low-latency API connections, and transparent machine learning metrics.
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "48,000+", label: "Active Traders", sub: "Global Community" },
            { value: "$2.4B+", label: "Simulated Volume", sub: "Processed Monthly" },
            { value: "< 1.0ms", label: "Tick Execution", sub: "Ultra Low Latency" },
            { value: "94.8%", label: "Signal Accuracy", sub: "Verified Backtests" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-brand-surface/70 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl shadow-xl">
              <p className="text-2xl sm:text-3xl font-mono font-black text-white">{stat.value}</p>
              <p className="text-xs font-heading font-bold text-brand-cyan mt-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-[10px] text-brand-textMuted mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. CUSTOMER SUCCESS STORIES & TESTIMONIALS ────────────── */}
      <section className="rounded-[28px] bg-brand-surface/80 border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <p className="text-xs font-heading font-bold text-brand-purple uppercase tracking-widest">User Proof</p>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">What Traders Are Saying</h3>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-2 rounded-xl bg-dark-900 border border-white/10 text-white hover:text-brand-cyan transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-xl bg-dark-900 border border-white/10 text-white hover:text-brand-cyan transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-4 flex flex-col items-center text-center sm:text-left sm:items-start gap-4">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].name} 
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-cyan/40 shadow-glow-cyan"
              />
              <div>
                <h4 className="text-lg font-heading font-bold text-white">{testimonials[activeTestimonial].name}</h4>
                <p className="text-xs text-brand-cyan font-medium">{testimonials[activeTestimonial].role}</p>
                <p className="text-[10px] text-brand-textMuted font-mono mt-0.5">{testimonials[activeTestimonial].country}</p>
                <div className="flex items-center gap-1 mt-2 text-brand-warning">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <p className="text-base sm:text-lg text-white font-normal leading-relaxed italic">
                "{testimonials[activeTestimonial].story}"
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold">
                <Sparkles size={14} />
                Impact: {testimonials[activeTestimonial].highlight}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── 3. FEATURE COMPARISON TABLE ───────────────────────────── */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest">Comparison</p>
          <h3 className="text-3xl font-heading font-black text-white">Why Upgrade to TradeOXX AI</h3>
        </div>

        <div className="overflow-x-auto rounded-[24px] border border-white/10 bg-brand-surface/60 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark-900/80 text-xs font-heading font-bold uppercase tracking-wider text-brand-textMuted">
                <th className="p-4 sm:p-6">Feature Capability</th>
                <th className="p-4 sm:p-6 text-brand-textMuted">Traditional Analysis</th>
                <th className="p-4 sm:p-6 text-brand-cyan">TradeOXX AI Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {[
                { feat: "Order Flow Neural Scan", trad: "Manual (Hours)", ai: "Sub-Millisecond (<1.0ms)" },
                { feat: "Signal Confidence Rating", trad: "Subjective Guessing", ai: "Verifiable Probabilistic Score" },
                { feat: "Risk-Reward Calculation", trad: "Mental Estimation", ai: "Automated Value-at-Risk (VaR)" },
                { feat: "Pattern Recognition", trad: "Manual Drawing", ai: "Automated AI Fractals & Harmonic" },
                { feat: "Emotional Bias Control", trad: "High Vulnerability", ai: "100% Quantitative Discipline" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-white/2 transition-colors">
                  <td className="p-4 sm:p-6 font-heading font-bold text-white">{row.feat}</td>
                  <td className="p-4 sm:p-6 text-brand-textMuted font-mono">{row.trad}</td>
                  <td className="p-4 sm:p-6 text-brand-cyan font-mono font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-success" />
                    {row.ai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. PRICING PLANS ──────────────────────────────────────── */}
      <section id="pricing" className="space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/15 border border-brand-purple/30 text-brand-purple text-xs font-heading font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Predictable Plans for Every Trader
          </h2>
          <p className="text-sm text-brand-textSecondary">
            No hidden commissions, no surprise fees. Cancel or switch plans anytime.
          </p>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-dark-900 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan' : 'text-brand-textSecondary hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan' : 'text-brand-textSecondary hover:text-white'
              }`}
            >
              Yearly Billing
              <span className="px-2 py-0.5 rounded-full bg-brand-success text-dark-950 text-[10px] font-mono font-bold uppercase">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* Starter Plan */}
          <div className="bg-brand-surface/70 border border-white/10 rounded-[28px] p-8 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">Starter</h3>
                <p className="text-xs text-brand-textMuted mt-1">Ideal for beginners learning quantitative strategies.</p>
              </div>

              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">{billingCycle === 'yearly' ? '$29' : '$36'}</span>
                <span className="text-xs text-brand-textMuted">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-brand-textSecondary border-t border-white/5 pt-6">
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan" /> Basic Neural Market Signals</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan" /> 5 Active Watchlists</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan" /> Real-time Simulator Desk</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan" /> Standard Chart Indicators</li>
              </ul>
            </div>

            <Button variant="outline" className="w-full mt-8 rounded-btn font-heading font-bold text-xs uppercase tracking-wider">
              Get Started Free
            </Button>
          </div>

          {/* Professional Plan (Highlighted Popular) */}
          <div className="relative bg-gradient-to-b from-brand-surfaceElevated via-brand-surface to-brand-surfaceElevated border-2 border-brand-cyan rounded-[28px] p-8 flex flex-col justify-between shadow-glow-cyan backdrop-blur-xl transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-cyan text-dark-950 text-[10px] font-heading font-black uppercase tracking-widest shadow-lg">
              MOST POPULAR FOR TRADERS
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  Professional <Sparkles size={16} className="text-brand-cyan" />
                </h3>
                <p className="text-xs text-brand-textMuted mt-1">Full quantitative power for active day & swing traders.</p>
              </div>

              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">{billingCycle === 'yearly' ? '$79' : '$99'}</span>
                <span className="text-xs text-brand-textMuted">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-white border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan font-bold" /> Everything in Starter</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan font-bold" /> Sub-1ms Order Flow Neural Scan</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan font-bold" /> AI Confidence & Risk Gauges</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan font-bold" /> Backtest Strategy Builder</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-cyan font-bold" /> Unlimited Multi-Asset Watchlists</li>
              </ul>
            </div>

            <Button variant="primary" className="w-full mt-8 rounded-btn font-heading font-bold text-xs uppercase tracking-wider shadow-glow-blue">
              Launch Pro Engine
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-brand-surface/70 border border-white/10 rounded-[28px] p-8 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">Enterprise</h3>
                <p className="text-xs text-brand-textMuted mt-1">Institutional infrastructure for hedge funds & prop desks.</p>
              </div>

              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-black text-white">{billingCycle === 'yearly' ? '$199' : '$249'}</span>
                <span className="text-xs text-brand-textMuted">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-brand-textSecondary border-t border-white/5 pt-6">
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-purple" /> Everything in Professional</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-purple" /> Direct Low-Latency API Access</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-purple" /> Custom Strategy Scripting</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-brand-purple" /> 24/7 Dedicated Quant Support</li>
              </ul>
            </div>

            <Button variant="secondary" className="w-full mt-8 rounded-btn font-heading font-bold text-xs uppercase tracking-wider">
              Contact Enterprise Desk
            </Button>
          </div>

        </div>
      </section>

      {/* ── 5. FINAL GRAND CTA BANNER ───────────────────────────── */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-blue/30 via-brand-purple/20 to-brand-cyan/30 border border-white/15 p-10 sm:p-16 text-center space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Ready to Experience Intelligent Trading?
          </h2>
          <p className="text-sm sm:text-base text-brand-textSecondary">
            Join over 48,000 traders making smarter, data-backed decisions with TradeOXX AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('charts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-btn bg-brand-gradient text-white font-heading font-bold text-sm uppercase tracking-wider shadow-glow-blue hover:scale-105 transition-all cursor-pointer"
            >
              Launch AI Terminal Free
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('strategy');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-btn bg-brand-surface/80 border border-white/15 text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-brand-surfaceElevated transition-all backdrop-blur-md cursor-pointer"
            >
              Explore Backtest Lab
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
