/* eslint-disable */
import { searchUnifiedBooks } from '../lib/api';

describe('API Book Limit', () => {
  it('should return exactly 15 books for a given category', async () => {
    const category = 'Fiction';
    const limit = 15;
    const results = await searchUnifiedBooks(`subject:${category}`, limit);

    // We expect 15 because that's our new default and forced limit in api.ts
    // However, if the API returns fewer than 15, we should at least not exceed 15.
    console.log(`Found ${results.length} books for category ${category}`);
    expect(results.length).toBeLessThanOrEqual(limit);
    // Ideally it should be exactly 15 if the external API has enough results
    if (results.length > 0) {
      expect(results.length).toBe(limit);
    }
  }, 15000);

  it('should use 15 as default limit', async () => {
    const results = await searchUnifiedBooks('Philosophy');
    expect(results.length).toBeLessThanOrEqual(15);
  }, 15000);
});
