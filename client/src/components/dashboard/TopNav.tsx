import { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, LogOut, Settings, User, Sun, Moon, Hexagon, TrendingUp, TrendingDown, RefreshCw, BarChart2, Star, Percent } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { useMarketStore } from '../../stores/marketStore';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatCurrency } from '../../lib/utils';
import AssetModal from '../trading/AssetModal';
import ChatBot from '../ui/ChatBot';

const NAV_LINKS = [
  { path: '/', label: 'Explore' },
  { path: '/portfolio', label: 'Investments' },
  { path: '/watchlist', label: 'Watchlist' },
  { path: '/analytics', label: 'Analytics' },
];

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { notifications, theme, toggleTheme } = useUiStore();
  const { portfolio } = usePortfolio();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return assets.filter(
      (a) =>
        a.symbol.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery, assets]);

  const unreadCount = notifications?.filter((n: any) => !n.read).length || 0;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'TR';

  return (
    <header className="sticky top-0 z-40 bg-dark-900 border-b border-white/5 flex flex-col">
      {/* Top Row: Logo, Search, User Icons */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full gap-4 lg:gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <motion.img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="Logo" 
            className="w-9 h-9 rounded-full object-cover drop-shadow-lg ring-1 ring-white/10" 
            onError={(e) => { e.currentTarget.style.display='none' }}
            animate={{ 
              y: [0, -3, 0],
              scale: [1, 1.03, 1],
              filter: [
                'drop-shadow(0px 0px 0px rgba(0,208,156,0))',
                'drop-shadow(0px 4px 8px rgba(0,208,156,0.3))',
                'drop-shadow(0px 0px 0px rgba(0,208,156,0))'
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <span className="text-lg font-bold text-white hidden sm:block tracking-tight">TradeOxx Ai</span>
        </Link>

        {/* Search Bar - Center */}
        <div className="flex-1 max-w-xl relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredAssets.length > 0) {
                e.preventDefault();
                (e.target as HTMLInputElement).blur();
                setSelectedAsset(filteredAssets[0]);
                setShowSearchResults(false);
              }
            }}
            placeholder="Search stocks, crypto, mutual funds..."
            className="w-full pl-11 pr-4 py-2.5 bg-dark-800 rounded-full border border-white/5 text-sm text-white placeholder:text-dark-400 focus:outline-none focus:border-accent-cyan/50 focus:bg-dark-700 transition-all shadow-inner"
          />
          
          {/* Search Dropdown */}
          <AnimatePresence>
            {showSearchResults && searchQuery.trim() && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-dark-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <div
                        key={asset.symbol}
                        onClick={() => {
                          setSelectedAsset(asset);
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                        className="px-4 py-3 hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.5)] cursor-pointer flex items-center justify-between border-b border-white/5 last:border-none transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-dark-700 border border-white/5 flex items-center justify-center text-xs font-bold text-accent-cyan">
                            {asset.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{asset.symbol}</p>
                            <p className="text-xs text-dark-400">{asset.name}</p>
                          </div>
                        </div>
                        <p className="text-sm font-mono text-white font-medium">${asset.price.toFixed(2)}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-dark-400">
                      No matching assets found for "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <ChatBot />

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full  text-dark-200 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full  text-dark-200 hover:text-white transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-dark-800 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">Notifications</h3>
                      <span className="text-xs text-accent-cyan cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications?.length > 0 ? (
                        notifications.map((n: any, i: number) => (
                          <div key={i} className="p-4 border-b border-white/5 hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.5)] transition-all cursor-pointer">
                            <p className="text-sm text-white font-medium">{n.title || 'Alert'}</p>
                            <p className="text-xs text-dark-300 mt-1">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-dark-400 text-sm">No new notifications</div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pr-2 rounded-full border border-transparent hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.5)] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm font-bold">
                {initials}
              </div>
              <ChevronDown size={16} className="text-dark-300 hidden sm:block" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-dark-800 border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-3 border-b border-white/5 mb-2">
                      <p className="text-sm font-bold text-white">{user?.name || 'Trader'}</p>
                      <p className="text-xs text-dark-400 mt-0.5">{user?.email || 'trader@tradeoxx.ai'}</p>
                    </div>
                    <button 
                      onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-dark-200 hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.5)] transition-all"
                    >
                      <User size={16} /> Profile
                    </button>
                    <button 
                      onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-dark-200 hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.5)] transition-all"
                    >
                      <Settings size={16} /> Settings
                    </button>
                    <div className="h-px bg-white/5 my-2" />
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-accent-red hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Row: Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <nav className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className={`relative py-2 px-2 text-sm font-medium transition-all whitespace-nowrap outline-none ${
                    isActive ? 'text-accent-cyan font-bold drop-shadow-[0_0_8px_rgba(0,208,156,0.8)]' : 'text-dark-300 hover:text-accent-cyan hover:drop-shadow-[0_0_8px_rgba(0,208,156,0.6)]'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Page-Specific Custom UI Sub-Bars */}
      <div className="border-t border-white/5 bg-dark-900/60 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full py-3">
          <AnimatePresence mode="wait">
            {location.pathname === '/' && (
              <motion.div
                key="explore-bar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between text-xs overflow-hidden"
              >
                {/* Horizontal Live Quote Ticker */}
                <div className="flex items-center gap-2 text-dark-300 font-medium shrink-0 mr-4 border-r border-white/10 pr-4">
                  <RefreshCw size={12} className="animate-spin text-accent-cyan" />
                  <span>LIVE SIMULATOR</span>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...assets.slice(0, 8), ...assets.slice(0, 8)].map((asset, index) => {
                      const quote = quotes[asset.symbol] || asset;
                      const isPositive = quote.changePercent >= 0;
                      return (
                        <div key={`${asset.symbol}-${index}`} className="inline-flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setSelectedAsset(quote)}>
                          <span className="font-bold text-white">{quote.symbol}</span>
                          <span className="font-mono text-dark-100">${quote.price.toFixed(2)}</span>
                          <span className={`inline-flex items-center gap-0.5 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {isPositive ? '+' : ''}{quote.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {location.pathname === '/portfolio' && (
              <motion.div
                key="portfolio-bar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-dark-400 block mb-0.5 uppercase tracking-wider">Net Equity</span>
                    <span className="font-mono text-sm font-semibold text-white">
                      {formatCurrency(portfolio?.totalValue ?? 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-dark-400 block mb-0.5 uppercase tracking-wider">Unrealized PnL</span>
                    <span className={`font-mono text-sm font-semibold ${(portfolio?.totalPnl ?? 0) >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {(portfolio?.totalPnl ?? 0) >= 0 ? '+' : ''}{formatCurrency(portfolio?.totalPnl ?? 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-dark-400 block mb-0.5 uppercase tracking-wider">Available Cash</span>
                    <span className="font-mono text-sm font-semibold text-accent-cyan">
                      {formatCurrency(portfolio?.balance ?? 100000)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-bold tracking-wide">
                    ACTIVE PORTFOLIO
                  </span>
                </div>
              </motion.div>
            )}

            {location.pathname === '/watchlist' && (
              <motion.div
                key="watchlist-bar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-full bg-dark-700 text-white border border-white/10 hover:border-accent-cyan transition-colors">All Assets</button>
                  <button className="px-3 py-1 rounded-full bg-dark-800 text-dark-300 hover:text-white transition-colors">Stocks</button>
                  <button className="px-3 py-1 rounded-full bg-dark-800 text-dark-300 hover:text-white transition-colors">Crypto</button>
                </div>
                <div className="text-dark-400 flex items-center gap-1 font-medium">
                  <Star size={12} className="text-accent-cyan" />
                  <span>Real-time tracking of starred assets</span>
                </div>
              </motion.div>
            )}

            {location.pathname === '/analytics' && (
              <motion.div
                key="analytics-bar"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <BarChart2 size={14} className="text-accent-cyan" />
                  <span className="font-semibold text-white uppercase tracking-wider">Algo Strategy Backtester</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-dark-400">Simulation Speed:</span>
                  <span className="font-semibold text-white">Tick/2s</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />
    </header>
  );
}
