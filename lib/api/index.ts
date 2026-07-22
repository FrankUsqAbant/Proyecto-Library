import {
  GutendexBook,
  GutendexResponse,
  OpenLibraryResponse,
  OpenLibraryWork,
  UnifiedBook,
} from '../apiTypes';
import { fetchWithCache } from './cache';
import { ESSENTIAL_BOOKS } from './constants';
import { findGutendexByTitle, normalizeAuthorName, getOptimizedCoverUrl } from './utils';

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
  if (!query?.trim()) return ESSENTIAL_BOOKS;

  const olResults = await searchOpenLibrary(query, limit, page, language);
  if (!olResults.docs) return [];

  return olResults.docs.slice(0, limit).map((doc) => ({
    id: doc.key,
    title: doc.title,
    authors: (doc.author_name || []).map(normalizeAuthorName),
    publishYear: doc.first_publish_year,
    coverImage: getOptimizedCoverUrl(doc.cover_i),
    source: 'openlibrary',
  }));
}

/**
 * Detailed book fetch with hybrid download discovery and WebP cover optimization.
 */
export async function getUnifiedBook(key: string): Promise<UnifiedBook | null> {
  const curated = ESSENTIAL_BOOKS.find((b) => b.id === key);
  if (curated) {
    return {
      ...curated,
      coverImage: getOptimizedCoverUrl(curated.coverImage),
    };
  }

  const url = `${OL_URL}${key}.json`;
  const work = await fetchWithCache<OpenLibraryWork>(url);
  if (!work) return null;

  const gutendexMatchPromise = findGutendexByTitle(work.title, (q) => fetchBooks(q));
  const gutendexMatch = await gutendexMatchPromise;

  return {
    id: key,
    title: work.title,
    authors: [],
    description: typeof work.description === 'string' ? work.description : work.description?.value,
    coverImage: getOptimizedCoverUrl(work.covers?.[0]),
    publishYear: work.first_publish_date ? parseInt(work.first_publish_date) : undefined,
    downloadFormats: gutendexMatch
      ? {
          epub: gutendexMatch.formats['application/epub+zip'],
          pdf: gutendexMatch.formats['application/pdf'],
          html:
            gutendexMatch.formats['text/html'] || gutendexMatch.formats['text/html; charset=utf-8'],
        }
      : undefined,
    source: gutendexMatch ? 'hybrid' : 'openlibrary',
  };
}

/**
 * Returns the curated list of essential books with WebP covers.
 */
export function getCuratedBooks(): UnifiedBook[] {
  return ESSENTIAL_BOOKS.map((b) => ({
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
