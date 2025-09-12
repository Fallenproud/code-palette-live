import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Download, 
  Play, 
  Star, 
  Zap, 
  Heart,
  Share,
  ShoppingCart,
  MessageCircle
} from "lucide-react";

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  icon?: 'arrow' | 'download' | 'play' | 'star' | 'zap' | 'heart' | 'share' | 'cart' | 'message';
  showBadge?: boolean;
  badgeText?: string;
  animated?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const iconMap = {
  arrow: ArrowRight,
  download: Download,
  play: Play,
  star: Star,
  zap: Zap,
  heart: Heart,
  share: Share,
  cart: ShoppingCart,
  message: MessageCircle
};

export function CTAButton({
  variant = 'primary',
  size = 'lg',
  text = "Get Started Today",
  icon = 'arrow',
  showBadge = false,
  badgeText = "Popular",
  animated = true,
  fullWidth = false,
  disabled = false,
  onClick = () => console.log('CTA Button clicked!')
}: CTAButtonProps) {
  const IconComponent = iconMap[icon];
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-12 py-6 text-xl';
      default:
        return 'px-8 py-4 text-lg';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0';
      default:
        return '';
    }
  };

  const buttonClasses = `
    font-semibold transition-all duration-300 group relative overflow-hidden
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${animated ? 'hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <div className="flex flex-col items-center gap-3">
      {showBadge && (
        <Badge 
          variant="secondary" 
          className="animate-pulse"
        >
          <Star className="w-3 h-3 mr-1" />
          {badgeText}
        </Badge>
      )}
      
      <Button
        variant={variant === 'gradient' || variant === 'primary' ? 'default' : variant}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {/* Animated background effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {text}
          <IconComponent className={`
            transition-transform duration-300
            ${size === 'sm' ? 'w-3 h-3' : size === 'xl' ? 'w-6 h-6' : 'w-4 h-4'}
            ${animated ? 'group-hover:translate-x-1 group-hover:scale-110' : ''}
          `} />
        </span>
      </Button>

      {/* Ripple effect */}
      {animated && (
        <div className="absolute inset-0 rounded-md bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150" />
      )}
    </div>
  );
}