'use client';

import React, { useEffect, useRef } from 'react';
import { LoadingQuotes } from './LoadingQuotes';
import { BookCard3D } from '@/components/3d/BookCard3D';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnifiedBook } from '@/lib/api';
import { useI18n } from '@/hooks/useI18n';

interface BookGridProps {
  loading: boolean;
  error: string | null;
  books: UnifiedBook[];
  totalCount: number;
  selectedCategory: string;
  onLoadMore: () => void;
  onRetry: () => void;
  onClearSearch: () => void;
}

export function BookGrid({
  loading,
  error,
  books,
  totalCount,
  selectedCategory,
  onLoadMore,
  onRetry,
  onClearSearch,
}: BookGridProps) {
  const { t, lang } = useI18n();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          books.length < totalCount &&
          books.length > 0
        ) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, books.length, totalCount, onLoadMore]);

  if (loading && books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-12"
      >
        <LoadingQuotes />
      </motion.div>
    );
  }

  if (error && books.length === 0) {
    return (
      <div className="text-center py-20 bg-rose-50 dark:bg-rose-950/20 rounded-3xl border border-rose-100 dark:border-rose-900/30">
        <p className="text-rose-500 font-serif text-xl mb-6">{error}</p>
        <Button
          variant="outline"
          onClick={onRetry}
          className="rounded-xl px-10 border-rose-200 text-rose-600"
        >
          {t('common.retry')}
        </Button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      {books.length > 0 ? (
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <h2
              suppressHydrationWarning
              className="text-2xl font-serif font-bold text-[var(--foreground)] border-l-4 border-violet-600 pl-4"
            >
              {selectedCategory === 'Todos'
                ? t('nav.library')
                : `${t('nav.categories')}: ${t(`topic.${selectedCategory}`)}`}
            </h2>
            <span
              suppressHydrationWarning
              className="text-sm font-medium text-[var(--muted)] border border-[var(--border)] px-3 py-1 rounded-full"
            >
              {totalCount} {lang === 'es' ? 'resultados' : 'results'}
            </span>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {books.map((book, index) => (
              <motion.div
                key={`${book.id}-${index}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.98 },
                  show: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <BookCard3D book={book} priority={index < 5} />
              </motion.div>
            ))}
          </motion.div>

          {/* Infinite Scroll Trigger */}
          <div ref={loaderRef} className="flex flex-col items-center justify-center pt-20 pb-10">
            {books.length < totalCount && (
              <div className="flex flex-col items-center space-y-4">
                {loading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
                    <p className="text-sm font-medium text-[var(--muted)] animate-pulse">
                      {lang === 'es' ? 'Descubriendo más tesoros...' : 'Discovering more treasures...'}
                    </p>
                  </>
                ) : (
                  <div className="h-20" />
                )}
              </div>
            )}

            {books.length >= totalCount && totalCount > 0 && (
              <div className="text-center space-y-2">
                <div className="h-px w-20 bg-[var(--border)] mx-auto mb-6" />
                <p className="text-sm font-serif italic text-[var(--muted)]">
                  {lang === 'es'
                    ? 'Has llegado al final de esta estantería.'
                    : 'You have reached the end of this shelf.'}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-32 text-center space-y-8 max-w-xl mx-auto px-4"
        >
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-violet-600/10 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-full h-full bg-[var(--background-sec)] rounded-[40px] flex items-center justify-center text-[var(--muted)] shadow-inner">
              <Search size={56} className="text-violet-500/30" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-serif font-bold text-[var(--foreground)]">
              {lang === 'es' ? 'Silencio en los Estantes' : 'Silence on the Shelves'}
            </h3>
            <p className="text-[var(--foreground-sec)] leading-relaxed font-serif italic text-xl">
              {t('common.no_results')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              className="rounded-2xl px-8 h-12 bg-violet-600 hover:bg-violet-700 font-bold w-full sm:w-auto text-white"
              onClick={onClearSearch}
            >
              {t('common.clear')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
