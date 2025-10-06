import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Code, 
  Maximize2,
  RefreshCw
} from "lucide-react";
import { 
  HeroSection,
  TextBlock,
  ImageGallery,
  CTAButton,
  DataTable,
  LayerStack,
  CardGrid,
  TeamSection,
  StatsCounter,
  PricingTable
} from "./components";

interface LivePreviewProps {
  selectedComponent: string | null;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export function LivePreview({ selectedComponent }: LivePreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getViewportClasses = () => {
    switch (viewportSize) {
      case "mobile":
        return "max-w-sm";
      case "tablet":
        return "max-w-2xl";
      default:
        return "max-w-full";
    }
  };

  const renderPreviewContent = () => {
    if (!selectedComponent) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="w-32 h-32 bg-gradient-primary rounded-2xl mb-6 flex items-center justify-center">
            <Eye className="w-16 h-16 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Live Preview</h3>
          <p className="text-muted-foreground max-w-md">
            Select a component from the library to see it rendered in real-time
          </p>
        </div>
      );
    }

    // Render actual component based on selection
    switch (selectedComponent) {
      case "hero-section":
        return <HeroSection />;
      
      case "text-block":
        return <TextBlock />;
      
      case "image-gallery":
        return <ImageGallery />;
      
      case "cta-button":
        return <CTAButton />;
      
      case "data-table":
        return <DataTable />;
      
      case "layer-stack":
        return <LayerStack />;
      
      case "card-grid":
        return <CardGrid />;
      
      case "team-section":
        return <TeamSection />;
      
      case "stats-counter":
        return <StatsCounter />;
      
      case "pricing-table":
        return <PricingTable />;
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <Card className="p-8 max-w-md text-center bg-canvas-surface border-canvas-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {selectedComponent}
              </h3>
              <p className="text-muted-foreground">
                Component preview coming soon
              </p>
            </Card>
          </div>
        );
    }
  };

  const renderCodeView = () => {
    const codeExample = `
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="min-h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
          Build the Future with
          <span className="bg-gradient-primary bg-clip-text text-transparent"> AI Canvas</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create stunning applications with real-time AI assistance and live preview capabilities
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}`;

    return (
      <div className="h-full bg-canvas-bg border border-canvas-border rounded-lg">
        <pre className="p-6 text-sm text-foreground overflow-auto h-full">
          <code>{codeExample}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="p-4 bg-canvas-surface border-b border-canvas-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-ai-processing border-ai-processing/20">
            Live Preview
          </Badge>
          {selectedComponent && (
            <Badge variant="secondary">
              {selectedComponent.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-md bg-canvas-bg border border-canvas-border">
            <Button
              variant={viewMode === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("preview")}
              className="rounded-r-none"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "code" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("code")}
              className="rounded-l-none"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          {/* Viewport Controls */}
          <div className="flex rounded-md bg-canvas-bg border border-canvas-border">
            <Button
              variant={viewportSize === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("desktop")}
              className="rounded-r-none rounded-l-md"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={viewportSize === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("tablet")}
              className="rounded-none"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={viewportSize === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("mobile")}
              className="rounded-l-none rounded-r-md"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className={`mx-auto transition-all duration-300 ${getViewportClasses()}`}>
          <div className="bg-background rounded-lg shadow-panel min-h-[600px] border border-canvas-border overflow-hidden">
            {viewMode === "preview" ? renderPreviewContent() : renderCodeView()}
          </div>
        </div>
      </div>
    </div>
  );
}