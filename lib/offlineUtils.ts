/**
 * Sistema de persistencia offline para el contenido de los libros.
 * Utiliza la Cache API para guardar el texto de los libros clásicos.
 */

const BOOK_CONTENT_CACHE = 'book-content-v1';

export async function saveBookToOffline(bookId: string, content: string) {
  if (typeof window === 'undefined' || !('caches' in window)) return;

  try {
    const cache = await caches.open(BOOK_CONTENT_CACHE);
    const response = new Response(content, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
    await cache.put(`/offline-book-${bookId}`, response);

    // Marcar en localStorage que este libro está disponible offline
    const offlineList = JSON.parse(localStorage.getItem('offline-books') || '[]');
    if (!offlineList.includes(bookId)) {
      localStorage.setItem('offline-books', JSON.stringify([...offlineList, bookId]));
    }
  } catch (error) {
    console.error('Error saving to offline cache:', error);
  }
}

export async function getBookFromOffline(bookId: string): Promise<string | null> {
  if (typeof window === 'undefined' || !('caches' in window)) return null;

  try {
    const cache = await caches.open(BOOK_CONTENT_CACHE);
    const response = await cache.match(`/offline-book-${bookId}`);
    if (response) {
      return await response.text();
    }
  } catch (error) {
    console.error('Error reading from offline cache:', error);
  }
  return null;
}

export function isBookOffline(bookId: string): boolean {
  if (typeof window === 'undefined') return false;
  const offlineList = JSON.parse(localStorage.getItem('offline-books') || '[]');
  return offlineList.includes(bookId);
}
