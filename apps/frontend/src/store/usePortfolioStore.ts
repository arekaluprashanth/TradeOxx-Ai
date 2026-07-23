import { create } from 'zustand';

interface Holding {
  id: string;
  symbol: string;
  assetType: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number;
}

interface PortfolioSummary {
  totalValue: number;
  todayChange: number;
  todayChangePercent: number;
  totalUnrealizedGain: number;
  totalReturnPercent: number;
}

interface PortfolioState {
  holdings: Holding[];
  summary: PortfolioSummary | null;
  isLoading: boolean;
  error: string | null;
  
  // For V1.0, we will populate with mock data to feed the UI
  fetchPortfolioData: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  holdings: [],
  summary: null,
  isLoading: false,
  error: null,

  fetchPortfolioData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockHoldings: Holding[] = [
        { id: '1', symbol: 'AAPL', assetType: 'STOCK', quantity: 150, averageCost: 150.50, currentPrice: 175.20, marketValue: 26280, gainLoss: 3705, gainLossPercent: 16.4, allocation: 21.1 },
        { id: '2', symbol: 'MSFT', assetType: 'STOCK', quantity: 100, averageCost: 310.00, currentPrice: 415.50, marketValue: 41550, gainLoss: 10550, gainLossPercent: 34.0, allocation: 33.3 },
        { id: '3', symbol: 'BTC', assetType: 'CRYPTO', quantity: 0.5, averageCost: 45000, currentPrice: 64210, marketValue: 32105, gainLoss: 9605, gainLossPercent: 21.3, allocation: 25.7 },
        { id: '4', symbol: 'NVDA', assetType: 'STOCK', quantity: 30, averageCost: 450.00, currentPrice: 825.10, marketValue: 24753, gainLoss: 11253, gainLossPercent: 83.3, allocation: 19.9 },
      ];

      const summary: PortfolioSummary = {
        totalValue: 124688,
        todayChange: 2450.50,
        todayChangePercent: 2.1,
        totalUnrealizedGain: 35113,
        totalReturnPercent: 39.2,
      };

      set({ holdings: mockHoldings, summary, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
