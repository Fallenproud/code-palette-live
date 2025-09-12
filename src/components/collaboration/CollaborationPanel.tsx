import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  MessageSquare, 
  Share, 
  UserPlus, 
  Crown, 
  Eye,
  Edit,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  Settings,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline' | 'away';
  cursor?: { x: number; y: number };
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  position?: { x: number; y: number };
  resolved: boolean;
}

export function CollaborationPanel() {
  const [activeTab, setActiveTab] = useState<'users' | 'comments' | 'share'>('users');
  const [newComment, setNewComment] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor');

  const [collaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'owner',
      status: 'online',
      cursor: { x: 120, y: 80 }
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'editor',
      status: 'online',
      cursor: { x: 300, y: 150 }
    },
    {
      id: '3',
      name: 'Lisa Wong',
      email: 'lisa@example.com',
      role: 'viewer',
      status: 'away'
    }
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'This button needs to be more prominent. Can we increase the size?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      position: { x: 200, y: 100 },
      resolved: false
    },
    {
      id: '2',
      author: 'Mike Johnson',
      content: 'Great work on the color scheme! 🎨',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      resolved: true
    }
  ]);

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      toast({ title: 'Email required', variant: 'destructive' });
      return;
    }

    toast({ 
      title: 'Invitation sent!', 
      description: `${inviteEmail} has been invited as ${inviteRole}` 
    });
    setInviteEmail('');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    toast({ title: 'Comment added!', description: 'Your comment has been posted.' });
    setNewComment('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3 h-3 text-yellow-500" />;
      case 'editor': return <Edit className="w-3 h-3 text-blue-500" />;
      case 'viewer': return <Eye className="w-3 h-3 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            Collaboration
          </CardTitle>
          
          <div className="flex items-center gap-1">
            <Button
              variant={activeTab === 'users' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('users')}
              className="h-7 px-2"
            >
              <Users className="w-3 h-3" />
            </Button>
            <Button
              variant={activeTab === 'comments' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('comments')}
              className="h-7 px-2"
            >
              <MessageSquare className="w-3 h-3" />
            </Button>
            <Button
              variant={activeTab === 'share' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('share')}
              className="h-7 px-2"
            >
              <Share className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        {activeTab === 'users' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full gap-2">
                    <UserPlus className="w-4 h-4" />
                    Invite Collaborator
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Collaborator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        placeholder="colleague@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Select value={inviteRole} onValueChange={(value: 'editor' | 'viewer') => setInviteRole(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor - Can edit and comment</SelectItem>
                          <SelectItem value="viewer">Viewer - Can only view and comment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleInvite} className="w-full">
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {collaborators.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        {getRoleIcon(user.role)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    <Badge variant="outline" className="text-xs capitalize">
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Voice/Video Controls */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Mic className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Video className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Phone className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="h-full flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className={`p-3 rounded-lg border ${comment.resolved ? 'bg-muted/50' : 'bg-background'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {comment.timestamp.toLocaleTimeString()}
                          </p>
                          {comment.resolved && (
                            <Badge variant="secondary" className="text-xs">Resolved</Badge>
                          )}
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                        {comment.position && (
                          <p className="text-xs text-muted-foreground mt-1">
                            On canvas at ({comment.position.x}, {comment.position.y})
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {!comment.resolved && (
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="text-xs h-6">
                          Reply
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-6">
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] text-sm"
                />
                <Button onClick={handleAddComment} size="sm" className="self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'share' && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex gap-2">
                  <Input
                    value="https://canvas.ai/project/abc123"
                    readOnly
                    className="text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText('https://canvas.ai/project/abc123');
                      toast({ title: 'Link copied!', description: 'Share link copied to clipboard.' });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Public Access</label>
                <Select defaultValue="private">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private - Only invited users</SelectItem>
                    <SelectItem value="public-view">Public - Anyone can view</SelectItem>
                    <SelectItem value="public-edit">Public - Anyone can edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full gap-2">
                <Share className="w-4 h-4" />
                Generate Share Link
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}