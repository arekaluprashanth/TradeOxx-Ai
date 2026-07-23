import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  BarChart2,
  Bell,
  Star,
  Activity,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '../../services/utils';
import { usePortfolio } from '../../hooks/usePortfolio';
import toast from 'react-hot-toast';

export default function AssetModal({ isOpen, onClose, asset }) {
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeTrade } = usePortfolio();

  useEffect(() => {
    if (isOpen && asset) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, asset]);

  if (!isOpen || !asset) return null;

  const isPositive = asset.changePercent >= 0;
  const totalCost = parseFloat(quantity || '0') * asset.price;

  const handleTrade = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast.error('Please enter a valid quantity.');
      return;
    }
    setIsSubmitting(true);
    try {
      await executeTrade(asset.symbol, orderType, parseFloat(quantity));
      toast.success(`${orderType.toUpperCase()} order executed for ${quantity} ${asset.symbol}`);
      onClose();
    } catch (error) {
      toast.error('Trade failed: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: '20px', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '20px', scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] sm:w-full max-w-2xl bg-brand-surfaceElevated/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/10 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold text-sm">
                  {asset.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-heading font-black text-white">{asset.symbol}</h2>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      NASDAQ / LIVE
                    </span>
                  </div>
                  <p className="text-xs text-brand-textMuted">{asset.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 text-brand-textMuted hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Price & Change Banner */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 p-4 rounded-2xl bg-dark-950/80 border border-white/5">
                <div>
                  <p className="text-xs text-brand-textMuted uppercase font-heading font-bold">Current Spot Price</p>
                  <p className="text-3xl font-mono font-black text-white mt-1">{formatCurrency(asset.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-brand-textMuted uppercase font-heading font-bold">24H Change</p>
                  <p className={`text-lg font-mono font-bold flex items-center gap-1 justify-end ${isPositive ? 'text-brand-success' : 'text-brand-danger'}`}>
                    {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Volume 4.2.4 Signature AI Observation Card */}
              <div className="bg-brand-surface/90 border border-brand-cyan/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} />
                    AI Intelligence Summary
                  </span>
                  <span className="text-[10px] font-mono text-brand-textMuted">Confidence: 94.8%</span>
                </div>
                <p className="text-xs text-brand-textSecondary leading-relaxed">
                  Price is maintaining strong structural support above technical moving averages. Order flow metrics indicate steady institutional accumulation with sub-millisecond velocity spikes.
                </p>
              </div>

              {/* Technical Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">RSI (14)</p>
                  <p className="font-mono font-bold text-brand-success mt-0.5">64.2 (Bullish)</p>
                </div>
                <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">MACD Signal</p>
                  <p className="font-mono font-bold text-brand-cyan mt-0.5">Positive Crossover</p>
                </div>
                <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Volatility</p>
                  <p className="font-mono font-bold text-brand-purple mt-0.5">Low (12.4%)</p>
                </div>
                <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-brand-textMuted uppercase font-heading font-bold">Support Zone</p>
                  <p className="font-mono font-bold text-white mt-0.5">$178.50</p>
                </div>
              </div>

              {/* Trade Execution Form */}
              <div className="bg-dark-900/90 border border-white/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Execute Trade Ticket</h4>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`py-2 rounded-xl text-xs font-heading font-bold transition-all ${orderType === 'buy' ? 'bg-brand-success text-dark-950 shadow-glow-green' : 'bg-white/5 text-brand-textMuted'}`}
                  >
                    BUY {asset.symbol}
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`py-2 rounded-xl text-xs font-heading font-bold transition-all ${orderType === 'sell' ? 'bg-brand-danger text-white shadow-glow-red' : 'bg-white/5 text-brand-textMuted'}`}
                  >
                    SELL {asset.symbol}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-heading font-bold text-brand-textMuted uppercase">Quantity (Shares/Units)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0.1"
                    step="any"
                    className="w-full px-4 py-2.5 bg-dark-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-cyan/50 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5 font-mono">
                  <span className="text-brand-textMuted">Estimated Total:</span>
                  <span className="font-bold text-white text-sm">{formatCurrency(totalCost)}</span>
                </div>

                <button
                  onClick={handleTrade}
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg ${orderType === 'buy' ? 'bg-brand-success text-dark-950 shadow-glow-green hover:scale-102' : 'bg-brand-danger text-white shadow-glow-red hover:scale-102'}`}
                >
                  {isSubmitting ? 'Executing Trade...' : `Confirm ${orderType.toUpperCase()} Order`}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
