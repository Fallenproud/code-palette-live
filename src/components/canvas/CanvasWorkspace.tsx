import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ActivityFeed } from "./ActivityFeed";
import { ComponentLibrary } from "./ComponentLibrary";
import { LivePreview } from "./LivePreview";
import { CanvasHeader } from "./CanvasHeader";
import { PropertiesPanel } from "./PropertiesPanel";
import { LayersPanel } from "./LayersPanel";
import { CanvasToolbar } from "./CanvasToolbar";
import { CommandPalette } from "./CommandPalette";
import { useCanvasStore } from "@/stores/canvasStore";

export function CanvasWorkspace() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const { showLayers, showProperties } = useCanvasStore();

  return (
    <div className="h-screen bg-canvas-bg flex flex-col">
      <CanvasHeader />
      <CanvasToolbar />
      <CommandPalette />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Component Library Sidebar */}
          <Panel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentLibrary 
              onComponentSelect={setSelectedComponent}
              selectedComponent={selectedComponent}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-canvas-border hover:bg-canvas-border-accent transition-colors duration-200 relative">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-muted-foreground/20 transform -translate-x-1/2" />
          </PanelResizeHandle>

          {/* Main Canvas Area */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-gradient-canvas border-l border-r border-canvas-border">
              <LivePreview selectedComponent={selectedComponent} />
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-canvas-border hover:bg-canvas-border-accent transition-colors duration-200 relative">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-muted-foreground/20 transform -translate-x-1/2" />
          </PanelResizeHandle>

          {/* Right Sidebar */}
          <Panel defaultSize={30} minSize={20} maxSize={40}>
            <div className="h-full flex flex-col gap-2 p-2">
              {showLayers && (
                <div className="flex-1">
                  <LayersPanel />
                </div>
              )}
              {showProperties && (
                <div className="flex-1">
                  <PropertiesPanel />
                </div>
              )}
              {!showLayers && !showProperties && (
                <div className="flex-1">
                  <ActivityFeed />
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}