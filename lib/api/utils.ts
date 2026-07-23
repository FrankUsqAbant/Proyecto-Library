import { UnifiedBook, GutendexBook, OpenLibraryDoc, GutendexResponse } from '../apiTypes';

/**
 * Normalizes author names from "Last, First" to "First Last".
 * Handles variations and missing data gracefully.
 */
export function normalizeAuthorName(name: string): string {
  if (!name || !name.includes(',')) return name || '';
  const parts = name.split(',').map((s) => s.trim());
  return parts.length >= 2 ? `${parts[1]} ${parts[0]}` : name;
}

/**
 * Searches Gutendex for a book matching the given title and author.
 * Dependency injection of fetchBooks avoids circular imports.
 */
export async function findGutendexByTitle(
  title: string,
  fetchBooks: (query: string) => Promise<GutendexResponse>,
  author?: string
): Promise<GutendexBook | null> {
  try {
    const searchQuery = author ? `${title} ${author}` : title;
    const response = await fetchBooks(searchQuery);

    if (response?.results && response.results.length > 0) {
      const normalizedQuery = (title || '').toLowerCase().trim();
      return (
        response.results.find((book: GutendexBook) => {
          const bookTitle = (book.title || '').toLowerCase().trim();
          return (
            bookTitle &&
            (bookTitle.includes(normalizedQuery) || normalizedQuery.includes(bookTitle))
          );
        }) || response.results[0]
      );
    }
  } catch (error) {
    console.warn('Gutendex search failed:', error);
  }
  return null;
}

/**
 * Transforms cover URLs/IDs to lightweight WebP CDN URLs (wsrv.nl).
 * Reduces cover image payload from ~1MB to ~25KB.
 */
export function getOptimizedCoverUrl(
  coverIdOrUrl: string | number | undefined
): string | undefined {
  if (!coverIdOrUrl) return undefined;

  let rawUrl = '';
  if (
    typeof coverIdOrUrl === 'number' ||
    (!coverIdOrUrl.toString().startsWith('http') && !coverIdOrUrl.toString().startsWith('/'))
  ) {
    rawUrl = `https://covers.openlibrary.org/b/id/${coverIdOrUrl}-L.jpg`;
  } else {
    rawUrl = coverIdOrUrl.toString();
  }

  if (rawUrl.startsWith('/')) return rawUrl;

  return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=400&output=webp&q=80`;
}

/**
 * Transforms an OpenLibrary document into a UnifiedBook object.
 */
export async function createUnifiedFromOL(doc: OpenLibraryDoc): Promise<UnifiedBook> {
  return {
    id: doc.key,
    title: doc.title,
    authors: (doc.author_name || []).map(normalizeAuthorName),
    publishYear: doc.first_publish_year,
    coverImage: getOptimizedCoverUrl(doc.cover_i),
    downloadFormats: undefined,
    source: 'openlibrary',
  };
}

/**
 * Normalizes a book ID to a clean URL slug (e.g. '/works/OL45804W' -> 'OL45804W').
 */
export function getBookSlug(id: string): string {
  if (!id) return '';
  return id.replace(/^\/works\//, '').replace(/^\/books\//, '');
}

/**
 * Resolves a book slug back to its canonical API ID if needed.
 */
export function resolveBookId(slug: string): string {
  if (!slug) return '';
  const clean = decodeURIComponent(slug).trim();
  if (clean.startsWith('OL') && !clean.startsWith('/works/')) {
    return `/works/${clean}`;
  }
  return clean;
}
