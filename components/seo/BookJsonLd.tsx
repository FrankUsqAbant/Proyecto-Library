'use client';

import React from 'react';
import { UnifiedBook } from '@/lib/api';

interface BookJsonLdProps {
  book: UnifiedBook;
}

export function BookJsonLd({ book }: BookJsonLdProps) {
  const author = book.authors[0] || 'Autor desconocido';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: author,
    },
    image: book.coverImage,
    genre: 'Literatura clásica', // Simplificado para UnifiedBook
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/DownloadAction',
      userInteractionCount: 1000, // Valor placeholder ya que UnifiedBook no tiene download_count
    },
    publisher: {
      '@type': 'Organization',
      name: 'Open Library & Gutendex',
    },
    license: 'https://openlibrary.org/dev/docs/api/licensing',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
