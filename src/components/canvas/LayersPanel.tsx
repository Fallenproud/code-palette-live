import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjectStore, ComponentData } from '@/stores/projectStore';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  ChevronRight, 
  ChevronDown,
  Square,
  Circle,
  Type,
  Image,
  MoreVertical
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function LayersPanel() {
  const { currentProject, selectedComponents, selectComponent, updateComponent, deleteComponent } = useProjectStore();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const components = currentProject?.components || [];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'button': return Square;
      case 'text': return Type;
      case 'image': return Image;
      case 'container': return Square;
      default: return Circle;
    }
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderComponent = (component: ComponentData, level = 0) => {
    const Icon = getComponentIcon(component.type);
    const isSelected = selectedComponents.includes(component.id);
    const hasChildren = component.children && component.children.length > 0;
    const isExpanded = expandedNodes.has(component.id);

    return (
      <div key={component.id} className="select-none">
        <div 
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-accent cursor-pointer ${
            isSelected ? 'bg-accent text-accent-foreground' : ''
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => selectComponent(component.id)}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(component.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          ) : (
            <div className="w-4" />
          )}

          <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          
          <span className="flex-1 truncate">{component.name}</span>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                updateComponent(component.id, {
                  props: { ...component.props, visible: !component.props.visible }
                });
              }}
            >
              {component.props.visible !== false ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3 text-muted-foreground" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                updateComponent(component.id, {
                  props: { ...component.props, locked: !component.props.locked }
                });
              }}
            >
              {component.props.locked ? (
                <Lock className="w-3 h-3" />
              ) : (
                <Unlock className="w-3 h-3 text-muted-foreground" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => selectComponent(component.id)}>
                  Select
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => updateComponent(component.id, { name: `${component.name} Copy` })}
                >
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => deleteComponent(component.id)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {component.children.map((child) => renderComponent(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Layers className="w-4 h-4" />
          Layers
        </CardTitle>
        <Input
          placeholder="Search layers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8 text-xs"
        />
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-auto">
        {filteredComponents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Layers className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs text-center">
              {searchQuery ? 'No layers found' : 'No components yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-0.5 p-2 group">
            {filteredComponents.map((component) => renderComponent(component))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}