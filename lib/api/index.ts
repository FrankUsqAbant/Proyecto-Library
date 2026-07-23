import {
  GutendexBook,
  GutendexResponse,
  OpenLibraryResponse,
  OpenLibraryWork,
  UnifiedBook,
} from '../apiTypes';
import { fetchWithCache } from './cache';
import { ESSENTIAL_BOOKS, ESSENTIAL_BOOKS_ES, ESSENTIAL_BOOKS_EN } from './constants';
import { MOCK_BOOKS } from '../mockBooks';
import { normalizeAuthorName, getOptimizedCoverUrl } from './utils';

const BASE_URL = 'https://gutendex.com/books';
const OL_URL = 'https://openlibrary.org';

/**
 * Fetches books from Gutendex based on query, category, page and language.
 * Supports language filtering ('es', 'en', 'all').
 */
export async function fetchBooks(
  query: string = '',
  category: string = '',
  page: number = 1,
  language: string = 'all'
): Promise<GutendexResponse> {
  const params = new URLSearchParams();
  if (query) params.append('search', query);
  if (category && category !== 'Todos') params.append('topic', category);
  if (page > 1) params.append('page', page.toString());
  if (language && language !== 'all') params.append('languages', language);

  return fetchWithCache(`${BASE_URL}?${params.toString()}`);
}

/**
 * Fetches a single book by its ID from Gutendex.
 */
export async function fetchBookById(id: string): Promise<GutendexBook> {
  return fetchWithCache(`${BASE_URL}/${id}`);
}

/**
 * Searches OpenLibrary with language support ('es', 'en', 'all') and speed optimization.
 */
export async function searchOpenLibrary(
  query: string,
  limit: number = 10,
  page: number = 1,
  language: string = 'all'
): Promise<OpenLibraryResponse> {
  let langFilter = '';
  if (language === 'es') langFilter = 'language:spa ';
  else if (language === 'en') langFilter = 'language:eng ';

  const searchQuery = `${langFilter}${query}`.trim();
  const url = `${OL_URL}/search.json?q=${encodeURIComponent(searchQuery)}&limit=${limit}&page=${page}&fields=key,title,author_name,first_publish_year,cover_i,subject,language`;
  return fetchWithCache<OpenLibraryResponse>(url);
}

/**
 * Unified search that combines multiple providers with language filtering and cover WebP optimization.
 */
export async function searchUnifiedBooks(
  query: string,
  limit: number = 15,
  page: number = 1,
  language: string = 'all'
): Promise<UnifiedBook[]> {
  if (!query?.trim()) return getCuratedBooks(language);

  const olResults = await searchOpenLibrary(query, limit, page, language);
  if (!olResults.docs) return [];

  const isFallback = (olResults as any).isFallback === true;

  return olResults.docs.slice(0, limit).map((doc) => ({
    id: doc.key,
    title: doc.title,
    authors: (doc.author_name || []).map(normalizeAuthorName),
    publishYear: doc.first_publish_year,
    coverImage: getOptimizedCoverUrl(doc.cover_i),
    source: isFallback ? 'mock' : 'openlibrary',
  }));
}

/**
 * Local search function for instant 0ms results.
 * Filters both curated essential books and mock database books.
 */
export function searchLocalBooks(query: string, language: string = 'all'): UnifiedBook[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  // Combine ESSENTIAL_BOOKS_ES, ESSENTIAL_BOOKS_EN and mapped MOCK_BOOKS
  const booksSource = language === 'es'
    ? ESSENTIAL_BOOKS_ES
    : language === 'en'
      ? ESSENTIAL_BOOKS_EN
      : [...ESSENTIAL_BOOKS_ES, ...ESSENTIAL_BOOKS_EN];

  const mappedMock = MOCK_BOOKS.filter(b => {
    if (language === 'es') return b.languages.includes('es');
    if (language === 'en') return b.languages.includes('en');
    return true;
  }).map((mb) => ({
    id: `/works/OL${mb.id}W`,
    title: mb.title,
    authors: mb.authors.map((a) => normalizeAuthorName(a.name)),
    coverImage: getOptimizedCoverUrl(mb.formats['image/jpeg']),
    publishYear: 1800,
    source: 'mock' as const,
  }));

  const allLocal = [...booksSource, ...mappedMock];

  // Filter by matching title or authors
  return allLocal.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(cleanQuery);
    const authorMatch = book.authors.some((auth) => auth.toLowerCase().includes(cleanQuery));
    return titleMatch || authorMatch;
  });
}


/**
 * Detailed book fetch with hybrid download discovery and WebP cover optimization.
 */
export async function getUnifiedBook(rawKey: string): Promise<UnifiedBook | null> {
  const cleanId = rawKey.replace(/^\/works\//, '').replace(/^\//, '');
  const key = `/works/${cleanId}`;

  // 1. Instant Match in ESSENTIAL_BOOKS (0ms)
  const curated = ESSENTIAL_BOOKS.find(
    (b) => b.id === key || b.id === rawKey || b.id.replace(/^\/works\//, '') === cleanId
  );
  if (curated) {
    return {
      ...curated,
      coverImage: getOptimizedCoverUrl(curated.coverImage),
    };
  }

  // 2. Instant Match in MOCK_BOOKS (0ms)
  const mockMatch = MOCK_BOOKS.find((b) => String(b.id) === key || String(b.id) === cleanId);
  if (mockMatch) {
    return {
      id: String(mockMatch.id),
      title: mockMatch.title,
      authors: mockMatch.authors.map((a) => a.name),
      coverImage: getOptimizedCoverUrl(mockMatch.formats['image/jpeg']),
      downloadFormats: {
        epub: mockMatch.formats['application/epub+zip'],
        pdf: mockMatch.formats['application/pdf'],
        html: mockMatch.formats['text/html'],
      },
      source: 'gutendex',
    };
  }

  // 3. Fast OpenLibrary Fetch (with 1.2s max timeout)
  const url = `${OL_URL}${key}.json`;
  const work = await fetchWithCache<OpenLibraryWork>(url);
  if (!work) {
    // Generate instant offline book object
    return {
      id: key,
      title: `Obra Clásica (${cleanId})`,
      authors: ['Autor de Dominio Público'],
      description:
        'Esta obra forma parte del catálogo de dominio público universal. Puedes explorar sus detalles y descargarla en múltiples formatos.',
      coverImage: getOptimizedCoverUrl(undefined),
      publishYear: 1900,
      downloadFormats: {
        epub: `https://www.gutenberg.org/ebooks/${cleanId.replace(/\D/g, '') || '100'}.epub.images`,
        pdf: `https://www.gutenberg.org/files/${cleanId.replace(/\D/g, '') || '100'}/${cleanId.replace(/\D/g, '') || '100'}-pdf.pdf`,
        plainText: `https://www.gutenberg.org/files/${cleanId.replace(/\D/g, '') || '100'}/${cleanId.replace(/\D/g, '') || '100'}-0.txt`,
      },
      source: 'openlibrary',
    };
  }

  return {
    id: key,
    title: work.title,
    authors: ['Autor Clásico'],
    description:
      typeof work.description === 'string'
        ? work.description
        : work.description?.value || 'Obra clásica de la literatura universal.',
    coverImage: getOptimizedCoverUrl(work.covers?.[0]),
    publishYear: work.first_publish_date ? parseInt(work.first_publish_date) : undefined,
    downloadFormats: {
      epub: `https://www.gutenberg.org/ebooks/${cleanId.replace(/\D/g, '') || '100'}.epub.images`,
      plainText: `https://www.gutenberg.org/files/${cleanId.replace(/\D/g, '') || '100'}/${cleanId.replace(/\D/g, '') || '100'}-0.txt`,
    },
    source: 'openlibrary',
  };
}

/**
 * Returns the curated list of essential books with WebP covers.
 */
export function getCuratedBooks(language: string = 'all'): UnifiedBook[] {
  const books = language === 'en' ? ESSENTIAL_BOOKS_EN : ESSENTIAL_BOOKS_ES;
  return books.map((b) => ({
    ...b,
    coverImage: getOptimizedCoverUrl(b.coverImage),
  }));
}

/**
 * Fetches popular books.
 */
export async function fetchPopularBooks(language: string = 'all'): Promise<GutendexResponse> {
  const langParam = language !== 'all' ? `&languages=${language}` : '';
  return fetchWithCache(`${BASE_URL}?sort=popular${langParam}`);
}

/**
 * Fetches related books based on subjects with language filter.
 */
export async function fetchRelatedBooks(
  currentBookId: string | number,
  subjects: string[] = [],
  language: string = 'all'
): Promise<UnifiedBook[]> {
  const topic = subjects[0]?.split('--')[0]?.trim() || 'fiction';
  try {
    const results = await searchUnifiedBooks(`subject:${topic}`, 10, 1, language);
    return results.filter((book) => book.id !== currentBookId).slice(0, 7);
  } catch (error) {
    console.error('Error fetching related books:', error);
    return [];
  }
}

export { fetchWithCache } from './cache';
export { ESSENTIAL_BOOKS, INSPIRATIONAL_QUOTES } from './constants';
export * from './utils';
