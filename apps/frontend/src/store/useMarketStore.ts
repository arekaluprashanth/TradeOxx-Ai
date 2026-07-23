import { create } from 'zustand';

interface OHLCV {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  value: number; // for line series
  volume: number;
}

interface MarketOverview {
  indices: any[];
  topGainers: any[];
  topLosers: any[];
}

interface MarketState {
  overview: MarketOverview | null;
  activeAssetHistory: OHLCV[];
  isLoading: boolean;
  error: string | null;

  fetchOverview: () => Promise<void>;
  fetchAssetHistory: (symbol: string, timeframe?: string) => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  overview: null,
  activeAssetHistory: [],
  isLoading: false,
  error: null,

  fetchOverview: async () => {
    set({ isLoading: true });
    try {
      // Mock API delay
      await new Promise(res => setTimeout(res, 500));
      set({
        overview: {
          indices: [
            { name: 'S&P 500', value: 5123.40, change: 1.2 },
            { name: 'NASDAQ', value: 16234.10, change: 1.5 },
            { name: 'DOW JONES', value: 39120.50, change: 0.8 },
          ],
          topGainers: [
            { symbol: 'NVDA', price: 825.10, change: 4.2 },
            { symbol: 'AMD', price: 180.20, change: 3.8 },
            { symbol: 'META', price: 500.10, change: 2.1 },
          ],
          topLosers: [
            { symbol: 'TSLA', price: 175.40, change: -2.1 },
            { symbol: 'BA', price: 190.10, change: -1.8 },
            { symbol: 'SNOW', price: 150.00, change: -1.2 },
          ]
        },
        isLoading: false
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAssetHistory: async (symbol: string, timeframe = '1D') => {
    set({ isLoading: true });
    try {
      await new Promise(res => setTimeout(res, 500));
      // Algorithmic generation matching the backend for pure frontend speed in V1.0
      // In production, this would call the /api/markets/:symbol/history endpoint
      const data = [];
      let currentPrice = symbol === 'AAPL' ? 150 : (symbol === 'BTC' ? 60000 : 200);
      const date = new Date();
      date.setDate(date.getDate() - 200);

      for (let i = 0; i < 200; i++) {
        const volatility = currentPrice * 0.03; 
        const open = currentPrice;
        const close = open + (Math.random() - 0.48) * volatility;
        const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
        const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
        const volume = Math.floor(Math.random() * 1000000) + 500000;

        data.push({
          time: date.toISOString().split('T')[0],
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          value: Number(close.toFixed(2)),
          volume
        });
        currentPrice = close;
        date.setDate(date.getDate() + 1);
      }

      set({ activeAssetHistory: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
