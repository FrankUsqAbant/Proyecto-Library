'use client';

import React from 'react';
import Link from 'next/link';
import { UnifiedBook, getBookSlug } from '@/lib/api';
import { BookCover } from '@/components/books/BookCover';
import { useI18n } from '@/hooks/useI18n';
import { motion } from 'framer-motion';

interface BookShelf3DProps {
  books: UnifiedBook[];
}

export function BookShelf3D({ books }: BookShelf3DProps) {
  const { lang } = useI18n();
  const showcaseBooks = books.slice(0, 5);

  return (
    <section className="relative w-full py-16 my-12 overflow-hidden rounded-[3rem] bg-[var(--card)] border border-[var(--border)] shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400">
            {lang === 'es' ? 'COLECCIÓN DESTACADA 3D' : '3D FEATURED SHOWCASE'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[var(--foreground)] mt-2">
            {lang === 'es' ? 'Estantería de Obras Maestras' : 'Masterpieces Bookshelf'}
          </h2>
        </div>
        <p className="text-sm font-serif italic text-[var(--muted)] max-w-sm">
          {lang === 'es'
            ? 'Los grandes clásicos de la filosofía, literatura y ciencia guardados en nuestro estante principal.'
            : 'The greatest classics of philosophy, literature, and science stored on our main shelf.'}
        </p>
      </div>

      {/* 3D Shelf Stage Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-8 perspective-1200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-end relative z-10">
          {showcaseBooks.map((book, index) => {
            const slug = getBookSlug(book.id);
            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                <Link href={`/book/${slug}`} className="w-full flex flex-col items-center">
                  {/* 3D Book Standing on Shelf */}
                  <div
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'rotateY(-8deg) rotateX(4deg)',
                    }}
                    className="relative w-full aspect-[2/3] rounded-md shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-0 group-hover:scale-105"
                  >
                    <BookCover title={book.title} coverImage={book.coverImage} priority={index < 3} />

                    {/* 3D Book Spine Thickness */}
                    <div className="absolute top-0 bottom-0 left-0 w-3 bg-stone-900/60 z-20 pointer-events-none rounded-l-md" />

                    {/* 3D Glass Surface Shadow */}
                    <div className="absolute -bottom-4 left-2 right-2 h-4 bg-black/40 blur-md rounded-full transform rotateX(80deg) opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all" />
                  </div>

                  {/* Title Label Below Shelf */}
                  <div className="mt-6 text-center space-y-1 w-full px-1">
                    <h4 className="font-serif font-bold text-xs md:text-sm text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-[10px] text-[var(--muted)] font-serif italic truncate">
                      {book.authors[0] || (lang === 'es' ? 'Autor Clásico' : 'Classic Author')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Wooden/Glass Shelf Base */}
        <div className="relative w-full h-6 mt-2 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-lg border border-[var(--border)] shadow-xl transform rotateX(40deg) origin-top">
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xs" />
        </div>
      </div>
    </section>
  );
}
