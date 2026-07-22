import { useMemo, useState, useEffect } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { usePortfolio } from '../hooks/usePortfolio';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../services/utils';
import {
  AreaChart,
  Briefcase,
  Sliders,
  Star,
  BarChart3,
  Sparkles,
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react';

// Volume Subcomponents & Layouts
import AssetModal from '../components/trading/AssetModal';
import DepositModal from '../components/portfolio/DepositModal';
import WithdrawModal from '../components/portfolio/WithdrawModal';
import TechnicalAnalysisWorkspace from '../components/charts/TechnicalAnalysisWorkspace';
import MultiChartWorkspace from '../components/charts/MultiChartWorkspace';
import AiPortfolioIntelligence from '../components/portfolio/AiPortfolioIntelligence';
import TradeHistory from '../components/portfolio/TradeHistory';
import TradeForm from '../components/portfolio/TradeForm';
import StrategyBuilder from '../components/strategy/StrategyBuilder';
import BacktestResults from '../components/strategy/BacktestResults';
import AiAnalyticsDashboard from '../components/analytics/AiAnalyticsDashboard';
import AiReportingCenter from '../components/dashboard/AiReportingCenter';
import WatchlistPage from './WatchlistPage';

// Volume Stations
import HeroSection from '../components/dashboard/HeroSection';
import GlobalMarketOverview from '../components/dashboard/GlobalMarketOverview';
import DashboardWidgetSystem from '../components/dashboard/DashboardWidgetSystem';
import AiFeaturesSection from '../components/dashboard/AiFeaturesSection';
import AiMarketAnalysisEngine from '../components/dashboard/AiMarketAnalysisEngine';
import LiveDashboardPreview from '../components/dashboard/LiveDashboardPreview';
import TrustAndPricingSection from '../components/dashboard/TrustAndPricingSection';
import FaqAndFooterSection from '../components/dashboard/FaqAndFooterSection';
import { Button } from '../components/ui/Button';

export default function DashboardPage() {
  const { isConnected } = useMarketData();
  const { portfolio } = usePortfolio();
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const activeQuote = quotes[activeSymbol];

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTradeOpen, setIsTradeOpen] = useState(false);

  // Strategy Backtest state
  const [backtestResults, setBacktestResults] = useState(null);
  const [isBacktesting, setIsBacktesting] = useState(false);

  // Handle URL hash auto-scroll on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRunBacktest = async (strategy) => {
    setIsBacktesting(true);
    setBacktestResults(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setBacktestResults({
      totalReturn: 28.4,
      winRate: 68.5,
      maxDrawdown: 4.2,
      sharpeRatio: 2.15,
      totalTrades: 18,
      trades: [],
      equityCurve: Array.from({ length: 25 }, (_, i) => ({ date: `Day ${i + 1}`, value: 10000 + i * 250 + Math.random() * 500 })),
    });
    setIsBacktesting(false);
  };

  const quoteChangeLabel = useMemo(() => {
    if (!activeQuote) return '–';
    return `${activeQuote.change >= 0 ? '+' : ''}${activeQuote.change.toFixed(2)} (${activeQuote.changePercent.toFixed(2)}%)`;
  }, [activeQuote]);

  return (
    <div className="pb-24 space-y-16 animate-fade-in text-white font-sans">
      
      {/* ── 1. EXPLORE SECTION (VOLUME 3.1 - VOLUME 4.3.2) ────────── */}
      <section id="explore" className="space-y-12 scroll-mt-24">
        {/* Volume 3.1 Landing Hero Section */}
        <HeroSection />

        {/* Volume 4.2.3 Global Market Intelligence Radar Station */}
        <GlobalMarketOverview />

        {/* Volume 4.2.5 Modular Responsive Dashboard Widget Station */}
        <DashboardWidgetSystem />

        {/* Volume 3.2 AI Features & Neural Core Station */}
        <AiFeaturesSection />

        {/* Volume 4.3.2 AI Market Analysis Engine Station */}
        <AiMarketAnalysisEngine />

        {/* Volume 3.3 Live Dashboard & Market Intelligence Station */}
        <LiveDashboardPreview />

        {/* Volume 3.4 Trust, Social Proof & Pricing Station */}
        <TrustAndPricingSection />

        {/* Volume 3.5 FAQ, Final CTA & Footer Station */}
        <FaqAndFooterSection />
      </section>

      {/* ── 2. CHARTS SECTION (VOLUME 1 GLASS DESIGN) ────────────── */}
      <section id="charts" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-cyan/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
                <AreaChart size={22} />
              </div>
              <div>
                <p className="text-xs text-brand-textMuted uppercase tracking-widest font-heading font-bold">Volume 1 Design • Real-Time Charting Station</p>
                <h2 className="text-3xl font-heading font-black text-white mt-0.5">Interactive Market Visualization</h2>
              </div>
            </div>
            
            <div className="grid gap-3 grid-cols-3 max-w-lg w-full">
              <div className="rounded-2xl bg-dark-900/80 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-heading font-bold tracking-wider text-brand-textMuted">Active Asset</p>
                <p className="mt-1 text-base font-black text-white font-mono">{activeSymbol}</p>
              </div>
              <div className="rounded-2xl bg-dark-900/80 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-heading font-bold tracking-wider text-brand-textMuted">Spot Price</p>
                <p className="mt-1 text-base font-black text-white font-mono">{activeQuote ? formatCurrency(activeQuote.price) : 'Loading...'}</p>
              </div>
              <div className="rounded-2xl bg-dark-900/80 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-heading font-bold tracking-wider text-brand-textMuted">24H Change</p>
                <p className={`mt-1 text-xs font-bold font-mono truncate ${activeQuote?.change >= 0 ? 'text-brand-success' : 'text-brand-danger'}`}>{quoteChangeLabel}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-surface/90 rounded-[32px] p-4 sm:p-6 border border-white/10 shadow-2xl backdrop-blur-xl">
          <TechnicalAnalysisWorkspace symbol={activeSymbol} />
        </div>
        
        <div className="pt-8">
          <h2 className="text-2xl font-heading font-black text-white mb-6">Multi-Chart Research Grid</h2>
          <MultiChartWorkspace />
        </div>
      </section>

      {/* ── 3. INVESTMENTS / PORTFOLIO SECTION (VOLUME 4.2.1) ────── */}
      <section id="portfolio" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-purple/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-purple shadow-glow-purple">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-xs text-brand-textMuted uppercase tracking-widest font-heading font-bold">Volume 4.2.1 Portfolio Command Center</p>
                <h2 className="text-3xl font-heading font-black text-white mt-0.5">Asset Holdings & Health Radar</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setIsDepositOpen(true)} className="px-5 py-2.5 rounded-xl bg-brand-surfaceElevated border border-white/15 hover:border-brand-cyan/40 text-xs font-heading font-bold text-white transition-all cursor-pointer">
                Deposit Cash
              </button>
              <button onClick={() => setIsWithdrawOpen(true)} className="px-5 py-2.5 rounded-xl bg-brand-surfaceElevated border border-white/15 hover:border-brand-cyan/40 text-xs font-heading font-bold text-white transition-all cursor-pointer">
                Withdraw Equity
              </button>
              <button onClick={() => setIsTradeOpen(true)} className="px-5 py-2.5 rounded-xl bg-brand-gradient text-white text-xs font-heading font-bold uppercase tracking-wider shadow-glow-blue transition-all cursor-pointer">
                New Trade Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <AiPortfolioIntelligence />
            <div className="bg-brand-surface/90 rounded-[28px] p-6 border border-white/10 shadow-2xl backdrop-blur-xl">
              <TradeHistory />
            </div>
          </div>

          <div className="space-y-8">
            <TradeForm isOpen={isTradeOpen} onClose={() => setIsTradeOpen(false)} />
          </div>
        </div>
      </section>

      {/* ── 4. STRATEGY SECTION (VOLUME 1 DESIGN SYSTEM) ─────────── */}
      <section id="strategy" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-brand-surface/90 p-6 rounded-[28px] border border-white/10 backdrop-blur-xl shadow-2xl">
          <div>
            <p className="text-xs text-brand-textMuted uppercase tracking-widest font-heading font-bold">Quantitative Strategy Lab</p>
            <h2 className="text-3xl font-heading font-black text-white mt-0.5">Algorithmic Backtester</h2>
          </div>
          <Button variant="secondary" onClick={() => setBacktestResults(null)}>
            Reset Strategy Results
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div>
            <StrategyBuilder onRunBacktest={handleRunBacktest} />
          </div>
          <div className="rounded-[28px] bg-brand-surface/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Backtest Performance Summary</h3>
            <BacktestResults results={backtestResults} isLoading={isBacktesting} />
          </div>
        </div>
      </section>

      {/* ── 5. WATCHLIST SECTION (VOLUME 4.2.2) ─────────────────── */}
      <section id="watchlist" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <WatchlistPage />
      </section>

      {/* ── 6. INTELLIGENCE REPORTS (VOLUME 4.3.5) ──────────────── */}
      <section id="reports" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <AiReportingCenter />
      </section>

      {/* ── 7. ANALYTICS SECTION (VOLUME 1 DESIGN SYSTEM) ────────── */}
      <section id="analytics" className="space-y-6 pt-10 border-t border-white/10 scroll-mt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-success/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-success/20 border border-brand-success/30 flex items-center justify-center text-brand-success shadow-glow-green">
                <BarChart3 size={22} />
              </div>
              <div>
                <p className="text-xs text-brand-textMuted uppercase tracking-widest font-heading font-bold">Analytics Engine</p>
                <h2 className="text-3xl font-heading font-black text-white mt-0.5">Performance Intelligence</h2>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-dark-900/80 border border-white/5 rounded-2xl px-4 py-2.5 min-w-[120px]">
                <span className="text-[10px] text-brand-textMuted block uppercase font-heading font-bold tracking-wider">Alpha Score</span>
                <span className="text-sm font-mono font-bold text-brand-success mt-0.5 block">+1.24%</span>
              </div>
              <div className="bg-dark-900/80 border border-white/5 rounded-2xl px-4 py-2.5 min-w-[120px]">
                <span className="text-[10px] text-brand-textMuted block uppercase font-heading font-bold tracking-wider">Sharpe Ratio</span>
                <span className="text-sm font-mono font-bold text-brand-cyan mt-0.5 block">2.35</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-surface/90 rounded-[28px] border border-white/10 p-4 shadow-2xl backdrop-blur-xl">
          <AnalyticsDashboard />
        </div>
      </section>

      {/* ── MODALS ──────────────────────────────────────────────── */}
      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
}
