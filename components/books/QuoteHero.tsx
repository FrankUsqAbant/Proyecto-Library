"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LITERARY_QUOTES } from "@/lib/constants";
import { useI18n } from "@/hooks/useI18n";

export function QuoteHero() {
  const [index, setIndex] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LITERARY_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full py-20 px-8 md:px-12 overflow-hidden rounded-[48px] bg-[var(--card)] backdrop-blur-md border border-[var(--border)] shadow-2xl shadow-stone-200/20 dark:shadow-black/40">
      {/* Interactive internal glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-5xl font-serif font-medium text-[var(--foreground)] leading-[1.3] italic transition-colors">
              &ldquo;{t("hero.quote")}&rdquo;
            </h2>

            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--border)]" />
              <div className="flex flex-col">
                <span className="text-[var(--foreground)] font-bold italic text-lg tracking-tight">
                  {t("hero.author")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold mt-1">
                  Autor
                </span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--border)]" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
