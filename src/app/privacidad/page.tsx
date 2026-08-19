'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { ArrowLeft, Shield, Lock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacidadPage() {
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
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[var(--foreground)]">
              {lang === 'es'
                ? 'Política de Privacidad y Licencia MIT'
                : 'Privacy Policy & MIT License'}
            </h1>
            <p className="text-xs text-[var(--muted)] uppercase tracking-wider font-bold mt-1">
              {lang === 'es' ? 'Software Libre y Código Abierto' : 'Free and Open Source Software'}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-[var(--foreground-sec)] leading-relaxed font-serif text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Lock size={20} className="text-violet-500" />
              {lang === 'es' ? '1. Protección de Datos' : '1. Data Protection'}
            </h2>
            <p>
              {lang === 'es'
                ? 'Leer es Pensar opera bajo el principio de privacidad absoluta. No recolectamos, vendemos ni rastreamos información personal identificable. Todas tus búsquedas y preferencias de lectura permanecen exclusivamente en tu navegador.'
                : 'Leer es Pensar operates on the principle of absolute privacy. We do not collect, sell, or track personally identifiable information. All your search queries and reading preferences remain exclusively in your browser.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <FileText size={20} className="text-violet-500" />
              {lang === 'es' ? '2. Licencia MIT de Código Abierto' : '2. Open Source MIT License'}
            </h2>
            <div className="p-6 bg-[var(--background-sec)] rounded-2xl border border-[var(--border)] font-mono text-xs text-[var(--foreground)] leading-relaxed space-y-4">
              <p className="font-bold">MIT License — Copyright (c) 2026 Frank Abanto</p>
              <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the &quot;Software&quot;), to deal in
                the Software without restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
                Software.
              </p>
              <p className="italic">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
                A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
