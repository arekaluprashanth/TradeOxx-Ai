import { create } from 'zustand';
import api from '@/lib/api';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  tags: string[];
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

interface NewsState {
  news: NewsArticle[];
  isLoading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
  news: [],
  isLoading: false,
  error: null,

  fetchNews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/news');
      set({ news: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to load news', isLoading: false });
    }
  }
}));
