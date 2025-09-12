import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Share, 
  Settings,
  Zap,
  Users
} from "lucide-react";
import { AssetManager } from "@/components/assets/AssetManager";
import { ExportManager } from "@/components/export/ExportManager";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { NotificationSystem } from "@/components/ui/notification-system";

export function CanvasHeader() {
  return (
    <header className="h-14 bg-canvas-surface border-b border-canvas-border flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Canvas AI</h1>
        </div>
        
        <Badge variant="outline" className="bg-ai-active/10 text-ai-active border-ai-active/20">
          <div className="w-2 h-2 bg-ai-active rounded-full mr-2 animate-pulse" />
          3 Agents Active
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <AssetManager />
        <ExportManager />
        <AnalyticsDashboard />
        <NotificationSystem />
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Play className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Users className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Share className="w-4 h-4" />
        </Button>
        
        <SettingsPanel />
      </div>
    </header>
  );
}