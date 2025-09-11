import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Zap, 
  Code, 
  Search, 
  Cpu, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Brain
} from "lucide-react";
import aiActivityImg from "@/assets/ai-activity.jpg";

interface ActivityItem {
  id: string;
  type: "search" | "code" | "optimize" | "analyze" | "complete" | "error";
  agent: string;
  message: string;
  timestamp: Date;
  status: "running" | "completed" | "error";
  duration?: number;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "search",
    agent: "CodeGen AI",
    message: "Searching for React component patterns...",
    timestamp: new Date(Date.now() - 30000),
    status: "running"
  },
  {
    id: "2",
    type: "code",
    agent: "StyleCraft AI",
    message: "Generated responsive hero section with Tailwind CSS",
    timestamp: new Date(Date.now() - 45000),
    status: "completed",
    duration: 2.3
  },
  {
    id: "3",
    type: "optimize",
    agent: "Performance AI",
    message: "Optimizing component bundle size and load times",
    timestamp: new Date(Date.now() - 60000),
    status: "running"
  },
  {
    id: "4",
    type: "analyze",
    agent: "UX Analyzer",
    message: "Analyzing user interaction patterns for CTA buttons",
    timestamp: new Date(Date.now() - 120000),
    status: "completed",
    duration: 4.7
  },
  {
    id: "5",
    type: "complete",
    agent: "Quality AI",
    message: "Code review completed - 0 issues found",
    timestamp: new Date(Date.now() - 180000),
    status: "completed",
    duration: 1.2
  },
  {
    id: "6",
    type: "error",
    agent: "Build AI",
    message: "Type error detected in component props",
    timestamp: new Date(Date.now() - 240000),
    status: "error"
  }
];

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update running tasks or add new ones
      if (Math.random() > 0.7) {
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: ["search", "code", "optimize", "analyze"][Math.floor(Math.random() * 4)] as any,
          agent: ["CodeGen AI", "StyleCraft AI", "Performance AI", "UX Analyzer"][Math.floor(Math.random() * 4)],
          message: [
            "Processing component structure...",
            "Generating responsive styles...",
            "Analyzing performance metrics...",
            "Optimizing accessibility features..."
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          status: "running"
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: ActivityItem['type'], status: ActivityItem['status']) => {
    if (status === "error") return AlertCircle;
    if (status === "completed") return CheckCircle;
    
    switch (type) {
      case "search": return Search;
      case "code": return Code;
      case "optimize": return Zap;
      case "analyze": return Brain;
      case "complete": return CheckCircle;
      default: return Cpu;
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case "running": return "ai-processing";
      case "completed": return "ai-active";
      case "error": return "ai-error";
      default: return "ai-idle";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full bg-canvas-surface flex flex-col">
      <div className="p-4 border-b border-canvas-border">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">AI Activity</h2>
          <Badge variant="outline" className="ml-auto bg-ai-active/10 text-ai-active border-ai-active/20">
            Live
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-sm font-medium text-ai-active">3</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">12</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-ai-error">1</div>
            <div className="text-xs text-muted-foreground">Errors</div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type, activity.status);
            const statusColor = getStatusColor(activity.status);
            
            return (
              <Card key={activity.id} className="p-3 bg-canvas-bg border-canvas-border hover:bg-canvas-surface-hover transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-md bg-${statusColor}/10 flex-shrink-0`}>
                    <Icon className={`w-4 h-4 text-${statusColor} ${activity.status === 'running' ? 'animate-pulse' : ''}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{activity.agent}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs bg-${statusColor}/10 text-${statusColor} border-${statusColor}/20`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {activity.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      {activity.duration && (
                        <>
                          <span>•</span>
                          <span>{activity.duration}s</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          
          <div className="pt-4 text-center">
            <img 
              src={aiActivityImg} 
              alt="AI Activity Visualization" 
              className="w-full h-32 object-cover rounded-lg opacity-60"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Real-time AI agent collaboration
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}