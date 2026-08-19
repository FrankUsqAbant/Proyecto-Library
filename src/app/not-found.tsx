'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';

export default function NotFound() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated 404 Visual */}
        <div className="relative">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[150px] md:text-[200px] font-serif font-black text-[var(--muted)]/20 leading-none select-none"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-[var(--card)] rounded-3xl shadow-2xl flex items-center justify-center border border-[var(--border)]"
            >
              <Search size={40} className="text-[var(--accent)]" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">
            {t('not_found.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] font-serif italic max-w-md mx-auto">
            {t('not_found.desc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 h-14 rounded-2xl border border-[var(--border)] font-bold text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--hover)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('not_found.back')}</span>
          </button>

          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full px-12 h-14 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 font-bold space-x-2 shadow-lg shadow-violet-200 dark:shadow-none">
              <Home size={20} />
              <span>{t('not_found.explore')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
