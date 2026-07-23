'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, Moon, Sun, Languages, Mic, MicOff, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { useI18n } from '@/hooks/useI18n';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { searchUnifiedBooks, UnifiedBook, getBookSlug } from '@/lib/api';
import { BookCover } from '../books/BookCover';
import { Logo3D } from '@/components/ui/Logo3D';

// --- Speech Recognition Types ---
interface ISpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: Event) => void;
  onresult: (event: ISpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Search suggestions and voice state
  const [suggestions, setSuggestions] = useState<UnifiedBook[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY]);

  // Suggestions logic
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchQuery.length >= 3) {
      setIsLoading(true);
      debounceTimer.current = setTimeout(async () => {
        try {
          const results = await searchUnifiedBooks(searchQuery, 5);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setMobileMenuOpen(false);
    }
  };

  const handleVoiceSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowAny = window as any;
    const SpeechRecognition = windowAny.SpeechRecognition || windowAny.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta búsqueda por voz.');
      return;
    }

    const recognition = new SpeechRecognition() as ISpeechRecognition;
    recognition.lang = lang === 'es' ? 'es-ES' : 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      router.push(`/?search=${encodeURIComponent(transcript)}`);
      setMobileMenuOpen(false);
    };
    recognition.start();
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        'fixed top-4 left-4 right-4 z-50 transition-all duration-700 ease-in-out',
        isScrolled
          ? 'py-3 bg-[var(--card)]/70 backdrop-blur-2xl shadow-2xl shadow-violet-900/10 dark:shadow-black/50 border border-[var(--border)]/50 px-6 mx-auto max-w-4xl rounded-[32px] translate-y-2'
          : 'py-6 bg-transparent border-transparent px-8 max-w-7xl mx-auto rounded-[28px]',
        mobileMenuOpen ? 'bg-[var(--card)] opacity-100 border-[var(--border)] rounded-[28px]' : ''
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="group relative flex items-center space-x-3.5"
          onClick={handleLogoClick}
        >
          <Logo3D size="md" />
          <span
            suppressHydrationWarning
            className="text-2xl font-serif font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
          >
            {t('nav.brand_first')}
            <span className="text-[var(--accent)]">{t('nav.brand_second')}</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            {NAV_LINKS.map((link) => {
              const label = link.label === 'Inicio' 
                ? t('nav.library') 
                : link.label === 'Categorías'
                  ? t('nav.categories') || 'Categories'
                  : link.label === 'Favoritos'
                    ? t('nav.favorites') || 'Favorites'
                    : link.label;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={cn(
                    'relative px-4 py-2 font-semibold text-sm transition-colors rounded-xl flex items-center justify-center',
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--foreground-sec)] hover:text-[var(--foreground)]'
                  )}
                >
                  <span suppressHydrationWarning className="relative z-10">{label}</span>
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="navHoverBubble"
                      className="absolute inset-0 bg-stone-100 dark:bg-stone-850 rounded-xl -z-10 border border-stone-200/50 dark:border-stone-800/40 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="relative" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="relative group" role="search">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors"
                size={14}
                aria-hidden="true"
              />
              <input
                id="search-input"
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 3 && setShowSuggestions(true)}
                className="bg-[var(--background-sec)] border-none rounded-full py-2 pl-9 pr-10 text-xs w-40 focus:w-64 transition-all focus:ring-2 focus:ring-violet-500 outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
                aria-label={t('search.placeholder')}
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 transition-colors',
                  isListening
                    ? 'text-rose-500 animate-pulse'
                    : 'text-[var(--muted)] hover:text-[var(--accent)]'
                )}
              >
                {isListening ? <MicOff size={14} /> : <Mic size={14} />}
              </button>
            </form>

            <AnimatePresence>
              {showSuggestions && (suggestions.length > 0 || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-72 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-[100] backdrop-blur-xl bg-opacity-95"
                >
                  {isLoading ? (
                    <div className="p-4 flex items-center justify-center space-x-2 text-[var(--muted)]">
                      <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-medium italic">Buscando...</span>
                    </div>
                  ) : (
                    <div className="p-2 text-[var(--foreground)]">
                      {suggestions.map((book) => (
                        <Link
                          key={book.id}
                          href={`/book?id=${getBookSlug(book.id)}`}
                          className="flex items-center space-x-3 p-2 hover:bg-[var(--hover)] rounded-xl transition-all group"
                          onClick={() => setShowSuggestions(false)}
                        >
                          <div className="relative w-8 h-12 rounded bg-[var(--background-sec)] overflow-hidden flex-shrink-0">
                            <BookCover title={book.title} coverImage={book.coverImage} />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-[11px] font-bold truncate group-hover:text-[var(--accent)]">
                              {book.title}
                            </div>
                            <div className="text-[10px] text-[var(--muted)] truncate flex items-center">
                              <User size={8} className="mr-1" />
                              {book.authors[0] || 'Desconocido'}
                            </div>
                          </div>
                          <ArrowRight
                            size={12}
                            className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="w-10 h-10 rounded-xl bg-[var(--background-sec)] border border-[var(--border)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm group relative hover:bg-[var(--hover)]"
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Languages
                size={18}
                className="text-[var(--foreground-sec)] group-hover:text-[var(--accent)] transition-colors"
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-20"></span>
                <span
                  suppressHydrationWarning
                  className="relative inline-flex rounded-full h-4 w-4 bg-violet-500 text-[8px] text-white items-center justify-center font-bold uppercase"
                >
                  {lang}
                </span>
              </span>
            </button>

            <button
              onClick={() => toggleTheme()}
              className="w-10 h-10 rounded-xl bg-[var(--background-sec)] border border-[var(--border)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm hover:bg-[var(--hover)]"
              aria-label="Cambiar tema"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun size={18} className="text-amber-500" />
                ) : (
                  <Moon size={18} className="text-[var(--foreground-sec)]" />
                )
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-[var(--border)] border-t-violet-500 animate-spin" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 flex items-center justify-center transition-all z-50"
            aria-label="Cambiar tema"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-slate-600" />
              )
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-stone-800 border-t-violet-500 animate-spin" />
            )}
          </button>
          <button
            className="text-slate-900 dark:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[76px] bg-[var(--background)] dark:bg-stone-950 z-40 md:hidden p-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => {
                const label = link.label === 'Inicio' 
                  ? t('nav.library') 
                  : link.label === 'Categorías'
                    ? t('nav.categories') || 'Categories'
                    : link.label === 'Favoritos'
                      ? t('nav.favorites') || 'Favorites'
                      : link.label;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-medium flex items-center space-x-2 text-[var(--foreground)]"
                  >
                    <span suppressHydrationWarning>{label}</span>
                  </Link>
                );
              })}

              <form
                onSubmit={handleSearch}
                className="relative pt-4 border-t border-[var(--border)]"
              >
                <Search className="absolute left-3 top-11 text-[var(--muted)]" size={20} />
                <input
                  type="text"
                  placeholder="Buscar libros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--background-sec)] text-[var(--foreground)] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500 mt-4 placeholder:text-[var(--muted)]"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
