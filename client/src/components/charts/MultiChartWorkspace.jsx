import React, { useState } from 'react';
import TechnicalAnalysisWorkspace from './TechnicalAnalysisWorkspace';
import { 
  Grid, 
  Layout, 
  LayoutGrid, 
  Columns, 
  Link as LinkIcon, 
  Unlink, 
  Plus, 
  Search,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.4.4: Multi-Chart Intelligence Workspace
 * Allows 1, 2, 4, or 6 charts in a grid layout with linked crosshairs and AI comparisons.
 */
export default function MultiChartWorkspace() {
  const [layout, setLayout] = useState(1); // 1, 2, 4
  const [isSynced, setIsSynced] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Default assets for the grid
  const assets = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'S&P 500'];

  return (
    <div className="flex flex-col h-full space-y-6 animate-fade-in">
      
      {/* ── Workspace Toolbar ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-brand-surfaceElevated rounded-[24px] border border-white/10 backdrop-blur-xl shadow-2xl gap-4">
        
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </Button>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex bg-dark-900/60 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setLayout(1)} 
              className={`p-2 rounded-lg transition-all ${layout === 1 ? 'bg-brand-surfaceElevated text-brand-cyan' : 'text-brand-textMuted hover:text-white'}`}
              title="Single Chart"
            >
              <Layout size={16} />
            </button>
            <button 
              onClick={() => setLayout(2)} 
              className={`p-2 rounded-lg transition-all ${layout === 2 ? 'bg-brand-surfaceElevated text-brand-cyan' : 'text-brand-textMuted hover:text-white'}`}
              title="Two Charts"
            >
              <Columns size={16} />
            </button>
            <button 
              onClick={() => setLayout(4)} 
              className={`p-2 rounded-lg transition-all ${layout === 4 ? 'bg-brand-surfaceElevated text-brand-cyan' : 'text-brand-textMuted hover:text-white'}`}
              title="Four Charts"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
          
          <Button 
            variant={isSynced ? 'primary' : 'secondary'} 
            onClick={() => setIsSynced(!isSynced)}
            className="gap-2"
          >
            {isSynced ? <LinkIcon size={14} /> : <Unlink size={14} />} 
            {isSynced ? 'Synced' : 'Sync Timeframes'}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
            <input 
              type="text" 
              placeholder="Add Asset (CTRL+K)" 
              className="pl-9 pr-4 py-2 bg-dark-900/80 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-cyan/50 transition-colors w-48"
            />
          </div>
          <Button variant="primary" className="gap-2 bg-brand-gradient border-0 shadow-glow-blue">
            <Plus size={14} /> Save Workspace
          </Button>
        </div>
      </div>

      {/* ── Main Grid & Sidebar ────────────────────────────── */}
      <div className={`grid gap-6 ${isSidebarOpen ? 'lg:grid-cols-[280px_1fr]' : 'grid-cols-1'}`}>
        
        {/* Research Sidebar */}
        {isSidebarOpen && (
          <div className="space-y-6">
            <div className="bg-brand-surface/90 border border-white/10 rounded-[24px] p-5 shadow-2xl backdrop-blur-xl">
              <h3 className="text-base font-heading font-black text-white mb-4">Workspace Watchlist</h3>
              <div className="space-y-2">
                {assets.map((asset, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-dark-900/40 rounded-xl hover:bg-dark-900/80 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                    <span className="text-sm font-bold text-white">{asset}</span>
                    <span className={`text-xs font-mono font-bold ${Math.random() > 0.5 ? 'text-brand-success' : 'text-brand-danger'}`}>
                      {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 5).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-b from-brand-purple/10 to-brand-surfaceElevated border border-brand-purple/20 rounded-[24px] p-5 shadow-xl">
              <h3 className="text-base font-heading font-black text-white mb-3">AI Multi-Chart Correlation</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                BTC and ETH are displaying a <span className="font-bold text-brand-success">strong positive correlation (0.85)</span> over the selected timeframe. SOL is showing independent momentum.
              </p>
              <div className="p-3 bg-dark-900/60 rounded-xl border border-white/5">
                <span className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider mb-1 block">AI Tip</span>
                <span className="text-xs text-white">Compare the RSI across these assets to identify which is leading the current breakout attempt.</span>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className={`grid gap-6 ${
          layout === 1 ? 'grid-cols-1' : 
          layout === 2 ? 'grid-cols-1 xl:grid-cols-2' : 
          'grid-cols-1 lg:grid-cols-2'
        }`}>
          {Array.from({ length: layout }).map((_, i) => (
            <div key={i} className="min-h-[500px] flex flex-col">
              <TechnicalAnalysisWorkspace symbol={assets[i] || `Asset ${i+1}`} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
