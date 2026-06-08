import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { formatCurrency, formatPercent } from '../../lib/utils';
import AssetModal from '../trading/AssetModal';

export default function PortfolioPanel() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const [selectedAsset, setSelectedAsset] = useState<null | any>(null);

  const holdingsList = portfolio?.holdings || [];
  const totalValue = portfolio?.totalValue ?? 100000;
  const dailyPL = portfolio?.dailyPnl ?? 0;
  const totalPL = portfolio?.totalPnl ?? 0;
  const availableCash = portfolio?.balance ?? 50000;

  const dailyPLPercent = totalValue > 0 ? (dailyPL / totalValue) * 100 : 0;
  const totalPLPercent = totalValue > 0 ? (totalPL / totalValue) * 100 : 0;

  const summaryCards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(totalValue),
      icon: Wallet,
      color: 'from-accent-blue/20 to-accent-blue/10',
      textColor: 'text-white',
    },
    {
      title: 'Daily P/L',
      value: `${dailyPL >= 0 ? '+' : ''}${formatCurrency(dailyPL)}`,
      subtitle: `${dailyPL >= 0 ? '+' : ''}${dailyPLPercent.toFixed(2)}%`,
      icon: dailyPL >= 0 ? TrendingUp : TrendingDown,
      color: dailyPL >= 0 ? 'from-accent-green/20 to-accent-green/10' : 'from-accent-red/20 to-accent-red/10',
      textColor: dailyPL >= 0 ? 'text-accent-green' : 'text-accent-red',
    },
    {
      title: 'Total P/L',
      value: `${totalPL >= 0 ? '+' : ''}${formatCurrency(totalPL)}`,
      subtitle: `${totalPL >= 0 ? '+' : ''}${totalPLPercent.toFixed(2)}%`,
      icon: totalPL >= 0 ? ArrowUpRight : ArrowDownRight,
      color: totalPL >= 0 ? 'from-accent-green/20 to-accent-green/10' : 'from-accent-red/20 to-accent-red/10',
      textColor: totalPL >= 0 ? 'text-accent-green' : 'text-accent-red',
    },
    {
      title: 'Available Cash',
      value: formatCurrency(availableCash),
      icon: DollarSign,
      color: 'from-dark-600/50 to-dark-700/50',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-dark-400 text-sm font-medium">{card.title}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon size={16} className={card.textColor} />
              </div>
            </div>
            <p className={`text-2xl font-bold tracking-tight ${card.textColor}`}>{card.value}</p>
            {card.subtitle && (
              <p className={`text-sm font-medium mt-1 ${card.textColor}`}>{card.subtitle}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-dark-600">
          <h3 className="text-lg font-bold text-white">Holdings</h3>
        </div>

        {holdingsList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-600">
                  <th className="text-left text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">Asset</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">Shares</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">Avg Price</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">Current</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">Value</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">P/L</th>
                  <th className="text-right text-xs font-bold text-dark-400 uppercase tracking-wider px-6 py-3">P/L %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-600">
                {holdingsList.map((holding: any, i: number) => {
                  const pl = (holding.currentPrice - holding.avgPrice) * holding.shares;
                  const plPercent = holding.avgPrice > 0 ? ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100 : 0;
                  const isProfit = pl >= 0;

                  return (
                    <motion.tr
                      key={holding.symbol || i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedAsset({
                        symbol: holding.symbol,
                        name: holding.name || holding.symbol,
                        price: holding.currentPrice,
                        changePercent: plPercent
                      })}
                      className="hover:bg-dark-700 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-xs font-bold text-white border border-dark-600">
                            {(holding.symbol || '??').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{holding.symbol}</p>
                            <p className="text-xs font-medium text-dark-400">{holding.name || holding.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-white">{holding.shares}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-dark-200">{formatCurrency(holding.avgPrice)}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-white">{formatCurrency(holding.currentPrice)}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-white">{formatCurrency(holding.currentPrice * holding.shares)}</td>
                      <td className={`px-6 py-4 text-right text-sm font-bold ${isProfit ? 'text-accent-green' : 'text-accent-red'}`}>
                        {isProfit ? '+' : ''}{formatCurrency(pl)}
                      </td>
                      <td className={`px-6 py-4 text-right text-sm font-bold ${isProfit ? 'text-accent-green' : 'text-accent-red'}`}>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs ${isProfit ? 'bg-accent-green/20' : 'bg-accent-red/20'}`}>
                          {isProfit ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <Wallet size={40} className="mx-auto mb-3 text-dark-400" />
            <p className="text-dark-300 font-medium text-sm">No holdings yet</p>
            <p className="text-dark-400 text-xs mt-1">Start trading to build your portfolio</p>
          </div>
        )}
      </motion.div>

      <AssetModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        asset={selectedAsset}
      />
    </div>
  );
}
