'use client';

import React, { useState, useEffect } from 'react';
import { UnifiedBook, fetchRelatedBooks } from '@/lib/api';
import { useCarousel } from './useCarousel';
import { CarouselControls } from './CarouselControls';
import { CarouselTrack } from './CarouselTrack';

interface RelatedBooksCarouselProps {
  currentBook: UnifiedBook;
}

// Card width (220px) + gap (32px) = 252px
const ITEM_WIDTH = 252;

export function RelatedBooksCarousel({ currentBook }: RelatedBooksCarouselProps) {
  const [books, setBooks] = useState<UnifiedBook[]>([]);
  const [loading, setLoading] = useState(true);

  // Load related books
  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        // Para OL podemos pasar un tema vacío o ficticio por ahora
        const relatedBooks = await fetchRelatedBooks(currentBook.id, []);
        setBooks(relatedBooks);
      } catch (err) {
        console.error('Error loading related books:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [currentBook.id]);

  const { position, isAnimating, scrollNext, scrollPrev, pauseCarousel, resumeCarousel } =
    useCarousel({
      totalItems: books.length,
      itemWidth: ITEM_WIDTH,
      autoScrollSpeed: 0.5,
      pauseDuration: 7000,
    });

  return (
    <section className="mt-40 border-t border-[var(--border)] pt-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-12 px-2">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-2 block">
            Explora más
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">
            Lecturas Relacionadas
          </h2>
        </div>
        <CarouselControls onPrev={scrollPrev} onNext={scrollNext} />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex gap-8 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="min-w-[220px] h-[340px] bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 text-[var(--muted)]">
          No se encontraron lecturas relacionadas.
        </div>
      ) : (
        <CarouselTrack
          books={books}
          position={position}
          isAnimating={isAnimating}
          onMouseEnter={pauseCarousel}
          onMouseLeave={resumeCarousel}
        />
      )}
    </section>
  );
}
