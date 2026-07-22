'use client';

import { useState, useCallback, useEffect } from 'react';
import { UnifiedBook, searchUnifiedBooks, getUnifiedBook } from '@/lib/api';

export function useBooks(initialData: UnifiedBook[] = []) {
  const [books, setBooks] = useState<UnifiedBook[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = useCallback(async (query: string, category: string = 'Todos') => {
    setLoading(true);
    setError(null);
    try {
      let fullQuery = query;
      if (category && category !== 'Todos') {
        fullQuery = fullQuery ? `${fullQuery} subject:${category}` : `subject:${category}`;
      }

      const results = await searchUnifiedBooks(fullQuery, 15);
      setBooks(results);
      return results.length;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error searching books:', err);
      }
      setError('Error al buscar libros');
      return 0;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    books,
    loading,
    error,
    searchBooks,
  };
}

export function useBookDetail(id: string) {
  const [book, setBook] = useState<UnifiedBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBook = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getUnifiedBook(id);
      setBook(data);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading book detail:', err);
      }
      setError('No se pudo encontrar el libro');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  return { book, loading, error };
}
