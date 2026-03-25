
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Brain, Bell, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-illustration');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">ProcrastinatorPortal</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="rounded-full bg-secondary text-secondary-foreground" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-4 animate-bounce">
                Loading motivation...
              </div>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight">
                Welcome to <span className="text-secondary">ProcrastinatorPortal</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium italic">
                “Productivity, but with more procrastination.”
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                The ultimate productivity platform designed to help you delay everything more efficiently.
                Why complete tasks quickly when you can turn them into complicated adventures?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-secondary" asChild>
                  <Link href="/register">Start Procrastinating</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-primary/50" asChild>
                  <a href="#features">Explore Features</a>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto animate-float">
                {heroImg && (
                  <Image
                    src={heroImg.imageUrl}
                    alt={heroImg.description}
                    fill
                    className="object-contain"
                    data-ai-hint={heroImg.imageHint}
                  />
                )}
                {/* Floating Elements */}
                <div className="absolute top-10 right-0 w-24 h-24 bg-white/80 shadow-xl rounded-2xl flex items-center justify-center -rotate-12 animate-float [animation-delay:1s]">
                  <Clock className="text-secondary w-12 h-12" />
                </div>
                <div className="absolute bottom-10 left-0 w-24 h-24 bg-white/80 shadow-xl rounded-2xl flex items-center justify-center rotate-12 animate-float [animation-delay:0.5s]">
                  <Calendar className="text-primary w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold">What Can You Do Here?</h2>
              <p className="text-muted-foreground">
                ProcrastinatorPortal combines advanced technology with questionable life choices to transform simple tasks into entertaining challenges.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<Clock className="w-8 h-8" />}
                title="Task Manager"
                description="Add tasks and watch them mysteriously return after completion. Because some responsibilities never truly leave."
              />
              <FeatureCard 
                icon={<Calendar className="w-8 h-8" />}
                title="Chaos Calendar"
                description="Schedule events using the world's most dramatic calendar system. Warning: dates may fall apart."
              />
              <FeatureCard 
                icon={<Brain className="w-8 h-8" />}
                title="Decision Assistant"
                description="Can't decide what to do? Our AI will ask unnecessary questions before making a random decision."
              />
              <FeatureCard 
                icon={<Bell className="w-8 h-8" />}
                title="Smart Reminders"
                description="Receive helpful reminders about things you were trying to ignore. Like that assignment due in an hour."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">P</span>
            </div>
            <span className="font-headline font-bold tracking-tight">ProcrastinatorPortal</span>
          </div>
          <p className="text-muted-foreground italic">Making productivity harder since 2026.</p>
          <div className="text-sm text-muted-foreground">
            &copy; 2026 ProcrastinatorPortal. All rights reserved. Eventually.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur-sm group">
      <CardHeader>
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <div className="text-secondary">{icon}</div>
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
