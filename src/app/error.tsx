'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an external service if needed
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="max-w-xl w-full text-center space-y-12">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-32 h-32 mx-auto"
        >
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-full h-full bg-[var(--card)] rounded-[40px] flex items-center justify-center shadow-2xl border border-rose-100 dark:border-rose-900/30">
            <AlertTriangle size={56} className="text-rose-500" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)]">
            Algo dejó de rimar.
          </h1>
          <p className="text-xl text-[var(--muted)] font-serif italic leading-relaxed">
            Hubo un error inesperado al procesar esta página. Es posible que el libro que buscas
            esté temporalmente fuera de nuestro alcance.
          </p>
          <p className="text-xs font-mono text-[var(--muted)]/60 uppercase tracking-widest pt-4">
            ID de error: {error.digest || 'DESCONOCIDO'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent)]/90 font-bold space-x-2 shadow-lg shadow-violet-200 dark:shadow-none"
          >
            <RefreshCw size={20} />
            <span>Intentar de nuevo</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full px-8 h-14 rounded-2xl border-[var(--border)] font-bold text-[var(--foreground)] space-x-2"
            >
              <Home size={20} />
              <span>Volver al inicio</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
