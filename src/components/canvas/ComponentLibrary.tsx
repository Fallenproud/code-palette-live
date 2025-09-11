import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Layout, 
  Type, 
  Image, 
  MousePointer,
  Database,
  Layers,
  Zap
} from "lucide-react";

interface ComponentLibraryProps {
  onComponentSelect: (component: string) => void;
  selectedComponent: string | null;
}

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
}

const components: ComponentItem[] = [
  {
    id: "hero-section",
    name: "Hero Section",
    category: "Layout",
    icon: Layout,
    description: "Main landing page hero with call-to-action",
    tags: ["responsive", "modern"]
  },
  {
    id: "text-block",
    name: "Text Block",
    category: "Content",
    icon: Type,
    description: "Rich text content with typography",
    tags: ["content", "typography"]
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    category: "Media",
    icon: Image,
    description: "Responsive image grid with lightbox",
    tags: ["gallery", "responsive"]
  },
  {
    id: "cta-button",
    name: "CTA Button",
    category: "Interactive",
    icon: MousePointer,
    description: "Call-to-action button with animations",
    tags: ["interactive", "animated"]
  },
  {
    id: "data-table",
    name: "Data Table",
    category: "Display",
    icon: Database,
    description: "Sortable data table with filters",
    tags: ["data", "sortable"]
  },
  {
    id: "layer-stack",
    name: "Layer Stack",
    category: "Layout",
    icon: Layers,
    description: "Stacked content layers with parallax",
    tags: ["3d", "parallax"]
  }
];

export function ComponentLibrary({ onComponentSelect, selectedComponent }: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(components.map(c => c.category))];
  
  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || component.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-canvas-surface border-r border-canvas-border flex flex-col">
      <div className="p-4 border-b border-canvas-border">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Components</h2>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-canvas-bg border-canvas-border focus:border-primary"
          />
        </div>
      </div>

      <div className="p-4 border-b border-canvas-border">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => onComponentSelect(component.id)}
              className={`
                p-3 rounded-lg cursor-pointer transition-all duration-200 border
                ${selectedComponent === component.id 
                  ? 'bg-primary/10 border-primary/30 shadow-glow' 
                  : 'bg-canvas-bg border-canvas-border hover:bg-canvas-surface-hover hover:border-canvas-border-accent'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-md
                  ${selectedComponent === component.id 
                    ? 'bg-primary/20' 
                    : 'bg-muted/20'
                  }
                `}>
                  <component.icon className={`
                    w-4 h-4 
                    ${selectedComponent === component.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                    }
                  `} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{component.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {component.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {component.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredComponents.length === 0 && (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No components found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}