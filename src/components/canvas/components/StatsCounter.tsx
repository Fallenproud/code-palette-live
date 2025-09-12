import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Globe,
  Clock,
  Target,
  Zap,
  Heart
} from "lucide-react";

interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon: React.ElementType;
  color: string;
  description?: string;
}

interface StatsCounterProps {
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
  animated?: boolean;
  layout?: 'grid' | 'row';
}

const defaultStats: StatItem[] = [
  {
    id: '1',
    value: 50000,
    label: 'Active Users',
    suffix: '+',
    icon: Users,
    color: 'text-blue-500',
    description: 'Monthly active users'
  },
  {
    id: '2',
    value: 99.9,
    label: 'Uptime',
    suffix: '%',
    icon: TrendingUp,
    color: 'text-green-500',
    description: 'Service availability'
  },
  {
    id: '3',
    value: 150,
    label: 'Countries',
    suffix: '+',
    icon: Globe,
    color: 'text-purple-500',
    description: 'Global presence'
  },
  {
    id: '4',
    value: 24,
    label: 'Support',
    suffix: '/7',
    icon: Clock,
    color: 'text-orange-500',
    description: 'Round the clock'
  },
  {
    id: '5',
    value: 1000,
    label: 'Projects',
    suffix: '+',
    icon: Target,
    color: 'text-red-500',
    description: 'Completed successfully'
  },
  {
    id: '6',
    value: 95,
    label: 'Satisfaction',
    suffix: '%',
    icon: Heart,
    color: 'text-pink-500',
    description: 'Customer satisfaction'
  }
];

export function StatsCounter({
  title = "Our Impact in Numbers",
  subtitle = "See how we're making a difference",
  stats = defaultStats,
  animated = true,
  layout = 'grid'
}: StatsCounterProps) {
  const [visibleStats, setVisibleStats] = useState<Set<string>>(new Set());
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!animated) {
      // Set all values immediately if not animated
      const initialValues: Record<string, number> = {};
      stats.forEach(stat => {
        initialValues[stat.id] = stat.value;
      });
      setAnimatedValues(initialValues);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statId = entry.target.getAttribute('data-stat-id');
            if (statId && !visibleStats.has(statId)) {
              setVisibleStats(prev => new Set([...prev, statId]));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [animated, visibleStats]);

  useEffect(() => {
    visibleStats.forEach(statId => {
      const stat = stats.find(s => s.id === statId);
      if (!stat || animatedValues[statId] === stat.value) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(increment * currentStep, stat.value);
        
        setAnimatedValues(prev => ({
          ...prev,
          [statId]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    });
  }, [visibleStats, stats, animatedValues]);

  const formatValue = (stat: StatItem) => {
    const value = animated ? (animatedValues[stat.id] || 0) : stat.value;
    const formattedValue = stat.value >= 1000 && Number.isInteger(stat.value) 
      ? Math.floor(value).toLocaleString()
      : value % 1 === 0 
        ? Math.floor(value).toString()
        : value.toFixed(1);
    
    return `${stat.prefix || ''}${formattedValue}${stat.suffix || ''}`;
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'row':
        return 'flex flex-wrap justify-center gap-8';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      const elements = document.querySelectorAll('[data-stat-id]');
      elements.forEach(el => observerRef.current?.observe(el));
    }
  }, []);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`${getLayoutClasses()} animate-fade-in`}>
          {stats.map((stat, index) => (
            <Card 
              key={stat.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent 
                className="p-6 text-center"
                data-stat-id={stat.id}
              >
                <div className={`inline-flex p-3 rounded-full bg-muted/50 mb-4 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                
                <div className="mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {formatValue(stat)}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {stat.label}
                  </h3>
                </div>
                
                {stat.description && (
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                )}

                {/* Progress indicator */}
                {animated && (
                  <div className="mt-4 w-full bg-muted rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        stat.color.replace('text-', 'bg-')
                      }`}
                      style={{
                        width: `${((animatedValues[stat.id] || 0) / stat.value) * 100}%`
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Updated in real-time</span>
          </div>
        </div>
      </div>
    </section>
  );
}