'use client';

import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';
import { BookCardSkeleton } from '@/components/books/BookCardSkeleton';
import { useSearchParams } from 'next/navigation';
import { TopicFilter } from '@/components/books/TopicFilter';
import { BookGrid } from '@/components/books/BookGrid';
import { QuoteHero } from '@/components/books/QuoteHero';
import { BookSearch } from '@/components/books/BookSearch';
import { UnifiedBook, searchUnifiedBooks, getCuratedBooks, searchLocalBooks } from '@/lib/api';
import { BookShelf3D } from '@/components/3d/BookShelf3D';
import { useI18n } from '@/hooks/useI18n';

interface HomeClientProps {
  initialBooks: UnifiedBook[];
  initialCount: number;
}

export function HomeClient({ initialBooks, initialCount }: HomeClientProps) {
  const searchParams = useSearchParams();
  const { lang, setLang, t } = useI18n();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
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
      if (!currentSearch && currentCat === 'Todos') {
        const curated = getCuratedBooks(currentLang);
        setBooks(curated);
        setTotalCount(curated.length);
        setCurrentPage(1);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      let query = currentSearch;
      if (currentCat && currentCat !== 'Todos') {
        query = query ? `${query} subject:${currentCat}` : `subject:${currentCat}`;
      }

      // Fast Local Search (0ms response) for page 1 new searches
      if (page === 1 && !append && query) {
        const localMatches = searchLocalBooks(query, currentLang);
        if (localMatches.length > 0) {
          setBooks(localMatches);
          setTotalCount(localMatches.length);
        }
      }

      try {
        const results = await searchUnifiedBooks(query, 15, page, currentLang);

        const isMock = results.length > 0 && results[0].source === 'mock';

        if (append) {
          if (isMock) {
            // If we fall back to mock on page 2+, don't append duplicates, just freeze pagination
            setTotalCount(books.length);
          } else {
            setBooks((prev) => [...prev, ...results]);
            setTotalCount((prev) => prev + results.length);
          }
        } else {
          // If the API call returned mock books (fallback), but we already have local matches showing,
          // keep the local matches instead of showing all unrelated mock books!
          if (isMock && query) {
            const localMatches = searchLocalBooks(query, currentLang);
            if (localMatches.length > 0) {
              setBooks(localMatches);
              setTotalCount(localMatches.length);
            } else {
              setBooks(results);
              setTotalCount(results.length);
            }
          } else {
            setBooks(results);
            if (isMock) {
              setTotalCount(results.length);
            } else {
              setTotalCount(1000); // Allow scrolling if it is a real API response
            }
          }
          if (page === 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }

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
    setSelectedLanguage(lang);
    handleSearch(1, searchTerm, selectedCategory, lang);
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const currentUrlSearch = searchParams?.get('search') || '';
    const currentUrlCat = searchParams?.get('category') || 'Todos';

    if (currentUrlSearch !== searchTerm || currentUrlCat !== selectedCategory) {
      setSearchTerm(currentUrlSearch);
      setSelectedCategory(currentUrlCat);
      handleSearch(1, currentUrlSearch, currentUrlCat);
    }
  }, [searchParams, mounted, handleSearch, searchTerm, selectedCategory]);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative">
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
                setLang('es');
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
                setLang('en');
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
              onLoadMore={() =>
                handleSearch(currentPage + 1, searchTerm, selectedCategory, selectedLanguage, true)
              }
              onRetry={() =>
                handleSearch(currentPage, searchTerm, selectedCategory, selectedLanguage)
              }
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
