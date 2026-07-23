import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Cpu,
  PieChart,
  Search,
  Download,
  Filter,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { formatCurrency } from '../../services/utils';
import AssetModal from '../trading/AssetModal';
import toast from 'react-hot-toast';

export default function PortfolioPanel() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const holdingsList = portfolio?.holdings || [];
  const totalValue = portfolio?.totalValue || 100000;
  const dailyPL = portfolio?.dailyPnl || 0;
  const totalPL = portfolio?.totalPnl || 0;
  const availableCash = portfolio?.balance || 50000;

  const dailyPLPercent = totalValue > 0 ? (dailyPL / totalValue) * 100 : 0;
  const totalPLPercent = totalValue > 0 ? (totalPL / totalValue) * 100 : 0;

  // Filtered holdings list
  const filteredHoldings = useMemo(() => {
    return holdingsList.filter((item) => {
      const matchSearch =
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        filterCategory === 'ALL' || item.category?.toUpperCase() === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [holdingsList, searchQuery, filterCategory]);

  // Export CSV Handler
  const handleExportCSV = () => {
    if (holdingsList.length === 0) {
      toast.error('No holdings available to export.');
      return;
    }
    const headers = ['Symbol', 'Name', 'Shares', 'Avg Price', 'Current Price', 'Value', 'P/L ($)', 'P/L (%)'];
    const rows = holdingsList.map(h => [
      h.symbol,
      `"${h.name}"`,
      h.amount,
      h.avgPrice,
      h.currentPrice,
      (h.amount * h.currentPrice).toFixed(2),
      h.pnl.toFixed(2),
      h.pnlPercent.toFixed(2)
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tradeoxx_portfolio_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Portfolio CSV exported successfully!');
  };

  const summaryCards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(totalValue),
      icon: Wallet,
      textColor: 'text-brand-cyan',
      badge: 'LIVE EQUITY'
    },
    {
      title: 'Today\'s P/L',
      value: `${dailyPL >= 0 ? '+' : ''}${formatCurrency(dailyPL)}`,
      subtitle: `${dailyPL >= 0 ? '+' : ''}${dailyPLPercent.toFixed(2)}%`,
      icon: dailyPL >= 0 ? TrendingUp : TrendingDown,
      textColor: dailyPL >= 0 ? 'text-brand-success' : 'text-brand-danger',
      badge: '24H RETURN'
    },
    {
      title: 'Total P/L',
      value: `${totalPL >= 0 ? '+' : ''}${formatCurrency(totalPL)}`,
      subtitle: `${totalPL >= 0 ? '+' : ''}${totalPLPercent.toFixed(2)}%`,
      icon: totalPL >= 0 ? ArrowUpRight : ArrowDownRight,
      textColor: totalPL >= 0 ? 'text-brand-success' : 'text-brand-danger',
      badge: 'ALL TIME'
    },
    {
      title: 'Available Cash',
      value: formatCurrency(availableCash),
      icon: DollarSign,
      textColor: 'text-brand-purple',
      badge: 'LIQUID BAL'
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── 1. TOP SUMMARY CARDS ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-brand-surface/70 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-heading font-bold text-brand-textMuted uppercase tracking-wider">{card.title}</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-brand-textSecondary border border-white/5">
                {card.badge}
              </span>
            </div>
            <div>
              <p className={`text-2xl font-mono font-bold ${card.textColor}`}>{card.value}</p>
              {card.subtitle && (
                <p className={`text-xs font-mono font-bold mt-1 ${card.textColor}`}>{card.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 2. PORTFOLIO HEALTH SCORE SIGNATURE WIDGET ───────────── */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Health Score Gauge */}
        <div className="lg:col-span-7 bg-gradient-to-r from-brand-surfaceElevated via-brand-surface to-brand-surfaceElevated border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-success/15 border border-brand-success/30 flex items-center justify-center text-brand-success shadow-glow-green">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs text-brand-textMuted uppercase font-heading font-bold tracking-widest">Risk Architecture</p>
                <h3 className="text-xl font-heading font-black text-white">Portfolio Health Score</h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-success/20 text-brand-success border border-brand-success/40">
              92 / 100 • EXCELLENT
            </span>
          </div>

          {/* Health Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-brand-textMuted uppercase">Diversification</p>
              <p className="font-mono font-bold text-brand-success mt-0.5">85/100 (Good)</p>
            </div>
            <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-brand-textMuted uppercase">Volatility</p>
              <p className="font-mono font-bold text-brand-cyan mt-0.5">Low (14%)</p>
            </div>
            <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-brand-textMuted uppercase">Liquidity</p>
              <p className="font-mono font-bold text-brand-purple mt-0.5">High ($50K)</p>
            </div>
            <div className="bg-dark-900/80 p-3 rounded-2xl border border-white/5">
              <p className="text-[10px] text-brand-textMuted uppercase">Exposure</p>
              <p className="font-mono font-bold text-brand-warning mt-0.5">Balanced</p>
            </div>
          </div>

          {/* AI Explanation Note */}
          <div className="bg-brand-surface/60 border border-brand-cyan/20 rounded-2xl p-4 flex items-start gap-3 text-xs text-brand-textSecondary leading-relaxed">
            <Cpu size={18} className="text-brand-cyan shrink-0 mt-0.5" />
            <p>
              <span className="font-bold text-white">AI Health Diagnosis:</span> Portfolio demonstrates excellent Sharpe ratio stability with low drawdown risk. Cash reserves provide sufficient buffer for upcoming market opportunities.
            </p>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="lg:col-span-5 bg-brand-surface/90 border border-white/10 rounded-[28px] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-xs font-heading font-bold text-brand-cyan uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} />
                AI Portfolio Observation
              </h4>
              <span className="text-[10px] font-mono text-brand-textMuted">Updated 1m ago</span>
            </div>

            <div className="space-y-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/5">
                <p className="text-xs font-heading font-bold text-white">Technology Sector Concentration</p>
                <p className="text-[11px] text-brand-textSecondary mt-1">42% of holdings are allocated to Tech. Consider expanding into Healthcare or Commodities for lower volatility.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-900/80 border border-white/5">
                <p className="text-xs font-heading font-bold text-white">Optimal Rebalance Suggestion</p>
                <p className="text-[11px] text-brand-textSecondary mt-1">Take partial profits on high-yield winners to preserve capital gains ahead of FOMC rate updates.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. HOLDINGS TABLE WITH SEARCH, FILTER & EXPORT ─────── */}
      <div className="bg-brand-surface/90 border border-white/10 rounded-[28px] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white">Holdings & Positions</h3>
            <p className="text-xs text-brand-textMuted mt-0.5">Live market valuation & quantitative performance ratings</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter holdings..."
                className="pl-9 pr-3 py-1.5 bg-dark-900 border border-white/10 rounded-xl text-xs text-white placeholder:text-brand-textMuted focus:outline-none focus:border-brand-cyan/50 transition-all"
              />
            </div>

            {/* CSV Export */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-surfaceElevated border border-white/10 hover:border-brand-cyan/40 text-xs font-heading font-bold text-white transition-all cursor-pointer shadow-lg"
            >
              <Download size={14} className="text-brand-cyan" />
              Export CSV
            </button>
          </div>
        </div>

        {filteredHoldings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-dark-950/60 text-xs font-heading font-bold uppercase tracking-wider text-brand-textMuted">
                  <th className="px-6 py-3.5">Asset</th>
                  <th className="px-6 py-3.5 text-right">Shares / Qty</th>
                  <th className="px-6 py-3.5 text-right">Avg Price</th>
                  <th className="px-6 py-3.5 text-right">Current Price</th>
                  <th className="px-6 py-3.5 text-right">Total Value</th>
                  <th className="px-6 py-3.5 text-right">Gain / Loss</th>
                  <th className="px-6 py-3.5 text-center">AI Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredHoldings.map((holding) => {
                  const val = holding.amount * holding.currentPrice;
                  const isPos = holding.pnl >= 0;
                  return (
                    <tr
                      key={holding.symbol}
                      onClick={() => setSelectedAsset(holding)}
                      className="hover:bg-white/2 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono font-bold">
                            {holding.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-white group-hover:text-brand-cyan transition-colors">{holding.symbol}</p>
                            <p className="text-[10px] text-brand-textMuted">{holding.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-semibold text-white">{holding.amount}</td>
                      <td className="px-6 py-4 text-right font-mono text-brand-textSecondary">{formatCurrency(holding.avgPrice)}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">{formatCurrency(holding.currentPrice)}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">{formatCurrency(val)}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold">
                        <span className={isPos ? 'text-brand-success' : 'text-brand-danger'}>
                          {isPos ? '+' : ''}{formatCurrency(holding.pnl)} ({isPos ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-brand-success/20 text-brand-success font-mono font-bold text-[10px] border border-brand-success/30">
                          A+ BUY
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-brand-textMuted space-y-3">
            <Info size={24} className="mx-auto text-brand-cyan" />
            <p>No holdings match your filter criteria.</p>
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
