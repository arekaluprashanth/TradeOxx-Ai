import { useMemo, useState, useEffect } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { usePortfolio } from '../hooks/usePortfolio';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../services/utils';
import {
  ChevronRight, 
  PieChart,
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  AreaChart,
  Briefcase,
  BarChart3,
  Sliders,
  Star,
} from 'lucide-react';

// Subcomponents
import AssetModal from '../components/trading/AssetModal';
import DepositModal from '../components/portfolio/DepositModal';
import WithdrawModal from '../components/portfolio/WithdrawModal';
import ChartToolbar from '../components/charts/ChartToolbar';
import ChartContainer from '../components/charts/ChartContainer';
import PortfolioPanel from '../components/portfolio/PortfolioPanel';
import TradeHistory from '../components/portfolio/TradeHistory';
import TradeForm from '../components/portfolio/TradeForm';
import StrategyBuilder from '../components/strategy/StrategyBuilder';
import BacktestResults from '../components/strategy/BacktestResults';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import WatchlistPage from './WatchlistPage';
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

  // Derive categories
  const indices = useMemo(() => assets.filter(a => a.category === 'index'), [assets]);
  
  const topGainers = useMemo(() => {
    return [...assets]
      .filter(a => a.category !== 'index')
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 4);
  }, [assets]);

  const topLosers = useMemo(() => {
    return [...assets]
      .filter(a => a.category !== 'index')
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 4);
  }, [assets]);

  const totalValue = portfolio?.totalValue || 0;
  const totalPnl = portfolio?.totalPnl || 0;
  const pnlClass = totalPnl >= 0 ? 'text-accent-green' : 'text-accent-red';

  const quoteChangeLabel = useMemo(() => {
    if (!activeQuote) return '–';
    return `${activeQuote.change >= 0 ? '+' : ''}${activeQuote.change.toFixed(2)} (${activeQuote.changePercent.toFixed(2)}%)`;
  }, [activeQuote]);

  return (
    <div className="pb-24 space-y-16 animate-fade-in">
      
      {/* ── 1. EXPLORE SECTION ───────────────────────────────────── */}
      <section id="explore" className="space-y-8 scroll-mt-24">
        {/* Top Banner Area — TradeOXX AI Volume 3.1 Hero Section */}
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

      {/* ── 2. CHARTS SECTION ───────────────────────────────────── */}
      <section id="charts" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                <AreaChart size={22} />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Charting Station</p>
                <h2 className="text-3xl font-black text-white mt-0.5">Real-time Visualization</h2>
              </div>
            </div>
            
            <div className="grid gap-3 grid-cols-3 max-w-lg w-full">
              <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Active Asset</p>
                <p className="mt-1 text-base font-black text-white font-mono">{activeSymbol}</p>
              </div>
              <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Price</p>
                <p className="mt-1 text-base font-black text-white font-mono">{activeQuote ? formatCurrency(activeQuote.price) : 'Loading...'}</p>
              </div>
              <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Change</p>
                <p className={`mt-1 text-xs font-bold font-mono truncate ${activeQuote?.change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{quoteChangeLabel}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-850 rounded-3xl p-4 sm:p-6 border border-white/5 shadow-2xl space-y-4">
          <ChartToolbar />
          <ChartContainer />
        </div>
      </section>

      {/* ── 3. INVESTMENTS / PORTFOLIO SECTION ──────────────────── */}
      <section id="portfolio" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Investments</p>
                <h2 className="text-3xl font-black text-white mt-0.5">Asset Holdings & Trade Ledger</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="lg" onClick={() => setIsDepositOpen(true)}>
                Deposit
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsWithdrawOpen(true)}>
                Withdraw
              </Button>
              <Button variant="primary" size="lg" onClick={() => setIsTradeOpen(true)} className="hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                New Trade Ticket
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <div className="bg-dark-850 rounded-3xl p-1 border border-white/5 shadow-2xl">
              <PortfolioPanel />
            </div>
            <div className="bg-dark-850 rounded-3xl p-1 border border-white/5 shadow-2xl">
              <TradeHistory />
            </div>
          </div>

          <div className="space-y-8">
            <TradeForm isOpen={isTradeOpen} onClose={() => setIsTradeOpen(false)} />
          </div>
        </div>
      </section>

      {/* ── 4. STRATEGY SECTION ─────────────────────────────────── */}
      <section id="strategy" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-dark-850 p-6 rounded-3xl border border-white/5 shadow-xl">
          <div>
            <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Quantitative Strategy Lab</p>
            <h2 className="text-3xl font-black text-white mt-0.5">Algorithmic Backtester</h2>
          </div>
          <Button variant="secondary" onClick={() => setBacktestResults(null)}>
            Reset Strategy Results
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div>
            <StrategyBuilder onRunBacktest={handleRunBacktest} />
          </div>
          <div className="rounded-3xl bg-dark-850 border border-white/5 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Backtest Performance Summary</h3>
            <BacktestResults results={backtestResults} isLoading={isBacktesting} />
          </div>
        </div>
      </section>

      {/* ── 5. WATCHLIST SECTION ────────────────────────────────── */}
      <section id="watchlist" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
        <div className="bg-dark-850 rounded-3xl border border-white/5 p-6 shadow-2xl">
          <WatchlistPage />
        </div>
      </section>

      {/* ── 6. ANALYTICS SECTION ────────────────────────────────── */}
      <section id="analytics" className="space-y-6 pt-6 border-t border-white/5 scroll-mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-green/10 via-accent-cyan/5 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-green/15 border border-accent-green/20 flex items-center justify-center text-accent-green shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <BarChart3 size={22} />
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Analytics Engine</p>
                <h2 className="text-3xl font-black text-white mt-0.5">Performance Intelligence</h2>
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
