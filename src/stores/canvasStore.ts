import { create } from 'zustand';

interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  grid: boolean;
  guides: boolean;
  rulers: boolean;
  selectedTool: 'select' | 'hand' | 'zoom';
  viewport: 'desktop' | 'tablet' | 'mobile';
  showLayers: boolean;
  showProperties: boolean;
  
  // Canvas actions
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleGrid: () => void;
  toggleGuides: () => void;
  toggleRulers: () => void;
  setSelectedTool: (tool: 'select' | 'hand' | 'zoom') => void;
  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  toggleLayers: () => void;
  toggleProperties: () => void;
  resetCanvas: () => void;
  fitToScreen: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  zoom: 1,
  pan: { x: 0, y: 0 },
  grid: true,
  guides: true,
  rulers: false,
  selectedTool: 'select',
  viewport: 'desktop',
  showLayers: true,
  showProperties: true,

  setZoom: (zoom: number) => {
    set({ zoom: Math.max(0.1, Math.min(5, zoom)) });
  },

  setPan: (pan: { x: number; y: number }) => {
    set({ pan });
  },

  toggleGrid: () => {
    set(state => ({ grid: !state.grid }));
  },

  toggleGuides: () => {
    set(state => ({ guides: !state.guides }));
  },

  toggleRulers: () => {
    set(state => ({ rulers: !state.rulers }));
  },

  setSelectedTool: (tool: 'select' | 'hand' | 'zoom') => {
    set({ selectedTool: tool });
  },

  setViewport: (viewport: 'desktop' | 'tablet' | 'mobile') => {
    set({ viewport });
  },

  toggleLayers: () => {
    set(state => ({ showLayers: !state.showLayers }));
  },

  toggleProperties: () => {
    set(state => ({ showProperties: !state.showProperties }));
  },

  resetCanvas: () => {
    set({ zoom: 1, pan: { x: 0, y: 0 } });
  },

  fitToScreen: () => {
    // Implementation would calculate optimal zoom and pan
    set({ zoom: 1, pan: { x: 0, y: 0 } });
  },

  zoomIn: () => {
    const { zoom } = get();
    set({ zoom: Math.min(5, zoom * 1.2) });
  },

  zoomOut: () => {
    const { zoom } = get();
    set({ zoom: Math.max(0.1, zoom * 0.8) });
  }
}));