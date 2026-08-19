'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { ArrowLeft, BookOpen, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TerminosPage() {
  const { lang } = useI18n();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-8 hover:underline"
      >
        <ArrowLeft size={16} />
        {lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8"
      >
        <div className="flex items-center gap-4 border-b border-[var(--border)] pb-6">
          <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-600 dark:text-violet-400">
            <Scale size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[var(--foreground)]">
              {lang === 'es'
                ? 'Términos de Servicio y Dominio Público'
                : 'Terms of Service & Public Domain'}
            </h1>
            <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-bold mt-1">
              {lang === 'es'
                ? 'Licencia de Software Libre MIT'
                : 'Open Source MIT Software License'}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-[var(--foreground-sec)] leading-relaxed font-serif text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <BookOpen size={20} className="text-violet-500" />
              {lang === 'es' ? '1. Obras de Dominio Público' : '1. Public Domain Works'}
            </h2>
            <p>
              {lang === 'es'
                ? 'Todos los libros y textos accesibles en Leer es Pensar forman parte del dominio público universal o son distribuidos bajo licencias de libre difusión cultural (Project Gutenberg y OpenLibrary). El acceso es completamente gratuito e ilimitado para propósitos educativos y culturales.'
                : 'All books and texts accessible on Leer es Pensar are part of the universal public domain or distributed under free cultural diffusion licenses (Project Gutenberg and OpenLibrary). Access is completely free and unlimited for educational and cultural purposes.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Scale size={20} className="text-violet-500" />
              {lang === 'es' ? '2. Términos de la Licencia MIT' : '2. MIT License Terms'}
            </h2>
            <p>
              {lang === 'es'
                ? 'El código fuente de este proyecto se otorga bajo la Licencia MIT. Eres libre de usar, estudiar, modificar y redistribuir el software sin restricciones.'
                : 'The source code of this project is granted under the MIT License. You are free to use, study, modify, and redistribute the software without restrictions.'}
            </p>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
