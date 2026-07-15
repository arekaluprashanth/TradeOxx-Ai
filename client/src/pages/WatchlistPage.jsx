 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useMarketData } from '../hooks/useMarketData';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Trash2, RefreshCcw, Star, TrendingUp, TrendingDown, } from 'lucide-react';
import toast from 'react-hot-toast';
import AssetModal from '../components/trading/AssetModal';
import FuturesDesk from '../components/dashboard/FuturesDesk';

export default function WatchlistPage() {
  const { isConnected } = useMarketData();
  const [symbols, setSymbols] = useState([]);
  const [symbolInput, setSymbolInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const quotes = useMarketStore((state) => state.quotes);

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/watchlist');
      setSymbols(_optionalChain([data, 'access', _ => _.watchlist, 'optionalAccess', _2 => _2.symbols]) || []);
    } catch (err) {
      toast.error(_optionalChain([err, 'optionalAccess', _3 => _3.message]) || 'Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleAdd = async () => {
    if (!symbolInput.trim()) {
      toast.error('Enter a symbol to add');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/watchlist', {
        symbol: symbolInput.trim().toUpperCase(),
      });
      setSymbols(data.watchlist.symbols);
      setSymbolInput('');
      toast.success('Symbol added to watchlist');
    } catch (err) {
      toast.error(_optionalChain([err, 'optionalAccess', _4 => _4.message]) || 'Unable to add symbol');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (symbol) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/watchlist/${symbol}`);
      setSymbols(data.watchlist.symbols);
      toast.success('Removed from watchlist');
    } catch (err) {
      toast.error(_optionalChain([err, 'optionalAccess', _5 => _5.message]) || 'Unable to remove symbol');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-purple/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-purple/15 border border-accent-purple/20 flex items-center justify-center text-accent-purple shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <Star size={22} className="fill-accent-purple/20" />
            </div>
            <div>
              <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Watchlist</p>
              <h1 className="text-3xl font-black text-white mt-0.5">Starred Assets</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-dark-400 font-bold uppercase tracking-wider">Feed: {isConnected ? 'Live' : 'Offline'}</span>
            <Button variant="secondary" onClick={loadWatchlist} icon={<RefreshCcw size={14} />}>
              Refresh Feed
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        {/* Left Column: Watchlist Items */}
        <div className="space-y-6">
          <div className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Tracked Assets</h2>
              <span className="text-xs text-dark-400 uppercase tracking-widest font-bold">{symbols.length} symbols</span>
            </div>

            {symbols.length === 0 ? (
              <div className="rounded-2xl bg-dark-900/50 border border-white/5 p-12 text-center text-dark-400 text-sm font-medium">
                No symbols added yet. Use the sidebar to add tickers to your watchlist.
              </div>
            ) : (
              <div className="grid gap-3">
                {symbols.map((symbol) => {
                  const quote = quotes[symbol];
                  const value = quote ? formatCurrency(quote.price) : 'Loading...';
                  const isPositive = quote ? quote.change >= 0 : true;
                  const changeClass = isPositive ? 'text-accent-green bg-accent-green/5 border-accent-green/10' : 'text-accent-red bg-accent-red/5 border-accent-red/10';

                  return (
                    <div 
                      key={symbol} 
                      onClick={() => quote && setSelectedAsset({ symbol, name: symbol, price: quote.price, changePercent: quote.changePercent })}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-dark-900/60 border border-white/5 hover:border-accent-purple/35 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center font-black text-white text-xs">
                          {symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-accent-purple transition-colors">{symbol}</p>
                          <p className="text-[10px] text-dark-400 font-semibold uppercase tracking-wider">{quote ? quote.category : 'Asset'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-base font-black font-mono text-white">{value}</p>
                          {quote && (
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full border text-[10px] font-bold mt-1 ${changeClass}`}>
                              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                              {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                            </span>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          onClick={(e) => { e.stopPropagation(); handleRemove(symbol); }}
                          className="text-dark-400 hover:text-accent-red hover:bg-accent-red/5 hover:border-accent-red/10 p-2 rounded-xl border border-transparent transition-all"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Search/Add */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-white/5 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full filter blur-2xl pointer-events-none" />
            <h3 className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-4">Add Ticker</h3>
            <p className="text-sm text-dark-300 leading-relaxed mb-6">
              Enter any supported asset symbol (e.g., AAPL, BTC, ETH, TSLA) to add it to your watchlist dashboard.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                placeholder="e.g. AAPL"
                value={symbolInput}
                onChange={(e) => setSymbolInput(e.target.value)}
                className="bg-dark-950/60 border-white/5 text-sm"
              />
              <Button onClick={handleAdd} loading={loading} icon={<Plus size={15} />} className="w-full">
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <FuturesDesk />
      </div>

      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />
    </div>
  );
}
