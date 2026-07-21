import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Sparkles, TrendingUp, TrendingDown, 
  Brain, ExternalLink, Clock, ArrowUpRight, Activity
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';
import toast from 'react-hot-toast';

export default function AiNewsfeed({ onSelectAsset }) {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);
  
  const [filter, setFilter] = useState('all'); // 'all', 'bullish', 'bearish', 'neutral'
  const [expandedId, setExpandedId] = useState(null);
  const [liveNewsList, setLiveNewsList] = useState([]);
  
  // Track previous prices to detect sudden spikes/drops (> 1.2% in a tick cycle)
  const prevPricesRef = useRef({});
  const initialLoadRef = useRef(true);

  // Initial templates with dynamic price/change builders
  const templates = useMemo(() => [
    {
      id: 't1',
      symbol: 'AAPL',
      source: 'Bloomberg',
      time: '10m ago',
      titleBuilder: (price) => `Apple (AAPL) launches next-generation M5 chip with advanced local neural engine as price hovers at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.88,
      summary: 'Apple has officially announced its M5 chip lineup, targeting enhanced local execution of complex AI workloads on iPhones and Macs. Analysts predict a strong upgrade cycle.',
      impact: 'Expected to drive retail demand for hardware upgrades. Margins likely to improve.',
      rec: 'BUY / ACCUMULATE'
    },
    {
      id: 't2',
      symbol: 'TSLA',
      source: 'Reuters',
      time: '25m ago',
      titleBuilder: (price) => `Tesla (TSLA) autonomous FSD beta expands to European markets; stock responds at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.74,
      summary: 'European transport regulators have granted conditional approval for Tesla to begin public road testing of its Full Self-Driving software suite, opening up a major high-margin subscription demographic.',
      impact: 'Software margins will likely boost overall automotive margins over the next two quarters.',
      rec: 'BUY limit order'
    },
    {
      id: 't3',
      symbol: 'BTC',
      source: 'CoinDesk',
      time: '42m ago',
      titleBuilder: (price) => `Bitcoin (BTC) hash rate hits historic high as price settles near ${formatCurrency(price)}.`,
      sentiment: 'neutral',
      score: 0.12,
      summary: 'Despite recent mining difficulty adjustments, global network hash rate has breached previous resistance levels. Network security is at an all-time high, but profit margins remain tight for smaller operators.',
      impact: 'Long-term network strength; neutral short-term price pressure.',
      rec: 'ACCUMULATE on pullbacks'
    },
    {
      id: 't4',
      symbol: 'NVDA',
      source: 'Financial Times',
      time: '1h ago',
      titleBuilder: (price) => `Nvidia (NVDA) secures massive Blackwell production contracts; stock trading at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.95,
      summary: 'Hyperscale cloud providers have placed non-cancellable pre-orders for Nvidia Blackwell architecture platforms, fully booking supplier capacity through the end of the fiscal year.',
      impact: 'Sustained data center revenue growth for the foreseeable future.',
      rec: 'STRONG BUY'
    },
    {
      id: 't5',
      symbol: 'GOOGL',
      source: 'TechCrunch',
      time: '2h ago',
      titleBuilder: (price) => `Alphabet (GOOGL) faces antitrust scrutiny over search monetization policies; quotes currently at ${formatCurrency(price)}.`,
      sentiment: 'bearish',
      score: -0.68,
      summary: 'Monopoly regulators have launched an investigation into Alphabet\'s revenue-sharing agreements with browser partners, raising concerns over long-term customer acquisition costs.',
      impact: 'Legal overheads and potential fine risks may act as a short-term overhang on the stock.',
      rec: 'HOLD / SELL covered calls'
    },
    {
      id: 't6',
      symbol: 'ETH',
      source: 'Coingape',
      time: '3h ago',
      titleBuilder: (price) => `Ethereum (ETH) transaction fees reach multi-year lows; price consolidates at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.65,
      summary: 'Blob space upgrades have successfully routed consumer gas costs to L2 execution networks, making base-layer transactions cheaper while growing total active addresses.',
      impact: 'Increased utility and developer retention, bullish for token burn metrics.',
      rec: 'BUY / HODL'
    },
    {
      id: 't7',
      symbol: 'MSFT',
      source: 'CNBC',
      time: '4h ago',
      titleBuilder: (price) => `Microsoft (MSFT) integrates next-tier CoPilot suites as price levels around ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.81,
      summary: 'Microsoft announces pricing adjustments for enterprise tiers incorporating advanced reasoning agents, directly driving average revenue per user (ARPU) higher.',
      impact: 'High-margin recurring revenue stream growth.',
      rec: 'BUY'
    }
  ], []);

  // Initialize News List
  useEffect(() => {
    const list = templates.map(t => {
      const liveQuote = quotes[t.symbol] || assets.find(a => a.symbol === t.symbol) || { price: 100 };
      return {
        ...t,
        title: t.titleBuilder(liveQuote.price)
      };
    });
    setLiveNewsList(list);
  }, [templates, quotes, assets]);

  // Live alert system monitoring quotes for major shifts
  useEffect(() => {
    if (Object.keys(quotes).length === 0) return;

    // Skip trigger on first load to prevent flash notifications
    if (initialLoadRef.current) {
      Object.keys(quotes).forEach(symbol => {
        prevPricesRef.current[symbol] = quotes[symbol].price;
      });
      initialLoadRef.current = false;
      return;
    }

    Object.keys(quotes).forEach(symbol => {
      const prevPrice = prevPricesRef.current[symbol];
      const curPrice = quotes[symbol].price;

      if (prevPrice && prevPrice !== curPrice) {
        const changePercent = ((curPrice - prevPrice) / prevPrice) * 100;
        
        // Detect sudden movements (> 1.2% in a single market update cycle)
        if (Math.abs(changePercent) >= 1.2) {
          const isUp = changePercent > 0;
          const randomId = `live-${Date.now()}`;
          const newAlert = {
            id: randomId,
            symbol: symbol,
            source: 'Apexx AI Alert',
            time: 'Just Now',
            title: `BREAKING: ${symbol} ${isUp ? 'surges' : 'plunges'} ${isUp ? '+' : ''}${changePercent.toFixed(2)}% to ${formatCurrency(curPrice)} on high-frequency trading volume.`,
            sentiment: isUp ? 'bullish' : 'bearish',
            score: isUp ? 0.92 : -0.92,
            summary: `High speed trading algorithm indicators have triggered a volatility alert for ${symbol}. Market prices updated dynamically in response to simulation updates.`,
            impact: isUp ? 'Strong buying momentum detected. High bullish breakout probability.' : 'Panic selling pressure. Watch immediate support levels.',
            rec: isUp ? 'MOMENTUM BUY' : 'ACCUMULATE / WAIT FOR BOTTOM'
          };

          // Prepend to top of list
          setLiveNewsList(prev => [newAlert, ...prev].slice(0, 15));
          
          // Toast Notification for breaking alert
          toast.custom((t) => (
            <div className={`p-4 rounded-2xl border bg-dark-900 shadow-glow flex flex-col gap-1 max-w-sm transition-all duration-300 ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isUp ? 'border-accent-green/30' : 'border-accent-red/30'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isUp ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                  {isUp ? '🔥 AI Bullish Spike' : '📉 AI Bearish Drop'}
                </span>
                <span className="text-[10px] text-dark-400">Just Now</span>
              </div>
              <p className="text-xs text-white font-bold leading-snug mt-1">
                {symbol} changed {isUp ? '+' : ''}${changePercent.toFixed(2)}% in a single tick.
              </p>
            </div>
          ), { duration: 4000 });
        }
      }
      prevPricesRef.current[symbol] = curPrice;
    });
  }, [quotes]);

  // Filter list based on active tab selection
  const filteredNews = useMemo(() => {
    if (filter === 'all') return liveNewsList;
    return liveNewsList.filter(n => n.sentiment === filter);
  }, [liveNewsList, filter]);

  // Overall Market Sentiment Aggregator
  const sentimentStats = useMemo(() => {
    if (liveNewsList.length === 0) return { score: 0.5, label: 'Neutral', color: 'text-dark-300' };
    const sum = liveNewsList.reduce((acc, curr) => acc + curr.score, 0);
    const avg = sum / liveNewsList.length;
    
    let label = 'Neutral ⚖️';
    let color = 'text-dark-300';
    let border = 'border-white/5';
    let bg = 'bg-white/5';

    if (avg > 0.3) {
      label = 'Strong Greed 🔥';
      color = 'text-accent-green';
      border = 'border-accent-green/20';
      bg = 'bg-accent-green/5';
    } else if (avg < -0.3) {
      label = 'High Fear 📉';
      color = 'text-accent-red';
      border = 'border-accent-red/20';
      bg = 'bg-accent-red/5';
    }

    return { score: avg, label, color, border, bg };
  }, [liveNewsList]);

  return (
    <section className="bg-dark-850 rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col space-y-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-full filter blur-2xl pointer-events-none" />
      
      {/* Header Title */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Newspaper size={18} className="text-accent-cyan" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            AI Sentiment Newsfeed
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-[10px] font-black uppercase tracking-wider">
          <Activity size={10} className="animate-pulse" />
          Live Audits
        </span>
      </div>

      {/* Symmetrical Sentiment Meter */}
      <div className={`p-4 rounded-2xl border ${sentimentStats.border} ${sentimentStats.bg} flex items-center justify-between gap-4 transition-all duration-300`}>
        <div className="space-y-1">
          <span className="text-[10px] text-dark-400 font-bold uppercase tracking-wider block">Market Fear & Greed</span>
          <span className={`text-sm font-black uppercase tracking-widest ${sentimentStats.color} block`}>
            {sentimentStats.label}
          </span>
        </div>
        <div className="flex-1 max-w-[150px] space-y-1">
          <div className="h-2 w-full bg-dark-950 rounded-full overflow-hidden relative border border-white/5">
            <motion.div 
              className={`absolute top-0 bottom-0 rounded-full ${sentimentStats.score > 0.3 ? 'bg-accent-green' : sentimentStats.score < -0.3 ? 'bg-accent-red' : 'bg-dark-400'}`}
              animate={{ 
                left: '0%', 
                width: `${((sentimentStats.score + 1) / 2) * 100}%` 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-dark-400 font-mono font-bold uppercase">
            <span>Fear</span>
            <span>Greed</span>
          </div>
        </div>
      </div>

      {/* Symmetrical Filter Toggles */}
      <div className="flex gap-1.5 p-1 bg-dark-950 rounded-xl border border-white/5">
        {[
          { id: 'all', label: 'All Feeds' },
          { id: 'bullish', label: 'Bullish 🔥' },
          { id: 'bearish', label: 'Bearish 📉' },
          { id: 'neutral', label: 'Neutral ⚖️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setFilter(tab.id);
              setExpandedId(null);
            }}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
              filter === tab.id 
                ? 'bg-accent-cyan text-dark-955 shadow-md shadow-accent-cyan/15' 
                : 'text-dark-400 hover:text-white hover:bg-dark-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* News Stream List */}
      <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
        <AnimatePresence initial={false}>
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => {
              const isExpanded = expandedId === news.id;
              const sentimentColor = news.sentiment === 'bullish' 
                ? 'text-accent-green bg-accent-green/10 border-accent-green/20' 
                : news.sentiment === 'bearish' 
                ? 'text-accent-red bg-accent-red/10 border-accent-red/20' 
                : 'text-dark-300 bg-dark-950 border-white/5';

              return (
                <motion.div
                  layout
                  key={news.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? 'bg-dark-900 border-accent-cyan/40 shadow-[0_0_15px_rgba(0,212,255,0.08)]' 
                      : 'bg-dark-950/40 border-white/5 hover:border-white/10 hover:bg-dark-900/20'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : news.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[9px] text-dark-400 font-bold uppercase tracking-wider">
                        <span>{news.source}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{news.time}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${sentimentColor}`}>
                        {news.sentiment}
                      </span>
                    </div>

                    <h4 className="text-xs text-white font-bold leading-snug group-hover:text-accent-cyan transition-colors">
                      {news.title}
                    </h4>
                  </div>

                  {/* expanded details widget */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden mt-4 pt-4 border-t border-white/5 space-y-4"
                        onClick={(e) => e.stopPropagation()} // Stop propagation from triggering click close
                      >
                        {/* Summary Block */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] text-accent-cyan font-black uppercase tracking-widest flex items-center gap-1">
                            <Brain size={11} /> Apexx AI Executive Summary
                          </span>
                          <p className="text-xs text-dark-200 leading-relaxed font-medium">
                            {news.summary}
                          </p>
                        </div>

                        {/* Impact Info */}
                        <div className="grid grid-cols-2 gap-3.5 bg-dark-950 p-3.5 rounded-xl border border-white/5">
                          <div className="space-y-1">
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">Financial Impact</span>
                            <p className="text-[10px] text-dark-200 font-semibold leading-relaxed">
                              {news.impact}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">AI Action Directive</span>
                            <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mt-1">
                              {news.rec}
                            </span>
                          </div>
                        </div>

                        {/* Analysis actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const activeQuote = quotes[news.symbol] || assets.find(a => a.symbol === news.symbol);
                              if (activeQuote && onSelectAsset) {
                                onSelectAsset(activeQuote);
                              } else {
                                toast.error('Asset metrics unavailable at this tick.');
                              }
                            }}
                            className="flex-1 bg-accent-cyan/10 hover:bg-accent-cyan text-accent-cyan hover:text-dark-955 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-accent-cyan/20 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                          >
                            <ExternalLink size={12} />
                            <span>Analyze {news.symbol} Chart</span>
                          </button>
                          
                          <div className="px-3 py-2 bg-dark-950 border border-white/5 rounded-xl flex items-center gap-1.5 shrink-0">
                            <span className="text-[9px] text-dark-400 font-bold uppercase">NLP Sentiment:</span>
                            <span className={`text-[10px] font-mono font-bold ${news.score >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                              {news.score >= 0 ? '+' : ''}{news.score.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center text-dark-400 text-xs font-semibold">
              No matching AI sentiment feeds active.
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
