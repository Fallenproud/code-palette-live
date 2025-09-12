import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, MousePointer, Eye, EyeOff } from "lucide-react";

interface Layer {
  id: string;
  name: string;
  type: 'background' | 'content' | 'overlay' | 'decoration';
  zIndex: number;
  opacity: number;
  visible: boolean;
  content: React.ReactNode;
}

interface LayerStackProps {
  title?: string;
  enableParallax?: boolean;
  interactive?: boolean;
}

export function LayerStack({
  title = "Interactive Layer Stack",
  enableParallax = true,
  interactive = true
}: LayerStackProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 'bg',
      name: 'Background',
      type: 'background',
      zIndex: 1,
      opacity: 1,
      visible: true,
      content: (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-xl" />
      )
    },
    {
      id: 'grid',
      name: 'Grid Pattern',
      type: 'decoration',
      zIndex: 2,
      opacity: 0.3,
      visible: true,
      content: (
        <div className="w-full h-full bg-grid-pattern opacity-20" />
      )
    },
    {
      id: 'content',
      name: 'Main Content',
      type: 'content',
      zIndex: 3,
      opacity: 1,
      visible: true,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Layered Experience
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-md">
              This component demonstrates multiple interactive layers with parallax effects and depth.
            </p>
            <Badge variant="outline" className="px-4 py-2">
              <Layers className="w-4 h-4 mr-2" />
              Multi-layered Design
            </Badge>
          </div>
        </div>
      )
    },
    {
      id: 'particles',
      name: 'Floating Elements',
      type: 'decoration',
      zIndex: 4,
      opacity: 0.6,
      visible: true,
      content: (
        <div className="w-full h-full relative overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      )
    },
    {
      id: 'overlay',
      name: 'Interactive Overlay',
      type: 'overlay',
      zIndex: 5,
      opacity: 0.1,
      visible: true,
      content: (
        <div className="w-full h-full bg-gradient-radial from-primary/20 to-transparent" />
      )
    }
  ]);

  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('layer-stack')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const element = document.getElementById('layer-stack');
    element?.addEventListener('mousemove', handleMouseMove);
    
    return () => element?.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  };

  const getParallaxStyle = (layer: Layer) => {
    if (!enableParallax) return {};
    
    const intensity = layer.zIndex * 0.5;
    const offsetX = (mousePosition.x - 0.5) * intensity;
    const offsetY = (mousePosition.y - 0.5) * intensity;
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience depth and interactivity with layered components that respond to your movements.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Layer Stack Visualization */}
          <div className="lg:col-span-3">
            <Card className="relative h-96 overflow-hidden animate-fade-in">
              <div
                id="layer-stack"
                className="relative w-full h-full cursor-crosshair"
              >
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className="absolute inset-0"
                    style={{
                      zIndex: layer.zIndex,
                      opacity: layer.visible ? layer.opacity : 0,
                      ...getParallaxStyle(layer),
                      transition: layer.visible ? 'opacity 0.3s ease' : 'opacity 0.3s ease, transform 0.1s ease-out'
                    }}
                  >
                    {layer.content}
                  </div>
                ))}
                
                {/* Mouse indicator */}
                {interactive && (
                  <div
                    className="absolute w-4 h-4 bg-primary rounded-full pointer-events-none transition-all duration-100"
                    style={{
                      left: `${mousePosition.x * 100}%`,
                      top: `${mousePosition.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      opacity: mousePosition.x || mousePosition.y ? 0.6 : 0
                    }}
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Layer Controls */}
          <div className="space-y-4 animate-fade-in [animation-delay:200ms]">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Layer Controls
            </h3>
            
            {layers.map((layer) => (
              <Card key={layer.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        layer.type === 'background' ? 'border-blue-500 text-blue-500' :
                        layer.type === 'content' ? 'border-green-500 text-green-500' :
                        layer.type === 'overlay' ? 'border-purple-500 text-purple-500' :
                        'border-orange-500 text-orange-500'
                      }`}
                    >
                      {layer.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleLayerVisibility(layer.id)}
                  >
                    {layer.visible ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3 opacity-50" />
                    )}
                  </Button>
                </div>
                
                <div className="text-sm font-medium mb-1">{layer.name}</div>
                <div className="text-xs text-muted-foreground">
                  Z-Index: {layer.zIndex} • Opacity: {Math.round(layer.opacity * 100)}%
                </div>
              </Card>
            ))}
            
            <Card className="p-3 bg-muted/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MousePointer className="w-4 h-4" />
                <span>Move mouse to see parallax effect</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}