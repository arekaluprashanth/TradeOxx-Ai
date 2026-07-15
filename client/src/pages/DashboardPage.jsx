 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useMemo, useState } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { usePortfolio } from '../hooks/usePortfolio';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../lib/utils';
import {

 
  ChevronRight, 
  PieChart,
 
  Newspaper, 
  ArrowUpRight, 
  ArrowDownRight,

  Activity,

} from 'lucide-react';
import AssetModal from '../components/trading/AssetModal';

export default function DashboardPage() {
  const { isConnected } = useMarketData();
  const { portfolio } = usePortfolio();
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const [selectedAsset, setSelectedAsset] = useState(null);

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

  const mostBought = useMemo(() => {
    return [...assets]
      .filter(a => a.category !== 'index')
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5);
  }, [assets]);

  const totalValue = _nullishCoalesce(_optionalChain([portfolio, 'optionalAccess', _ => _.totalValue]), () => ( 0));
  const totalPnl = _nullishCoalesce(_optionalChain([portfolio, 'optionalAccess', _2 => _2.totalPnl]), () => ( 0));
  const pnlClass = totalPnl >= 0 ? 'text-accent-green' : 'text-accent-red';

  // Live Simulated Market News
  const newsFeed = [
    { id: 1, source: 'Bloomberg', time: '10m ago', title: 'Tech Stocks Rally as Core Inflation Data Cools Down', sentiment: 'bullish' },
    { id: 2, source: 'Reuters', time: '45m ago', title: 'Federal Reserve Hints at Interest Rate Cuts in Q3 Meeting', sentiment: 'bullish' },
    { id: 3, source: 'CNBC', time: '2h ago', title: 'Bitcoin Hashrate Reaches All-Time High Amid Institutional Inflow', sentiment: 'neutral' }
  ];

  return (
    <div className="pb-20 space-y-8 animate-fade-in">
      {/* Top Banner Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/15 via-accent-purple/10 to-transparent border border-white/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/15 text-accent-cyan text-xs font-bold uppercase tracking-wider mb-3">
              <Activity size={12} className="animate-pulse" />
              Live Trading Sim
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Market Overview</h1>
            <p className="mt-2 text-sm text-dark-300">
              Welcome back to your quantitative dashboard. Live network feed is <span className={isConnected ? "text-accent-green font-semibold" : "text-accent-red font-semibold"}>{isConnected ? "Connected" : "Disconnected"}</span>.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-4 min-w-[120px]">
              <span className="text-xs text-dark-400 block uppercase font-bold tracking-wider">Tick Rate</span>
              <span className="text-lg font-mono font-bold text-white mt-1 block">1.0s / update</span>
            </div>
            <div className="bg-dark-900/60 border border-white/5 rounded-2xl p-4 min-w-[120px]">
              <span className="text-xs text-dark-400 block uppercase font-bold tracking-wider">Active Assets</span>
              <span className="text-lg font-mono font-bold text-white mt-1 block">{assets.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px]">
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
                    className="bg-dark-850 rounded-2xl p-4 border border-white/5 hover:border-accent-cyan/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.05)] cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-dark-200 group-hover:text-accent-cyan transition-colors">{quote.name}</p>
                      <span className={`p-1 rounded-lg ${isPositive ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </span>
                    </div>
                    <p className="text-2xl font-black font-mono text-white mt-3">{formatCurrency(quote.price)}</p>
                    <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                      {isPositive ? '+' : ''}{quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Most Bought Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3 bg-accent-purple rounded-full" />
                Trending on TradeOxx
              </h2>
              <span className="text-xs text-dark-400 font-medium">High volume movers</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {mostBought.map(asset => {
                const quote = quotes[asset.symbol] || asset;
                const isPositive = quote.changePercent >= 0;
                return (
                  <div 
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(quote)}
                    className="min-w-[160px] bg-dark-850 rounded-2xl p-5 border border-white/5 hover:border-accent-purple/30 cursor-pointer transition-all duration-300 shrink-0 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 rounded-full filter blur-xl pointer-events-none" />
                    <div className="w-10 h-10 rounded-full bg-dark-900 border border-white/5 flex items-center justify-center text-xs font-bold text-accent-cyan mb-4 group-hover:scale-110 transition-transform">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <p className="text-sm font-bold text-white truncate">{quote.symbol}</p>
                    <p className="text-xs text-dark-400 truncate mt-0.5">{quote.name}</p>
                    <p className="text-base font-mono font-bold text-white mt-3">{formatCurrency(quote.price)}</p>
                    <p className={`text-xs font-semibold mt-1 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                      {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Performers Split Section */}
          <div className="grid md:grid-cols-2 gap-6">
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

          {/* Market News Section */}
          <section className="bg-dark-850 rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Newspaper size={16} className="text-accent-cyan" />
                AI Sentiment Newsfeed
              </h3>
              <span className="text-xs text-dark-400 font-mono">Dynamic feeds</span>
            </div>
            <div className="space-y-4">
              {newsFeed.map((news) => (
                <div key={news.id} className="group cursor-pointer">
                  <div className="flex items-center gap-2 text-[10px] text-dark-400 font-bold uppercase tracking-wider">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                    <span>•</span>
                    <span className={news.sentiment === 'bullish' ? 'text-accent-green' : 'text-dark-300'}>
                      {news.sentiment}
                    </span>
                  </div>
                  <h4 className="text-sm text-dark-100 group-hover:text-white transition-colors mt-1 font-medium leading-snug">
                    {news.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>

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
              <button className="flex-1 bg-accent-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] text-dark-950 font-bold py-3 rounded-full transition-all text-xs uppercase tracking-wider">
                Add Cash
              </button>
              <button className="flex-1 bg-dark-800 hover:bg-dark-750 text-white font-bold py-3 rounded-full transition-all border border-white/5 text-xs uppercase tracking-wider">
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

      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />
    </div>
  );
}
