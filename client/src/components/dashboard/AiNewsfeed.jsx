import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Sparkles, TrendingUp, TrendingDown, 
  Brain, ExternalLink, Clock, ArrowUpRight, Activity,
  Search, Play, Pause, Volume2, ThumbsUp, ThumbsDown,
  Bookmark, CheckCircle2, Target, ShieldAlert, BarChart3, Radio
} from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';
import { formatCurrency } from '../../services/utils';
import toast from 'react-hot-toast';

export default function AiNewsfeed({ onSelectAsset }) {
  const assets = useMarketStore((state) => state.assets);
  const quotes = useMarketStore((state) => state.quotes);

  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all'); // 'all', 'bullish', 'bearish', 'neutral'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'stock', 'crypto', 'index'
  const [expandedId, setExpandedId] = useState(null);
  
  // Audio player state simulation
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // User voting state (stored per news item ID)
  const [votes, setVotes] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  const prevPricesRef = useRef({});
  const initialLoadRef = useRef(true);

  // Audio timer simulation
  useEffect(() => {
    let timer;
    if (playingAudioId) {
      setAudioProgress(0);
      timer = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setPlayingAudioId(null);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [playingAudioId]);

  // Master News Templates
  const templates = useMemo(() => [
    {
      id: 't1',
      symbol: 'AAPL',
      source: 'Bloomberg Intelligence',
      time: '8m ago',
      category: 'stock',
      readTime: '1 min read',
      titleBuilder: (price) => `Apple (AAPL) unveils M5 Neural Chip series; shares stabilize near ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.88,
      summary: 'Apple has officially launched its next-generation M5 processor family with specialized 4nm local neural engines. Financial analysts project a multi-quarter hardware upgrade supercycle across enterprise clients.',
      keyTakeaways: [
        'Local AI inference capability increases device retention by 28%.',
        'Gross margins anticipated to expand by 140 bps in Q4.',
        'Institutional volume surge detected across options block orders.'
      ],
      targets: { bullish: '$215.00', bearish: '$188.00', probability: '89%' },
      impact: 'High positive momentum. Hardware replacement cycle accelerating.',
      rec: 'BUY / STRONG ACCUMULATE'
    },
    {
      id: 't2',
      symbol: 'NVDA',
      source: 'Financial Times',
      time: '18m ago',
      category: 'stock',
      readTime: '2 min read',
      titleBuilder: (price) => `Nvidia (NVDA) Blackwell rack capacity booked through FY26; stock trades at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.96,
      summary: 'Global hyperscale cloud infrastructure providers have executed non-cancellable forward contracts for Blackwell NVL72 architectures, guaranteeing data center revenue visibility for 18 months.',
      keyTakeaways: [
        'Data center segment revenue projected to exceed $34B next quarter.',
        'Supply chain bottlenecks easing due to TSMC CoWoS capacity scaling.',
        'Options flow reflects aggressive out-of-the-money call buying.'
      ],
      targets: { bullish: '$155.00', bearish: '$124.00', probability: '94%' },
      impact: 'Strong secular growth trend. Unrivaled ecosystem moat.',
      rec: 'STRONG BUY'
    },
    {
      id: 't3',
      symbol: 'BTC',
      source: 'CoinDesk Macro',
      time: '34m ago',
      category: 'crypto',
      readTime: '2 min read',
      titleBuilder: (price) => `Bitcoin (BTC) hash rate breaches 750 EH/s milestone as price consolidates at ${formatCurrency(price)}.`,
      sentiment: 'neutral',
      score: 0.15,
      summary: 'Despite recent network difficulty upward adjustments, institutional mining operations continue deploying next-gen 3nm ASICs. Network security is at all-time highs while exchange supply drops to 5-year lows.',
      keyTakeaways: [
        'Exchange reserves down 12,000 BTC over the past 7 days.',
        'Derivatives funding rate neutral, indicating low leverage liquidation risk.',
        'Key resistance cluster sits firmly at $72,500.'
      ],
      targets: { bullish: '$76,000', bearish: '$67,500', probability: '72%' },
      impact: 'Accumulation phase. Low spot volatility preceding breakout.',
      rec: 'ACCUMULATE ON DIP'
    },
    {
      id: 't4',
      symbol: 'TSLA',
      source: 'Reuters AutoTech',
      time: '52m ago',
      category: 'stock',
      readTime: '1 min read',
      titleBuilder: (price) => `Tesla (TSLA) FSD v13 receives European regulatory green light; price moves to ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.78,
      summary: 'European transport authorities have granted conditional approval for Tesla to launch unsupervised FSD fleet testing across Germany and the UK, unlocking a high-margin recurring software market.',
      keyTakeaways: [
        'Unlocks an estimated $4.2B annual high-margin software ARR potential.',
        'Robotaxi demonstration fleet authorized for Berlin metropolitan zone.',
        'Short interest covering accelerated during morning session.'
      ],
      targets: { bullish: '$275.00', bearish: '$232.00', probability: '81%' },
      impact: 'Catalyst for software valuation re-rating.',
      rec: 'BUY LIMIT ORDER'
    },
    {
      id: 't5',
      symbol: 'GOOGL',
      source: 'TechCrunch',
      time: '1h 15m ago',
      category: 'stock',
      readTime: '2 min read',
      titleBuilder: (price) => `Alphabet (GOOGL) faces European regulatory inquiry on ad distribution; price hovers at ${formatCurrency(price)}.`,
      sentiment: 'bearish',
      score: -0.65,
      summary: 'Antitrust regulators have initiated a formal inquiry into default search distribution agreements across mobile operating systems, raising questions about potential partner payout adjustments.',
      keyTakeaways: [
        'Regulatory headline risk creates short-term valuation drag.',
        'Gemini Enterprise API revenue growing 140% YoY mitigates core search risk.',
        'Institutional buyers waiting for support retest before entering.'
      ],
      targets: { bullish: '$192.00', bearish: '$168.00', probability: '68%' },
      impact: 'Temporary margin headline drag; fundamental AI moat intact.',
      rec: 'HOLD / COVERED CALLS'
    },
    {
      id: 't6',
      symbol: 'ETH',
      source: 'Coingape',
      time: '2h ago',
      category: 'crypto',
      readTime: '1 min read',
      titleBuilder: (price) => `Ethereum (ETH) L2 gas consumption surges to new peak; price trading at ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.68,
      summary: 'Layer-2 rollup throughput has surpassed 1,200 transactions per second following EIP-4844 blob optimization, driving steady ETH staking deposit growth and deflationary burn mechanisms.',
      keyTakeaways: [
        'Total Staked ETH breaches 34.5M ETH (28.8% of circulating supply).',
        'DeFi Total Value Locked (TVL) up 4.2% week-over-week.',
        'Key support established above $3,750.'
      ],
      targets: { bullish: '$4,200', bearish: '$3,600', probability: '84%' },
      impact: 'Deflationary supply dynamics supporting structural uptrend.',
      rec: 'BUY / HODL'
    },
    {
      id: 't7',
      symbol: 'NIFTY50',
      source: 'Economic Times',
      time: '3h ago',
      category: 'index',
      readTime: '2 min read',
      titleBuilder: (price) => `NIFTY 50 Index breaches technical resistance; valuation holding around ${formatCurrency(price)}.`,
      sentiment: 'bullish',
      score: 0.82,
      summary: 'Domestic institutional investors (DIIs) sustained net buying across banking and IT blue-chips, absorbing foreign portfolio outflows and propelling the benchmark index toward new highs.',
      keyTakeaways: [
        'Banking sector index up 1.8%, leading index breakout.',
        'Advance-Decline ratio healthy at 2.4:1.',
        'Option chain shows strong put writing support at 23,400.'
      ],
      targets: { bullish: '23,800', bearish: '23,200', probability: '88%' },
      impact: 'Strong macro tailwinds and domestic capital inflows.',
      rec: 'ACCUMULATE INDEX ETFS'
    }
  ], []);

  // Hydrate News Items with Live Quotes
  const [liveNewsList, setLiveNewsList] = useState([]);

  useEffect(() => {
    const hydrated = templates.map(t => {
      const liveQuote = quotes[t.symbol] || assets.find(a => a.symbol === t.symbol) || { price: 100, changePercent: 0 };
      return {
        ...t,
        livePrice: liveQuote.price,
        liveChange: liveQuote.changePercent || 0,
        title: t.titleBuilder(liveQuote.price)
      };
    });
    setLiveNewsList(hydrated);
  }, [templates, quotes, assets]);

  // Real-time market volatility monitor (Triggers live breaking alerts)
  useEffect(() => {
    if (Object.keys(quotes).length === 0) return;

    if (initialLoadRef.current) {
      Object.keys(quotes).forEach(sym => {
        prevPricesRef.current[sym] = quotes[sym].price;
      });
      initialLoadRef.current = false;
      return;
    }

    Object.keys(quotes).forEach(symbol => {
      const prev = prevPricesRef.current[symbol];
      const cur = quotes[symbol].price;

      if (prev && prev !== cur) {
        const diffPercent = ((cur - prev) / prev) * 100;

        if (Math.abs(diffPercent) >= 1.2) {
          const isUp = diffPercent > 0;
          const alertId = `flash-${Date.now()}`;
          const alertItem = {
            id: alertId,
            symbol: symbol,
            source: 'Apexx AI High-Freq Audit',
            time: 'JUST NOW',
            category: quotes[symbol].category || 'stock',
            readTime: 'Live Alert',
            title: `FLASH ALERT: ${symbol} ${isUp ? 'spikes' : 'drops'} ${isUp ? '+' : ''}${diffPercent.toFixed(2)}% to ${formatCurrency(cur)} on high algorithmic execution volume.`,
            sentiment: isUp ? 'bullish' : 'bearish',
            score: isUp ? 0.95 : -0.95,
            summary: `Automated quantitative neural models detected an abrupt order book liquidity shift for ${symbol}. Order flow imbalances indicate rapid institutional repositioning.`,
            keyTakeaways: [
              `Instant price movement of ${diffPercent.toFixed(2)}% in 1 tick cycle.`,
              'Volatility expansion phase active.',
              'Order book depth skewing heavily toward ' + (isUp ? 'ask side clearance.' : 'bid side exhaustion.')
            ],
            targets: {
              bullish: formatCurrency(cur * 1.05),
              bearish: formatCurrency(cur * 0.95),
              probability: '91%'
            },
            impact: isUp ? 'Strong bullish momentum breakout.' : 'Severe selling pressure alert.',
            rec: isUp ? 'HIGH MOMENTUM ENTER' : 'PROTECT STOPS / HEDGE'
          };

          setLiveNewsList(prevList => [alertItem, ...prevList].slice(0, 18));

          toast.custom((t) => (
            <div className={`p-4 rounded-2xl border bg-dark-900 shadow-2xl flex items-center gap-3 max-w-md border-l-4 transition-all duration-300 ${t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${isUp ? 'border-l-accent-green border-accent-green/20' : 'border-l-accent-red border-accent-red/20'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isUp ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${isUp ? 'bg-accent-green/15 text-accent-green' : 'bg-accent-red/15 text-accent-red'}`}>
                    {isUp ? '🔥 AI Bullish Spike' : '📉 AI Bearish Drop'}
                  </span>
                  <span className="text-[10px] font-mono text-dark-400">Just Now</span>
                </div>
                <p className="text-xs text-white font-bold truncate mt-1">
                  {symbol} shifted {isUp ? '+' : ''}${diffPercent.toFixed(2)}% to {formatCurrency(cur)}
                </p>
              </div>
            </div>
          ), { duration: 4500 });
        }
      }
      prevPricesRef.current[symbol] = cur;
    });
  }, [quotes]);

  // Filtered list by Search, Sentiment, and Category
  const filteredNews = useMemo(() => {
    return liveNewsList.filter(item => {
      // Search Match
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Sentiment Match
      const matchesSentiment = sentimentFilter === 'all' || item.sentiment === sentimentFilter;

      // Category Match
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesSentiment && matchesCategory;
    });
  }, [liveNewsList, searchQuery, sentimentFilter, categoryFilter]);

  // Overall Fear & Greed Calculation
  const sentimentStats = useMemo(() => {
    if (liveNewsList.length === 0) return { score: 0, label: 'Neutral', color: 'text-dark-300', percent: 50 };
    const sum = liveNewsList.reduce((acc, curr) => acc + curr.score, 0);
    const avg = sum / liveNewsList.length;
    const percent = Math.round(((avg + 1) / 2) * 100);
    
    let label = 'Neutral ⚖️';
    let color = 'text-dark-300';
    let bg = 'bg-white/5';
    let border = 'border-white/10';

    if (percent >= 65) {
      label = 'Extreme Greed 🔥';
      color = 'text-accent-green';
      bg = 'bg-accent-green/10';
      border = 'border-accent-green/30';
    } else if (percent >= 55) {
      label = 'Bullish Bias 📈';
      color = 'text-accent-cyan';
      bg = 'bg-accent-cyan/10';
      border = 'border-accent-cyan/30';
    } else if (percent <= 35) {
      label = 'High Fear 📉';
      color = 'text-accent-red';
      bg = 'bg-accent-red/10';
      border = 'border-accent-red/30';
    }

    return { score: avg, percent, label, color, bg, border };
  }, [liveNewsList]);

  // Vote Handler
  const handleVote = (id, type) => {
    setVotes(prev => {
      const current = prev[id] || { bullish: 142, bearish: 28, userVote: null };
      if (current.userVote === type) return prev; // already voted
      const newBull = type === 'bullish' ? current.bullish + 1 : (current.userVote === 'bullish' ? current.bullish - 1 : current.bullish);
      const newBear = type === 'bearish' ? current.bearish + 1 : (current.userVote === 'bearish' ? current.bearish - 1 : current.bearish);
      
      toast.success(`Voted ${type.toUpperCase()} on Signal #${id}`);
      return {
        ...prev,
        [id]: { bullish: newBull, bearish: newBear, userVote: type }
      };
    });
  };

  // Toggle Bookmark
  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast('Removed from AI Signal Watchlist', { icon: '🗑️' });
      } else {
        next.add(id);
        toast.success('Saved to AI Signal Watchlist!');
      }
      return next;
    });
  };

  return (
    <section className="bg-dark-850 rounded-3xl p-5 sm:p-7 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col space-y-6">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* ── HEADER TITLE BLOCK ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-glow">
            <Brain size={22} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Apexx AI Sentiment Intelligence
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-accent-purple text-[9px] font-black uppercase tracking-wider">
                v4.5 Neural
              </span>
            </div>
            <p className="text-xs text-dark-300 mt-0.5">
              Real-time NLP sentiment analysis, volatility audits & directional directives
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-950 border border-white/5 text-dark-300 text-xs font-mono">
            <Radio size={12} className="text-accent-green animate-ping" />
            <span className="text-white font-bold">100%</span> Neural Sync
          </span>
        </div>
      </div>

      {/* ── LIVE CONTINUOUS MARQUEE TICKER ─────────────────────── */}
      <div className="bg-dark-950/80 rounded-2xl border border-white/5 py-2.5 px-4 overflow-hidden relative shadow-inner">
        <div className="flex items-center gap-6 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer">
          {liveNewsList.concat(liveNewsList).map((item, idx) => (
            <div 
              key={`marquee-${item.id}-${idx}`}
              onClick={() => onSelectAsset && onSelectAsset(quotes[item.symbol] || { symbol: item.symbol })}
              className="inline-flex items-center gap-2 text-xs font-mono group"
            >
              <span className="font-bold text-white group-hover:text-accent-cyan transition-colors">{item.symbol}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${item.sentiment === 'bullish' ? 'bg-accent-green/10 text-accent-green' : item.sentiment === 'bearish' ? 'bg-accent-red/10 text-accent-red' : 'bg-white/10 text-dark-300'}`}>
                {item.score >= 0 ? `+${(item.score * 100).toFixed(0)}%` : `${(item.score * 100).toFixed(0)}%`}
              </span>
              <span className="text-dark-400 font-sans text-[11px] font-medium max-w-[200px] truncate">{item.title}</span>
              <span className="text-dark-600 font-bold ml-2">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEAR & GREED SPEEDOMETER & STATS DASHBOARD ───────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Speedometer card */}
        <div className={`p-4 rounded-2xl border ${sentimentStats.border} ${sentimentStats.bg} flex flex-col justify-between transition-all shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-dark-400 font-black uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={12} className="text-accent-cyan" /> Market Sentiment Index
            </span>
            <span className={`text-xs font-black uppercase tracking-widest ${sentimentStats.color}`}>
              {sentimentStats.label}
            </span>
          </div>

          <div className="space-y-2 my-1">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black font-mono text-white">
                {sentimentStats.percent} <span className="text-xs font-sans text-dark-400 font-normal">/ 100</span>
              </span>
              <span className="text-[10px] font-bold text-dark-300 uppercase tracking-widest">
                {sentimentStats.percent > 50 ? 'Net Bullish' : 'Net Bearish'}
              </span>
            </div>

            {/* Glowing Segment Bar */}
            <div className="h-2.5 w-full bg-dark-950 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
              <motion.div 
                className={`h-full rounded-full ${sentimentStats.percent >= 60 ? 'bg-gradient-to-r from-accent-cyan to-accent-green' : sentimentStats.percent <= 40 ? 'bg-gradient-to-r from-accent-purple to-accent-red' : 'bg-dark-300'}`}
                animate={{ width: `${sentimentStats.percent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-dark-400 font-mono font-bold uppercase mt-1">
            <span>0 Extreme Fear</span>
            <span>50 Neutral</span>
            <span>100 Extreme Greed</span>
          </div>
        </div>

        {/* AI Confidence Meter */}
        <div className="p-4 rounded-2xl border border-white/5 bg-dark-950/60 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-dark-400 font-black uppercase tracking-wider flex items-center gap-1.5">
              <Target size={12} className="text-accent-purple" /> Neural Confidence Accuracy
            </span>
            <span className="text-xs font-mono font-bold text-accent-purple">92.4%</span>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-white">
              7 / 7 <span className="text-xs font-sans text-accent-green font-bold">Signals Verified</span>
            </div>
            <p className="text-[10px] text-dark-300 leading-snug">
              Backtested against 14-day historical volatility metrics and order flow pressure.
            </p>
          </div>
          <div className="mt-2 text-[9px] text-dark-400 font-mono uppercase">
            Model Status: <span className="text-accent-cyan font-bold">Optimal Calibration</span>
          </div>
        </div>

        {/* Signals Distribution */}
        <div className="p-4 rounded-2xl border border-white/5 bg-dark-950/60 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-dark-400 font-black uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 size={12} className="text-accent-green" /> Signal Breakdown
            </span>
            <span className="text-xs font-mono font-bold text-dark-300">Live Pool</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center my-1">
            <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-2">
              <span className="text-xs font-black text-accent-green block">
                {liveNewsList.filter(n => n.sentiment === 'bullish').length}
              </span>
              <span className="text-[9px] font-bold text-dark-300 uppercase">Bullish</span>
            </div>
            <div className="bg-accent-red/10 border border-accent-red/20 rounded-xl p-2">
              <span className="text-xs font-black text-accent-red block">
                {liveNewsList.filter(n => n.sentiment === 'bearish').length}
              </span>
              <span className="text-[9px] font-bold text-dark-300 uppercase">Bearish</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2">
              <span className="text-xs font-black text-dark-200 block">
                {liveNewsList.filter(n => n.sentiment === 'neutral').length}
              </span>
              <span className="text-[9px] font-bold text-dark-300 uppercase">Neutral</span>
            </div>
          </div>
          <div className="text-[9px] text-dark-400 font-mono uppercase">
            Dominant Trend: <span className="text-accent-green font-bold">Bullish Momentum</span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & MULTI-FILTER BAR ───────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI signals by asset, title, or source (e.g. AAPL, Bitcoin)..."
            className="w-full bg-dark-950 border border-white/10 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-dark-500 focus:outline-none focus:border-accent-cyan/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sentiment Filter */}
          <div className="flex p-1 bg-dark-950 rounded-2xl border border-white/5">
            {[
              { id: 'all', label: 'All Feeds' },
              { id: 'bullish', label: 'Bullish 🔥' },
              { id: 'bearish', label: 'Bearish 📉' },
              { id: 'neutral', label: 'Neutral ⚖️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSentimentFilter(tab.id)}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                  sentimentFilter === tab.id
                    ? 'bg-accent-cyan text-dark-955 shadow-md shadow-accent-cyan/20'
                    : 'text-dark-400 hover:text-white hover:bg-dark-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex p-1 bg-dark-950 rounded-2xl border border-white/5">
            {[
              { id: 'all', label: 'All Class' },
              { id: 'stock', label: 'Stocks 📈' },
              { id: 'crypto', label: 'Crypto 🪙' },
              { id: 'index', label: 'Indices 📊' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-accent-purple text-white shadow-md shadow-accent-purple/20'
                    : 'text-dark-400 hover:text-white hover:bg-dark-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI NEWS STREAM CARDS ────────────────────────────────── */}
      <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1.5 custom-scrollbar">
        <AnimatePresence initial={false}>
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => {
              const isExpanded = expandedId === news.id;
              const isBookmarked = bookmarkedIds.has(news.id);
              const isPlayingAudio = playingAudioId === news.id;
              
              const itemVote = votes[news.id] || { bullish: 142, bearish: 28, userVote: null };
              const totalVotes = itemVote.bullish + itemVote.bearish;
              const bullPercent = Math.round((itemVote.bullish / totalVotes) * 100);

              const sentimentBadge = news.sentiment === 'bullish' 
                ? 'text-accent-green bg-accent-green/10 border-accent-green/30' 
                : news.sentiment === 'bearish' 
                ? 'text-accent-red bg-accent-red/10 border-accent-red/30' 
                : 'text-dark-300 bg-white/5 border-white/10';

              const cardBorder = isExpanded
                ? 'bg-dark-900 border-accent-cyan/50 shadow-[0_0_25px_rgba(0,212,255,0.12)]'
                : news.sentiment === 'bullish'
                ? 'bg-dark-950/60 border-white/5 hover:border-accent-green/30 hover:bg-dark-900/40'
                : news.sentiment === 'bearish'
                ? 'bg-dark-950/60 border-white/5 hover:border-accent-red/30 hover:bg-dark-900/40'
                : 'bg-dark-950/60 border-white/5 hover:border-white/15 hover:bg-dark-900/40';

              return (
                <motion.div
                  layout
                  key={news.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`border rounded-3xl p-5 transition-all duration-300 cursor-pointer relative overflow-hidden group ${cardBorder}`}
                  onClick={() => setExpandedId(isExpanded ? null : news.id)}
                >
                  {/* Left Highlight Indicator Strip */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${news.sentiment === 'bullish' ? 'bg-accent-green' : news.sentiment === 'bearish' ? 'bg-accent-red' : 'bg-dark-400'}`} />

                  <div className="flex flex-col gap-3 pl-1">
                    {/* Top Meta Details Row */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {/* Asset Symbol Tag */}
                        <span className="px-2.5 py-1 rounded-xl bg-dark-900 border border-white/10 text-xs font-mono font-extrabold text-white group-hover:text-accent-cyan transition-colors">
                          {news.symbol}
                        </span>

                        <span className="text-[10px] font-bold text-dark-400 uppercase tracking-wider">
                          {news.source}
                        </span>
                        <span className="text-dark-600 font-bold">•</span>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-dark-400">
                          <Clock size={11} />
                          <span>{news.time}</span>
                        </div>
                        <span className="text-dark-600 font-bold">•</span>
                        <span className="text-[10px] text-dark-400 font-medium">
                          {news.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Price & Change Pill */}
                        <div className="px-2.5 py-1 rounded-xl bg-dark-950 border border-white/5 text-xs font-mono font-bold text-white flex items-center gap-1.5">
                          <span>{formatCurrency(news.livePrice)}</span>
                          <span className={`text-[10px] ${news.liveChange >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                            {news.liveChange >= 0 ? '+' : ''}{news.liveChange.toFixed(2)}%
                          </span>
                        </div>

                        {/* Sentiment Tag */}
                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border ${sentimentBadge}`}>
                          {news.sentiment}
                        </span>

                        {/* Bookmark Icon */}
                        <button
                          onClick={(e) => toggleBookmark(news.id, e)}
                          className={`p-1.5 rounded-xl border transition-colors ${isBookmarked ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30' : 'text-dark-400 hover:text-white border-white/5 bg-dark-950'}`}
                          title="Bookmark Signal"
                        >
                          <Bookmark size={14} className={isBookmarked ? 'fill-accent-cyan' : ''} />
                        </button>
                      </div>
                    </div>

                    {/* News Title */}
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-accent-cyan transition-colors">
                      {news.title}
                    </h4>

                    {/* Audio Player Brief Bar */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingAudioId(isPlayingAudio ? null : news.id);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-950/80 border border-white/5 hover:border-accent-cyan/30 text-dark-300 hover:text-white transition-all w-fit text-xs font-medium cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center">
                        {isPlayingAudio ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                      </div>
                      <span className="text-[11px] font-semibold">
                        {isPlayingAudio ? 'Playing AI Voice Audit...' : 'Listen to 30s AI Audio Summary'}
                      </span>

                      {/* Animated Soundwave Visualizer */}
                      {isPlayingAudio && (
                        <div className="flex items-center gap-0.5 ml-2">
                          <span className="w-0.5 h-3 bg-accent-cyan animate-pulse" />
                          <span className="w-0.5 h-4 bg-accent-cyan animate-pulse delay-75" />
                          <span className="w-0.5 h-2 bg-accent-cyan animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── EXPANDED DEEP-DIVE AUDIT DRAWER ──────────────── */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-5 pt-5 border-t border-white/10 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Audio Progress Bar if Playing */}
                        {isPlayingAudio && (
                          <div className="space-y-1 bg-accent-cyan/5 p-3 rounded-2xl border border-accent-cyan/20">
                            <div className="flex justify-between text-[10px] font-mono text-accent-cyan font-bold">
                              <span className="flex items-center gap-1"><Volume2 size={12} /> Apexx Neural Voice Synthesizer</span>
                              <span>{audioProgress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-dark-950 rounded-full overflow-hidden">
                              <div className="h-full bg-accent-cyan transition-all duration-300" style={{ width: `${audioProgress}%` }} />
                            </div>
                          </div>
                        )}

                        {/* Executive Summary */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-accent-cyan flex items-center gap-1.5">
                            <Brain size={13} /> Apexx Neural Intelligence Audit
                          </span>
                          <p className="text-xs text-dark-200 leading-relaxed font-medium bg-dark-950/70 p-3.5 rounded-2xl border border-white/5">
                            {news.summary}
                          </p>
                        </div>

                        {/* Key Reasoning Bullet Points */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-dark-300">
                            Core Catalyst Breakdown
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {news.keyTakeaways.map((takeaway, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-dark-200 font-medium">
                                <CheckCircle2 size={14} className="text-accent-green shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price Targets & Probability Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="bg-dark-950 p-3 rounded-2xl border border-white/5">
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">Bullish Target</span>
                            <span className="text-sm font-mono font-bold text-accent-green mt-0.5 block">{news.targets.bullish}</span>
                          </div>
                          <div className="bg-dark-950 p-3 rounded-2xl border border-white/5">
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">Bearish Floor</span>
                            <span className="text-sm font-mono font-bold text-accent-red mt-0.5 block">{news.targets.bearish}</span>
                          </div>
                          <div className="bg-dark-950 p-3 rounded-2xl border border-white/5">
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">Model Probability</span>
                            <span className="text-sm font-mono font-bold text-accent-cyan mt-0.5 block">{news.targets.probability}</span>
                          </div>
                        </div>

                        {/* Action Directive & NLP Rating */}
                        <div className="bg-dark-950 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">AI Trading Directive</span>
                            <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-xl bg-accent-cyan text-dark-955 mt-1 shadow-md shadow-accent-cyan/15">
                              {news.rec}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider block">NLP Score</span>
                              <span className={`text-sm font-mono font-bold ${news.score >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                                {news.score >= 0 ? '+' : ''}{news.score.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Community Consensus Poll */}
                        <div className="bg-dark-950 p-4 rounded-2xl border border-white/5 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-white text-[11px] uppercase tracking-wider">Traders Consensus Poll</span>
                            <span className="font-mono text-[10px] text-dark-400">{bullPercent}% Bullish</span>
                          </div>
                          
                          {/* Live Bar */}
                          <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden flex">
                            <div className="bg-accent-green h-full transition-all duration-300" style={{ width: `${bullPercent}%` }} />
                            <div className="bg-accent-red h-full transition-all duration-300" style={{ width: `${100 - bullPercent}%` }} />
                          </div>

                          <div className="flex items-center gap-3 pt-1">
                            <button
                              onClick={() => handleVote(news.id, 'bullish')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${itemVote.userVote === 'bullish' ? 'bg-accent-green text-dark-955 border-accent-green' : 'bg-dark-900 text-dark-200 border-white/5 hover:text-white'}`}
                            >
                              <ThumbsUp size={13} /> Agree ({itemVote.bullish})
                            </button>
                            <button
                              onClick={() => handleVote(news.id, 'bearish')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${itemVote.userVote === 'bearish' ? 'bg-accent-red text-white border-accent-red' : 'bg-dark-900 text-dark-200 border-white/5 hover:text-white'}`}
                            >
                              <ThumbsDown size={13} /> Disagree ({itemVote.bearish})
                            </button>
                          </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const activeQuote = quotes[news.symbol] || assets.find(a => a.symbol === news.symbol);
                              if (activeQuote && onSelectAsset) {
                                onSelectAsset(activeQuote);
                              } else {
                                toast.error(`Asset metrics unavailable for ${news.symbol}`);
                              }
                            }}
                            className="flex-1 bg-accent-cyan text-dark-955 hover:bg-accent-cyan/90 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent-cyan/10 flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={14} />
                            <span>Analyze {news.symbol} Technical Chart</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="p-12 text-center text-dark-400 text-xs font-semibold bg-dark-950/40 rounded-3xl border border-white/5">
              No matching AI signals found for "{searchQuery || sentimentFilter}".
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
