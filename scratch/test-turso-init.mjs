import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log('Connecting to Turso DB at:', url);

const client = createClient({ url, authToken });

async function testConnection() {
  try {
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

    await client.execute(`
      CREATE TABLE IF NOT EXISTS reading_progress (
        book_id TEXT PRIMARY KEY,
        current_page INTEGER DEFAULT 1,
        total_pages INTEGER DEFAULT 1,
        progress_percentage REAL DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        book_id TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.execute(`
      CREATE TABLE IF NOT EXISTS search_cache (
        id TEXT PRIMARY KEY,
        query TEXT NOT NULL,
        results_json TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

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

    const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
    console.log(
      '✅ Connected to Turso DB successfully! Tables in database:',
      result.rows.map((r) => r.name)
    );
  } catch (error) {
    console.error('❌ Connection error:', error);
  }
}

testConnection();
