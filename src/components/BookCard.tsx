import React, { useState } from 'react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Eye, RotateCcw, Star, Crown } from 'lucide-react';
import { Book3D } from './Book3D';
import { BookPageFlip } from './BookPageFlip';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [showPageFlip, setShowPageFlip] = useState(false);

  const handleAddToCart = () => {
    addItem(book);
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  return (
    <>
      <Card 
        className="group mystery-card overflow-hidden transition-3d hover:shadow-hover book-shadow glow-effect relative perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Special Edition Badge */}
        {book.isSpecialEdition && (
          <div className="absolute top-3 left-3 z-10 mystery-badge opacity-0 group-hover:opacity-100 transition-smooth delay-200">
            <div className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 premium-glow">
              <Crown className="h-3 w-3" />
              {book.specialEditionText}
            </div>
          </div>
        )}

        <div className="relative overflow-hidden mystery-container">
          {show3D ? (
            <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10">
              <Book3D 
                title={book.title} 
                author={book.author} 
                isHovered={isHovered}
                coverColor="#2d5a4a"
              />
            </div>
          ) : (
            <div className="relative mystery-image-container">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className={`w-full h-64 object-cover transition-3d mystery-image ${
                  isHovered ? 'mystery-hover-transform' : ''
                }`}
              />
              
              {/* Mystery overlay with gradient */}
              <div className="absolute inset-0 mystery-overlay opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
              </div>

              {/* Rating */}
              {book.rating && (
                <div className="absolute top-3 right-3 mystery-rating opacity-0 group-hover:opacity-100 transition-smooth delay-100">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-semibold">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span>{book.rating}</span>
                  </div>
                </div>
              )}
              
              {/* 3D Preview buttons */}
              <div className="absolute bottom-3 right-3 flex gap-2 mystery-controls opacity-0 group-hover:opacity-100 transition-smooth delay-300">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShow3D(!show3D)}
                  className="backdrop-blur-md bg-background/70 hover:bg-background/90 premium-button"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowPageFlip(true)}
                  className="backdrop-blur-md bg-background/70 hover:bg-background/90 premium-button"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-3 mystery-content">
          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-lg leading-tight">{book.title}</h3>
            <p className="text-muted-foreground text-sm font-medium">{book.author}</p>
            {book.genre && (
              <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
                {book.genre}
              </span>
            )}
          </div>
          
          {/* Standard description - always visible */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mystery-desc-standard">
            {book.description}
          </p>
          
          {/* Extended mystery description - appears on hover */}
          {book.extendedDescription && (
            <div className="mystery-extended-desc opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 ease-out">
              <p className="text-sm text-foreground leading-relaxed font-medium mystery-text-reveal">
                {book.extendedDescription}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="font-heading font-bold text-xl text-primary gradient-primary bg-clip-text text-transparent premium-price">
              ${book.price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              {show3D && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShow3D(false)}
                  className="transition-bounce hover:scale-105 premium-button"
                >
                  2D View
                </Button>
              )}
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="font-medium transition-bounce hover:scale-105 glow-effect premium-cart-button"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
    </Card>

    {/* Page Flip Modal */}
    {showPageFlip && (
      <BookPageFlip 
        book={book} 
        onClose={() => setShowPageFlip(false)} 
      />
    )}
  </>);
};