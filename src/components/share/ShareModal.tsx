import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Share, 
  QrCode, 
  Link, 
  Mail, 
  MessageSquare,
  Twitter,
  Linkedin,
  Globe,
  Lock,
  Eye,
  Edit
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ open, onOpenChange }: ShareModalProps) {
  const [shareUrl] = useState('https://canvas.ai/project/abc123');
  const [isPublic, setIsPublic] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [allowEditing, setAllowEditing] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard.`
    });
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Check out my Canvas AI project');
    const body = encodeURIComponent(`I'd like to share my project with you: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent('Check out my Canvas AI project!');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`);
  };

  const shareViaLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`);
  };

  const generateQRCode = () => {
    // Would integrate with QR code service
    toast({
      title: 'QR Code Generated',
      description: 'QR code for sharing has been created.'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-4 h-4" />
            Share Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Label htmlFor="public-toggle">Make Public</Label>
              </div>
              <Switch
                id="public-toggle"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <Label htmlFor="comments-toggle">Allow Comments</Label>
              </div>
              <Switch
                id="comments-toggle"
                checked={allowComments}
                onCheckedChange={setAllowComments}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                <Label htmlFor="editing-toggle">Allow Editing</Label>
              </div>
              <Switch
                id="editing-toggle"
                checked={allowEditing}
                onCheckedChange={setAllowEditing}
              />
            </div>
          </div>

          <Separator />

          {/* Share Link */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              <Label>Share Link</Label>
              <div className="flex gap-1 ml-auto">
                <Badge variant={isPublic ? "default" : "secondary"} className="text-xs">
                  {isPublic ? <><Globe className="w-3 h-3 mr-1" />Public</> : <><Lock className="w-3 h-3 mr-1" />Private</>}
                </Badge>
                {allowComments && (
                  <Badge variant="outline" className="text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Comments
                  </Badge>
                )}
                {allowEditing && (
                  <Badge variant="outline" className="text-xs">
                    <Edit className="w-3 h-3 mr-1" />
                    Edits
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(shareUrl, 'Share link')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Social Sharing */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share Via
            </Label>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shareViaEmail}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={shareViaTwitter}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={shareViaLinkedIn}
                className="gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={generateQRCode}
                className="gap-2"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </Button>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => {
                copyToClipboard(shareUrl, 'Share link');
                onOpenChange(false);
              }}
            >
              <Copy className="w-4 h-4" />
              Copy & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}