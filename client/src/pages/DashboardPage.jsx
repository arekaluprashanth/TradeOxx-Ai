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

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Explore */}
          <div className="space-y-8">
            
            {/* Market Indices Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-accent-cyan rounded-full" />
                  Global Indexes
                </h2>
                <span className="text-xs text-dark-400 font-medium">Real-time valuation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {indices.map(index => {
                  const quote = quotes[index.symbol] || index;
                  const isPositive = quote.changePercent >= 0;
                  return (
                    <div 
                      key={index.symbol}
                      onClick={() => setSelectedAsset(quote)}
                      className="bg-dark-850 hover:bg-dark-800 border border-white/5 hover:border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-300 group shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-dark-400 group-hover:text-accent-cyan transition-colors">{quote.symbol}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                          {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-lg font-mono font-bold text-white tracking-tight">{formatCurrency(quote.price)}</p>
                      <p className="text-[10px] text-dark-400 mt-1 truncate">{index.name}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Trending Marquee Ticker */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-dark-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
                  Trending on TradeOxx
                </h2>
                <span className="text-[10px] text-dark-400 font-mono">Hover to pause</span>
              </div>
              <div className="bg-dark-850 rounded-2xl border border-white/5 p-3 overflow-hidden shadow-lg relative">
                <div className="flex items-center gap-4 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer">
                  {assets.concat(assets).map((asset, idx) => {
                    const quote = quotes[asset.symbol] || asset;
                    const isPositive = quote.changePercent >= 0;
                    return (
                      <div 
                        key={`${asset.symbol}-${idx}`}
                        onClick={() => setSelectedAsset(quote)}
                        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-dark-900/80 border border-white/5 hover:border-accent-cyan/40 transition-all text-xs font-mono shrink-0"
                      >
                        <span className="font-bold text-white">{quote.symbol}</span>
                        <span className="text-dark-300">{formatCurrency(quote.price)}</span>
                        <span className={`font-bold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                          {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Performers Split Section */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Top Gainers */}
              <section>
                <h2 className="text-sm font-bold text-dark-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                  Top Gainers
                </h2>
                <div className="bg-dark-850 rounded-2xl border border-white/5 overflow-hidden shadow-lg">
                  {topGainers.map((asset, i) => {
                    const quote = quotes[asset.symbol] || asset;
                    return (
                      <div 
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(quote)}
                        className={`flex justify-between items-center p-4 cursor-pointer hover:bg-white/2 transition-colors ${i !== topGainers.length - 1 ? 'border-b border-white/5' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-green/5 border border-accent-green/10 flex items-center justify-center text-accent-green text-[10px] font-bold">
                            {quote.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{quote.symbol}</p>
                            <p className="text-xs font-mono text-dark-400">{formatCurrency(quote.price)}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-accent-green flex items-center gap-0.5">
                          <ArrowUpRight size={12} />
                          +{quote.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Top Losers */}
              <section>
                <h2 className="text-sm font-bold text-dark-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-red rounded-full" />
                  Top Losers
                </h2>
                <div className="bg-dark-850 rounded-2xl border border-white/5 overflow-hidden shadow-lg">
                  {topLosers.map((asset, i) => {
                    const quote = quotes[asset.symbol] || asset;
                    return (
                      <div 
                        key={asset.symbol}
                        onClick={() => setSelectedAsset(quote)}
                        className={`flex justify-between items-center p-4 cursor-pointer hover:bg-white/2 transition-colors ${i !== topLosers.length - 1 ? 'border-b border-white/5' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-red/5 border border-accent-red/10 flex items-center justify-center text-accent-red text-[10px] font-bold">
                            {quote.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{quote.symbol}</p>
                            <p className="text-xs font-mono text-dark-400">{formatCurrency(quote.price)}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-accent-red flex items-center gap-0.5">
                          <ArrowDownRight size={12} />
                          {quote.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

          </div>

          {/* Right Column: Portfolio & Watchlist */}
          <div className="space-y-6">
            {/* Portfolio Summary Card */}
            <div className="bg-gradient-to-b from-dark-850 to-dark-900 rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full filter blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-dark-400 uppercase tracking-widest">Balance Equity</h2>
                <PieChart size={16} className="text-accent-cyan" />
              </div>
              
              <p className="text-4xl font-black font-mono text-white tracking-tight">{formatCurrency(totalValue)}</p>
              
              <div className="flex items-center justify-between mt-4 bg-dark-950/40 rounded-xl p-3 border border-white/5">
                <span className="text-xs text-dark-300 font-semibold">Today's Returns</span>
                <span className={`text-sm font-mono font-bold ${pnlClass}`}>
                  {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
                </span>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setIsDepositOpen(true)}
                  className="flex-1 bg-accent-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] text-dark-950 font-bold py-3 rounded-full transition-all text-xs uppercase tracking-wider"
                >
                  Add Cash
                </button>
                <button 
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex-1 bg-dark-800 hover:bg-dark-750 text-white font-bold py-3 rounded-full transition-all border border-white/5 text-xs uppercase tracking-wider"
                >
                  Withdraw
                </button>
              </div>
            </div>

            {/* Quick Watchlist Card */}
            <div className="bg-dark-850 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">Watchlist Preview</h2>
                <ChevronRight size={14} className="text-dark-400 cursor-pointer hover:text-white" />
              </div>
              <div className="divide-y divide-white/5">
                {assets.slice(0, 5).map((asset) => {
                  const quote = quotes[asset.symbol] || asset;
                  const isPositive = quote.changePercent >= 0;
                  return (
                    <div 
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(quote)}
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/2 transition-all group"
                    >
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">{quote.symbol}</p>
                        <p className="text-[10px] text-dark-400 uppercase tracking-wide">{quote.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono font-bold text-white">{formatCurrency(quote.price)}</p>
                        <p className={`text-[10px] font-bold mt-0.5 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                          {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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
