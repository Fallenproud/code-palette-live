import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  X, 
  Star, 
  Zap,
  Crown,
  Shield,
  Sparkles
} from "lucide-react";

interface PricingFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  popular?: boolean;
  enterprise?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary';
  icon: React.ElementType;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  showYearlyDiscount?: boolean;
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Star,
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
    features: [
      { name: '3 Projects', included: true },
      { name: '5GB Storage', included: true },
      { name: 'Basic Support', included: true },
      { name: 'Standard Templates', included: true },
      { name: 'Advanced Analytics', included: false },
      { name: 'Custom Domains', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Team Collaboration', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing businesses and teams',
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Zap,
    popular: true,
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default',
    features: [
      { name: 'Unlimited Projects', included: true },
      { name: '100GB Storage', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Premium Templates', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Domains', included: true },
      { name: 'Team Collaboration', included: true, description: 'Up to 10 members' },
      { name: 'API Access', included: false }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Crown,
    enterprise: true,
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    features: [
      { name: 'Unlimited Everything', included: true },
      { name: 'Unlimited Storage', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Custom Templates', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Domains', included: true },
      { name: 'Unlimited Team Members', included: true },
      { name: 'Full API Access', included: true }
    ]
  }
];

export function PricingTable({
  title = "Choose Your Plan",
  subtitle = "Select the perfect plan for your needs",
  plans = defaultPlans,
  showYearlyDiscount = true
}: PricingTableProps) {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (plan: PricingPlan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getMonthlyEquivalent = (plan: PricingPlan) => {
    return isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice;
  };

  const getSavings = (plan: PricingPlan) => {
    if (!isYearly || plan.monthlyPrice === 0) return 0;
    return (plan.monthlyPrice * 12) - plan.yearlyPrice;
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          {showYearlyDiscount && (
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                Save up to 20%
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
              } ${plan.enterprise ? 'bg-gradient-to-br from-background to-muted/20' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.enterprise && (
                <div className="absolute top-4 right-4">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-primary/10' : 'bg-muted/50'
                  }`}>
                    <plan.icon className={`w-6 h-6 ${
                      plan.popular ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${getMonthlyEquivalent(plan)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  {isYearly && plan.monthlyPrice > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Billed yearly (${getPrice(plan)})
                      {getSavings(plan) > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Save ${getSavings(plan)}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  variant={plan.buttonVariant || 'default'} 
                  className="w-full mb-6"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 mt-0.5 ${
                        feature.included ? 'text-green-500' : 'text-muted-foreground'
                      }`}>
                        {feature.included ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {feature.name}
                        </span>
                        {feature.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {feature.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}