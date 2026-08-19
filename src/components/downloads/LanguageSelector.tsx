'use client';

import React from 'react';
import { LANGUAGES, DOWNLOAD_LANGUAGE_STORAGE_KEY } from '@/lib/languages';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = Object.values(LANGUAGES);

  const handleSelect = (code: string) => {
    localStorage.setItem(DOWNLOAD_LANGUAGE_STORAGE_KEY, code);
    onLanguageChange(code);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-[var(--foreground)] opacity-70 uppercase tracking-widest px-1">
        Idioma de descarga
      </label>
      <div className="grid grid-cols-2 gap-3">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(lang.code)}
              className={`
                relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300
                ${
                  isSelected
                    ? 'border-violet-600 bg-violet-600/5 text-violet-600 shadow-sm'
                    : 'border-[var(--border)] bg-[var(--background-sec)] text-[var(--foreground-sec)] hover:border-violet-400/30'
                }
              `}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex flex-col items-start translate-y-[-1px]">
                <span className="font-bold text-sm leading-tight">{lang.label}</span>
                <span className="text-[10px] opacity-60 font-medium uppercase tracking-tighter">
                  {lang.nativeName}
                </span>
              </div>
              {isSelected && (
                <motion.div
                  layoutId="selected-check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto bg-violet-600 rounded-full p-1 shadow-md"
                >
                  <Check size={10} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
