import React from 'react';
import { CartSidebar } from './CartSidebar';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  onCheckout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCheckout }) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">Read & Relish</h1>
            <p className="text-sm text-muted-foreground">Your Literary Haven</p>
          </div>
        </div>
        <CartSidebar onCheckout={onCheckout} />
      </div>
    </header>
  );
};