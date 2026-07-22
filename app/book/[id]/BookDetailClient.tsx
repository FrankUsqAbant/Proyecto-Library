'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookCover } from '@/components/books/BookCover';
import { RelatedBooksCarousel } from '@/components/carousel';
import { UnifiedBook } from '@/lib/api';

interface BookDetailClientProps {
  book: UnifiedBook;
  id: string;
}

export function BookDetailClient({ book }: BookDetailClientProps) {
  const router = useRouter();
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const author = book.authors[0] || 'Autor desconocido';

  const generateSummary = () => {
    if (book.description) return book.description;

    // Fallback summary if description is missing
    return `Esta obra clásica nos sumerge en una narrativa profunda y atemporal. Publicada originalmente en ${book.publishYear || 'épocas pasadas'}, el texto de ${author} es una pieza imprescindible de la literatura universal que puedes disfrutar ahora de forma gratuita y legal.`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden relative selection:bg-violet-500/30">
      {/* 1. TEXTURE OVERLAY (Grain) */}
      <div className="bg-grain" />

      {/* 2. AMBIENT LIGHTING SYSTEM (Enhanced) */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000" />
        <div
          className="absolute bottom-[-10%] left-[-20%] w-[900px] h-[900px] bg-rose-500/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-7000"
          style={{ animationDelay: '2s' }}
        />
        {/* Spotlight top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 blur-[100px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-32">
        {/* Back Button (Floating Pill) */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-16 group flex items-center space-x-3 px-5 py-2.5 rounded-full bg-[var(--background-sec)] border border-[var(--border)] backdrop-blur-md shadow-sm hover:shadow-md hover:bg-[var(--hover)] transition-all duration-300"
        >
          <ChevronLeft
            size={18}
            className="text-[var(--muted)] group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium text-sm text-[var(--foreground-sec)] tracking-wide">
            Volver a la biblioteca
          </span>
        </motion.button>

        {/* --- MASTER LAYOUT: Magazine Style (Asymmetric Grid) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* LEFT: Cover Highlight (Cols 1-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
              className="relative group perspective-1000"
            >
              <div className="absolute top-4 left-4 w-full h-full bg-[var(--background-sec)] rounded-[4px] -z-10 rotate-2 transition-transform group-hover:rotate-3" />

              <div className="relative w-full aspect-[2/3] rounded-[4px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0_35px_65px_-15px_rgba(0,0,0,0.3)]">
                <BookCover title={book.title} coverImage={book.coverImage} priority />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-20 opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <div className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--background-sec)] text-xs font-bold tracking-widest uppercase text-[var(--muted)]">
                DOMINIO PÚBLICO
              </div>
              <div className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--background-sec)] text-xs font-bold tracking-widest uppercase text-[var(--muted)] truncate max-w-[150px]">
                {book.id}
              </div>
              {book.publishYear && (
                <div className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--background-sec)] text-xs font-bold tracking-widest uppercase text-[var(--muted)]">
                  Año {book.publishYear}
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-8 flex flex-col relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl xl:text-8xl font-serif font-bold text-[var(--foreground)] leading-[0.95] tracking-tighter mb-8 text-gradient-premium"
            >
              {book.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-4 mb-12"
            >
              <div className="h-px w-12 bg-[var(--border)]" />
              <div className="text-xl md:text-2xl font-light text-[var(--foreground-sec)]">
                <span className="font-serif italic opacity-60 mr-2">by</span>
                <span className="font-normal border-b border-[var(--border)] pb-1">{author}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative pl-0 lg:pl-8 border-l-0 lg:border-l border-[var(--border)]"
            >
              <div className="text-xl md:text-2xl lg:text-3xl leading-[1.8] text-[var(--foreground)] font-classic font-medium first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[var(--accent)] prose dark:prose-invert max-w-none">
                {generateSummary()}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 flex flex-wrap gap-6 items-center"
            >
              <div className="relative z-20">
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-[var(--accent)] hover:text-white font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 border-none w-full md:w-auto min-w-[240px]"
                  onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                >
                  <Download size={24} className="mr-3" />
                  Descargar Libro
                </Button>

                <AnimatePresence>
                  {downloadMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] p-2 overflow-hidden"
                    >
                      <div className="px-3 py-3 text-[10px] font-black uppercase text-[var(--muted)] tracking-widest border-b border-[var(--border)] mb-1 bg-[var(--background-sec)] rounded-t-lg">
                        Formatos Disponibles
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1 space-y-1">
                        {book.downloadFormats ? (
                          <>
                            {book.downloadFormats.epub && (
                              <a
                                href={book.downloadFormats.epub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--accent)] transition-all group"
                              >
                                <span>EPUB (E-Book)</span>
                                <Download
                                  size={14}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                              </a>
                            )}
                            {book.downloadFormats.pdf && (
                              <a
                                href={book.downloadFormats.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--accent)] transition-all group"
                              >
                                <span>PDF (Documento)</span>
                                <Download
                                  size={14}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                              </a>
                            )}
                            {book.downloadFormats.html && (
                              <a
                                href={book.downloadFormats.html}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold text-[var(--foreground)] hover:bg-[var(--hover)] hover:text-[var(--accent)] transition-all group"
                              >
                                <span>HTML (Web)</span>
                                <Download
                                  size={14}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                              </a>
                            )}
                          </>
                        ) : (
                          <div className="px-3 py-4 text-xs text-[var(--muted)] text-center italic">
                            No hay descargas directas para esta edición de Open Library.
                            <p className="mt-2 opacity-60">Prueba con otro título clásico.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 p-1.5 rounded-full bg-[var(--background-sec)] border border-[var(--border)]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full hover:bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
                  onClick={async () => {
                    if (navigator.share)
                      await navigator.share({
                        title: book.title,
                        url: window.location.href,
                      });
                  }}
                  title="Compartir"
                >
                  <Share2 size={20} />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <RelatedBooksCarousel currentBook={book} />
      </div>
    </div>
  );
}
