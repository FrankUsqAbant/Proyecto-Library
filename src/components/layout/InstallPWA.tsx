'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if already installed or banner was already shown in this "lifetime"
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const bannerShown = localStorage.getItem('pwa_banner_shown');

      if (!isStandalone && !bannerShown) {
        setShowBanner(true);
        localStorage.setItem('pwa_banner_shown', 'true');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-[60]"
        >
          <div className="bg-white dark:bg-stone-900 border border-slate-100 dark:border-stone-800 rounded-3xl shadow-2xl p-6 flex flex-col space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-200 dark:shadow-none">
                  <Download size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Instalar Leer es Pensar
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Añádela a tu pantalla de inicio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleInstallClick}
                className="flex-grow h-12 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-violet-100 dark:shadow-none"
              >
                <Download size={18} />
                <span>Instalar ahora</span>
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="px-6 h-12 bg-stone-100 dark:bg-stone-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-all"
              >
                Luego
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
