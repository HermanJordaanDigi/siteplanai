import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PricingTier {
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  onBuyClick?: () => void;
}

export function PricingCard({ tier, onBuyClick }: PricingCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col",
      tier.popular && "border-primary shadow-lg scale-105"
    )}>
      {tier.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="text-2xl">{tier.name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">${tier.price}</span>
          <span className="text-muted-foreground"> / one-time</span>
        </CardDescription>
        <div className="text-sm text-muted-foreground">
          {tier.credits} credits
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onBuyClick}
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
          size="lg"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
