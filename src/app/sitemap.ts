import { MetadataRoute } from 'next';
import { fetchPopularBooks } from '@/lib/api';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://frankusqabant.github.io/Proyecto-Library';

  // Páginas estáticas principales
  const staticPages = ['', '/explorar', '/categorias', '/favoritos'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // Obtener libros populares para incluirlos en el sitemap
  let bookPages: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchPopularBooks();
    bookPages = data.results.map((book) => ({
      url: `${baseUrl}/book?id=${book.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap for books:', error);
  }

  return [...staticPages, ...bookPages];
}
