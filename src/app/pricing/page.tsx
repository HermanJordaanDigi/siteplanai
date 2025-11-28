"use client";

import { useState } from "react";
import { PricingCard, type PricingTier } from "@/components/pricing-card";
import { BuyCreditsModal } from "@/components/credits/buy-credits-modal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: 29,
    credits: 10,
    features: [
      "10 site plan generations",
      "Standard quality output",
      "Email support",
      "Credits never expire",
    ],
  },
  {
    name: "Pro",
    price: 79,
    credits: 30,
    popular: true,
    features: [
      "30 site plan generations",
      "High quality output",
      "Priority email support",
      "Credits never expire",
      "Advanced customization",
    ],
  },
  {
    name: "Elite",
    price: 199,
    credits: 100,
    features: [
      "100 site plan generations",
      "Premium quality output",
      "24/7 priority support",
      "Credits never expire",
      "Advanced customization",
      "Bulk generation",
    ],
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTier(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Simple, credit-based pricing. Buy only what you need. Credits never expire.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            onBuyClick={() => handleBuyClick(tier)}
          />
        ))}
      </div>

      {/* How Credits Work Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">How Credits Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">1</div>
            <h3 className="font-semibold">Buy Credits</h3>
            <p className="text-sm text-muted-foreground">
              Choose a plan and purchase credits that fit your needs
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">1</div>
            <h3 className="font-semibold">Create Site Plans</h3>
            <p className="text-sm text-muted-foreground">
              Each site plan costs 1 credit to generate
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">∞</div>
            <h3 className="font-semibold">Never Expire</h3>
            <p className="text-sm text-muted-foreground">
              Your credits never expire. Use them whenever you need
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do credits work?</AccordionTrigger>
            <AccordionContent>
              Each site plan generation costs 1 credit. When you purchase a plan, you receive a specific number of credits that you can use to create site plans. There are no subscriptions or recurring fees - you only pay for what you need.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do credits expire?</AccordionTrigger>
            <AccordionContent>
              No! Your credits never expire. Once you purchase credits, they remain in your account until you use them. This means you can buy in bulk and use them at your own pace.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I get a refund?</AccordionTrigger>
            <AccordionContent>
              We offer refunds within 14 days of purchase if you haven&apos;t used any credits. Once credits have been used to generate site plans, they are non-refundable. Please contact our support team if you need assistance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What if I run out of credits?</AccordionTrigger>
            <AccordionContent>
              You can purchase more credits at any time. Simply return to the pricing page and choose the plan that best fits your needs. Your new credits will be added to your existing balance immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I upgrade my plan?</AccordionTrigger>
            <AccordionContent>
              Since our pricing is credit-based rather than subscription-based, there&apos;s no need to &quot;upgrade.&quot; Simply purchase any plan to add more credits to your account. You can buy the Basic plan one day and the Elite plan the next - credits from all purchases accumulate in your account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal. All payments are processed securely through our payment provider.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>
              New users receive 5 free credits when they sign up. This allows you to test our service and generate a few site plans before making a purchase. No credit card required for the trial.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedTier={selectedTier}
      />
    </div>
  );
}
