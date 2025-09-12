import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  GitBranch, 
  GitCommit, 
  Clock, 
  User, 
  ArrowLeft,
  Plus,
  MoreVertical,
  Tag
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface HistoryItem {
  id: string;
  message: string;
  timestamp: Date;
  author: string;
  type: 'commit' | 'save' | 'branch';
  changes: number;
  branch?: string;
}

export function VersionHistory() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [commitMessage, setCommitMessage] = useState('');
  const [showCommitForm, setShowCommitForm] = useState(false);

  const [history] = useState<HistoryItem[]>([
    {
      id: '1',
      message: 'Initial component setup',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      author: 'You',
      type: 'commit',
      changes: 5,
      branch: 'main'
    },
    {
      id: '2',
      message: 'Added button component',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      author: 'You',
      type: 'commit',
      changes: 3,
      branch: 'main'
    },
    {
      id: '3',
      message: 'Auto-save',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      author: 'System',
      type: 'save',
      changes: 1,
      branch: 'main'
    }
  ]);

  const handleCommit = () => {
    if (!commitMessage.trim()) {
      toast({ title: 'Commit message required', variant: 'destructive' });
      return;
    }

    // Create new commit
    const newCommit: HistoryItem = {
      id: Date.now().toString(),
      message: commitMessage,
      timestamp: new Date(),
      author: 'You',
      type: 'commit',
      changes: 2, // Mock changes
      branch: 'main'
    };

    toast({ title: 'Changes committed!', description: `"${commitMessage}" saved to history.` });
    setCommitMessage('');
    setShowCommitForm(false);
  };

  const handleRevert = (item: HistoryItem) => {
    toast({ 
      title: 'Reverted to version', 
      description: `Restored to "${item.message}"` 
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'branch': return GitBranch;
      case 'save': return Clock;
      default: return History;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'commit': return <Badge variant="default" className="text-xs">Commit</Badge>;
      case 'branch': return <Badge variant="outline" className="text-xs">Branch</Badge>;
      case 'save': return <Badge variant="secondary" className="text-xs">Auto-save</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="w-4 h-4" />
            Version History
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
            >
              <GitBranch className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommitForm(!showCommitForm)}
              className="h-7 px-2"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {showCommitForm && (
          <div className="space-y-3 mt-3 p-3 bg-muted rounded-lg">
            <Textarea
              placeholder="Describe your changes..."
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="h-20 text-xs"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCommitForm(false)}
                className="h-7 px-3 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleCommit}
                className="h-7 px-3 text-xs"
              >
                Commit
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {history.map((item, index) => {
              const Icon = getTypeIcon(item.type);
              return (
                <div
                  key={item.id}
                  className={`relative group p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                    selectedVersion === item.id ? 'bg-accent border-primary' : ''
                  }`}
                  onClick={() => setSelectedVersion(selectedVersion === item.id ? null : item.id)}
                >
                  {/* Timeline line */}
                  {index < history.length - 1 && (
                    <div className="absolute left-8 top-12 w-px h-6 bg-border" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">{item.message}</p>
                        {getTypeBadge(item.type)}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.author}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(item.timestamp)}
                        </div>

                        {item.branch && (
                          <div className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            {item.branch}
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {item.changes} changes
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRevert(item)}>
                          <ArrowLeft className="w-3 h-3 mr-2" />
                          Revert to this version
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <GitBranch className="w-3 h-3 mr-2" />
                          Create branch
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="w-3 h-3 mr-2" />
                          Add tag
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {selectedVersion === item.id && (
                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <p>Full timestamp: {item.timestamp.toLocaleString()}</p>
                      <p>Changes: {item.changes} files modified</p>
                      {item.branch && <p>Branch: {item.branch}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}