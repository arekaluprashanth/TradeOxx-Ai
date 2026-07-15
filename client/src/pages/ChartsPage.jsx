 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useMemo } from 'react';
import { useMarketData } from '../hooks/useMarketData';
import { useMarketStore } from '../stores/marketStore';
import ChartToolbar from '../components/charts/ChartToolbar';
import ChartContainer from '../components/charts/ChartContainer';
import { formatCurrency } from '../services/utils';
import { AreaChart, } from 'lucide-react';
import FuturesDesk from '../components/dashboard/FuturesDesk';

export default function ChartsPage() {
  const { isConnected, lastUpdate } = useMarketData();
  const chartType = useMarketStore((state) => state.chartType);
  const timeFrame = useMarketStore((state) => state.timeFrame);
  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const quotes = useMarketStore((state) => state.quotes);
  const activeIndicators = useMarketStore((state) => state.activeIndicators);
  const setChartType = useMarketStore((state) => state.setChartType);
  const setTimeFrame = useMarketStore((state) => state.setTimeFrame);
  const toggleIndicator = useMarketStore((state) => state.toggleIndicator);

  const activeQuote = quotes[activeSymbol];

  const quoteChangeLabel = useMemo(() => {
    if (!activeQuote) return '–';
    return `${activeQuote.change >= 0 ? '+' : ''}${activeQuote.change.toFixed(2)} (${activeQuote.changePercent.toFixed(2)}%)`;
  }, [activeQuote]);

  const changeClass = _optionalChain([activeQuote, 'optionalAccess', _ => _.change]) >= 0 ? 'text-accent-green' : 'text-accent-red';

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Visual Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
              <AreaChart size={22} />
            </div>
            <div>
              <p className="text-xs text-dark-400 uppercase tracking-widest font-bold">Charting station</p>
              <h1 className="text-3xl font-black text-white mt-0.5">Real-time Visualization</h1>
            </div>
          </div>
          
          <div className="grid gap-3 grid-cols-3 max-w-lg w-full">
            <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Asset</p>
              <p className="mt-1 text-base font-black text-white font-mono">{activeSymbol}</p>
            </div>
            <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Price</p>
              <p className="mt-1 text-base font-black text-white font-mono">{activeQuote ? formatCurrency(activeQuote.price) : 'Loading...'}</p>
            </div>
            <div className="rounded-2xl bg-dark-900/60 border border-white/5 p-3.5">
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-400">Change</p>
              <p className={`mt-1 text-xs font-bold font-mono truncate ${changeClass}`}>{quoteChangeLabel}</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-dark-400 font-semibold relative z-10">
          {isConnected ? `Live simulator feed active · last update ${lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : '—'}` : 'Market feed offline'}
        </p>
      </div>

      {/* Toolbar & Visuals */}
      <div className="space-y-4 bg-dark-850 rounded-3xl p-4 border border-white/5 shadow-2xl">
        <ChartToolbar
          chartType={chartType}
          onChartTypeChange={setChartType}
          activeTimeframe={timeFrame}
          onTimeframeChange={setTimeFrame}
          activeIndicators={activeIndicators}
          onIndicatorToggle={toggleIndicator}
        />
        <div className="rounded-2xl overflow-hidden border border-white/5">
          <ChartContainer chartType={chartType} />
        </div>
      </div>

      <div className="mt-8">
        <FuturesDesk defaultSymbol={activeSymbol} />
      </div>
    </div>
  );
}
