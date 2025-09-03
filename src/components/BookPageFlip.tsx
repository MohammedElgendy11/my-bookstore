import React, { useState } from 'react';
import { Book } from '@/types';

interface BookPageFlipProps {
  book: Book;
  onClose: () => void;
}

export const BookPageFlip: React.FC<BookPageFlipProps> = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Sample pages content
  const pages = [
    {
      content: `Chapter 1\n\n${book.description}\n\nThis is the beginning of an incredible journey that will take you through the depths of imagination and storytelling.`,
    },
    {
      content: `Chapter 2\n\nThe story continues with even more exciting developments. Characters come to life on these pages, bringing you deeper into the narrative.`,
    },
    {
      content: `Chapter 3\n\nAs we delve further into the tale, new mysteries unfold and adventures await around every corner of the page.`,
    },
  ];

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      if (direction === 'next' && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setIsFlipping(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
        >
          ✕
        </button>

        {/* Book preview header */}
        <div className="p-6 border-b">
          <h2 className="font-heading text-2xl font-bold">{book.title}</h2>
          <p className="text-muted-foreground">by {book.author}</p>
        </div>

        {/* Page flip container */}
        <div className="relative h-96 bg-gradient-to-br from-background to-muted/20">
          <div className="absolute inset-0 flex">
            {/* Left page */}
            <div className="flex-1 p-8 border-r">
              <div className="h-full flex flex-col justify-center">
                <div 
                  className={`transition-all duration-500 ${isFlipping ? 'page-flip' : ''}`}
                  style={{ transformOrigin: 'right center' }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {pages[currentPage]?.content}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-8 text-xs text-muted-foreground">
                Page {currentPage * 2 + 1}
              </div>
            </div>

            {/* Right page */}
            <div className="flex-1 p-8">
              <div className="h-full flex flex-col justify-center">
                <div 
                  className={`transition-all duration-500 ${isFlipping ? 'page-flip' : ''}`}
                  style={{ transformOrigin: 'left center' }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {pages[currentPage + 1]?.content || "The adventure continues..."}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-8 text-xs text-muted-foreground">
                Page {currentPage * 2 + 2}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-between items-center p-6 bg-muted/20">
          <button
            onClick={() => flipPage('prev')}
            disabled={currentPage === 0 || isFlipping}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => flipPage('next')}
            disabled={currentPage >= pages.length - 1 || isFlipping}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};