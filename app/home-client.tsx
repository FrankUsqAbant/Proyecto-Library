'use client';

import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';
import { BookCardSkeleton } from '@/components/books/BookCardSkeleton';
import { useSearchParams } from 'next/navigation';
import { TopicFilter } from '@/components/books/TopicFilter';
import { BookGrid } from '@/components/books/BookGrid';
import { QuoteHero } from '@/components/books/QuoteHero';
import { BookSearch } from '@/components/books/BookSearch';
import { UnifiedBook, searchUnifiedBooks, getCuratedBooks } from '@/lib/api';
import { Ambient3DGlow } from '@/components/3d/Ambient3DGlow';
import { BookShelf3D } from '@/components/3d/BookShelf3D';

interface HomeClientProps {
  initialBooks: UnifiedBook[];
  initialCount: number;
}

export function HomeClient({ initialBooks, initialCount }: HomeClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todos';
  const urlSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'es' | 'en'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [books, setBooks] = useState<UnifiedBook[]>(
    initialBooks.length > 0 ? initialBooks : getCuratedBooks()
  );
  const [totalCount, setTotalCount] = useState(
    initialCount || (initialBooks.length > 0 ? initialBooks.length : 15)
  );
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (
      page: number = 1,
      currentSearch: string = searchTerm,
      currentCat: string = selectedCategory,
      currentLang: 'all' | 'es' | 'en' = selectedLanguage,
      append: boolean = false
    ) => {
      if (!currentSearch && currentCat === 'Todos' && currentLang === 'all') {
        setBooks(getCuratedBooks());
        setTotalCount(getCuratedBooks().length);
        setCurrentPage(1);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = currentSearch;
        if (currentCat && currentCat !== 'Todos') {
          query = query ? `${query} subject:${currentCat}` : `subject:${currentCat}`;
        }

        const results = await searchUnifiedBooks(query, 15, page, currentLang);

        if (append) {
          setBooks((prev) => [...prev, ...results]);
        } else {
          setBooks(results);
          if (page === 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }

        setTotalCount(append ? (prev) => prev + results.length : 1000); // Hack to allow more loads if not calculated
        setCurrentPage(page);
      } catch (err) {
        console.error('Error searching books:', err);
        setError(
          'Lo sentimos, tuvimos un problema al conectar con la biblioteca. Inténtalo de nuevo.'
        );
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategory, selectedLanguage]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const urlSearch = searchParams?.get('search') || '';
    const urlCat = searchParams?.get('category') || 'Todos';

    if (urlSearch !== searchTerm || urlCat !== selectedCategory) {
      setSearchTerm(urlSearch);
      setSelectedCategory(urlCat);
      handleSearch(1, urlSearch, urlCat);
    }
  }, [searchParams, mounted, handleSearch, searchTerm, selectedCategory]);

  if (!mounted) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <QuoteHero />
          <div className="h-12 w-full max-w-2xl bg-stone-100 dark:bg-stone-900 rounded-full animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {initialBooks && initialBooks.length > 0
              ? initialBooks.map((book) => (
                  <div
                    key={book.id}
                    className="h-[300px] bg-stone-100 dark:bg-stone-800 rounded-xl"
                  />
                ))
              : Array.from({ length: 15 }).map((_, i) => <BookCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative">
      <Ambient3DGlow />
      <div className="max-w-7xl mx-auto relative z-10">
        <section className="mb-12">
          <QuoteHero />
        </section>

        <section className="mb-12">
          <BookShelf3D books={books} />
        </section>

        <div id="biblioteca" className="space-y-12">
          <BookSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={(term) => handleSearch(1, term)}
          />

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
              Idioma / Language:
            </span>
            <button
              onClick={() => {
                setSelectedLanguage('all');
                handleSearch(1, searchTerm, selectedCategory, 'all');
              }}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all border',
                selectedLanguage === 'all'
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-[var(--background-sec)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]'
              )}
            >
              🌐 Todos / All
            </button>
            <button
              onClick={() => {
                setSelectedLanguage('es');
                handleSearch(1, searchTerm, selectedCategory, 'es');
              }}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all border',
                selectedLanguage === 'es'
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-[var(--background-sec)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]'
              )}
            >
              🇪🇸 Español
            </button>
            <button
              onClick={() => {
                setSelectedLanguage('en');
                handleSearch(1, searchTerm, selectedCategory, 'en');
              }}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all border',
                selectedLanguage === 'en'
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-[var(--background-sec)] text-[var(--muted)] hover:text-[var(--foreground)] border-[var(--border)]'
              )}
            >
              🇬🇧 English
            </button>
          </div>

          <TopicFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="mt-8">
            <BookGrid
              loading={loading}
              error={error}
              books={books}
              totalCount={totalCount}
              selectedCategory={selectedCategory}
              onLoadMore={() => handleSearch(currentPage + 1, searchTerm, selectedCategory, selectedLanguage, true)}
              onRetry={() => handleSearch(currentPage, searchTerm, selectedCategory, selectedLanguage)}
              onClearSearch={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
                setSelectedLanguage('all');
                handleSearch(1, '', 'Todos', 'all');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
