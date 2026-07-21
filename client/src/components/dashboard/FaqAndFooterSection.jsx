import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  Sparkles,
  Lock,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function FaqAndFooterSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [emailInput, setEmailInput] = useState('');

  // FAQ dataset
  const faqItems = [
    {
      q: "What is TradeOXX AI?",
      a: "TradeOXX AI is an enterprise quantitative simulation & analytics platform. It utilizes machine learning to process multi-market tick feeds, order flow metrics, and technical indicators to provide probabilistic decision support."
    },
    {
      q: "How does the AI generate trading insights?",
      a: "Our neural core processes high-frequency market data in sub-millisecond intervals. It compares active price action against backtested historical patterns to compute AI Confidence Scores and Value-at-Risk (VaR) estimates."
    },
    {
      q: "Does TradeOXX AI guarantee trading profits?",
      a: "No. TradeOXX AI provides decision-support tools, signal scoring, and data visualization. Trading involves inherent market risk, and our platform is designed to improve discipline and analysis rather than guarantee returns."
    },
    {
      q: "Which financial markets are supported?",
      a: "TradeOXX AI provides unified analytics across Stocks (NASDAQ, S&P 500), Crypto (BTC, ETH, Altcoins), Mutual Funds, Global Indexes (NIFTY, BANKNIFTY), and major Forex currency pairs."
    },
    {
      q: "Is TradeOXX AI suitable for beginners?",
      a: "Yes. Beginners can use our pre-built quantitative strategies, visual confidence meters, and risk indicators to learn disciplined trading without manual chart complexity."
    },
    {
      q: "How often is market analysis updated?",
      a: "Market tick feeds and order flow metrics are updated continuously in real-time with sub-millisecond network latency."
    },
    {
      q: "Can I cancel or change my subscription anytime?",
      a: "Yes. You can manage or cancel your subscription at any time directly from your Settings dashboard with zero hidden cancellation fees."
    },
    {
      q: "Does TradeOXX AI work on mobile devices?",
      a: "Absolutely. TradeOXX AI features a fully responsive, mobile-optimized interface with touch-friendly controls and fast-loading charts."
    }
  ];

  // Filter FAQs based on live search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const query = searchQuery.toLowerCase();
    return faqItems.filter(
      item => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to TradeOXX AI insights!');
    setEmailInput('');
  };

  return (
    <div className="space-y-24 py-10">
      
      {/* ── 1. FAQ SECTION ───────────────────────────────────────── */}
      <section id="faq" className="space-y-10 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-heading font-bold uppercase tracking-widest">
            <HelpCircle size={14} />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="text-sm text-brand-textSecondary">
            Everything you need to know about our quantitative engine, AI confidence metrics, and subscription plans.
          </p>

          {/* Live Search Input Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-textMuted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQ questions..."
              className="w-full pl-11 pr-4 py-3 bg-brand-surface/90 border border-white/10 rounded-input text-xs text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50 backdrop-blur-md transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Animated Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-brand-surface/70 hover:bg-brand-surfaceElevated border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-heading font-bold text-white">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan transition-transform ${isOpen ? 'rotate-180 bg-brand-cyan/15' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-6 sm:px-6 text-xs text-brand-textSecondary leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 2. FINAL GRAND CTA BANNER ───────────────────────────── */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-brand-blue/30 via-brand-purple/20 to-brand-cyan/30 border border-white/15 p-10 sm:p-16 text-center space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-heading font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} className="text-brand-cyan" />
            TradeOXX AI 2.0
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            The Future of AI-Powered Trading Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-brand-textSecondary font-normal leading-relaxed">
            TradeOXX AI provides intelligent market analysis and real-time risk evaluation, empowering you to stay in complete control of every trade decision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('charts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-btn bg-brand-gradient text-white font-heading font-bold text-sm uppercase tracking-wider shadow-glow-blue hover:scale-105 transition-all cursor-pointer"
            >
              Get Started Free
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('explore');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-btn bg-brand-surface/80 border border-white/15 text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-brand-surfaceElevated transition-all backdrop-blur-md cursor-pointer"
            >
              View Live Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. PREMIUM FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-white/10 pt-16 pb-12 space-y-12 bg-dark-950/80 rounded-[28px] p-8 sm:p-12 border">
        
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-1 ring-white/20" onError={(e) => { e.currentTarget.style.display='none' }} />
              <span className="text-xl font-heading font-black text-white tracking-tight">TradeOXX AI</span>
            </div>
            <p className="text-xs text-brand-textSecondary leading-relaxed">
              Enterprise AI Trading Platform. Combining quantitative neural order flow, sub-millisecond market feeds, and disciplined risk evaluation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-brand-textMuted">
              <a href="https://github.com/arekaluprashanth/TradeOxx-Ai" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-brand-surface hover:text-brand-cyan hover:bg-brand-surfaceElevated transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-brand-surface hover:text-brand-cyan hover:bg-brand-surfaceElevated transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-brand-surface hover:text-brand-cyan hover:bg-brand-surfaceElevated transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-brand-surface hover:text-brand-cyan hover:bg-brand-surfaceElevated transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-heading font-bold text-white uppercase tracking-wider">Product</p>
            <ul className="space-y-2 text-xs text-brand-textSecondary">
              <li><a href="#explore" className="hover:text-brand-cyan transition-colors">Explore</a></li>
              <li><a href="#charts" className="hover:text-brand-cyan transition-colors">Real-Time Charts</a></li>
              <li><a href="#portfolio" className="hover:text-brand-cyan transition-colors">Investments</a></li>
              <li><a href="#strategy" className="hover:text-brand-cyan transition-colors">Strategy Lab</a></li>
              <li><a href="#pricing" className="hover:text-brand-cyan transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-heading font-bold text-white uppercase tracking-wider">Resources</p>
            <ul className="space-y-2 text-xs text-brand-textSecondary">
              <li><a href="#faq" className="hover:text-brand-cyan transition-colors">FAQ & Help</a></li>
              <li><Link to="/settings" className="hover:text-brand-cyan transition-colors">Account Settings</Link></li>
              <li><Link to="/deposit" className="hover:text-brand-cyan transition-colors">Deposit Cash</Link></li>
              <li><Link to="/withdraw" className="hover:text-brand-cyan transition-colors">Withdraw Equity</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription Card */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-heading font-bold text-white uppercase tracking-wider">Market Insights Newsletter</p>
            <p className="text-xs text-brand-textSecondary">
              Receive weekly quantitative market reports and platform updates directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
              <input 
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 bg-brand-surface border border-white/10 rounded-input text-xs text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50 transition-all"
              />
              <button 
                type="submit"
                className="p-2.5 rounded-btn bg-brand-cyan text-dark-950 font-bold hover:shadow-glow-cyan transition-all cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-textMuted">
          <p className="max-w-2xl text-center sm:text-left leading-relaxed">
            <span className="font-bold text-brand-textSecondary">Risk Disclosure:</span> TradeOXX AI provides quantitative simulation, analytical tools, and AI decision support. Financial trading involves risk. Users maintain complete responsibility for their trades.
          </p>
          <p className="shrink-0 font-mono font-medium">
            © 2026 TradeOXX AI. All rights reserved.
          </p>
        </div>

      </footer>

    </div>
  );
}
