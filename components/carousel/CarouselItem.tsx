'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookCover } from '@/components/books/BookCover';
import { UnifiedBook } from '@/lib/api';

interface CarouselItemProps {
  book: UnifiedBook;
}

export function CarouselItem({ book }: CarouselItemProps) {
  const router = useRouter();
  const author = book.authors[0] || 'Unknown';

  return (
    <div
      className="w-[220px] flex-shrink-0 group cursor-pointer"
      onClick={() => router.push(`/book/${encodeURIComponent(book.id)}`)}
    >
      <div
        className="relative aspect-[2/3] mb-4 rounded-xl overflow-hidden shadow-lg 
                      group-hover:shadow-2xl transition-all duration-500 
                      group-hover:-translate-y-3 group-hover:scale-[1.02]"
      >
        <BookCover title={book.title} coverImage={book.coverImage} />
      </div>
      <h4
        className="font-serif font-bold text-lg leading-tight mb-1 
                     group-hover:text-[var(--accent)] transition-colors duration-300 
                     line-clamp-2 text-[var(--foreground)]"
      >
        {book.title}
      </h4>
      <p className="text-xs text-[var(--muted)] uppercase tracking-wider">{author.split(',')[0]}</p>
    </div>
  );
}
