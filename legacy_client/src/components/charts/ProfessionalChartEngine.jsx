import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Settings, 
  Download, 
  Camera, 
  MoreHorizontal,
  ChevronDown,
  Activity,
  LineChart as LineChartIcon,
  BarChart2
} from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Volume 4.4.1: Professional Interactive Chart Engine
 * Features: Timeframes, Chart Types, Fullscreen, Quick Stats, Interactive Tooltips
 */
export default function ProfessionalChartEngine({ symbol = "BTC/USD", quote = {} }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartType, setChartType] = useState('Candles');
  const [timeframe, setTimeframe] = useState('1D');
  const chartRef = useRef(null);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W', '1Mth'];
  const chartTypes = ['Candles', 'Line', 'Area', 'Bars'];

  return (
    <div 
      ref={chartRef} 
      className={`flex flex-col bg-brand-surfaceElevated border border-white/10 rounded-[24px] overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px] shadow-2xl'}`}
    >
      {/* Chart Header & Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/10 bg-dark-900/40 backdrop-blur-md gap-4">
        
        {/* Asset Info & Quick Stats */}
        <div className="flex items-center gap-6">
          <div>
            <h3 className="text-lg font-heading font-black text-white">{symbol}</h3>
            <p className="text-xs text-brand-textMuted uppercase font-bold tracking-wider">Binance • Crypto</p>
          </div>
          
          <div className="hidden md:flex gap-4 border-l border-white/10 pl-6">
            <div>
              <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">O</p>
              <p className="text-xs font-mono font-bold text-white">64,230.50</p>
            </div>
            <div>
              <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">H</p>
              <p className="text-xs font-mono font-bold text-brand-success">65,100.00</p>
            </div>
            <div>
              <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">L</p>
              <p className="text-xs font-mono font-bold text-brand-danger">63,800.20</p>
            </div>
            <div>
              <p className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">C</p>
              <p className="text-xs font-mono font-bold text-white">64,950.00</p>
            </div>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframes */}
          <div className="flex bg-dark-900/60 rounded-lg p-1 border border-white/5">
            {timeframes.map(tf => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${timeframe === tf ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-brand-textMuted hover:text-white'}`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart Type Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900/60 border border-white/5 text-xs font-bold text-white hover:border-white/20 transition-all">
              <BarChart2 size={14} /> {chartType} <ChevronDown size={14} />
            </button>
          </div>

          <div className="h-6 w-px bg-white/10 mx-1"></div>

          <button className="p-1.5 rounded-lg hover:bg-white/10 text-brand-textMuted hover:text-white transition-colors" title="Settings">
            <Settings size={16} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-brand-textMuted hover:text-white transition-colors" title="Screenshot">
            <Camera size={16} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg hover:bg-white/10 text-brand-textMuted hover:text-white transition-colors" 
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 relative bg-[#0B0E14] overflow-hidden group">
        {/* Simulated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Mock Chart Visualization */}
        <div className="absolute inset-x-0 bottom-20 top-10 flex items-end justify-center gap-1 opacity-80 px-10">
          {Array.from({ length: 60 }).map((_, i) => {
            const isUp = Math.random() > 0.4;
            const h = 20 + Math.random() * 60;
            return (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group/candle cursor-crosshair">
                <div className={`w-0.5 h-full absolute ${isUp ? 'bg-brand-success/30' : 'bg-brand-danger/30'}`}></div>
                <div 
                  className={`w-full max-w-[8px] rounded-sm relative z-10 transition-all group-hover/candle:brightness-150 ${isUp ? 'bg-brand-success' : 'bg-brand-danger'}`} 
                  style={{ height: `${h}%`, marginBottom: `${Math.random() * 20}%` }}
                ></div>
                {/* Tooltip on hover */}
                <div className="hidden group-hover/candle:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-900 border border-white/10 rounded p-2 shadow-xl z-50 whitespace-nowrap">
                  <p className="text-[10px] text-brand-textMuted mb-1 font-mono">2023-10-{i+1 < 10 ? '0'+(i+1) : i+1} 14:00</p>
                  <p className="text-xs text-white font-bold">O: <span className="font-mono font-normal">64k</span></p>
                  <p className="text-xs text-white font-bold">C: <span className="font-mono font-normal">{isUp ? '65k' : '63k'}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume Panel */}
        <div className="absolute inset-x-0 bottom-0 h-20 border-t border-white/5 flex items-end gap-1 px-10 opacity-60">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-brand-cyan/20 rounded-t-sm" 
              style={{ height: `${10 + Math.random() * 80}%` }}
            ></div>
          ))}
        </div>

        {/* Y-Axis Prices */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-dark-900/80 border-l border-white/5 flex flex-col justify-between py-10 px-2">
          {['66k', '65k', '64k', '63k', '62k'].map(p => (
            <span key={p} className="text-[10px] font-mono text-brand-textMuted text-right">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
