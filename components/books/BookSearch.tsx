'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Mic, MicOff, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { searchUnifiedBooks, UnifiedBook, getUnifiedBook, getBookSlug } from '@/lib/api';
import { BookCover } from './BookCover';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';

interface BookSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
}

const sanitizeSearch = (term: string) => {
  return term.replace(/[<>\"\'%;\(\)\&\+]/g, '').trim();
};

export function BookSearch({ searchTerm, setSearchTerm, onSearch }: BookSearchProps) {
  const { t } = useI18n();
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<UnifiedBook[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Suggestions Fetch Logic
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchTerm.length >= 3) {
      setIsLoading(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const results = await searchUnifiedBooks(sanitizeSearch(searchTerm));
          setSuggestions(results.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  const handleVoiceSearch = () => {
    // Define types for speech recognition
    const GlobalWindow =
      typeof window !== 'undefined'
        ? (window as unknown as {
            SpeechRecognition?: new () => ISpeechRecognition;
            webkitSpeechRecognition?: new () => ISpeechRecognition;
          })
        : {};

    const Recognition = GlobalWindow.SpeechRecognition || GlobalWindow.webkitSpeechRecognition;

    if (!Recognition) {
      alert('Tu navegador no soporta búsqueda por voz.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      onSearch(transcript);
    };

    recognition.start();
  };

  // Add these types at the end of the file or before the component
  interface ISpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    onstart: () => void;
    onend: () => void;
    onerror: () => void;
    onresult: (event: ISpeechRecognitionEvent) => void;
    start: () => void;
  }

  interface ISpeechRecognitionEvent {
    results: {
      [index: number]: {
        [index: number]: {
          transcript: string;
        };
      };
    };
  }

  return (
    <div className="relative flex flex-col space-y-6 w-full" ref={containerRef}>
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-[var(--foreground)]">
          {t('home.title')}
        </h3>
        <p className="text-[var(--muted)] text-sm md:text-base italic">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row gap-4 w-full">
        <div className="relative flex-grow group">
          <Search
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10',
              searchTerm ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            )}
            size={20}
          />
          <Input
            placeholder={t('search.placeholder')}
            className="pl-12 pr-24 h-14 text-lg shadow-sm border-[var(--border)] bg-[var(--background-sec)] text-[var(--foreground)] rounded-xl focus:ring-2 focus:ring-violet-500 transition-all backdrop-blur-sm placeholder:text-[var(--muted)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length >= 3 && setShowSuggestions(true)}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 z-10">
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X size={18} />
              </button>
            )}

            <div className="w-px h-6 bg-[var(--border)] mx-2" />

            <button
              type="button"
              onClick={handleVoiceSearch}
              className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--accent)]'
              )}
              title={t('search.voice')}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>

          {/* Suggestions Autocomplete */}
          <AnimatePresence>
            {showSuggestions && (suggestions.length > 0 || isLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-[100]"
              >
                {isLoading ? (
                  <div className="p-4 flex items-center justify-center space-x-2 text-[var(--muted)] relative">
                    <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium italic">Buscando...</span>
                  </div>
                ) : (
                  <div className="p-2">
                    <div className="px-3 py-2 text-[10px] font-black text-[var(--muted)] uppercase tracking-widest border-b border-[var(--border)] mb-1">
                      Sugerencias
                    </div>
                    {suggestions.map((book) => (
                      <Link
                        key={book.id}
                        href={`/book/${getBookSlug(book.id)}`}
                        className="flex items-center space-x-4 p-3 hover:bg-[var(--hover)] rounded-xl transition-all group"
                        onClick={() => setShowSuggestions(false)}
                        onMouseEnter={() => {
                          // Prefetch data when hovering
                          getUnifiedBook(book.id);
                        }}
                      >
                        <div className="relative w-10 h-14 rounded-md overflow-hidden bg-[var(--background-sec)] flex-shrink-0 shadow-sm">
                          <BookCover title={book.title} coverImage={book.coverImage} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-sm font-bold text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">
                            {book.title}
                          </div>
                          <div className="text-xs text-[var(--muted)] truncate flex items-center">
                            <User size={10} className="mr-1" />
                            {book.authors[0] || 'Desconocido'}
                          </div>
                        </div>
                        <ArrowRight
                          size={14}
                          className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                        />
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        onSearch(sanitizeSearch(searchTerm));
                        setShowSuggestions(false);
                      }}
                      className="w-full p-3 text-xs font-bold text-[var(--accent)] hover:bg-[var(--hover)] rounded-xl transition-all flex items-center justify-center space-x-2 mt-1 border-t border-[var(--border)]"
                    >
                      <span>Ver todos los resultados</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          className="h-14 px-8 md:w-auto w-full flex items-center space-x-2 rounded-xl text-lg font-bold shadow-lg shadow-violet-100 dark:shadow-none bg-violet-600 hover:bg-violet-700 active:scale-[0.98] transition-all"
          onClick={() => {
            onSearch(sanitizeSearch(searchTerm));
            setShowSuggestions(false);
          }}
        >
          <span>{t('home.search_btn')}</span>
        </Button>
      </div>
    </div>
  );
}
