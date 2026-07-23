import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HelpCircle, Activity, Award, TrendingUp, Cpu, Info, Settings, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import toast from 'react-hot-toast';

export default function FuturesDesk({ defaultSymbol = 'EURUSD' }) {
  const [leverage, setLeverage] = useState(20);
  const [contractSize, setContractSize] = useState(10000);
  const [positionType, setPositionType] = useState('long');
  const [futuresSymbol, setFuturesSymbol] = useState(defaultSymbol);

  const priceMap = {
    'EURUSD': 1.0854,
    'GBPUSD': 1.2684,
    'USDJPY': 155.42,
    'XAUUSD': 2330.50,
    'BTCUSD': 65200.00,
  };

  const currentPrice = priceMap[futuresSymbol] || 1.0;

  const totalValue = useMemo(() => {
    return contractSize * currentPrice;
  }, [contractSize, currentPrice]);

  const marginRequired = useMemo(() => {
    return totalValue / leverage;
  }, [totalValue, leverage]);

  const liquidationPrice = useMemo(() => {
    if (positionType === 'long') {
      return currentPrice * (1 - 1 / leverage + 0.005);
    } else {
      return currentPrice * (1 + 1 / leverage - 0.005);
    }
  }, [currentPrice, leverage, positionType]);

  const handleOpenPosition = () => {
    toast.success(`Position opened: ${positionType.toUpperCase()} ${contractSize.toLocaleString()} ${futuresSymbol} at leverage ${leverage}x!`);
  };

  const handleClosePosition = () => {
    toast.error(`All simulator positions closed for ${futuresSymbol}.`);
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-dark-850 to-dark-900 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden high-refresh-smooth">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.15)]">
            <Cpu size={18} />
          </div>
          <div>
            <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">Prop Futures Terminal</span>
            <h3 className="text-lg font-bold text-white mt-0.5">Futures & Options Spec Desk</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={futuresSymbol} 
            onChange={(e) => setFuturesSymbol(e.target.value)}
            className="bg-dark-950/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none hover:border-accent-cyan/50 transition-all cursor-pointer"
          >
            <option value="EURUSD">EUR/USD-PERP</option>
            <option value="GBPUSD">GBP/USD-PERP</option>
            <option value="USDJPY">USD/JPY-PERP</option>
            <option value="XAUUSD">GOLD-FUTURE</option>
            <option value="BTCUSD">BTC/USD-PERP</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Side: Leverage Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-dark-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Settings size={12} className="text-accent-cyan" />
                Leverage Multiplier
              </label>
              <span className="text-sm font-black text-accent-cyan font-mono bg-accent-cyan/10 px-2 py-0.5 rounded-lg border border-accent-cyan/20">{leverage}x</span>
            </div>
            
            <div className="flex gap-2">
              {[5, 10, 20, 50, 100].map((lev) => (
                <button
                  key={lev}
                  onClick={() => setLeverage(lev)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    leverage === lev 
                      ? 'bg-accent-cyan border-accent-cyan text-dark-950 font-black shadow-[0_0_15px_rgba(0,212,255,0.3)]' 
                      : 'bg-dark-950 border-white/5 text-dark-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-dark-300 font-bold uppercase tracking-wider">Position Direction</label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPositionType('long')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 border ${
                  positionType === 'long'
                    ? 'bg-accent-green border-accent-green text-dark-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-dark-950 border-white/5 text-accent-green/80 hover:text-accent-green hover:border-accent-green/20'
                }`}
              >
                <TrendingUp size={14} /> Buy / Long
              </button>
              <button
                onClick={() => setPositionType('short')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 border ${
                  positionType === 'short'
                    ? 'bg-accent-red border-accent-red text-white font-black shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-dark-950 border-white/5 text-accent-red/80 hover:text-accent-red hover:border-accent-red/20'
                }`}
              >
                <AlertTriangle size={14} /> Sell / Short
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-dark-300 font-bold uppercase tracking-wider">Contract Size (Units)</label>
              <span className="text-xs font-mono font-bold text-white">{contractSize.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={contractSize}
              onChange={(e) => setContractSize(parseInt(e.target.value))}
              className="w-full accent-accent-cyan cursor-pointer h-1.5 bg-dark-950 rounded-lg outline-none"
            />
          </div>
        </div>

        {/* Right Side: Margin Metrics & Details */}
        <div className="bg-dark-950/40 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-dark-400">Position Notional Value</span>
              <span className="font-mono font-bold text-white">{formatCurrency(totalValue)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-dark-400">Required Margin (Cost)</span>
              <span className="font-mono font-bold text-accent-cyan">{formatCurrency(marginRequired)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-dark-400">Maintenance Margin (5%)</span>
              <span className="font-mono font-bold text-dark-200">{formatCurrency(marginRequired * 0.05)}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
              <span className="text-dark-400">Est. Liquidation Price</span>
              <span className="font-mono font-bold text-accent-red">{formatCurrency(liquidationPrice)}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleOpenPosition}
              className="flex-1 bg-accent-cyan text-dark-950 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
            >
              Open Position
            </button>
            <button
              onClick={handleClosePosition}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
            >
              Close All
            </button>
          </div>
        </div>
      </div>

      {/* Futures Features Roadmap Card */}
      <div className="bg-dark-950/60 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple shrink-0 mt-0.5">
            <Award size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Futures Roadmap Enabled</h4>
            <p className="text-[11px] text-dark-400 mt-0.5">Prop Firm Futures contracts include automatic liquidation safety mechanisms, leverage scale limits, and custom contract symbols.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-dark-300 font-bold shrink-0">
          <ShieldCheck size={14} className="text-accent-green animate-pulse" />
          <span>Margin Protection Active</span>
        </div>
      </div>
    </div>
  );
}
