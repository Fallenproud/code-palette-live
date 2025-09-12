import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn, Download, Heart } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface ImageGalleryProps {
  variant?: 'grid' | 'masonry' | 'carousel';
  title?: string;
  images?: GalleryImage[];
  showCategories?: boolean;
  enableLightbox?: boolean;
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    alt: 'Modern workspace',
    title: 'Creative Workspace',
    category: 'Design'
  },
  {
    id: '2', 
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
    alt: 'Team collaboration',
    title: 'Team Meeting',
    category: 'Business'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    alt: 'Analytics dashboard',
    title: 'Data Insights',
    category: 'Technology'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=350&fit=crop',
    alt: 'Creative process',
    title: 'Brainstorming',
    category: 'Design'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    alt: 'Product development',
    title: 'Innovation',
    category: 'Technology'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop',
    alt: 'Business growth',
    title: 'Success Metrics',
    category: 'Business'
  }
];

export function ImageGallery({
  variant = 'grid',
  title = "Our Gallery",
  images = defaultImages,
  showCategories = true,
  enableLightbox = true
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const categories = [...new Set(images.map(img => img.category).filter(Boolean))];
  const filteredImages = selectedCategory 
    ? images.filter(img => img.category === selectedCategory)
    : images;

  const toggleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const getGridClasses = () => {
    switch (variant) {
      case 'masonry':
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4";
      case 'carousel':
        return "flex gap-4 overflow-x-auto pb-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of beautiful images showcasing creativity and innovation.
          </p>
        </div>

        {showCategories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        <div className={`${getGridClasses()} animate-fade-in`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02] ${
                variant === 'carousel' ? 'flex-shrink-0 w-80' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex gap-2">
                  {enableLightbox && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedImage(image)}
                      className="h-8 w-8 p-0"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleLike(image.id)}
                    className={`h-8 w-8 p-0 ${
                      likedImages.has(image.id) ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = image.src;
                      link.download = image.title || 'image';
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                  {image.category && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {image.category}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {enableLightbox && selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
                
                {selectedImage.title && (
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
                    <h3 className="font-semibold">{selectedImage.title}</h3>
                    {selectedImage.category && (
                      <Badge variant="secondary" className="mt-1">
                        {selectedImage.category}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}