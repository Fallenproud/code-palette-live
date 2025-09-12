import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

interface TextBlockProps {
  variant?: 'paragraph' | 'quote' | 'highlight' | 'list';
  title?: string;
  content?: string;
  author?: string;
  items?: string[];
  showBadge?: boolean;
  badgeText?: string;
}

export function TextBlock({
  variant = 'paragraph',
  title = "About Our Platform",
  content = "We believe in empowering developers with the tools they need to create exceptional experiences. Our platform combines cutting-edge technology with intuitive design to help you build faster, more efficiently, and with greater confidence.",
  author = "John Doe, CEO",
  items = [
    "Lightning-fast development",
    "Intuitive drag-and-drop interface", 
    "Responsive design out of the box",
    "Real-time collaboration tools"
  ],
  showBadge = false,
  badgeText = "Featured"
}: TextBlockProps) {
  const renderContent = () => {
    switch (variant) {
      case 'quote':
        return (
          <div className="relative">
            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20" />
            <blockquote className="text-xl md:text-2xl italic text-foreground mb-4 pl-8">
              "{content}"
            </blockquote>
            {author && (
              <cite className="text-muted-foreground font-semibold">— {author}</cite>
            )}
          </div>
        );
      
      case 'highlight':
        return (
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              {content}
            </p>
          </div>
        );
      
      case 'list':
        return (
          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {content}
            </p>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      default:
        return (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content}
          </p>
        );
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="animate-fade-in">
          {showBadge && (
            <Badge variant="outline" className="mb-4">
              {badgeText}
            </Badge>
          )}
          
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              {title}
            </h2>
          )}
          
          <div className="prose prose-lg max-w-none">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
}