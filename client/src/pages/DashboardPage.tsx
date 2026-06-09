import { useMemo, useState } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { usePortfolio } from '../hooks/usePortfolio';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, TrendingDown, ChevronRight, PieChart } from 'lucide-react';
import AssetModal from '../components/trading/AssetModal';

export default function DashboardPage() {
  const { isConnected } = useMarketData();
  const { portfolio } = usePortfolio();
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const [selectedAsset, setSelectedAsset] = useState<null | any>(null);

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

  const totalValue = portfolio?.totalValue ?? 0;
  const totalPnl = portfolio?.totalPnl ?? 0;
  const pnlClass = totalPnl >= 0 ? 'text-accent-green' : 'text-accent-red';

  return (
    <div className="pb-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px]">
        {/* Left Column: Explore */}
        <div className="space-y-8">
          
          {/* Market Indices */}
          <section>
            <h2 className="text-lg font-bold text-white mb-4">Index</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {indices.map(index => {
                const quote = quotes[index.symbol] || index;
                const isPositive = quote.changePercent >= 0;
                return (
                  <div 
                    key={index.symbol}
                    onClick={() => setSelectedAsset(quote)}
                    className="bg-dark-800 rounded-2xl p-4 border border-white/5 hover:border-white/10 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-dark-200">{quote.name}</p>
                    <p className="text-lg font-mono text-white mt-1">{formatCurrency(quote.price)}</p>
                    <p className={`text-xs mt-1 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                      {isPositive ? '+' : ''}{quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Most Bought */}
          <section>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              Most Bought on TradeOxx
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {mostBought.map(asset => {
                const quote = quotes[asset.symbol] || asset;
                const isPositive = quote.changePercent >= 0;
                return (
                  <div 
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(quote)}
                    className="min-w-[140px] bg-dark-800 rounded-2xl p-4 border border-white/5 hover:bg-dark-700 cursor-pointer transition-colors shrink-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-dark-900 border border-white/5 flex items-center justify-center text-xs font-bold text-accent-cyan mb-3">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <p className="text-sm font-medium text-white truncate">{quote.symbol}</p>
                    <p className="text-sm font-mono text-white mt-1">{formatCurrency(quote.price)}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4">Top Gainers</h2>
              <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
                {topGainers.map((asset, i) => {
                  const quote = quotes[asset.symbol] || asset;
                  return (
                    <div 
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(quote)}
                      className={`flex justify-between items-center p-4 cursor-pointer hover:bg-dark-700 transition-colors ${i !== topGainers.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{quote.symbol}</p>
                        <p className="text-xs text-dark-400 mt-0.5">{formatCurrency(quote.price)}</p>
                      </div>
                      <p className="text-sm text-accent-green">+{quote.changePercent.toFixed(2)}%</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Top Losers */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4">Top Losers</h2>
              <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
                {topLosers.map((asset, i) => {
                  const quote = quotes[asset.symbol] || asset;
                  return (
                    <div 
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(quote)}
                      className={`flex justify-between items-center p-4 cursor-pointer hover:bg-dark-700 transition-colors ${i !== topLosers.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{quote.symbol}</p>
                        <p className="text-xs text-dark-400 mt-0.5">{formatCurrency(quote.price)}</p>
                      </div>
                      <p className="text-sm text-accent-red">{quote.changePercent.toFixed(2)}%</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

        </div>

        {/* Right Column: Portfolio & Watchlist */}
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="bg-dark-800 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-dark-200">Total Investment</h2>
              <PieChart size={16} className="text-accent-cyan" />
            </div>
            
            <p className="text-3xl font-mono text-white font-semibold">{formatCurrency(totalValue)}</p>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-dark-300">Total Returns</span>
              <span className={pnlClass}>
                {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
              </span>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-accent-cyan hover:bg-accent-cyan/90 text-dark-950 font-semibold py-2.5 rounded-full transition-colors text-sm">
                Add Money
              </button>
              <button className="flex-1 bg-dark-700 hover:bg-dark-600 text-white font-semibold py-2.5 rounded-full transition-colors text-sm">
                Withdraw
              </button>
            </div>
          </div>

          {/* Quick Watchlist */}
          <div className="bg-dark-800 rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Watchlist</h2>
              <ChevronRight size={16} className="text-dark-400 cursor-pointer" />
            </div>
            <div>
              {assets.slice(0, 5).map((asset) => {
                const quote = quotes[asset.symbol] || asset;
                const isPositive = quote.changePercent >= 0;
                return (
                  <div 
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(quote)}
                    className="flex justify-between items-center p-4 hover:bg-dark-700 cursor-pointer transition-colors border-b border-white/5 last:border-none"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{quote.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-white">{formatCurrency(quote.price)}</p>
                      <p className={`text-xs mt-0.5 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
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
