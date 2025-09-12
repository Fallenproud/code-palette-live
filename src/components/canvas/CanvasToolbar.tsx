import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCanvasStore } from '@/stores/canvasStore';
import { useAppStore } from '@/stores/appStore';
import { 
  MousePointer2, 
  Hand, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Grid3X3, 
  Ruler, 
  Move,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Layers,
  Settings
} from 'lucide-react';

export function CanvasToolbar() {
  const {
    selectedTool,
    zoom,
    grid,
    guides,
    rulers,
    viewport,
    showLayers,
    showProperties,
    setSelectedTool,
    zoomIn,
    zoomOut,
    resetCanvas,
    fitToScreen,
    toggleGrid,
    toggleGuides,
    toggleRulers,
    setViewport,
    toggleLayers,
    toggleProperties
  } = useCanvasStore();
  
  const { toggleFullscreen } = useAppStore();

  const tools = [
    { id: 'select' as const, icon: MousePointer2, label: 'Select' },
    { id: 'hand' as const, icon: Hand, label: 'Pan' },
    { id: 'zoom' as const, icon: ZoomIn, label: 'Zoom' }
  ];

  const viewports = [
    { id: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { id: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { id: 'mobile' as const, icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="bg-canvas-surface border-b border-canvas-border px-4 py-2 flex items-center gap-4">
      {/* Tools */}
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setSelectedTool(tool.id)}
            title={tool.label}
          >
            <tool.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={zoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <Badge variant="outline" className="px-2 h-6 text-xs min-w-16 justify-center">
          {Math.round(zoom * 100)}%
        </Badge>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={zoomIn}
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={resetCanvas}
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={fitToScreen}
          title="Fit to Screen"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* View Options */}
      <div className="flex items-center gap-1">
        <Button
          variant={grid ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>

        <Button
          variant={guides ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleGuides}
          title="Toggle Guides"
        >
          <Move className="w-4 h-4" />
        </Button>

        <Button
          variant={rulers ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleRulers}
          title="Toggle Rulers"
        >
          <Ruler className="w-4 h-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Viewport Controls */}
      <div className="flex items-center gap-1">
        {viewports.map((vp) => (
          <Button
            key={vp.id}
            variant={viewport === vp.id ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setViewport(vp.id)}
            title={vp.label}
          >
            <vp.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Panel Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant={showLayers ? "default" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-1.5"
          onClick={toggleLayers}
        >
          <Layers className="w-4 h-4" />
          <span className="text-xs">Layers</span>
        </Button>

        <Button
          variant={showProperties ? "default" : "ghost"}
          size="sm"
          className="h-8 px-3 gap-1.5"
          onClick={toggleProperties}
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs">Properties</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}