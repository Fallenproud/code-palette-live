import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Settings, Keyboard, Palette, Zap, Shield, Download } from "lucide-react";

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  gridSnap: boolean;
  showRulers: boolean;
  aiAssistance: boolean;
  keyboardShortcuts: boolean;
  notifications: boolean;
  performance: 'low' | 'medium' | 'high';
  aiModel: 'gpt-4' | 'claude-3' | 'gemini-pro';
}

const defaultSettings: SettingsState = {
  theme: 'dark',
  autoSave: true,
  gridSnap: true,
  showRulers: false,
  aiAssistance: true,
  keyboardShortcuts: true,
  notifications: true,
  performance: 'high',
  aiModel: 'gpt-4'
};

const keyboardShortcuts = [
  { action: 'Save Project', shortcut: 'Ctrl+S' },
  { action: 'Command Palette', shortcut: 'Ctrl+K' },
  { action: 'Undo', shortcut: 'Ctrl+Z' },
  { action: 'Redo', shortcut: 'Ctrl+Y' },
  { action: 'Copy', shortcut: 'Ctrl+C' },
  { action: 'Paste', shortcut: 'Ctrl+V' },
  { action: 'Select All', shortcut: 'Ctrl+A' },
  { action: 'Zoom In', shortcut: 'Ctrl++' },
  { action: 'Zoom Out', shortcut: 'Ctrl+-' },
  { action: 'Fit to Screen', shortcut: 'Ctrl+0' }
];

export function SettingsPanel() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="flex-1">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={settings.theme} 
                    onValueChange={(value: 'light' | 'dark' | 'system') => updateSetting('theme', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save projects</Label>
                  <Switch
                    id="auto-save"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Show notifications</Label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canvas Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="grid-snap">Snap to grid</Label>
                  <Switch
                    id="grid-snap"
                    checked={settings.gridSnap}
                    onCheckedChange={(checked) => updateSetting('gridSnap', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rulers">Show rulers</Label>
                  <Switch
                    id="rulers"
                    checked={settings.showRulers}
                    onCheckedChange={(checked) => updateSetting('showRulers', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="performance">Rendering quality</Label>
                  <Select 
                    value={settings.performance} 
                    onValueChange={(value: 'low' | 'medium' | 'high') => updateSetting('performance', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-assistance">Enable AI assistance</Label>
                  <Switch
                    id="ai-assistance"
                    checked={settings.aiAssistance}
                    onCheckedChange={(checked) => updateSetting('aiAssistance', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select 
                    value={settings.aiModel} 
                    onValueChange={(value: 'gpt-4' | 'claude-3' | 'gemini-pro') => updateSetting('aiModel', value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude-3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shortcuts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keyboardShortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm">{shortcut.action}</span>
                      <Badge variant="outline" className="font-mono">
                        {shortcut.shortcut}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Clear All Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Separator />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}