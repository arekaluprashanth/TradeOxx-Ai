import { create } from 'zustand';
import api from '../lib/api';


// ── Demo data for static deployments (no backend) ──────
const DEMO_ASSETS = [
  { symbol: 'AAPL', name: 'Apple Inc.', category: 'stock', price: 198.45, change: 3.21, changePercent: 1.64, volume: 54230100, high: 199.80, low: 195.10, open: 195.50, marketCap: 3080000000000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', category: 'stock', price: 178.92, change: -1.45, changePercent: -0.80, volume: 28150000, high: 181.30, low: 177.60, open: 180.20, marketCap: 2210000000000 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', category: 'stock', price: 442.58, change: 5.67, changePercent: 1.30, volume: 22800000, high: 445.00, low: 437.90, open: 438.00, marketCap: 3290000000000 },
  { symbol: 'TSLA', name: 'Tesla Inc.', category: 'stock', price: 248.92, change: -4.33, changePercent: -1.71, volume: 98500000, high: 255.10, low: 247.30, open: 253.00, marketCap: 793000000000 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', category: 'stock', price: 135.40, change: 4.52, changePercent: 3.45, volume: 312000000, high: 136.80, low: 130.90, open: 131.50, marketCap: 3340000000000 },
  { symbol: 'NIFTY50', name: 'NIFTY 50 Index', category: 'index', price: 23512.45, change: 125.30, changePercent: 0.54, volume: 215000000, high: 23550.00, low: 23390.00, open: 23400.00 },
  { symbol: 'SENSEX', name: 'BSE SENSEX', category: 'index', price: 77203.15, change: 350.20, changePercent: 0.46, volume: 15000000, high: 77300.00, low: 76800.00, open: 76900.00 },
  { symbol: 'BTC', name: 'Bitcoin', category: 'crypto', price: 71245.00, change: 1823.50, changePercent: 2.63, volume: 42000000000, high: 72100.00, low: 69400.00, open: 69500.00 },
  { symbol: 'ETH', name: 'Ethereum', category: 'crypto', price: 3892.45, change: 87.30, changePercent: 2.29, volume: 18500000000, high: 3950.00, low: 3800.00, open: 3810.00 },
  { symbol: 'SOL', name: 'Solana', category: 'crypto', price: 145.20, change: 12.50, changePercent: 9.42, volume: 3500000000, high: 148.00, low: 132.00, open: 133.00 },
  { symbol: 'BNB', name: 'Binance Coin', category: 'crypto', price: 590.30, change: -15.40, changePercent: -2.54, volume: 1200000000, high: 610.00, low: 585.00, open: 605.00 },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', category: 'stock', price: 2985.40, change: 45.20, changePercent: 1.54, volume: 8500000, high: 3000.00, low: 2940.00, open: 2950.00 },
  { symbol: 'TCS', name: 'TCS Ltd.', category: 'stock', price: 3850.10, change: -25.40, changePercent: -0.66, volume: 2100000, high: 3890.00, low: 3820.00, open: 3880.00 },
];

function generateDemoCandles(basePrice, count = 100) {
  const candles = [];
  const now = Date.now();
  let price = basePrice * 0.85;
  for (let i = count; i >= 0; i--) {
    const volatility = price * 0.02;
    const open = price + (Math.random() - 0.48) * volatility;
    const close = open + (Math.random() - 0.45) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    candles.push({
      time: Math.floor((now - i * 86400000) / 1000),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(Math.random() * 50000000 + 10000000),
    });
    price = close;
  }
  return candles;
}



























export const useMarketStore = create((set, get) => ({
  // ── State ────────────────────────────────────────────
  assets: [],
  activeSymbol: 'AAPL',
  candles: {},
  quotes: {},
  chartType: 'candlestick',
  timeFrame: '1D',
  activeIndicators: [],
  comparisonSymbols: [],
  isLoading: false,

  // ── Actions ──────────────────────────────────────────

  setActiveSymbol: (symbol) => {
    set({ activeSymbol: symbol });
    // Auto-fetch candles for the newly selected symbol
    const { timeFrame } = get();
    get().fetchCandles(symbol, timeFrame);
  },

  fetchAssets: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/market/assets');
      const assets = data.assets;

      // Build quotes map from the asset list
      const quotes = {};
      assets.forEach((asset) => {
        quotes[asset.symbol] = asset;
      });

      set({ assets, quotes, isLoading: false });
    } catch (e) {
      // Fallback to demo data
      const quotes = {};
      DEMO_ASSETS.forEach((asset) => {
        quotes[asset.symbol] = asset;
      });
      set({ assets: DEMO_ASSETS, quotes, isLoading: false });
    }
  },

  fetchCandles: async (symbol, timeFrame) => {
    const tf = timeFrame || get().timeFrame;
    try {
      const { data } = await api.get(
        `/market/candles/${symbol}`,
        { params: { timeframe: tf } }
      );
      set((state) => ({
        candles: {
          ...state.candles,
          [symbol]: data.candles,
        },
      }));
    } catch (e2) {
      // Generate demo candles
      const asset = get().quotes[symbol] || DEMO_ASSETS[0];
      const demoCandles = generateDemoCandles(asset.price);
      set((state) => ({
        candles: {
          ...state.candles,
          [symbol]: demoCandles,
        },
      }));
    }
  },

  updateQuote: (symbol, data) => {
    set((state) => {
      const existing = state.quotes[symbol];
      if (!existing) return state;

      const updated = { ...existing, ...data };
      return {
        quotes: {
          ...state.quotes,
          [symbol]: updated,
        },
        // Also update the asset in the assets array
        assets: state.assets.map((a) =>
          a.symbol === symbol ? { ...a, ...data } : a
        ),
      };
    });
  },

  setChartType: (type) => set({ chartType: type }),

  setTimeFrame: (tf) => {
    set({ timeFrame: tf });
    const { activeSymbol } = get();
    get().fetchCandles(activeSymbol, tf);
  },

  toggleIndicator: (indicatorId) => {
    set((state) => {
      const active = state.activeIndicators.includes(indicatorId);
      return {
        activeIndicators: active
          ? state.activeIndicators.filter((id) => id !== indicatorId)
          : [...state.activeIndicators, indicatorId],
      };
    });
  },

  addComparison: (symbol) => {
    set((state) => {
      if (state.comparisonSymbols.includes(symbol)) return state;
      return {
        comparisonSymbols: [...state.comparisonSymbols, symbol],
      };
    });
  },

  removeComparison: (symbol) => {
    set((state) => ({
      comparisonSymbols: state.comparisonSymbols.filter((s) => s !== symbol),
    }));
  },
}));
