'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INSPIRATIONAL_QUOTES } from '@/lib/api';

export function LoadingQuotes() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length));

  useEffect(() => {
    // Cambiar frase cada 4 segundos
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-8 max-w-2xl mx-auto">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-full h-full bg-[var(--background)] rounded-[30px] shadow-xl flex items-center justify-center border border-[var(--border)]">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-4xl text-violet-500">📖</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl font-serif italic text-[var(--foreground)] leading-relaxed">
            &ldquo;{INSPIRATIONAL_QUOTES[index].split(' — ')[0]}&rdquo;
          </p>
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">
            {INSPIRATIONAL_QUOTES[index].split(' — ')[1]}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5 pt-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-violet-600"
          />
        ))}
      </div>
    </div>
  );
}
