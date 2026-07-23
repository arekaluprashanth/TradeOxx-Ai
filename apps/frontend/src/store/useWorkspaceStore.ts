import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WidgetState {
  id: string;
  visible: boolean;
  order: number;
}

interface WorkspaceState {
  sidebarExpanded: boolean;
  commandPaletteOpen: boolean;
  widgets: WidgetState[];
  
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleWidget: (id: string) => void;
  resetWidgets: () => void;
}

const defaultWidgets: WidgetState[] = [
  { id: 'welcome', visible: true, order: 0 },
  { id: 'portfolio', visible: true, order: 1 },
  { id: 'market', visible: true, order: 2 },
  { id: 'ai-brief', visible: true, order: 3 },
  { id: 'news', visible: true, order: 4 },
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      sidebarExpanded: true,
      commandPaletteOpen: false,
      widgets: defaultWidgets,

      toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
      setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      
      toggleWidget: (id) => set((state) => ({
        widgets: state.widgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w)
      })),
      resetWidgets: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: 'tradeoxx-workspace',
      partialize: (state) => ({ 
        sidebarExpanded: state.sidebarExpanded,
        widgets: state.widgets 
      }), // Don't persist command palette state
    }
  )
);
