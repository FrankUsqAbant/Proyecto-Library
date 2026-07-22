'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { DOWNLOAD_CONFIG, DOWNLOAD_MODAL_CONFIG } from '@/lib/constants';
import DownloadAPI from '@/lib/api/download';
import { useI18n } from '@/hooks/useI18n';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookData: {
    id: string;
    title: string;
    downloadFormats?: {
      epub?: string;
      pdf?: string;
      mobi?: string;
      txt?: string;
    };
  };
}

export function DownloadModal({ isOpen, onClose, bookData }: DownloadModalProps) {
  const { lang: appLang } = useI18n();
  const [selectedFormat, setSelectedFormat] = useState(() => {
    if (bookData.downloadFormats) {
      if (!bookData.downloadFormats.epub) {
        const firstAvailable = Object.keys(bookData.downloadFormats)[0];
        if (firstAvailable) return firstAvailable;
      }
    }
    return 'epub';
  });
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('app_download_language');
      if (stored === 'es' || stored === 'en') return stored;
    }
    return appLang === 'es' || appLang === 'en' ? appLang : 'es';
  });
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    if (!DownloadAPI.checkRateLimit()) {
      setStatus('error');
      setErrorMessage(
        appLang === 'es'
          ? 'Demasiadas descargas. Intenta en un minuto.'
          : 'Too many downloads. Try in a minute.'
      );
      return;
    }

    setStatus('downloading');
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 15;
      });
    }, 200);

    try {
      const formatKey = selectedFormat as keyof typeof bookData.downloadFormats;
      const url = bookData.downloadFormats?.[formatKey];

      await DownloadAPI.triggerDownload(
        {
          bookId: bookData.id,
          bookTitle: bookData.title,
          format: selectedFormat,
          language: selectedLanguage,
        },
        url
      );

      clearInterval(interval);
      setProgress(100);
      setStatus('success');

      if (DOWNLOAD_MODAL_CONFIG.CLOSE_ON_SUCCESS) {
        setTimeout(onClose, 2500);
      }
    } catch (error: unknown) {
      clearInterval(interval);
      setStatus('error');
      const msg = error instanceof Error ? error.message : 'Error inesperado';
      setErrorMessage(msg);
    }
  };

  const formats = DOWNLOAD_CONFIG.VALID_FORMATS;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[var(--background-sec)] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-[9px] uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400 font-black">
                  Reading is Think
                </h3>
                <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] line-clamp-1">
                  {bookData.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={20} className="text-[var(--muted)]" />
              </button>
            </div>

            <div className="p-8 pt-4 space-y-8">
              {/* Language Selector */}
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={(code) => setSelectedLanguage(code as 'es' | 'en')}
              />

              {/* Format Selector */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-[var(--foreground)] opacity-70 uppercase tracking-widest px-1">
                  Formato de archivo
                </label>
                <div className="flex flex-wrap gap-2">
                  {formats.map((f) => {
                    const isAvailable =
                      !!bookData.downloadFormats?.[f as keyof typeof bookData.downloadFormats];
                    const isSelected = selectedFormat === f;

                    return (
                      <button
                        key={f}
                        disabled={!isAvailable}
                        onClick={() => setSelectedFormat(f)}
                        className={`
                          px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all
                          ${
                            isAvailable
                              ? isSelected
                                ? 'border-violet-600 bg-violet-600 text-white'
                                : 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground-sec)] hover:border-violet-400/50'
                              : 'opacity-30 cursor-not-allowed grayscale'
                          }
                        `}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Section */}
              <div className="pt-2">
                {status === 'idle' && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Download size={22} />
                    <span>{appLang === 'es' ? 'Confirmar Descarga' : 'Confirm Download'}</span>
                  </button>
                )}

                {status === 'downloading' && (
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-[var(--background)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-violet-600"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-violet-600 animate-pulse flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {appLang === 'es' ? 'Preparando archivo...' : 'Preparing file...'}
                    </p>
                  </div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 text-emerald-600 py-2"
                  >
                    <CheckCircle2 size={48} />
                    <p className="font-bold text-lg">
                      {appLang === 'es' ? '¡Descarga iniciada!' : 'Download started!'}
                    </p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-900/30"
                  >
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{errorMessage}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="ml-auto text-xs font-bold uppercase underline"
                    >
                      OK
                    </button>
                  </motion.div>
                )}
              </div>

              <p className="text-[10px] text-center text-[var(--muted)] font-serif italic max-w-[80%] mx-auto leading-relaxed">
                {appLang === 'es'
                  ? 'Los archivos son procesados para asegurar su integridad y facilitar su lectura en dispositivos digitales.'
                  : 'Files are processed to ensure integrity and facilitate reading on digital devices.'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
