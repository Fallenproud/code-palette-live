import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Clock, 
  Target,
  Activity,
  Brain,
  Code,
  Eye
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const metrics: MetricCard[] = [
  {
    title: 'Total Projects',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: <Code className="h-5 w-5" />
  },
  {
    title: 'AI Interactions',
    value: '1,847',
    change: '+23%',
    trend: 'up',
    icon: <Brain className="h-5 w-5" />
  },
  {
    title: 'Components Created',
    value: '156',
    change: '+8%',
    trend: 'up',
    icon: <Target className="h-5 w-5" />
  },
  {
    title: 'Preview Views',
    value: '892',
    change: '-3%',
    trend: 'down',
    icon: <Eye className="h-5 w-5" />
  }
];

const aiActivities = [
  { type: 'Code Generation', count: 542, percentage: 35 },
  { type: 'Component Creation', count: 298, percentage: 19 },
  { type: 'Bug Fixes', count: 234, percentage: 15 },
  { type: 'Refactoring', count: 187, percentage: 12 },
  { type: 'Testing', count: 156, percentage: 10 },
  { type: 'Documentation', count: 134, percentage: 9 }
];

const recentActivity = [
  {
    id: '1',
    action: 'Created new component',
    component: 'UserProfile',
    time: '2 minutes ago',
    type: 'create'
  },
  {
    id: '2',
    action: 'AI generated code',
    component: 'Login Form',
    time: '5 minutes ago',
    type: 'ai'
  },
  {
    id: '3',
    action: 'Deployed to production',
    component: 'Dashboard',
    time: '12 minutes ago',
    type: 'deploy'
  },
  {
    id: '4',
    action: 'Fixed bug in',
    component: 'Navigation',
    time: '18 minutes ago',
    type: 'fix'
  }
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return <Target className="h-4 w-4 text-green-500" />;
      case 'ai': return <Brain className="h-4 w-4 text-purple-500" />;
      case 'deploy': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'fix': return <Activity className="h-4 w-4 text-orange-500" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Analytics Dashboard</DialogTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-usage">AI Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.title}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-primary">{metric.icon}</div>
                      <Badge 
                        variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.title}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Project Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Activity Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiActivities.map((activity) => (
                  <div key={activity.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium min-w-0 flex-1">{activity.type}</span>
                      <Progress value={activity.percentage} className="w-24" />
                      <span className="text-sm text-muted-foreground min-w-12 text-right">
                        {activity.count}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">92%</div>
                    <p className="text-sm text-muted-foreground">
                      AI suggestions accepted
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">47h</div>
                    <p className="text-sm text-muted-foreground">
                      Estimated time saved this month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Avg. Load Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2s</div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Good</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Bundle Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">234KB</div>
                  <Progress value={60} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Optimized</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Lighthouse Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96</div>
                  <Progress value={96} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Excellent</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                      {getActionIcon(activity.type)}
                      <div className="flex-1">
                        <span className="text-sm">
                          {activity.action} <span className="font-medium">{activity.component}</span>
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}