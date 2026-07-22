'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { StudyBear } from '@/components/ui/StudyBear';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

export function Footer() {
  const pathname = usePathname();
  const { t, lang } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <footer className="relative bg-[var(--background)] border-t border-[var(--border)] pt-20 pb-10 transition-colors overflow-hidden">
      {/* --- PREMIUM BACKGROUND ORCHESTRATION --- */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 opacity-60 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 opacity-40" />
      <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16"
        >
          {/* --- SECTION 1: IDENTITY (Glassmorphism) --- */}
          <div className="lg:col-span-4 flex flex-col space-y-8 p-8 rounded-[40px] bg-[var(--card)] border border-[var(--border)] backdrop-blur-xl shadow-2xl shadow-black/5 group hover:border-[var(--accent)]/30 transition-all duration-500">
            <Link
              href="/"
              className="flex items-center space-x-4 group w-fit"
              onClick={handleLogoClick}
            >
              <div
                suppressHydrationWarning
                className="relative w-12 h-12 overflow-hidden rounded-[18px] bg-stone-950 border border-stone-800 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500"
              >
                <Image
                  src="/branding/logo-v4.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain p-1.5"
                />
              </div>
              <div className="flex flex-col">
                <span
                  suppressHydrationWarning
                  className="text-xl font-serif font-bold text-[var(--foreground)] tracking-tight leading-none"
                >
                  {lang === 'es' ? 'Leer es ' : 'Read to '}
                  <span className="text-[var(--accent)]">{lang === 'es' ? 'Pensar' : 'Think'}</span>
                </span>
                <span
                  suppressHydrationWarning
                  className="text-[9px] uppercase tracking-[0.4em] text-[var(--muted)] font-black mt-1.5 opacity-60"
                >
                  Est. 2025 • {lang === 'es' ? 'Biblioteca Digital' : 'Digital Library'}
                </span>
              </div>
            </Link>

            <p className="text-[var(--muted)] text-sm leading-relaxed font-serif italic opacity-80">
              &ldquo;{t('footer.description')}&rdquo;
            </p>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-[var(--accent)] transition-all shadow-sm"
                  title={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- SECTION 2: NAVIGATION --- */}
          <div className="lg:col-span-2 lg:pl-6 pt-4">
            <h4 className="font-black text-[var(--foreground)] mb-6 uppercase tracking-[0.4em] text-[10px] opacity-30">
              {lang === 'es' ? 'Mapa' : 'Map'}
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[var(--muted)] hover:text-[var(--foreground)] transition-all text-sm font-bold flex items-center group"
                  >
                    <span className="w-1.5 h-[1.5px] bg-[var(--accent)] mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- SECTION 3: THE HEART --- */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center relative scale-90">
            <StudyBear />
          </div>

          {/* --- SECTION 4: NEWSLETTER --- */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="p-8 rounded-[40px] bg-[var(--background-sec)] border border-[var(--border)] backdrop-blur-xl shadow-sm">
              <h4 className="font-black text-[var(--foreground)] mb-4 uppercase tracking-[0.4em] text-[9px] opacity-40">
                Newsletter Zen
              </h4>
              <p
                suppressHydrationWarning
                className="text-sm text-[var(--muted)] leading-relaxed mb-6 font-serif italic"
              >
                {lang === 'es'
                  ? 'Únete y recibe un clásico cada semana.'
                  : 'Join and receive a classic every week.'}
              </p>
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Email..."
                  className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-violet-500/20 transition-all text-[var(--foreground)]"
                />
                <button className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
                  {lang === 'es' ? 'Unirse' : 'Join'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- BOTTOM BAR (Strictly Horizontal Line) --- */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-8">
            <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.2em] opacity-40">
              © 2026 LeerEsPensar
            </p>
            <div className="hidden sm:flex gap-6 uppercase tracking-[0.2em] text-[10px] font-black text-[var(--muted)]">
              <Link
                href="#"
                className="hover:text-[var(--accent)] transition-all opacity-40 hover:opacity-100"
              >
                {lang === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link
                href="#"
                className="hover:text-[var(--accent)] transition-all opacity-40 hover:opacity-100"
              >
                {lang === 'es' ? 'Términos' : 'Terms'}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60">
              <span>Hecho por Frank Abanto</span>
              <Heart size={12} className="text-rose-500 fill-current" />
            </div>
            <button
              onClick={scrollToTop}
              className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--muted)] hover:text-[var(--accent)] transition-all shadow-sm"
              aria-label="Volver arriba"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
