import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Zap, 
  Layers, 
  Settings, 
  Code, 
  Users,
  Bell,
  Plus
} from "lucide-react";
import { ComponentLibrary } from "@/components/canvas/ComponentLibrary";
import { LayersPanel } from "@/components/canvas/LayersPanel";
import { PropertiesPanel } from "@/components/canvas/PropertiesPanel";
import { ActivityFeed } from "@/components/canvas/ActivityFeed";
import { LivePreview } from "@/components/canvas/LivePreview";

interface MobileLayoutProps {
  selectedComponent: string | null;
  onComponentSelect: (component: string | null) => void;
}

export function MobileLayout({ selectedComponent, onComponentSelect }: MobileLayoutProps) {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  return (
    <div className="h-screen bg-canvas-bg flex flex-col">
      {/* Mobile Header */}
      <header className="h-14 bg-canvas-surface border-b border-canvas-border flex items-center justify-between px-4 shadow-card">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
            <Zap className="w-3 h-3 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Canvas</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-ai-active/10 text-ai-active border-ai-active/20 text-xs">
            <div className="w-1.5 h-1.5 bg-ai-active rounded-full mr-1 animate-pulse" />
            3
          </Badge>
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <LivePreview selectedComponent={selectedComponent} />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="h-16 bg-canvas-surface border-t border-canvas-border flex items-center justify-around px-2">
        <Sheet open={activeSheet === 'components'} onOpenChange={(open) => setActiveSheet(open ? 'components' : null)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <Plus className="w-4 h-4" />
              <span className="text-xs">Add</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <ComponentLibrary 
              onComponentSelect={onComponentSelect}
              selectedComponent={selectedComponent}
            />
          </SheetContent>
        </Sheet>

        <Sheet open={activeSheet === 'layers'} onOpenChange={(open) => setActiveSheet(open ? 'layers' : null)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <Layers className="w-4 h-4" />
              <span className="text-xs">Layers</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh]">
            <LayersPanel />
          </SheetContent>
        </Sheet>

        <Sheet open={activeSheet === 'properties'} onOpenChange={(open) => setActiveSheet(open ? 'properties' : null)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <Settings className="w-4 h-4" />
              <span className="text-xs">Props</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <PropertiesPanel />
          </SheetContent>
        </Sheet>

        <Sheet open={activeSheet === 'code'} onOpenChange={(open) => setActiveSheet(open ? 'code' : null)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <Code className="w-4 h-4" />
              <span className="text-xs">Code</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <div className="h-full bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Code editor view</p>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={activeSheet === 'activity'} onOpenChange={(open) => setActiveSheet(open ? 'activity' : null)}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <Users className="w-4 h-4" />
              <span className="text-xs">Activity</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh]">
            <ActivityFeed />
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[50vh]">
            <Tabs defaultValue="quick-actions" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              <TabsContent value="quick-actions" className="space-y-3 mt-4">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Component
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Generate Code
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </TabsContent>
              <TabsContent value="tools" className="space-y-3 mt-4">
                <Button className="w-full justify-start" variant="outline">
                  Export Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Manage Assets
                </Button>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}