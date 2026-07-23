'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Download } from 'lucide-react';
import { UnifiedBook, getBookSlug } from '@/lib/api';
import { BookCover } from './BookCover';
import { useI18n } from '@/hooks/useI18n';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { DownloadModal } from '../downloads/DownloadModal';

interface BookCardProps {
  book: UnifiedBook;
  priority?: boolean;
}

const MotionLink = motion(Link);

export const BookCard = React.memo(function BookCard({ book, priority = false }: BookCardProps) {
  const { lang } = useI18n();
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
  const author = book.authors?.[0] || (lang === 'es' ? 'Autor desconocido' : 'Unknown author');

  // 3D Tilt properties
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloadOpen(true);
  };

  const bookSlug = getBookSlug(book.id);

  return (
    <div className="h-full" style={{ perspective: '1000px' }}>
      <MotionLink
        href={`/book?id=${bookSlug}`}
        aria-label={`Ver detalles de ${book.title}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex flex-col h-full bg-[var(--background-sec)] border border-[var(--border)] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(124,58,237,0.12)] dark:hover:shadow-[0_20px_40px_rgba(124,58,237,0.35)]"
      >
        {/* Shadow glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-500" />

        {/* Cover Image Area */}
        <div className="relative w-full aspect-[3/4] overflow-hidden m-3 rounded-[1.5rem] bg-[var(--background)] shadow-sm transition-all duration-500 group-hover:shadow-md">
          <BookCover
            title={book.title}
            coverImage={book.coverImage}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 will-change-transform"
          />

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={
                book.downloadFormats
                  ? {
                      boxShadow: [
                        '0 0 0px rgba(124, 58, 237, 0)',
                        '0 0 20px rgba(124, 58, 237, 0.4)',
                        '0 0 0px rgba(124, 58, 237, 0)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onClick={handleDownload}
              className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 dark:bg-black/80 backdrop-blur-xl text-zinc-900 dark:text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-white/20"
            >
              <Download size={18} className="text-violet-600 dark:text-violet-400" />
              <span>{lang === 'es' ? 'Descargar' : 'Download'}</span>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6 pt-2 space-y-4">
          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-xl leading-tight text-[var(--foreground)] line-clamp-2 transition-colors duration-300">
              {book.title}
            </h4>
            <p className="text-sm font-medium text-[var(--foreground-sec)] line-clamp-1 italic">
              {author}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-2">
              {book.downloadFormats?.epub && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 font-bold uppercase tracking-wider">
                  EPUB
                </span>
              )}
              {book.downloadFormats?.pdf && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 font-bold uppercase tracking-wider">
                  PDF
                </span>
              )}
            </div>

            <div className="h-8 w-8 rounded-full bg-[var(--background)] flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
              <TrendingUp size={14} className="opacity-40 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </MotionLink>

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        bookData={{
          id: book.id,
          title: book.title,
          downloadFormats: book.downloadFormats,
        }}
      />
    </div>
  );
});
