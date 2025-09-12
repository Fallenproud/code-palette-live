import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Play, 
  Save, 
  Download,
  Copy,
  Eye,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CodeFile {
  name: string;
  language: string;
  content: string;
  modified: boolean;
}

export function CodeEditor() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFile, setActiveFile] = useState('component.tsx');
  const [files, setFiles] = useState<CodeFile[]>([
    {
      name: 'component.tsx',
      language: 'typescript',
      content: `import React from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  description?: string;
}

export function Component({ title, description }: ComponentProps) {
  return (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      <Button>Click me</Button>
    </div>
  );
}`,
      modified: false
    },
    {
      name: 'styles.css',
      language: 'css',
      content: `.component {
  padding: 1.5rem;
  background: hsl(var(--card));
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
}

.component h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.component p {
  color: hsl(var(--muted-foreground));
  margin-bottom: 1rem;
}`,
      modified: false
    }
  ]);

  const editorRef = useRef<any>(null);

  const currentFile = files.find(f => f.name === activeFile);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFiles(prev => prev.map(file => 
        file.name === activeFile 
          ? { ...file, content: value, modified: true }
          : file
      ));
    }
  };

  const handleSave = () => {
    setFiles(prev => prev.map(file => 
      file.name === activeFile 
        ? { ...file, modified: false }
        : file
    ));
    toast({ title: 'File saved!', description: `${activeFile} has been saved.` });
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const handleCopy = () => {
    if (currentFile) {
      navigator.clipboard.writeText(currentFile.content);
      toast({ title: 'Code copied!', description: 'Code has been copied to clipboard.' });
    }
  };

  const handleDownload = () => {
    if (currentFile) {
      const blob = new Blob([currentFile.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'File downloaded!', description: `${currentFile.name} has been downloaded.` });
    }
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Code className="w-4 h-4" />
            Code Editor
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFormat}
              className="h-7 px-2"
            >
              <Settings className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-7 px-2"
            >
              <Download className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-7 px-2"
            >
              <Save className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-7 px-2"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3 h-3" />
              ) : (
                <Maximize2 className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>

        <Tabs value={activeFile} onValueChange={setActiveFile} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {files.map((file) => (
              <TabsTrigger key={file.name} value={file.name} className="text-xs">
                <span className="flex items-center gap-1">
                  {file.name}
                  {file.modified && (
                    <Badge variant="secondary" className="w-1.5 h-1.5 p-0 rounded-full">
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        {currentFile && (
          <Editor
            height="100%"
            language={currentFile.language}
            value={currentFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              folding: true,
              cursorBlinking: 'blink',
              cursorSmoothCaretAnimation: true
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}