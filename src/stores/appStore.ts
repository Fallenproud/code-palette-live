import { create } from 'zustand';

interface AppState {
  // App state
  isFullscreen: boolean;
  isPlaying: boolean;
  lastRefresh: Date | null;
  showCollaboration: boolean;
  shareModalOpen: boolean;
  
  // App actions
  toggleFullscreen: () => void;
  togglePlayMode: () => void;
  refreshApp: () => void;
  toggleCollaboration: () => void;
  openShareModal: () => void;
  closeShareModal: () => void;
  
  // Notification actions
  showNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isFullscreen: false,
  isPlaying: false,
  lastRefresh: null,
  showCollaboration: false,
  shareModalOpen: false,

  toggleFullscreen: () => {
    const { isFullscreen } = get();
    
    if (!isFullscreen) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    set({ isFullscreen: !isFullscreen });
  },

  togglePlayMode: () => {
    set(state => ({ isPlaying: !state.isPlaying }));
  },

  refreshApp: () => {
    // Refresh the current project/canvas state
    set({ lastRefresh: new Date() });
    
    // Could trigger a project reload, canvas refresh, etc.
    const event = new CustomEvent('app-refresh', { 
      detail: { timestamp: new Date() } 
    });
    window.dispatchEvent(event);
  },

  toggleCollaboration: () => {
    set(state => ({ showCollaboration: !state.showCollaboration }));
  },

  openShareModal: () => {
    set({ shareModalOpen: true });
  },

  closeShareModal: () => {
    set({ shareModalOpen: false });
  },

  showNotification: (type, message) => {
    // This could integrate with a toast system
    const event = new CustomEvent('show-notification', {
      detail: { type, message }
    });
    window.dispatchEvent(event);
  }
}));