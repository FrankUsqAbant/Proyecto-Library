'use client';

import React, { useState, useEffect } from 'react';
import { BookCardSkeleton } from './BookCardSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const LOADING_MESSAGES = [
  'Explorando los estantes secretos...',
  'Desempolvando clásicos olvidados...',
  'Preparando tinta digital...',
  'Consultando con los bibliotecarios...',
  'Abriendo portales literarios...',
  'Traduciendo sueños a palabras...',
];

export function LoadingGrid() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[400px]">
      {/* Background Skeletons (Low opacity) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 opacity-30 pointer-events-none blur-[2px] transition-all duration-700">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>

      {/* Floating Engaging Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)] p-8 rounded-3xl shadow-2xl shadow-stone-200/50 dark:shadow-none flex flex-col items-center text-center max-w-sm mx-4"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="relative bg-[var(--background)] p-4 rounded-2xl border border-[var(--border)] shadow-sm"
            >
              <BookOpen size={32} className="text-[var(--accent)]" />
            </motion.div>
          </div>

          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg font-serif font-bold text-[var(--foreground)]"
              >
                {LOADING_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex space-x-1">
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
