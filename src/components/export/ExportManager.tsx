import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  FileCode, 
  Globe, 
  Package, 
  Zap, 
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  format: string;
  size: string;
}

const exportOptions: ExportOption[] = [
  {
    id: 'react-ts',
    name: 'React + TypeScript',
    description: 'Complete React application with TypeScript',
    icon: <FileCode className="h-5 w-5" />,
    format: 'ZIP',
    size: '~2.5MB'
  },
  {
    id: 'react-js',
    name: 'React + JavaScript',
    description: 'React application with JavaScript',
    icon: <FileCode className="h-5 w-5" />,
    format: 'ZIP',
    size: '~2.2MB'
  },
  {
    id: 'static-html',
    name: 'Static HTML',
    description: 'Static HTML/CSS/JS files',
    icon: <Globe className="h-5 w-5" />,
    format: 'ZIP',
    size: '~1.8MB'
  },
  {
    id: 'npm-package',
    name: 'NPM Package',
    description: 'Publishable component library',
    icon: <Package className="h-5 w-5" />,
    format: 'ZIP',
    size: '~3.1MB'
  }
];

const deploymentOptions = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy to Vercel with automatic CI/CD',
    icon: '▲',
    status: 'available'
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Deploy to Netlify with form handling',
    icon: 'N',
    status: 'available'
  },
  {
    id: 'github-pages',
    name: 'GitHub Pages',
    description: 'Static site hosting on GitHub',
    icon: 'GH',
    status: 'coming-soon'
  }
];

export function ExportManager() {
  const [selectedExport, setSelectedExport] = useState<string>('react-ts');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [includeAssets, setIncludeAssets] = useState(true);
  const [minifyCode, setMinifyCode] = useState(true);
  const [includeReadme, setIncludeReadme] = useState(true);

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const intervals = [10, 30, 50, 70, 85, 100];
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExportProgress(progress);
    }

    // Simulate download
    setTimeout(() => {
      setIsExporting(false);
      setExportProgress(0);
    }, 1000);
  };

  const handleDeploy = (platform: string) => {
    // Handle deployment logic
    console.log(`Deploying to ${platform}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Export & Deploy</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="export" className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Export Code</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {exportOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedExport === option.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-transparent hover:border-muted-foreground/20'
                  }`}
                  onClick={() => setSelectedExport(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-primary">{option.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{option.format}</Badge>
                          <Badge variant="secondary">{option.size}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-assets" 
                    checked={includeAssets}
                    onCheckedChange={(checked) => setIncludeAssets(checked as boolean)}
                  />
                  <Label htmlFor="include-assets">Include assets and images</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="minify-code" 
                    checked={minifyCode}
                    onCheckedChange={(checked) => setMinifyCode(checked as boolean)}
                  />
                  <Label htmlFor="minify-code">Minify and optimize code</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-readme" 
                    checked={includeReadme}
                    onCheckedChange={(checked) => setIncludeReadme(checked as boolean)}
                  />
                  <Label htmlFor="include-readme">Include README and documentation</Label>
                </div>
              </CardContent>
            </Card>

            {isExporting && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary animate-pulse" />
                    <div className="flex-1">
                      <p className="font-medium">Exporting project...</p>
                      <Progress value={exportProgress} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Project
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="deploy" className="space-y-6">
            <div className="grid gap-4">
              {deploymentOptions.map((option) => (
                <Card key={option.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-sm font-bold">
                          {option.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {option.status === 'coming-soon' ? (
                          <Badge variant="secondary">Coming Soon</Badge>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeploy(option.id)}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Deploy
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="share" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm">
                    https://canvas-ai.vercel.app/preview/abc123
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link to let others view your project
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embed Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Select defaultValue="iframe">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iframe">iFrame</SelectItem>
                      <SelectItem value="script">Script</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm">
                    &lt;iframe src="https://canvas-ai.vercel.app/embed/abc123"&gt;&lt;/iframe&gt;
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}