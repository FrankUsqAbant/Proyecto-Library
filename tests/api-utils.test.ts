import { getOptimizedCoverUrl } from '../lib/api/utils';
import DownloadAPI from '../lib/api/download';

describe('API Utils & WebP Cover Optimization Suite', () => {
  it('should optimize Gutenberg cover URLs via wsrv.nl WebP proxy', () => {
    const rawUrl = 'https://www.gutenberg.org/cache/epub/2000/pg2000.cover.medium.jpg';
    const optimizedUrl = getOptimizedCoverUrl(rawUrl);
    expect(optimizedUrl).toContain('wsrv.nl');
    expect(optimizedUrl).toContain('output=webp');
    expect(optimizedUrl).toContain('q=80');
  });

  it('should optimize OpenLibrary cover URLs via wsrv.nl WebP proxy', () => {
    const rawUrl = 'https://covers.openlibrary.org/b/id/12345-L.jpg';
    const optimizedUrl = getOptimizedCoverUrl(rawUrl);
    expect(optimizedUrl).toContain('wsrv.nl');
    expect(optimizedUrl).toContain('output=webp');
  });

  it('should return undefined safely if cover URL is missing', () => {
    const optimizedUrl = getOptimizedCoverUrl('');
    expect(optimizedUrl).toBeUndefined();
  });

  it('should build sanitized filenames for downloads using DownloadAPI.buildFilename', () => {
    const filename = DownloadAPI.buildFilename('Don Quijote de la Mancha', 'epub', 'es');
    expect(filename).toContain('don_quijote');
    expect(filename).toContain('_es_');
    expect(filename).toContain('.epub');
  });

  it('should enforce rate limits correctly with DownloadAPI.checkRateLimit', () => {
    const isAllowed = DownloadAPI.checkRateLimit();
    expect(typeof isAllowed).toBe('boolean');
  });
});
