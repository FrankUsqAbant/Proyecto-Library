'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, BookOpen, ChevronRight } from 'lucide-react';
import { getFavorites, initTursoSchema } from '@/lib/db/turso';
import { UnifiedBook } from '@/lib/api';
import { useI18n } from '@/hooks/useI18n';
import { BookGrid } from '@/components/books/BookGrid';
import { Button } from '@/components/ui/button';

export default function FavoritosPage() {
  const { t } = useI18n();
  const [favorites, setFavorites] = useState<UnifiedBook[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      // Ensure tables exist
      await initTursoSchema();
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--background)] transition-colors relative selection:bg-violet-500/30 overflow-x-hidden">
      {/* 1. TEXTURE OVERLAY */}
      <div className="bg-grain" />

      {/* 2. AMBIENT GLOW SYSTEM */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] bg-rose-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-500 mb-2"
          >
            <Heart size={32} className="fill-rose-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-[var(--foreground)] text-gradient-premium"
          >
            {t('nav.favorites') || 'Favoritos'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--muted)] text-lg max-w-2xl mx-auto italic font-serif"
          >
            Tu colección personal de lecturas y tesoros clásicos.
          </motion.p>
        </header>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--muted)] italic">Consultando tu estantería en la nube...</p>
          </div>
        ) : favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookGrid
              loading={false}
              error={null}
              books={favorites}
              totalCount={favorites.length}
              selectedCategory="Todos"
              onLoadMore={() => {}}
              onRetry={loadFavorites}
              onClearSearch={() => {}}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-md rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-violet-500 to-indigo-600" />
            <BookOpen size={48} className="mx-auto text-[var(--muted)] mb-6 opacity-60" />
            <h3 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-3">
              Estantería Vacía
            </h3>
            <p className="text-[var(--muted)] text-sm mb-8 leading-relaxed">
              Aún no has guardado ningún clásico en tus favoritos. Explora nuestro catálogo y colecciona las obras que más te gusten.
            </p>
            <Link href="/explorar">
              <Button className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-violet-600 hover:text-white font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5 w-full">
                <span>Explorar Catálogo</span>
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
