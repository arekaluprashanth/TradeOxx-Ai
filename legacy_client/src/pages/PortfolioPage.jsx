import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { useMarketStore } from '../stores/marketStore';
import PortfolioPanel from '../components/portfolio/PortfolioPanel';
import TradeForm from '../components/portfolio/TradeForm';
import TradeHistory from '../components/portfolio/TradeHistory';
import { Button } from '../components/ui/Button';
import FuturesDesk from '../components/dashboard/FuturesDesk';
import { Briefcase, ArrowUpRight, TrendingUp, } from 'lucide-react';
import DepositModal from '../components/portfolio/DepositModal';
import WithdrawModal from '../components/portfolio/WithdrawModal';

export default function PortfolioPage() {
  const { portfolio, isLoading, error } = usePortfolio();
  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const [isTradeOpen, setIsTradeOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Visual Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
              <Briefcase size={22} />
            </div>
            <div>
              <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Investments</p>
              <h1 className="text-3xl font-black text-white mt-0.5">Asset Holdings</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="lg" onClick={() => setIsDepositOpen(true)}>
              Deposit
            </Button>
            <Button variant="outline" size="lg" onClick={() => setIsWithdrawOpen(true)}>
              Withdraw
            </Button>
            <Button variant="primary" size="lg" onClick={() => setIsTradeOpen(true)} className="hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              New Trade Ticket
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        {/* Left Columns - Stats & History */}
        <div className="space-y-8">
          <div className="bg-dark-850 rounded-3xl p-1 border border-white/5 shadow-2xl">
            <PortfolioPanel />
          </div>
          <div className="bg-dark-850 rounded-3xl p-1 border border-white/5 shadow-2xl">
            <TradeHistory />
          </div>
        </div>

        {/* Right Columns - Details */}
        <div className="space-y-8">
          <div className="rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-white/5 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full filter blur-2xl pointer-events-none" />
            <p className="text-xs text-dark-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5">
              <TrendingUp size={12} className="text-accent-purple" />
              Trading Insights
            </p>
            <h2 className="text-xl font-bold text-white mb-3">Simulated Executions</h2>
            <p className="text-sm text-dark-300 leading-relaxed">
              {portfolio
                ? 'Use the paper trading ticket to simulate buy and sell executions in real-time. Changes are instant and reflected immediately in your portfolio NAV.'
                : 'Loading portfolio telemetry database…'}
            </p>
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-accent-red/10 border border-accent-red/20 text-xs font-semibold text-accent-red">
                {error}
              </div>
            )}
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-dark-950/60 border border-white/5 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Default Target</span>
                  <span className="text-lg font-mono font-bold text-white mt-1 block">{activeSymbol}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-dark-400">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="rounded-2xl bg-dark-950/60 border border-white/5 p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Sync Status</span>
                  <span className="text-lg font-mono font-bold text-accent-cyan mt-1 block">{isLoading ? 'Refreshing...' : 'Synced'}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan animate-pulse">
                  <ActivityIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <FuturesDesk />
      </div>

      <TradeForm
        isOpen={isTradeOpen}
        onClose={() => setIsTradeOpen(false)}
        defaultSymbol={activeSymbol}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
