'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { UnifiedBook, getBookSlug } from '@/lib/api';
import { BookCover } from '@/components/books/BookCover';
import { useI18n } from '@/hooks/useI18n';
import { DownloadModal } from '@/components/downloads/DownloadModal';
import { motion } from 'framer-motion';
import { Download, BookOpen } from 'lucide-react';

interface BookCard3DProps {
  book: UnifiedBook;
  priority?: boolean;
}

export const BookCard3D = React.memo(function BookCard3D({ book, priority = false }: BookCard3DProps) {
  const { lang } = useI18n();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const author = book.authors?.[0] || (lang === 'es' ? 'Autor desconocido' : 'Unknown author');
  const bookSlug = getBookSlug(book.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-15deg to 15deg)
    const rY = ((mouseX - width / 2) / (width / 2)) * 14;
    const rX = ((height / 2 - mouseY) / (height / 2)) * 14;

    setRotateX(rX);
    setRotateY(rY);

    // Glare position percentage
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloadOpen(true);
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1000 h-full w-full select-none"
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: rotateX === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
          }}
          className="relative flex flex-col h-full bg-[var(--card)] border border-[var(--border)] rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
        >
          {/* Holographic Specular Glare */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-[2rem]"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`,
              opacity: glarePos.opacity,
            }}
          />

          <Link href={`/book/${bookSlug}`} className="flex flex-col h-full">
            {/* 3D Elevated Book Cover Container */}
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-[var(--background-sec)] p-4 flex items-center justify-center">
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="relative w-full h-full rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500"
              >
                <BookCover title={book.title} coverImage={book.coverImage} priority={priority} />

                {/* 3D Spine Highlight */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/20 to-transparent z-20 pointer-events-none" />

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30">
                  <button
                    onClick={handleDownload}
                    className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    title={lang === 'es' ? 'Descargar' : 'Download'}
                  >
                    <Download size={18} />
                  </button>
                  <div
                    className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                    title={lang === 'es' ? 'Ver Detalles' : 'View Details'}
                  >
                    <BookOpen size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container (Elevated Z-space) */}
            <div
              style={{ transform: 'translateZ(15px)' }}
              className="flex flex-col flex-grow p-5 space-y-2 justify-between"
            >
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base md:text-lg text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-[var(--muted)] font-serif italic line-clamp-1 opacity-80">
                  {author}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[10px] uppercase font-bold tracking-widest text-[var(--muted)]">
                <span>{book.publishYear ? `${book.publishYear}` : 'Dominio Público'}</span>
                <span className="text-violet-600 dark:text-violet-400 font-extrabold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {isDownloadOpen && (
        <DownloadModal
          isOpen={isDownloadOpen}
          onClose={() => setIsDownloadOpen(false)}
          bookData={book}
        />
      )}
    </>
  );
});
