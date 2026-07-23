import { create } from 'zustand';
import api from '@/lib/api';

export interface ProfileSettings {
  displayName?: string;
  avatarUrl?: string;
  language: string;
  timezone: string;
  theme: string;
  density: string;
  currency: string;
  aiMemory: string;
  aiLevel: string;
  marketingEmails: boolean;
  securityAlerts: boolean;
}

interface SettingsState {
  profile: ProfileSettings | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<ProfileSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/settings/profile');
      set({ profile: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to load profile', isLoading: false });
    }
  },

  updateProfile: async (data: Partial<ProfileSettings>) => {
    try {
      // Optimistic update
      const currentProfile = get().profile;
      if (currentProfile) {
        set({ profile: { ...currentProfile, ...data } });
      }
      
      await api.patch('/settings/profile', data);
    } catch (error: any) {
      console.error('Failed to update profile', error);
      // Revert on error could be implemented here
    }
  }
}));
