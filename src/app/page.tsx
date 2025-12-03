import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { MapPin, Bot, Ruler, Save, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/3 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Generate Professional{" "}
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Site Plans
                </span>{" "}
                in Minutes
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
                AI-powered property mapping and site plan generation for real estate professionals, architects, and developers.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="text-base">
                  <Link href="/dashboard">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <BeforeAfterSlider
                beforeImage="/before.jpg"
                afterImage="/after.png"
                beforeLabel="Satellite View"
                afterLabel="Site Plan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose SitePlan AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional site plans quickly and easily
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Interactive Mapping</CardTitle>
                <CardDescription>
                  Locate any property with Google Maps integration. Search by address and get precise coordinates instantly.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Bot className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>AI-Powered Generation</CardTitle>
                <CardDescription>
                  Advanced AI creates accurate site plans from map views. Get professional results in seconds.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Ruler className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Professional Quality</CardTitle>
                <CardDescription>
                  Export-ready plans for presentations, proposals, and documentation. High-resolution output guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Save className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Save & Export</CardTitle>
                <CardDescription>
                  Store unlimited plans in your gallery. Download and share your site plans anytime, anywhere.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Create Your Site Plan in 3 Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional site plans in minutes, not hours
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  1
                </div>
                <CardTitle>Enter Address</CardTitle>
                <CardDescription>
                  Search for any property address using our integrated Google Maps search. Get instant location results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md border bg-muted/50 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground/40" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  2
                </div>
                <CardTitle>Capture View</CardTitle>
                <CardDescription>
                  Adjust the map zoom, rotation, and view type to capture the perfect perspective of your property.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md border bg-muted/50 flex items-center justify-center">
                  <Ruler className="h-12 w-12 text-muted-foreground/40" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  3
                </div>
                <CardTitle>Get Site Plan</CardTitle>
                <CardDescription>
                  AI generates your professional site plan instantly. Download, save to your gallery, or share with clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md border bg-muted/50 flex items-center justify-center">
                  <Bot className="h-12 w-12 text-muted-foreground/40" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, Credit-Based Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for you. No subscriptions, pay only for what you use.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <CardDescription>Perfect for individuals</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-muted-foreground ml-2">/ 30 credits</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>30 site plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Basic support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Standard export</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan - Highlighted */}
            <Card className="border-primary shadow-lg scale-105 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>Best for professionals</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-muted-foreground ml-2">/ 100 credits</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>100 site plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>HD export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Advanced features</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Elite Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Elite</CardTitle>
                <CardDescription>For power users</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground ml-2">/ 200 credits</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>200 site plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Premium support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>4K export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>White label option</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/pricing">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-primary/3 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Create Professional Site Plans?
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Join thousands of professionals using SitePlan AI to streamline their workflow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/dashboard">
                  Start Creating Site Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Try it now in demo mode • No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
