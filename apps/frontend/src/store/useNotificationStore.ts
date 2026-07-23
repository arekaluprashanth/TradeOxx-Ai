import { create } from 'zustand';
import api from '@/lib/api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/notifications');
      const notifications = response.data;
      const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;
      set({ notifications, unreadCount, isLoading: false });
    } catch (error) {
      console.error('Failed to load notifications', error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      // Optimistic update
      const { notifications } = get();
      const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
      set({ 
        notifications: updated,
        unreadCount: updated.filter(n => !n.isRead).length
      });
      await api.patch(`/notifications/${id}/read`);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  },

  markAllAsRead: async () => {
    try {
      // Optimistic update
      const { notifications } = get();
      set({ 
        notifications: notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
      });
      await api.patch('/notifications/read-all');
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  }
}));
