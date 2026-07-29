import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  profile?: {
    displayName: string;
    avatarUrl: string | null;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'mock-user-123',
        email: 'user@tradeoxx.ai',
        profile: {
          displayName: 'TradeOXX User',
          avatarUrl: null
        }
      },
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false,

      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'tradeoxx-auth-v2',
    }
  )
);
