import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  Heart,
  Eye
} from "lucide-react";

interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  tags: string[];
  stats: {
    views?: number;
    likes?: number;
    users?: number;
    rating?: number;
  };
  featured?: boolean;
}

interface CardGridProps {
  title?: string;
  subtitle?: string;
  cards?: CardItem[];
  columns?: 2 | 3 | 4;
  showStats?: boolean;
}

const defaultCards: CardItem[] = [
  {
    id: '1',
    title: 'Project Management Suite',
    description: 'Comprehensive project management with team collaboration, task tracking, and analytics.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    category: 'Productivity',
    tags: ['collaboration', 'analytics'],
    stats: { views: 12500, likes: 340, rating: 4.8 },
    featured: true
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'Modern dashboard for managing online stores with real-time analytics and inventory tracking.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    category: 'Business',
    tags: ['dashboard', 'analytics', 'e-commerce'],
    stats: { views: 8900, likes: 220, rating: 4.6 }
  },
  {
    id: '3',
    title: 'Social Media Manager',
    description: 'Schedule, manage, and analyze social media content across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop',
    category: 'Marketing',
    tags: ['social media', 'scheduling'],
    stats: { views: 15200, likes: 450, rating: 4.9 }
  },
  {
    id: '4',
    title: 'Learning Platform',
    description: 'Interactive learning platform with courses, quizzes, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    category: 'Education',
    tags: ['learning', 'courses', 'tracking'],
    stats: { views: 6700, likes: 189, rating: 4.7 }
  },
  {
    id: '5',
    title: 'Health & Fitness Tracker',
    description: 'Track workouts, nutrition, and health metrics with personalized insights.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    category: 'Health',
    tags: ['fitness', 'tracking', 'health'],
    stats: { views: 11300, likes: 380, rating: 4.8 }
  },
  {
    id: '6',
    title: 'Finance Manager',
    description: 'Personal finance management with budgeting, expense tracking, and investment insights.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    category: 'Finance',
    tags: ['budgeting', 'tracking', 'investments'],
    stats: { views: 9800, likes: 290, rating: 4.5 }
  }
];

export function CardGrid({
  title = "Featured Projects",
  subtitle = "Discover amazing projects built with our platform",
  cards = defaultCards,
  columns = 3,
  showStats = true
}: CardGridProps) {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${getGridColumns()} gap-6 animate-fade-in`}>
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                card.featured ? 'ring-2 ring-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {card.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {card.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    {card.category}
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {card.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {showStats && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      {card.stats.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatNumber(card.stats.views)}</span>
                        </div>
                      )}
                      {card.stats.likes && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{formatNumber(card.stats.likes)}</span>
                        </div>
                      )}
                      {card.stats.users && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{formatNumber(card.stats.users)}</span>
                        </div>
                      )}
                    </div>
                    {card.stats.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span className="font-medium">{card.stats.rating}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <Button size="lg" variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}