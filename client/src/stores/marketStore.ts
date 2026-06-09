import { create } from 'zustand';
import api from '../lib/api';
import type { Asset, Candle, ChartType, TimeFrame } from '../types';

// ── Demo data for static deployments (no backend) ──────
const DEMO_ASSETS: Asset[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', category: 'stock', price: 198.45, change: 3.21, changePercent: 1.64, volume: 54_230_100, high: 199.80, low: 195.10, open: 195.50, marketCap: 3_080_000_000_000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', category: 'stock', price: 178.92, change: -1.45, changePercent: -0.80, volume: 28_150_000, high: 181.30, low: 177.60, open: 180.20, marketCap: 2_210_000_000_000 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', category: 'stock', price: 442.58, change: 5.67, changePercent: 1.30, volume: 22_800_000, high: 445.00, low: 437.90, open: 438.00, marketCap: 3_290_000_000_000 },
  { symbol: 'TSLA', name: 'Tesla Inc.', category: 'stock', price: 248.92, change: -4.33, changePercent: -1.71, volume: 98_500_000, high: 255.10, low: 247.30, open: 253.00, marketCap: 793_000_000_000 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', category: 'stock', price: 135.40, change: 4.52, changePercent: 3.45, volume: 312_000_000, high: 136.80, low: 130.90, open: 131.50, marketCap: 3_340_000_000_000 },
  { symbol: 'NIFTY50', name: 'NIFTY 50 Index', category: 'index', price: 23512.45, change: 125.30, changePercent: 0.54, volume: 215_000_000, high: 23550.00, low: 23390.00, open: 23400.00 },
  { symbol: 'SENSEX', name: 'BSE SENSEX', category: 'index', price: 77203.15, change: 350.20, changePercent: 0.46, volume: 15_000_000, high: 77300.00, low: 76800.00, open: 76900.00 },
  { symbol: 'BTC', name: 'Bitcoin', category: 'crypto', price: 71_245.00, change: 1_823.50, changePercent: 2.63, volume: 42_000_000_000, high: 72_100.00, low: 69_400.00, open: 69_500.00 },
  { symbol: 'ETH', name: 'Ethereum', category: 'crypto', price: 3_892.45, change: 87.30, changePercent: 2.29, volume: 18_500_000_000, high: 3_950.00, low: 3_800.00, open: 3_810.00 },
  { symbol: 'SOL', name: 'Solana', category: 'crypto', price: 145.20, change: 12.50, changePercent: 9.42, volume: 3_500_000_000, high: 148.00, low: 132.00, open: 133.00 },
  { symbol: 'BNB', name: 'Binance Coin', category: 'crypto', price: 590.30, change: -15.40, changePercent: -2.54, volume: 1_200_000_000, high: 610.00, low: 585.00, open: 605.00 },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', category: 'stock', price: 2985.40, change: 45.20, changePercent: 1.54, volume: 8_500_000, high: 3000.00, low: 2940.00, open: 2950.00 },
  { symbol: 'TCS', name: 'TCS Ltd.', category: 'stock', price: 3850.10, change: -25.40, changePercent: -0.66, volume: 2_100_000, high: 3890.00, low: 3820.00, open: 3880.00 },
];

function generateDemoCandles(basePrice: number, count: number = 100): Candle[] {
  const candles: Candle[] = [];
  const now = Date.now();
  let price = basePrice * 0.85;
  for (let i = count; i >= 0; i--) {
    const volatility = price * 0.02;
    const open = price + (Math.random() - 0.48) * volatility;
    const close = open + (Math.random() - 0.45) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    candles.push({
      time: Math.floor((now - i * 86_400_000) / 1000),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(Math.random() * 50_000_000 + 10_000_000),
    });
    price = close;
  }
  return candles;
}

interface MarketState {
  assets: Asset[];
  activeSymbol: string;
  candles: Record<string, Candle[]>;
  quotes: Record<string, Asset>;
  chartType: ChartType;
  timeFrame: TimeFrame;
  activeIndicators: string[];
  comparisonSymbols: string[];
  isLoading: boolean;
}

interface MarketActions {
  setActiveSymbol: (symbol: string) => void;
  fetchAssets: () => Promise<void>;
  fetchCandles: (symbol: string, timeFrame?: TimeFrame) => Promise<void>;
  updateQuote: (symbol: string, data: Partial<Asset>) => void;
  setChartType: (type: ChartType) => void;
  setTimeFrame: (tf: TimeFrame) => void;
  toggleIndicator: (indicatorId: string) => void;
  addComparison: (symbol: string) => void;
  removeComparison: (symbol: string) => void;
}

type MarketStore = MarketState & MarketActions;

export const useMarketStore = create<MarketStore>((set, get) => ({
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

  setActiveSymbol: (symbol: string) => {
    set({ activeSymbol: symbol });
    // Auto-fetch candles for the newly selected symbol
    const { timeFrame } = get();
    get().fetchCandles(symbol, timeFrame);
  },

  fetchAssets: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get<{ assets: Asset[] }>('/market/assets');
      const assets = data.assets;

      // Build quotes map from the asset list
      const quotes: Record<string, Asset> = {};
      assets.forEach((asset) => {
        quotes[asset.symbol] = asset;
      });

      set({ assets, quotes, isLoading: false });
    } catch {
      // Fallback to demo data
      const quotes: Record<string, Asset> = {};
      DEMO_ASSETS.forEach((asset) => {
        quotes[asset.symbol] = asset;
      });
      set({ assets: DEMO_ASSETS, quotes, isLoading: false });
    }
  },

  fetchCandles: async (symbol: string, timeFrame?: TimeFrame) => {
    const tf = timeFrame || get().timeFrame;
    try {
      const { data } = await api.get<{ candles: Candle[] }>(
        `/market/candles/${symbol}`,
        { params: { timeframe: tf } }
      );
      set((state) => ({
        candles: {
          ...state.candles,
          [symbol]: data.candles,
        },
      }));
    } catch {
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

  updateQuote: (symbol: string, data: Partial<Asset>) => {
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

  setChartType: (type: ChartType) => set({ chartType: type }),

  setTimeFrame: (tf: TimeFrame) => {
    set({ timeFrame: tf });
    const { activeSymbol } = get();
    get().fetchCandles(activeSymbol, tf);
  },

  toggleIndicator: (indicatorId: string) => {
    set((state) => {
      const active = state.activeIndicators.includes(indicatorId);
      return {
        activeIndicators: active
          ? state.activeIndicators.filter((id) => id !== indicatorId)
          : [...state.activeIndicators, indicatorId],
      };
    });
  },

  addComparison: (symbol: string) => {
    set((state) => {
      if (state.comparisonSymbols.includes(symbol)) return state;
      return {
        comparisonSymbols: [...state.comparisonSymbols, symbol],
      };
    });
  },

  removeComparison: (symbol: string) => {
    set((state) => ({
      comparisonSymbols: state.comparisonSymbols.filter((s) => s !== symbol),
    }));
  },
}));
