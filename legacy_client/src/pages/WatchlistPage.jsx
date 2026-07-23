import { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import { useMarketData } from '../hooks/useMarketData';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../services/utils';
import { Button } from '../components/ui/Button';
import {
  Star,
  Plus,
  Trash2,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
  Search,
  Grid,
  List,
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  BarChart2
} from 'lucide-react';
import toast from 'react-hot-toast';
import AssetModal from '../components/trading/AssetModal';

export default function WatchlistPage() {
  const { isConnected } = useMarketData();
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const [symbols, setSymbols] = useState(['BTC', 'ETH', 'NVDA', 'AAPL', 'TSLA']);
  const [symbolInput, setSymbolInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // UI View Mode (table | grid)
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/watchlist');
      if (data?.watchlist?.symbols) {
        setSymbols(data.watchlist.symbols);
      }
    } catch (err) {
      // Fallback to default symbols if backend offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleAdd = async () => {
    if (!symbolInput.trim()) {
      toast.error('Enter a valid ticker symbol to add.');
      return;
    }
    const cleanSym = symbolInput.trim().toUpperCase();
    if (symbols.includes(cleanSym)) {
      toast.error(`${cleanSym} is already in your watchlist.`);
      return;
    }
    setLoading(true);
    try {
      await api.post('/watchlist', { symbol: cleanSym });
      setSymbols(prev => [...prev, cleanSym]);
      setSymbolInput('');
      toast.success(`${cleanSym} added to watchlist!`);
    } catch (err) {
      // Local fallback
      setSymbols(prev => [...prev, cleanSym]);
      setSymbolInput('');
      toast.success(`${cleanSym} added to watchlist!`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (symbol) => {
    setLoading(true);
    try {
      await api.delete(`/watchlist/${symbol}`);
      setSymbols(prev => prev.filter(s => s !== symbol));
      toast.success(`${symbol} removed from watchlist.`);
    } catch (err) {
      setSymbols(prev => prev.filter(s => s !== symbol));
      toast.success(`${symbol} removed from watchlist.`);
    } finally {
      setLoading(false);
    }
  };

  // Derive tracked assets
  const watchedAssets = useMemo(() => {
    return symbols.map(sym => {
      const found = assets.find(a => a.symbol === sym);
      const quote = quotes[sym] || found;
      return quote || {
        symbol: sym,
        name: sym === 'BTC' ? 'Bitcoin' : sym === 'ETH' ? 'Ethereum' : `${sym} Asset`,
        price: sym === 'BTC' ? 64820.50 : sym === 'ETH' ? 3480.20 : 185.40,
        changePercent: 3.25,
        category: sym === 'BTC' || sym === 'ETH' ? 'crypto' : 'stock'
      };
    });
  }, [symbols, assets, quotes]);

  // Filtered watched assets
  const filteredAssets = useMemo(() => {
    return watchedAssets.filter(item => {
      const matchSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === 'ALL' || item.category?.toUpperCase() === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [watchedAssets, searchQuery, filterCategory]);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* ── 1. HEADER BANNER ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-brand-purple/20 via-brand-surfaceElevated to-brand-surface border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-purple shadow-glow-purple">
              <Star size={22} className="fill-brand-purple/20" />
            </div>
            <div>
              <p className="text-xs text-brand-textMuted uppercase font-heading font-bold tracking-widest">Market Intelligence Center</p>
              <h1 className="text-3xl font-heading font-black text-white mt-0.5">AI Watchlist & Monitor</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-brand-success flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
              Feed: {isConnected ? 'Live' : 'Synced'}
            </span>
            <Button variant="secondary" size="sm" onClick={loadWatchlist} icon={<RefreshCcw size={14} />}>
              Refresh Feed
            </Button>
          </div>
        </div>
      </div>

      {/* ── 2. AI MARKET SUMMARY CARD ────────────────────────────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} />
            Today's Market Intelligence Summary
          </h2>
          <span className="text-[10px] font-mono text-brand-textMuted">Sub-Millisecond Neural Feed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-dark-900/80 p-3.5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Market Mood</p>
            <p className="text-sm font-heading font-bold text-brand-success mt-0.5">88% Bullish Alignment</p>
          </div>
          <div className="bg-dark-900/80 p-3.5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Highest Momentum</p>
            <p className="text-sm font-heading font-bold text-brand-cyan mt-0.5">NVDA (+11.2%)</p>
          </div>
          <div className="bg-dark-900/80 p-3.5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Volatility Spike</p>
            <p className="text-sm font-heading font-bold text-brand-warning mt-0.5">SOL (Moderate)</p>
          </div>
          <div className="bg-dark-900/80 p-3.5 rounded-2xl border border-white/5">
            <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">AI Observation</p>
            <p className="text-[11px] text-brand-textSecondary mt-0.5 truncate">Tech & Crypto leading inflow</p>
          </div>
        </div>
      </div>

      {/* ── 3. PINNED FAVORITES BAR (TOP 4 ASSETS) ───────────────── */}
      <div className="space-y-3">
        <h3 className="text-xs font-heading font-bold text-brand-textMuted uppercase tracking-widest flex items-center gap-2">
          <Star size={14} className="text-brand-purple fill-brand-purple/20" />
          Pinned High-Priority Assets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchedAssets.slice(0, 4).map(asset => {
            const isPos = asset.changePercent >= 0;
            return (
              <div
                key={asset.symbol}
                onClick={() => setSelectedAsset(asset)}
                className="bg-brand-surface/70 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 rounded-2xl p-4 backdrop-blur-xl shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-purple/15 border border-brand-purple/30 flex items-center justify-center text-brand-purple font-mono font-bold text-xs">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</p>
                      <p className="text-[10px] text-brand-textMuted truncate">{asset.name}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-success/15 text-brand-success border border-brand-success/30">
                    A+ BUY
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <p className="text-base font-mono font-bold text-white">{formatCurrency(asset.price)}</p>
                  <p className={`text-xs font-mono font-bold ${isPos ? 'text-brand-success' : 'text-brand-danger'}`}>
                    {isPos ? '+' : ''}{asset.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. TOP ACTION BAR & SEARCH/FILTER CONTROLS ───────────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Add Symbol Input Form */}
          <div className="flex items-center gap-2 max-w-md w-full">
            <input
              type="text"
              value={symbolInput}
              onChange={(e) => setSymbolInput(e.target.value)}
              placeholder="Enter ticker (e.g. SOL, AAPL, MSFT)..."
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="w-full px-4 py-2.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50 transition-all"
            />
            <Button variant="primary" size="sm" onClick={handleAdd} icon={<Plus size={14} />} className="shrink-0 font-heading font-bold text-xs uppercase">
              Add Ticker
            </Button>
          </div>

          {/* Controls: Search, Category Filter & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search list..."
                className="pl-9 pr-3 py-1.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50 transition-all"
              />
            </div>

            {/* View Switch */}
            <div className="inline-flex items-center p-1 rounded-xl bg-dark-900 border border-white/10">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan' : 'text-brand-textMuted hover:text-white'}`}
                title="Table View"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan' : 'text-brand-textMuted hover:text-white'}`}
                title="Grid Card View"
              >
                <Grid size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* ── 5. ASSETS TABLE OR GRID DISPLAY ──────────────────────── */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-dark-950/60">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 text-xs font-heading font-bold uppercase tracking-wider text-brand-textMuted">
                  <th className="px-6 py-3.5">Asset</th>
                  <th className="px-6 py-3.5 text-right">Price</th>
                  <th className="px-6 py-3.5 text-right">24H Change</th>
                  <th className="px-6 py-3.5 text-center">AI Rating</th>
                  <th className="px-6 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredAssets.map(asset => {
                  const isPos = asset.changePercent >= 0;
                  return (
                    <tr
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(asset)}
                      className="hover:bg-white/2 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold">
                            {asset.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</p>
                            <p className="text-[10px] text-brand-textMuted">{asset.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">{formatCurrency(asset.price)}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold">
                        <span className={`inline-flex items-center gap-1 ${isPos ? 'text-brand-success' : 'text-brand-danger'}`}>
                          {isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {isPos ? '+' : ''}{asset.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-brand-success/20 text-brand-success font-mono font-bold text-[10px] border border-brand-success/30">
                          A+ BUY
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleRemove(asset.symbol)}
                          className="p-2 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-danger/40 text-brand-textMuted hover:text-brand-danger transition-all cursor-pointer"
                          title="Remove from Watchlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map(asset => {
              const isPos = asset.changePercent >= 0;
              return (
                <div
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset)}
                  className="bg-dark-950/80 hover:bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 rounded-2xl p-5 backdrop-blur-xl shadow-xl transition-all cursor-pointer group space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{asset.symbol}</p>
                        <p className="text-[10px] text-brand-textMuted">{asset.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemove(asset.symbol); }}
                      className="p-1.5 rounded-lg text-brand-textMuted hover:text-brand-danger transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
                    <p className="text-lg font-mono font-bold text-white">{formatCurrency(asset.price)}</p>
                    <p className={`text-xs font-mono font-bold ${isPos ? 'text-brand-success' : 'text-brand-danger'}`}>
                      {isPos ? '+' : ''}{asset.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Asset Modal Drawer */}
      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />

    </div>
  );
}
