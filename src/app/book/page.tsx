'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUnifiedBook, UnifiedBook } from '@/lib/api';
import { BookDetailClient } from './BookDetailClient';
import { BookJsonLd } from '@/components/seo/BookJsonLd';

function BookContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [book, setBook] = useState<UnifiedBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const decodedId = decodeURIComponent(id);
        const data = await getUnifiedBook(decodedId);
        setBook(data);
      } catch (err) {
        console.error('Error loading book:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[var(--background)]">
        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 italic">Cargando detalles del libro...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Libro no encontrado</h1>
      </div>
    );
  }

  return (
    <>
      <BookJsonLd book={book} />
      <BookDetailClient book={book} id={id} />
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[var(--background)]">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 italic">Cargando biblioteca...</p>
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
