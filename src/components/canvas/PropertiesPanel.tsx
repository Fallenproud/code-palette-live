import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useProjectStore } from '@/stores/projectStore';
import { 
  Settings, 
  Palette, 
  Move, 
  Square, 
  Type, 
  Layers,
  Code,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';

export function PropertiesPanel() {
  const { currentProject, selectedComponents, updateComponent } = useProjectStore();
  const selectedComponent = selectedComponents.length === 1 
    ? currentProject?.components.find(c => c.id === selectedComponents[0])
    : null;

  const [activeTab, setActiveTab] = useState('properties');

  if (!selectedComponent) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Settings className="w-4 h-4" />
            Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Square className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Select a component to edit its properties</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, {
      props: { ...selectedComponent.props, [key]: value }
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, {
      styles: { ...selectedComponent.styles, [key]: value }
    });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    updateComponent(selectedComponent.id, {
      position: { ...selectedComponent.position, [axis]: value }
    });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    updateComponent(selectedComponent.id, {
      size: { ...selectedComponent.size, [dimension]: value }
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Settings className="w-4 h-4" />
            Properties
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {selectedComponent.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid grid-cols-4 mx-4 mb-4">
            <TabsTrigger value="properties" className="text-xs">
              <Settings className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="styles" className="text-xs">
              <Palette className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              <Move className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              <Code className="w-3 h-3" />
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="properties" className="mt-0 px-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Component Name</Label>
                  <Input
                    value={selectedComponent.name}
                    onChange={(e) => updateComponent(selectedComponent.id, { name: e.target.value })}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Visibility</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handlePropertyChange('visible', !selectedComponent.props.visible)}
                  >
                    {selectedComponent.props.visible !== false ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Locked</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handlePropertyChange('locked', !selectedComponent.props.locked)}
                  >
                    {selectedComponent.props.locked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      <Unlock className="w-3 h-3" />
                    )}
                  </Button>
                </div>

                <Separator />

                {/* Dynamic properties based on component type */}
                {selectedComponent.type === 'button' && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Text</Label>
                      <Input
                        value={selectedComponent.props.children || ''}
                        onChange={(e) => handlePropertyChange('children', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Variant</Label>
                      <Select
                        value={selectedComponent.props.variant || 'default'}
                        onValueChange={(value) => handlePropertyChange('variant', value)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="destructive">Destructive</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="ghost">Ghost</SelectItem>
                          <SelectItem value="link">Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {selectedComponent.type === 'text' && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Content</Label>
                      <Input
                        value={selectedComponent.props.children || ''}
                        onChange={(e) => handlePropertyChange('children', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Tag</Label>
                      <Select
                        value={selectedComponent.props.tag || 'p'}
                        onValueChange={(value) => handlePropertyChange('tag', value)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="h1">H1</SelectItem>
                          <SelectItem value="h2">H2</SelectItem>
                          <SelectItem value="h3">H3</SelectItem>
                          <SelectItem value="p">Paragraph</SelectItem>
                          <SelectItem value="span">Span</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="styles" className="mt-0 px-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Background Color</Label>
                  <Input
                    type="color"
                    value={selectedComponent.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Text Color</Label>
                  <Input
                    type="color"
                    value={selectedComponent.styles.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    className="h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Border Radius</Label>
                  <Input
                    type="number"
                    value={selectedComponent.styles.borderRadius || 0}
                    onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
                    className="h-8 text-xs"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Opacity</Label>
                  <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={selectedComponent.styles.opacity || 1}
                    onChange={(e) => handleStyleChange('opacity', Number(e.target.value))}
                    className="h-8"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="mt-0 px-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">X</Label>
                    <Input
                      type="number"
                      value={selectedComponent.position.x}
                      onChange={(e) => handlePositionChange('x', Number(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Y</Label>
                    <Input
                      type="number"
                      value={selectedComponent.position.y}
                      onChange={(e) => handlePositionChange('y', Number(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Width</Label>
                    <Input
                      type="number"
                      value={selectedComponent.size.width}
                      onChange={(e) => handleSizeChange('width', Number(e.target.value))}
                      className="h-8 text-xs"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Height</Label>
                    <Input
                      type="number"
                      value={selectedComponent.size.height}
                      onChange={(e) => handleSizeChange('height', Number(e.target.value))}
                      className="h-8 text-xs"
                      min="0"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Padding</Label>
                  <Input
                    type="number"
                    value={selectedComponent.styles.padding || 0}
                    onChange={(e) => handleStyleChange('padding', Number(e.target.value))}
                    className="h-8 text-xs"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Margin</Label>
                  <Input
                    type="number"
                    value={selectedComponent.styles.margin || 0}
                    onChange={(e) => handleStyleChange('margin', Number(e.target.value))}
                    className="h-8 text-xs"
                    min="0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0 px-4">
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground">
                  Component Code Preview
                </div>
                <div className="bg-muted rounded-md p-3 text-xs font-mono">
                  <pre className="whitespace-pre-wrap">
                    {`<${selectedComponent.type}${Object.entries(selectedComponent.props).map(([key, value]) => 
                      ` ${key}="${value}"`
                    ).join('')}>
  ${selectedComponent.props.children || ''}
</${selectedComponent.type}>`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}