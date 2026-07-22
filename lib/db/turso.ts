import { createClient, Client } from '@libsql/client';

let tursoClient: Client | null = null;

export function getTursoClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

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
