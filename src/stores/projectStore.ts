import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  collaborators: string[];
  components: ComponentData[];
  settings: ProjectSettings;
}

export interface ComponentData {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children: ComponentData[];
  position: { x: number; y: number };
  size: { width: number; height: number };
  styles: Record<string, any>;
}

export interface ProjectSettings {
  theme: 'light' | 'dark';
  framework: 'react' | 'vue' | 'angular';
  styling: 'tailwind' | 'css' | 'styled-components';
  typescript: boolean;
}

interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  selectedComponents: string[];
  clipboard: ComponentData[];
  
  // Project management
  createProject: (name: string, description: string) => Promise<Project>;
  loadProject: (id: string) => Promise<void>;
  saveProject: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<Project>;
  
  // Component management
  addComponent: (component: ComponentData) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string, multi?: boolean) => void;
  copyComponents: (ids: string[]) => void;
  pasteComponents: () => void;
  
  // Project settings
  updateSettings: (settings: Partial<ProjectSettings>) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  projects: [],
  isLoading: false,
  selectedComponents: [],
  clipboard: [],

  createProject: async (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      collaborators: [],
      components: [],
      settings: {
        theme: 'dark',
        framework: 'react',
        styling: 'tailwind',
        typescript: true
      }
    };
    
    set(state => ({
      projects: [...state.projects, newProject],
      currentProject: newProject
    }));
    
    return newProject;
  },

  loadProject: async (id: string) => {
    set({ isLoading: true });
    const { projects } = get();
    const project = projects.find(p => p.id === id);
    set({ currentProject: project || null, isLoading: false });
  },

  saveProject: async () => {
    const { currentProject } = get();
    if (currentProject) {
      set(state => ({
        projects: state.projects.map(p => 
          p.id === currentProject.id 
            ? { ...currentProject, updatedAt: new Date() }
            : p
        )
      }));
    }
  },

  deleteProject: async (id: string) => {
    set(state => ({
      projects: state.projects.filter(p => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject
    }));
  },

  duplicateProject: async (id: string) => {
    const { projects } = get();
    const original = projects.find(p => p.id === id);
    if (original) {
      const duplicate: Project = {
        ...original,
        id: Date.now().toString(),
        name: `${original.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      set(state => ({ projects: [...state.projects, duplicate] }));
      return duplicate;
    }
    throw new Error('Project not found');
  },

  addComponent: (component: ComponentData) => {
    set(state => ({
      currentProject: state.currentProject ? {
        ...state.currentProject,
        components: [...state.currentProject.components, component]
      } : null
    }));
  },

  updateComponent: (id: string, updates: Partial<ComponentData>) => {
    set(state => ({
      currentProject: state.currentProject ? {
        ...state.currentProject,
        components: state.currentProject.components.map(c =>
          c.id === id ? { ...c, ...updates } : c
        )
      } : null
    }));
  },

  deleteComponent: (id: string) => {
    set(state => ({
      currentProject: state.currentProject ? {
        ...state.currentProject,
        components: state.currentProject.components.filter(c => c.id !== id)
      } : null,
      selectedComponents: state.selectedComponents.filter(cId => cId !== id)
    }));
  },

  selectComponent: (id: string, multi = false) => {
    set(state => ({
      selectedComponents: multi 
        ? state.selectedComponents.includes(id)
          ? state.selectedComponents.filter(cId => cId !== id)
          : [...state.selectedComponents, id]
        : [id]
    }));
  },

  copyComponents: (ids: string[]) => {
    const { currentProject } = get();
    if (currentProject) {
      const components = currentProject.components.filter(c => ids.includes(c.id));
      set({ clipboard: components });
    }
  },

  pasteComponents: () => {
    const { clipboard } = get();
    clipboard.forEach(component => {
      const newComponent = {
        ...component,
        id: Date.now().toString() + Math.random(),
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      };
      get().addComponent(newComponent);
    });
  },

  updateSettings: (settings: Partial<ProjectSettings>) => {
    set(state => ({
      currentProject: state.currentProject ? {
        ...state.currentProject,
        settings: { ...state.currentProject.settings, ...settings }
      } : null
    }));
  }
}));