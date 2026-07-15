import { create } from 'zustand';
import api from '../lib/api';


// ── Demo data for static deployments (no backend) ──────
const DEMO_PORTFOLIO = {
  balance: 87432.50,
  totalValue: 124890.75,
  totalPnl: 24890.75,
  totalPnlPercent: 24.89,
  dailyPnl: 1245.30,
  holdings: [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, avgPrice: 185.20, currentPrice: 198.45, value: 9922.50, pnl: 662.50, pnlPercent: 7.15 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 100, avgPrice: 118.50, currentPrice: 135.40, value: 13540.00, pnl: 1690.00, pnlPercent: 14.26 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 20, avgPrice: 420.00, currentPrice: 442.58, value: 8851.60, pnl: 451.60, pnlPercent: 5.37 },
    { symbol: 'BTC', name: 'Bitcoin', quantity: 0.05, avgPrice: 64000.00, currentPrice: 71245.00, value: 3562.25, pnl: 362.25, pnlPercent: 11.32 },
    { symbol: 'ETH', name: 'Ethereum', quantity: 0.5, avgPrice: 3500.00, currentPrice: 3892.45, value: 1946.23, pnl: 196.23, pnlPercent: 11.21 },
  ],
};

const DEMO_TRADES = [
  { id: 't1', symbol: 'NVDA', type: 'buy', quantity: 50, price: 118.50, total: 5925.00, fee: 5.93, timestamp: Date.now() - 86400000 * 5, pnl: 845.00 },
  { id: 't2', symbol: 'AAPL', type: 'buy', quantity: 25, price: 185.20, total: 4630.00, fee: 4.63, timestamp: Date.now() - 86400000 * 4, pnl: 331.25 },
  { id: 't3', symbol: 'MSFT', type: 'buy', quantity: 20, price: 420.00, total: 8400.00, fee: 8.40, timestamp: Date.now() - 86400000 * 3, pnl: 451.60 },
  { id: 't4', symbol: 'NVDA', type: 'buy', quantity: 50, price: 118.50, total: 5925.00, fee: 5.93, timestamp: Date.now() - 86400000 * 2, pnl: 845.00 },
  { id: 't5', symbol: 'AAPL', type: 'buy', quantity: 25, price: 185.20, total: 4630.00, fee: 4.63, timestamp: Date.now() - 86400000 * 1, pnl: 331.25 },
  { id: 't6', symbol: 'BTC', type: 'buy', quantity: 0.05, price: 64000.00, total: 3200.00, fee: 3.20, timestamp: Date.now() - 43200000, pnl: 362.25 },
];




















export const usePortfolioStore = create((set, get) => ({
  // ── State ────────────────────────────────────────────
  portfolio: null,
  trades: [],
  isLoading: false,
  error: null,

  // ── Actions ──────────────────────────────────────────

  fetchPortfolio: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/portfolio');
      set({ portfolio: data.portfolio, isLoading: false });
    } catch (e) {
      // Fallback to demo data
      set({ portfolio: DEMO_PORTFOLIO, isLoading: false, error: null });
    }
  },

  executeTrade: async (
    symbol,
    type,
    quantity
  ) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post(
        '/portfolio/trade',
        { symbol, type, quantity }
      );

      await get().fetchPortfolio();
      set((state) => ({
        trades: [data.trade, ...state.trades],
        isLoading: false,
      }));

      return data.trade;
    } catch (e2) {
      // Demo trade
      const demoTrade = {
        id: `demo-${Date.now()}`,
        symbol,
        type,
        quantity,
        price: 100,
        total: quantity * 100,
        fee: quantity * 0.01,
        timestamp: Date.now(),
      };
      set((state) => ({
        trades: [demoTrade, ...state.trades],
        isLoading: false,
        error: null,
      }));
      return demoTrade;
    }
  },

  fetchTradeHistory: async () => {
    try {
      const { data } = await api.get('/portfolio/history');
      set({ trades: data.trades });
    } catch (e3) {
      // Fallback to demo trades
      set({ trades: DEMO_TRADES });
    }
  },
}));
