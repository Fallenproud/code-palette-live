import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Mock login - replace with actual auth
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          plan: 'free'
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        // Mock registration - replace with actual auth
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
          id: '1',
          email,
          name,
          plan: 'free'
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);