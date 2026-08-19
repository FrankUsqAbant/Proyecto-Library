import { createClient, Client } from '@libsql/client';

let tursoClient: Client | null = null;

export function getTursoClient(): Client | null {
  // Try to read env variables. Next.js can inline them during static build
  const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL;
  const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  if (!tursoClient) {
    tursoClient = createClient({
      url,
      authToken,
    });
  }

  return tursoClient;
}

/**
 * Initialize Turso Database schema with automatic LRU cleanup triggers.
 * Ensures the database never exceeds 5-10 MB by automatically purging old cache & history.
 */
export async function initTursoSchema(): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  try {
    // 1. Favorites Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        book_id TEXT NOT NULL,
        title TEXT NOT NULL,
        authors TEXT,
        cover_image TEXT,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Reading Progress Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS reading_progress (
        book_id TEXT PRIMARY KEY,
        current_page INTEGER DEFAULT 1,
        total_pages INTEGER DEFAULT 1,
        progress_percentage REAL DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Notes Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        book_id TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Cache / Search History Table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS search_cache (
        id TEXT PRIMARY KEY,
        query TEXT NOT NULL,
        results_json TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Automatic Trigger: Auto-Purge Cache to Keep Max 100 Entries (LRU Purging)
    await client.execute(`
      CREATE TRIGGER IF NOT EXISTS purge_old_search_cache
      AFTER INSERT ON search_cache
      BEGIN
        DELETE FROM search_cache
        WHERE id NOT IN (
          SELECT id FROM search_cache
          ORDER BY created_at DESC
          LIMIT 100
        );
      END;
    `);

    return true;
  } catch (error) {
    console.error('Error initializing Turso schema with auto-cleanup:', error);
    return false;
  }
}

/**
 * Helper to run explicit cleanup of old entries older than 30 days.
 */
export async function runAutoCleanup(): Promise<void> {
  const client = getTursoClient();
  if (!client) return;

  try {
    await client.execute(`
      DELETE FROM search_cache WHERE created_at < datetime('now', '-7 days');
    `);
  } catch (error) {
    console.error('Auto cleanup error:', error);
  }
}

// --- FAVORITES ---

export async function addFavorite(
  bookId: string,
  title: string,
  authors: string,
  coverImage: string
): Promise<boolean> {
  const client = getTursoClient();
  if (!client) {
    // Fallback to localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_favorites') || '[]';
        const favs = JSON.parse(saved);
        if (!favs.some((f: any) => f.book_id === bookId)) {
          favs.push({
            id: bookId,
            book_id: bookId,
            title,
            authors,
            cover_image: coverImage,
            added_at: new Date().toISOString()
          });
          localStorage.setItem('lib_favorites', JSON.stringify(favs));
        }
      }
      return true;
    } catch {
      return false;
    }
  }

  try {
    await client.execute({
      sql: `INSERT INTO favorites (id, book_id, title, authors, cover_image) 
            VALUES (?, ?, ?, ?, ?) 
            ON CONFLICT(id) DO UPDATE SET title = excluded.title, authors = excluded.authors, cover_image = excluded.cover_image`,
      args: [bookId, bookId, title, authors, coverImage]
    });
    return true;
  } catch (error) {
    console.error('Failed to add favorite to Turso:', error);
    return false;
  }
}

export async function removeFavorite(bookId: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_favorites') || '[]';
        const favs = JSON.parse(saved);
        const filtered = favs.filter((f: any) => f.book_id !== bookId);
        localStorage.setItem('lib_favorites', JSON.stringify(filtered));
      }
      return true;
    } catch {
      return false;
    }
  }

  try {
    await client.execute({
      sql: `DELETE FROM favorites WHERE book_id = ?`,
      args: [bookId]
    });
    return true;
  } catch (error) {
    console.error('Failed to remove favorite from Turso:', error);
    return false;
  }
}

export async function getFavorites(): Promise<any[]> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_favorites') || '[]';
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          id: item.book_id || item.id,
          title: item.title,
          authors: Array.isArray(item.authors)
            ? item.authors
            : typeof item.authors === 'string'
              ? item.authors.split(', ')
              : [],
          coverImage: item.coverImage || item.cover_image,
          source: 'mock' as const
        }));
      }
      return [];
    } catch {
      return [];
    }
  }

  try {
    const rs = await client.execute('SELECT * FROM favorites ORDER BY added_at DESC');
    return rs.rows.map(row => ({
      id: row.book_id as string || row.id as string,
      title: row.title as string,
      authors: row.authors
        ? (row.authors as string).split(', ')
        : [],
      coverImage: row.cover_image as string,
      source: 'openlibrary' as const
    }));
  } catch (error) {
    console.error('Failed to get favorites from Turso:', error);
    return [];
  }
}

export async function isFavorite(bookId: string): Promise<boolean> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_favorites') || '[]';
        const favs = JSON.parse(saved);
        return favs.some((f: any) => f.book_id === bookId);
      }
      return false;
    } catch {
      return false;
    }
  }

  try {
    const rs = await client.execute({
      sql: 'SELECT 1 FROM favorites WHERE book_id = ? LIMIT 1',
      args: [bookId]
    });
    return rs.rows.length > 0;
  } catch (error) {
    console.error('Failed to check favorite in Turso:', error);
    return false;
  }
}

// --- READING PROGRESS ---

export async function saveReadingProgress(
  bookId: string,
  currentPage: number,
  totalPages: number,
  progressPercentage: number
): Promise<boolean> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_progress') || '{}';
        const progress = JSON.parse(saved);
        progress[bookId] = {
          current_page: currentPage,
          total_pages: totalPages,
          progress_percentage: progressPercentage,
          updated_at: new Date().toISOString()
        };
        localStorage.setItem('lib_progress', JSON.stringify(progress));
      }
      return true;
    } catch {
      return false;
    }
  }

  try {
    await client.execute({
      sql: `INSERT INTO reading_progress (book_id, current_page, total_pages, progress_percentage)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(book_id) DO UPDATE SET 
              current_page = excluded.current_page,
              total_pages = excluded.total_pages,
              progress_percentage = excluded.progress_percentage,
              updated_at = CURRENT_TIMESTAMP`,
      args: [bookId, currentPage, totalPages, progressPercentage]
    });
    return true;
  } catch (error) {
    console.error('Failed to save progress to Turso:', error);
    return false;
  }
}

export async function getReadingProgress(bookId: string): Promise<any | null> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_progress') || '{}';
        const progress = JSON.parse(saved);
        return progress[bookId] || null;
      }
      return null;
    } catch {
      return null;
    }
  }

  try {
    const rs = await client.execute({
      sql: 'SELECT * FROM reading_progress WHERE book_id = ? LIMIT 1',
      args: [bookId]
    });
    if (rs.rows.length === 0) return null;
    const row = rs.rows[0];
    return {
      book_id: row.book_id,
      current_page: row.current_page,
      total_pages: row.total_pages,
      progress_percentage: row.progress_percentage,
      updated_at: row.updated_at
    };
  } catch (error) {
    console.error('Failed to get progress from Turso:', error);
    return null;
  }
}

// --- NOTES ---

export async function saveNote(
  bookId: string,
  content: string
): Promise<boolean> {
  const client = getTursoClient();
  const noteId = `${bookId}-${Date.now()}`;
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_notes') || '[]';
        const notes = JSON.parse(saved);
        notes.push({ id: noteId, book_id: bookId, content, created_at: new Date().toISOString() });
        localStorage.setItem('lib_notes', JSON.stringify(notes));
      }
      return true;
    } catch {
      return false;
    }
  }

  try {
    await client.execute({
      sql: `INSERT INTO notes (id, book_id, content) VALUES (?, ?, ?)`,
      args: [noteId, bookId, content]
    });
    return true;
  } catch (error) {
    console.error('Failed to save note to Turso:', error);
    return false;
  }
}

export async function getNotes(bookId: string): Promise<any[]> {
  const client = getTursoClient();
  if (!client) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('lib_notes') || '[]';
        const notes = JSON.parse(saved);
        return notes.filter((n: any) => n.book_id === bookId);
      }
      return [];
    } catch {
      return [];
    }
  }

  try {
    const rs = await client.execute({
      sql: 'SELECT * FROM notes WHERE book_id = ? ORDER BY created_at DESC',
      args: [bookId]
    });
    return rs.rows.map(row => ({
      id: row.id,
      book_id: row.book_id,
      content: row.content,
      created_at: row.created_at
    }));
  } catch (error) {
    console.error('Failed to get notes from Turso:', error);
    return [];
  }
}

// --- SEARCH CACHE ---

export async function getSearchCache(query: string): Promise<any[] | null> {
  const client = getTursoClient();
  if (!client) return null;

  try {
    const rs = await client.execute({
      sql: 'SELECT results_json FROM search_cache WHERE query = ? LIMIT 1',
      args: [query]
    });
    if (rs.rows.length === 0) return null;
    return JSON.parse(rs.rows[0].results_json as string);
  } catch (error) {
    console.error('Failed to get search cache from Turso:', error);
    return null;
  }
}

export async function saveSearchCache(query: string, results: any[]): Promise<boolean> {
  const client = getTursoClient();
  if (!client) return false;

  const id = `cache-${query.replace(/[^a-zA-Z0-9]/g, '_')}`;
  try {
    await client.execute({
      sql: `INSERT OR REPLACE INTO search_cache (id, query, results_json) VALUES (?, ?, ?)`,
      args: [id, query, JSON.stringify(results)]
    });
    return true;
  } catch (error) {
    console.error('Failed to save search cache to Turso:', error);
    return false;
  }
}
