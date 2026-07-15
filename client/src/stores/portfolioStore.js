import { create } from 'zustand';
import api from '../services/api';


// ── Demo data for static deployments (no backend) ──────
const DEMO_PORTFOLIO = {
  balance: 0.00,
  totalValue: 0.00,
  totalPnl: 0.00,
  totalPnlPercent: 0.00,
  dailyPnl: 0.00,
  holdings: [],
  transactions: []
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
  portfolio: DEMO_PORTFOLIO,
  trades: DEMO_TRADES,
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
