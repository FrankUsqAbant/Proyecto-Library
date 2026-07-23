'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LITERARY_QUOTES } from '@/lib/constants';
import { useI18n } from '@/hooks/useI18n';

export function QuoteHero() {
  const [index, setIndex] = useState(0);
  const { t, lang } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LITERARY_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = LITERARY_QUOTES[index];

  return (
    <div className="relative w-full min-h-[60vh] py-24 px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden rounded-[48px] bg-[var(--card)]/80 backdrop-blur-3xl border border-[var(--border)] shadow-2xl shadow-violet-900/10 dark:shadow-black/60 group">
      {/* Static gradient background to prevent lag */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[48px]">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-violet-500/10 dark:bg-violet-600/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[80%] h-[80%] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-6 text-[var(--foreground)] drop-shadow-sm mt-8"
        >
          {t('nav.brand_first')}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-600">{t('nav.brand_second')}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-2xl text-[var(--muted)] font-medium mb-16 max-w-2xl leading-relaxed"
        >
          {t('home.subtitle')}
        </motion.p>

        <div className="relative w-full max-w-4xl min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-8 absolute w-full"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-[var(--foreground)] leading-tight italic drop-shadow-sm">
                “{lang === 'es' ? currentQuote.text : t('hero.quote').replace(/[“”"]/g, '')}”
              </h2>

              <div className="flex items-center justify-center space-x-6 pt-6">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />
                <div className="flex flex-col items-center">
                  <span className="text-[var(--foreground)] font-bold text-xl tracking-wide">
                    {lang === 'es' ? currentQuote.author : t('hero.author').replace('— ', '')}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] font-extrabold mt-2">
                    {t('hero.author_label')}
                  </span>
                </div>
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
