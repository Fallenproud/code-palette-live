import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Star } from "lucide-react";

interface HeroSectionProps {
  variant?: 'default' | 'gradient' | 'minimal';
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: string;
  secondaryButton?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export function HeroSection({
  variant = 'default',
  title = "Build Something Amazing",
  subtitle = "Create stunning web applications with our powerful tools",
  description = "Join thousands of developers who trust our platform to bring their ideas to life. Start building today with our comprehensive suite of tools and components.",
  primaryButton = "Get Started",
  secondaryButton = "Watch Demo",
  showBadge = true,
  badgeText = "✨ New Features Available"
}: HeroSectionProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return "bg-gradient-to-br from-primary/10 via-background to-secondary/10";
      case 'minimal':
        return "bg-background";
      default:
        return "bg-gradient-to-b from-background to-muted/20";
    }
  };

  return (
    <section className={`py-20 px-4 text-center relative overflow-hidden ${getVariantClasses()}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {showBadge && (
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm animate-fade-in">
            <Star className="w-4 h-4 mr-2" />
            {badgeText}
          </Badge>
        )}
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in [animation-delay:200ms]">
          {subtitle}
        </p>
        
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:400ms]">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:600ms]">
          <Button size="lg" className="px-8 py-3 font-semibold group">
            {primaryButton}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-3 font-semibold group">
            <Play className="mr-2 w-4 h-4 transition-transform group-hover:scale-110" />
            {secondaryButton}
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in [animation-delay:800ms]">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}