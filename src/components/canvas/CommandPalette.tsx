import { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { useProjectStore } from '@/stores/projectStore';
import { useCanvasStore } from '@/stores/canvasStore';
import { 
  Search,
  Plus, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Move,
  Layers,
  Settings,
  Save,
  Download,
  Upload,
  Undo,
  Redo
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { currentProject, selectedComponents, deleteComponent, copyComponents, pasteComponents } = useProjectStore();
  const { toggleGrid, toggleGuides, zoomIn, zoomOut, resetCanvas, toggleLayers, toggleProperties } = useCanvasStore();

  useHotkeys('mod+k', (e) => {
    e.preventDefault();
    setOpen(true);
  });

  useHotkeys('escape', () => {
    setOpen(false);
  });

  const commands = [
    // Project Commands
    {
      category: 'Project',
      items: [
        { id: 'save', label: 'Save Project', icon: Save, shortcut: '⌘S', action: () => console.log('Save') },
        { id: 'export', label: 'Export Code', icon: Download, action: () => console.log('Export') },
        { id: 'import', label: 'Import Components', icon: Upload, action: () => console.log('Import') }
      ]
    },
    // Component Commands
    {
      category: 'Components',
      items: [
        { id: 'add-button', label: 'Add Button', icon: Plus, action: () => console.log('Add Button') },
        { id: 'add-text', label: 'Add Text', icon: Plus, action: () => console.log('Add Text') },
        { id: 'add-image', label: 'Add Image', icon: Plus, action: () => console.log('Add Image') },
        { id: 'copy', label: 'Copy Selected', icon: Copy, shortcut: '⌘C', action: () => copyComponents(selectedComponents) },
        { id: 'paste', label: 'Paste', icon: Copy, shortcut: '⌘V', action: () => pasteComponents() },
        { id: 'delete', label: 'Delete Selected', icon: Trash2, shortcut: 'Del', action: () => selectedComponents.forEach(id => deleteComponent(id)) }
      ]
    },
    // View Commands
    {
      category: 'View',
      items: [
        { id: 'zoom-in', label: 'Zoom In', icon: ZoomIn, shortcut: '⌘+', action: zoomIn },
        { id: 'zoom-out', label: 'Zoom Out', icon: ZoomOut, shortcut: '⌘-', action: zoomOut },
        { id: 'reset-view', label: 'Reset View', icon: Move, shortcut: '⌘0', action: resetCanvas },
        { id: 'toggle-grid', label: 'Toggle Grid', icon: Grid3X3, shortcut: '⌘G', action: toggleGrid },
        { id: 'toggle-guides', label: 'Toggle Guides', icon: Move, action: toggleGuides },
        { id: 'toggle-layers', label: 'Toggle Layers Panel', icon: Layers, shortcut: '⌘L', action: toggleLayers },
        { id: 'toggle-properties', label: 'Toggle Properties Panel', icon: Settings, shortcut: '⌘P', action: toggleProperties }
      ]
    }
  ];

  const executeCommand = (command: any) => {
    command.action();
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {commands.map((group, index) => (
          <div key={group.category}>
            <CommandGroup heading={group.category}>
              {group.items.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={() => executeCommand(command)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <command.icon className="w-4 h-4" />
                  <span className="flex-1">{command.label}</span>
                  {command.shortcut && (
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {command.shortcut}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {index < commands.length - 1 && <CommandSeparator />}
          </div>
        ))}

        {/* Recent Projects */}
        {currentProject && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Current Project">
              <CommandItem className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded" />
                <span>{currentProject.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {currentProject.components.length} components
                </span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {/* Quick Actions */}
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => setOpen(false)} className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search Components</span>
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded ml-auto">
              ⌘F
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}