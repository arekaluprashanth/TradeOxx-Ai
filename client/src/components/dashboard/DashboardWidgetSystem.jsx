import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  Sliders,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCcw,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Star,
  Activity,
  Calendar,
  Globe,
  GripVertical,
  Plus,
  X
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';
import toast from 'react-hot-toast';

export default function DashboardWidgetSystem() {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  // Widget visibility state
  const [widgets, setWidgets] = useState([
    { id: 'portfolio', name: 'Portfolio Summary', visible: true, size: 'col-span-12 lg:col-span-6', icon: Wallet },
    { id: 'market', name: 'Market Pulse & Indices', visible: true, size: 'col-span-12 lg:col-span-6', icon: Globe },
    { id: 'ai_insights', name: 'Apexx AI Signal Observations', visible: true, size: 'col-span-12 lg:col-span-8', icon: Sparkles },
    { id: 'risk', name: 'Risk Architecture & VaR', visible: true, size: 'col-span-12 lg:col-span-4', icon: ShieldCheck },
    { id: 'watchlist', name: 'Starred Watchlist Radar', visible: true, size: 'col-span-12 lg:col-span-7', icon: Star },
    { id: 'calendar', name: 'Economic Calendar Schedule', visible: true, size: 'col-span-12 lg:col-span-5', icon: Calendar }
  ]);

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [maximizedWidget, setMaximizedWidget] = useState(null);

  const toggleWidgetVisibility = (id) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
    toast.success('Dashboard layout updated');
  };

  const resetLayout = () => {
    setWidgets(prev => prev.map(w => ({ ...w, visible: true })));
    toast.success('Dashboard layout reset to default');
  };

  return (
    <div className="space-y-6">
      
      {/* Widget Control Bar */}
      <div className="flex items-center justify-between bg-brand-surface/80 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Grid size={16} className="text-brand-cyan" />
          <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">Modular Widget Workspace</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 text-xs font-heading font-bold text-white transition-all cursor-pointer"
          >
            <Sliders size={14} className="text-brand-cyan" />
            Customize Widgets
          </button>
          <button
            onClick={resetLayout}
            className="p-1.5 rounded-xl bg-white/5 text-brand-textMuted hover:text-white transition-all cursor-pointer"
            title="Reset Layout"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Customize Drawer Modal */}
      <AnimatePresence>
        {isCustomizeOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-900/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Widget Visibility & Arrangement</h4>
              <button onClick={() => setIsCustomizeOpen(false)} className="text-brand-textMuted hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {widgets.map(w => (
                <button
                  key={w.id}
                  onClick={() => toggleWidgetVisibility(w.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${w.visible ? 'bg-brand-cyan/15 border-brand-cyan/40 text-brand-cyan font-bold' : 'bg-dark-950/60 border-white/5 text-brand-textMuted'}`}
                >
                  <span className="truncate">{w.name}</span>
                  {w.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12-Column Responsive Grid */}
      <div className="grid grid-cols-12 gap-6">
        {widgets.filter(w => w.visible).map(w => {
          const Icon = w.icon;
          return (
            <motion.div
              key={w.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${w.size} bg-brand-surface/70 hover:bg-brand-surfaceElevated border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-4 flex flex-col justify-between`}
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-white">{w.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-brand-textMuted">
                  <button 
                    onClick={() => toast.success(`${w.name} refreshed`)} 
                    className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all"
                    title="Refresh Data"
                  >
                    <RefreshCcw size={13} />
                  </button>
                  <button 
                    onClick={() => toggleWidgetVisibility(w.id)} 
                    className="p-1.5 rounded-lg hover:bg-white/5 hover:text-brand-danger transition-all"
                    title="Hide Widget"
                  >
                    <EyeOff size={13} />
                  </button>
                </div>
              </div>

              {/* Widget Content Body */}
              <div className="text-xs space-y-3">
                {w.id === 'portfolio' && (
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-brand-textMuted">Net Liquidation Value</span>
                      <span className="text-xl font-mono font-bold text-brand-cyan">$150,000.00</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5">
                        <span className="text-brand-textMuted block">Unrealized P/L</span>
                        <span className="text-brand-success font-bold">+$12,450.00 (+9.04%)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5">
                        <span className="text-brand-textMuted block">Available Buying Power</span>
                        <span className="text-brand-purple font-bold">$50,000.00</span>
                      </div>
                    </div>
                  </div>
                )}

                {w.id === 'market' && (
                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                    <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5">
                      <span className="text-brand-textMuted block">S&P 500</span>
                      <span className="text-brand-success font-bold">5,450.20 (+1.25%)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5">
                      <span className="text-brand-textMuted block">NASDAQ</span>
                      <span className="text-brand-success font-bold">17,890.40 (+1.85%)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5">
                      <span className="text-brand-textMuted block">NIFTY 50</span>
                      <span className="text-brand-success font-bold">24,520.80 (+0.85%)</span>
                    </div>
                  </div>
                )}

                {w.id === 'ai_insights' && (
                  <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-cyan/20 space-y-2">
                    <p className="font-heading font-bold text-white">Institutional Tech Capital Acceleration</p>
                    <p className="text-[11px] text-brand-textSecondary leading-relaxed">
                      Sub-millisecond order flow data confirms high-volume buy orders entering AI infrastructure stocks. Volatility risk remains constrained.
                    </p>
                  </div>
                )}

                {w.id === 'risk' && (
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between p-2 rounded-xl bg-dark-900/80 border border-white/5">
                      <span className="text-brand-textMuted">Value at Risk (95% VaR)</span>
                      <span className="text-brand-success font-bold">$1,850 / Day</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-dark-900/80 border border-white/5">
                      <span className="text-brand-textMuted">Beta Sensitivity</span>
                      <span className="text-brand-cyan font-bold">0.84 (Conservative)</span>
                    </div>
                  </div>
                )}

                {w.id === 'watchlist' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    {['NVDA $128.40 (+4.2%)', 'BTC $64,820 (+3.2%)', 'AAPL $224.50 (+1.1%)', 'ETH $3,480 (+2.8%)'].map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5 font-bold text-brand-success text-center">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {w.id === 'calendar' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-dark-900/80 border border-white/5 flex justify-between">
                      <span className="font-bold text-white">FOMC Rate Decision</span>
                      <span className="font-mono text-brand-danger font-bold">TODAY 18:30 GMT</span>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
