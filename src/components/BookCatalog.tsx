import React from 'react';
import { BookCard } from './BookCard';
import { Book } from '@/types';

// Import book cover images
import midnightGardenCover from '@/assets/book-midnight-garden.jpg';
import oceansWhisperCover from '@/assets/book-oceans-whisper.jpg';
import artMemoryCover from '@/assets/book-art-memory.jpg';
import shadowChroniclesCover from '@/assets/book-shadow-chronicles.jpg';

const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Garden',
    author: 'Elena Roswood',
    description: 'A hauntingly beautiful tale of love, loss, and the magic that blooms in the darkest hours.',
    extendedDescription: 'Follow Luna as she discovers a mysterious garden that only appears at midnight, where ancient secrets and forbidden magic await those brave enough to venture into the shadows between worlds.',
    price: 24.99,
    image: midnightGardenCover,
    genre: 'Literary Fiction',
    rating: 4.8,
    isSpecialEdition: true,
    specialEditionText: 'Limited First Edition'
  },
  {
    id: '2',
    title: "Ocean's Whisper",
    author: 'Marcus Blake',
    description: 'A sweeping romance set against the backdrop of a coastal town.',
    extendedDescription: 'Two souls find each other amidst the rhythmic whispers of the ocean waves. A story of love that transcends time, told through the lens of a small fishing village where every sunset brings new possibilities.',
    price: 22.50,
    image: oceansWhisperCover,
    genre: 'Romance',
    rating: 4.6,
    isSpecialEdition: false
  },
  {
    id: '3',
    title: 'The Art of Memory',
    author: 'Dr. Sarah Chen',
    description: 'Unlock the secrets of your mind with proven techniques to enhance memory and creativity.',
    extendedDescription: 'Boost creativity, and achieve mental clarity in our digital age. Based on cutting-edge neuroscience research and ancient memory techniques from around the world.',
    price: 28.95,
    image: artMemoryCover,
    genre: 'Self-Help',
    rating: 4.9,
    isSpecialEdition: true,
    specialEditionText: 'Signed Copy Available'
  },
  {
    id: '4',
    title: 'Shadow Chronicles',
    author: 'Theron Nightfall',
    description: 'An epic fantasy adventure through realms of shadow and light.',
    extendedDescription: 'Join Kael on his quest to restore balance to a world teetering on the edge of darkness. A tale of courage, sacrifice, and the power of hope in the face of overwhelming evil.',
    price: 26.75,
    image: shadowChroniclesCover,
    genre: 'Fantasy',
    rating: 4.7,
    isSpecialEdition: true,
    specialEditionText: 'Collector\'s Edition'
  }
];

export const BookCatalog: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold mb-4">Featured Books</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated collection of exceptional reads, each chosen for its 
            unique voice and compelling storytelling.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};