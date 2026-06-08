import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Notification } from '../types';

interface UiState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  activeTab: string;
  notifications: Notification[];
  searchQuery: string;
}

interface UiActions {
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveTab: (tab: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setSearchQuery: (query: string) => void;
}

type UiStore = UiState & UiActions;

let notificationCounter = 0;

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      // ── State ────────────────────────────────────────────
      theme: 'dark',
      sidebarOpen: true,
      sidebarCollapsed: false,
      activeTab: 'dashboard',
      notifications: [],
      searchQuery: '',

      // ── Actions ──────────────────────────────────────────

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarCollapsed: (collapsed: boolean) =>
        set({ sidebarCollapsed: collapsed }),

      setActiveTab: (tab: string) =>
        set({ activeTab: tab }),

      addNotification: (notification) => {
        const id = `notif-${Date.now()}-${++notificationCounter}`;
        const newNotification: Notification = {
          ...notification,
          id,
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },

      markRead: (id: string) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      removeNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'tradesphere-ui-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
    }
  )
);
