import { ESSENTIAL_BOOKS, searchUnifiedBooks } from '../lib/api';

describe('Bilingual Filter & Data Integrity Suite', () => {
  it('should contain curated essential books in the library catalog', () => {
    expect(ESSENTIAL_BOOKS.length).toBeGreaterThan(0);
    expect(ESSENTIAL_BOOKS[0].title).toBeDefined();
    expect(ESSENTIAL_BOOKS[0].authors.length).toBeGreaterThan(0);
  });

  it('should search books for Spanish language filter ("es")', async () => {
    const results = await searchUnifiedBooks('Quijote', 10, 'es');
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });

  it('should search books for English language filter ("en")', async () => {
    const results = await searchUnifiedBooks('Pride', 10, 'en');
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });

  it('should search books for all languages filter ("all")', async () => {
    const results = await searchUnifiedBooks('Philosophy', 10, 'all');
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
});
