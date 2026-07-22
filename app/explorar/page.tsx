'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Book as BookIcon } from 'lucide-react';
import { BookGrid } from '@/components/books/BookGrid';
import { TopicFilter } from '@/components/books/TopicFilter';
import { BookSearch } from '@/components/books/BookSearch';
import { useBooks } from '@/hooks/useBooks';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';

function ExplorarContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todos';
  const urlSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { books, loading, error, searchBooks } = useBooks();

  const handleSearch = useCallback(
    async (
      page: number = 1,
      currentSearch: string = searchTerm,
      currentCat: string = selectedCategory
    ) => {
      const count = await searchBooks(currentSearch, currentCat);
      setTotalCount(count);
      setCurrentPage(page);
      if (page === 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [searchTerm, selectedCategory, searchBooks]
  );

  useEffect(() => {
    handleSearch(1, searchTerm, selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    if (urlSearch) {
      setSearchTerm(urlSearch);
      handleSearch(1, urlSearch, selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearch]);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)]">
                {t('explore.title')}
              </h1>
              <p className="text-[var(--muted)] italic text-lg font-serif">
                {t('explore.subtitle')}
              </p>
            </div>
            {!loading && (
              <div className="flex items-center space-x-2 text-sm font-medium text-[var(--muted)] border border-[var(--border)] px-4 py-2 rounded-full backdrop-blur-sm">
                <BookIcon size={18} />
                <span>{totalCount.toLocaleString()} {t('explore.found')}</span>
              </div>
            )}
          </div>

          <BookSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={(term) => handleSearch(1, term)}
          />
        </header>

        <TopicFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <BookGrid
          loading={loading}
          error={error}
          books={books}
          totalCount={totalCount}
          selectedCategory={selectedCategory}
          onLoadMore={() => {
            console.log('Load more in Explorar');
          }}
          onRetry={() => handleSearch(currentPage)}
          onClearSearch={() => {
            setSearchTerm('');
            setSelectedCategory('Todos');
            handleSearch(1, '', 'Todos');
          }}
        />
      </div>
    </div>
  );
}

export default function ExplorarPage() {
  const { t } = useI18n();
  return (
    <Suspense
      fallback={
        <div className="pt-40 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 italic">{t('common.loading')}</p>
        </div>
      }
    >
      <ExplorarContent />
    </Suspense>
  );
}
