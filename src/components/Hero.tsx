import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToBooks = () => {
    const booksSection = document.getElementById('books-catalog');
    booksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center gradient-subtle">
      <div className="container mx-auto px-4 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight float-animation">
            Discover Your Next
            <br />
            <span className="gradient-primary bg-clip-text text-transparent glow-effect">
              Great Read
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Curated collection of exceptional books that inspire, educate, and entertain. 
            Each story carefully selected to enrich your literary journey.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={scrollToBooks}
            className="text-lg px-8 py-6 transition-bounce hover:scale-105 glow-effect"
          >
            Browse Collection
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};