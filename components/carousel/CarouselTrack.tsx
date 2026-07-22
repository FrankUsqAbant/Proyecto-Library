'use client';

import React from 'react';
import { UnifiedBook } from '@/lib/api';
import { CarouselItem } from './CarouselItem';

interface CarouselTrackProps {
  books: UnifiedBook[];
  position: number;
  isAnimating: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function CarouselTrack({
  books,
  position,
  isAnimating,
  onMouseEnter,
  onMouseLeave,
}: CarouselTrackProps) {
  return (
    <div
      className="relative overflow-hidden mask-gradient-sides"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex gap-8"
        style={{
          transform: `translateX(-${position}px)`,
          // Always use transition when manually animating (button click)
          // Use no transition during auto-scroll for smoothness
          transition: isAnimating
            ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        {books.map((book) => (
          <CarouselItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
