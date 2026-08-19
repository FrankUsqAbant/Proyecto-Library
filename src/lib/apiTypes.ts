export interface GutendexAuthor {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface GutendexBook {
  id: number;
  title: string;
  authors: GutendexAuthor[];
  subjects: string[];
  languages: string[];
  formats: {
    [key: string]: string;
  };
  download_count: number;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  language?: string[];
  subject?: string[];
}

export interface OpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryDoc[];
}

export interface OpenLibraryWork {
  key: string;
  title: string;
  description?: string | { value: string };
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
}

export interface UnifiedBook {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  coverImage?: string;
  publishYear?: number;
  downloadFormats?: {
    epub?: string;
    pdf?: string;
    html?: string;
    plainText?: string;
  };
  source: 'openlibrary' | 'gutendex' | 'hybrid' | 'curated' | 'mock';
}
