'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES_DATA } from '@/lib/constants';
import { useI18n } from '@/hooks/useI18n';

export default function CategoriasPage() {
  const { t } = useI18n();

  return (
    <div className="pt-32 pb-20 px-6 bg-[var(--background)] transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--foreground)] mb-4">
            {t('categories.title')}
          </h1>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto italic font-serif">
            {t('categories.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES_DATA.map((cat, idx) => (
            <Link key={cat.name} href={`/explorar?category=${cat.name}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                }}
                className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl group cursor-pointer transition-all hover:border-[var(--accent)]/30"
              >
                <div
                  className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <cat.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">
                  {t(`topic.${cat.name}`)}
                </h3>
                <p className="text-[var(--muted)] font-medium">
                  {cat.count} {t('categories.available')}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
