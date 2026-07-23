import { create } from 'zustand';
import api from '@/lib/api';

export interface Report {
  id: string;
  title: string;
  type: string;
  content: string;
  tags?: string;
  isPinned: boolean;
  createdAt: string;
}

interface ReportState {
  reports: Report[];
  isLoading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  generateReport: (title: string, type: string) => Promise<Report | null>;
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  isLoading: false,
  error: null,

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/reports');
      set({ reports: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to load reports', isLoading: false });
    }
  },

  generateReport: async (title: string, type: string) => {
    try {
      const response = await api.post('/reports', { title, type });
      const newReport = response.data;
      set((state) => ({ reports: [newReport, ...state.reports] }));
      return newReport;
    } catch (error: any) {
      console.error('Failed to generate report', error);
      return null;
    }
  }
}));
