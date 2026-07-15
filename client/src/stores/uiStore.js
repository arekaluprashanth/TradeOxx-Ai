import { create } from 'zustand';
import { persist } from 'zustand/middleware';


























let notificationCounter = 0;

export const useUiStore = create()(
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

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      setActiveTab: (tab) =>
        set({ activeTab: tab }),

      addNotification: (notification) => {
        const id = `notif-${Date.now()}-${++notificationCounter}`;
        const newNotification = {
          ...notification,
          id,
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },

      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'tradeoxx-ui-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
    }
  )
);
