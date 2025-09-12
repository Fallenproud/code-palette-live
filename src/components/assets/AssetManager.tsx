import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Search, Image, FileCode, Palette, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'icon' | 'font' | 'color';
  url: string;
  size?: string;
  tags: string[];
  createdAt: Date;
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'hero-image.jpg',
    type: 'image',
    url: '/src/assets/canvas-hero.jpg',
    size: '1.2MB',
    tags: ['hero', 'background'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'ai-activity.jpg',
    type: 'image',
    url: '/src/assets/ai-activity.jpg',
    size: '800KB',
    tags: ['ai', 'activity', 'illustration'],
    createdAt: new Date('2024-01-14')
  }
];

const colorPalettes = [
  { name: 'Primary', colors: ['#8B5CF6', '#A78BFA', '#C4B5FD'] },
  { name: 'Secondary', colors: ['#06B6D4', '#67E8F9', '#A5F3FC'] },
  { name: 'Accent', colors: ['#F59E0B', '#FCD34D', '#FDE68A'] }
];

export function AssetManager() {
  const [assets] = useState<Asset[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const AssetCard = ({ asset }: { asset: Asset }) => (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-2",
        selectedAsset?.id === asset.id ? "border-primary" : "border-transparent"
      )}
      onClick={() => setSelectedAsset(asset)}
    >
      <CardContent className="p-3">
        {asset.type === 'image' ? (
          <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
            <Image className="h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
            {asset.type === 'icon' && <FileCode className="h-8 w-8 text-muted-foreground" />}
            {asset.type === 'font' && <Type className="h-8 w-8 text-muted-foreground" />}
            {asset.type === 'color' && <Palette className="h-8 w-8 text-muted-foreground" />}
          </div>
        )}
        <h4 className="font-medium text-sm truncate">{asset.name}</h4>
        <p className="text-xs text-muted-foreground">{asset.size}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {asset.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Image className="h-4 w-4 mr-2" />
          Assets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Asset Manager</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <Tabs defaultValue="images" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="fonts">Fonts</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="images" className="mt-4">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-4 gap-3">
                {filteredAssets.filter(a => a.type === 'image').map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="icons" className="mt-4">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-6 gap-3">
                {/* Icon library would be populated here */}
                <div className="text-center text-muted-foreground py-8">
                  Icon library coming soon...
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="fonts" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat'].map(font => (
                  <Card key={font} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium" style={{ fontFamily: font }}>{font}</h4>
                        <p className="text-sm text-muted-foreground">Google Fonts</p>
                      </div>
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="colors" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {colorPalettes.map(palette => (
                  <Card key={palette.name} className="p-4">
                    <h4 className="font-medium mb-3">{palette.name}</h4>
                    <div className="flex gap-2">
                      {palette.colors.map(color => (
                        <div
                          key={color}
                          className="w-12 h-12 rounded-md border cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}