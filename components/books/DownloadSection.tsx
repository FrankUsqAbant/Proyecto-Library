'use client';

import { Download, FileText, BookOpen } from 'lucide-react';
import { UnifiedBook } from '@/lib/api';

interface DownloadSectionProps {
  book: UnifiedBook;
}

export default function DownloadSection({ book }: DownloadSectionProps) {
  if (!book.downloadFormats) {
    return (
      <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700">
        <p className="text-neutral-400 text-sm">
          📖 Este libro no está disponible para descarga gratuita.
        </p>
        <p className="text-neutral-500 text-xs mt-2">
          Solo libros de dominio público pueden descargarse gratuitamente.
        </p>
      </div>
    );
  }

  const formats = [
    {
      key: 'epub',
      label: 'EPUB',
      icon: BookOpen,
      url: book.downloadFormats.epub,
      description: 'E-readers y tablets',
    },
    {
      key: 'pdf',
      label: 'PDF',
      icon: FileText,
      url: book.downloadFormats.pdf,
      description: 'Lectura universal',
    },
    {
      key: 'html',
      label: 'HTML',
      icon: FileText,
      url: book.downloadFormats.html,
      description: 'Lectura en navegador',
    },
  ].filter((format) => format.url);

  if (formats.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-lg p-6 border border-emerald-700/30">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-400">
        <Download className="w-5 h-5" />
        Descargas Disponibles
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {formats.map((format) => (
          <a
            key={format.key}
            href={format.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 
                     rounded-lg transition-all hover:shadow-lg hover:scale-105 group"
          >
            <format.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <span className="font-medium block">{format.label}</span>
              <span className="text-xs opacity-80">{format.description}</span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs text-neutral-400 flex items-center gap-1">
        <span className="text-emerald-400">✓</span>
        Libros de dominio público cortesía de Project Gutenberg
      </p>
    </div>
  );
}
