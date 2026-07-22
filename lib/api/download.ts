/**
 * API y utilidades para gestionar descargas de libros con soporte multiidioma
 */

import { DOWNLOAD_CONFIG } from '../constants';

export interface DownloadOptions {
  bookId: string;
  bookTitle: string;
  format: string;
  language: string;
}

class DownloadAPI {
  /**
   * Construir el nombre del archivo sanitizado
   */
  static buildFilename(title: string, format: string, language: string): string {
    const cleanTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 50);

    const langSuffix = language === 'es' ? '_es' : '_en';
    const timestamp = new Date().getTime();

    return `${cleanTitle}${langSuffix}_${timestamp}.${format}`;
  }

  /**
   * Simular la lógica de descarga (ya que actualmente usamos enlaces directos de Gutendex/OL)
   * En un backend real, aquí iría el fetch al endpoint de descarga.
   */
  static async triggerDownload(options: DownloadOptions, url?: string): Promise<void> {
    const { bookId, bookTitle, format, language } = options;

    let targetUrl = url;
    if (!targetUrl) {
      if (bookId.startsWith('/works/') || bookId.startsWith('/books/')) {
        targetUrl = `https://openlibrary.org${bookId}`;
      } else if (bookId.match(/^\d+$/)) {
        targetUrl = `https://www.gutenberg.org/ebooks/${bookId}`;
      } else {
        targetUrl = `https://openlibrary.org/search?q=${encodeURIComponent(bookTitle)}`;
      }
    }

    try {
      // Si la URL es externa (como Gutendex), usamos el link trigger standard
      // Si quisiéramos forzar el nombre, necesitaríamos un proxy o fetch (si CORS lo permite)
      const link = document.createElement('a');
      link.href = targetUrl;
      link.setAttribute('download', this.buildFilename(bookTitle, format, language));
      link.setAttribute('target', '_blank');
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Download trigger failed:', error);
      throw error;
    }
  }

  /**
   * Verificar límites de descarga (Rate Limiting Simple)
   */
  static checkRateLimit(): boolean {
    if (typeof window === 'undefined') return true;

    const storageKey = 'last_downloads_timestamps';
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    let timestamps: number[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    timestamps = timestamps.filter((t) => t > oneMinuteAgo);

    if (timestamps.length >= DOWNLOAD_CONFIG.MAX_DOWNLOADS_PER_MINUTE) {
      return false;
    }

    timestamps.push(now);
    localStorage.setItem(storageKey, JSON.stringify(timestamps));
    return true;
  }
}

export default DownloadAPI;
