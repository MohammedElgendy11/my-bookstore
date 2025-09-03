import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { BookCatalog } from '@/components/BookCatalog';
import { CheckoutForm } from '@/components/CheckoutForm';

const Index = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToStore = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCheckout={handleCheckout} />
        <main>
          <CheckoutForm onBack={handleBackToStore} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCheckout={handleCheckout} />
      <main>
        <Hero />
        <div id="books-catalog">
          <BookCatalog />
        </div>
      </main>
      <footer className="bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">Read & Relish</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your literary haven for discovering exceptional books that inspire, educate, and entertain.
              Each book in our collection is carefully curated to enrich your reading journey.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2024 Read & Relish. All rights reserved.</p>
              <p className="mt-2">Questions? Contact us for personalized book recommendations.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
