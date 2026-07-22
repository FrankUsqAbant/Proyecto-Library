import { GutendexResponse, GutendexBook } from './apiTypes';

export const MOCK_BOOKS: GutendexBook[] = [
  {
    id: 1342,
    title: 'Pride and Prejudice',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: [
      'England -- Social life and customs -- Fiction',
      'Love stories',
      'Sisters -- Fiction',
    ],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1342.html.images',
      'application/epub+zip': 'https://www.gutenberg.org/ebooks/1342.epub3.images',
      'application/pdf': 'https://www.gutenberg.org/ebooks/1342.pdf.images',
    },
    download_count: 50000,
  },
  {
    id: 84,
    title: 'Frankenstein; Or, The Modern Prometheus',
    authors: [
      {
        name: 'Shelley, Mary Wollstonecraft',
        birth_year: 1797,
        death_year: 1851,
      },
    ],
    subjects: ['Science fiction', 'Monsters -- Fiction', 'Horror tales'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/84.html.images',
      'application/epub+zip': 'https://www.gutenberg.org/ebooks/84.epub3.images',
    },
    download_count: 45000,
  },
  {
    id: 11,
    title: "Alice's Adventures in Wonderland",
    authors: [{ name: 'Carroll, Lewis', birth_year: 1832, death_year: 1898 }],
    subjects: ['Fantasy fiction', "Children's stories"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/11.html.images',
    },
    download_count: 42000,
  },
  {
    id: 1513,
    title: 'Romeo and Juliet',
    authors: [{ name: 'Shakespeare, William', birth_year: 1564, death_year: 1616 }],
    subjects: ['Tragedies', 'Conflict of generations -- Drama'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1513.html.images',
    },
    download_count: 38000,
  },
  {
    id: 2701,
    title: 'Moby Dick; Or, The Whale',
    authors: [{ name: 'Melville, Herman', birth_year: 1819, death_year: 1891 }],
    subjects: ['Sea stories', 'Whaling -- Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2701.html.images',
    },
    download_count: 35000,
  },
  {
    id: 1661,
    title: 'The Adventures of Sherlock Holmes',
    authors: [{ name: 'Doyle, Arthur Conan', birth_year: 1859, death_year: 1930 }],
    subjects: [
      'Detective and mystery stories',
      'Holmes, Sherlock (Fictitious character) -- Fiction',
    ],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1661.html.images',
    },
    download_count: 32000,
  },
  {
    id: 174,
    title: 'The Picture of Dorian Gray',
    authors: [{ name: 'Wilde, Oscar', birth_year: 1854, death_year: 1900 }],
    subjects: ['Fiction', 'Gothic fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/174.html.images',
    },
    download_count: 31000,
  },
  {
    id: 2591,
    title: "Grimms' Fairy Tales",
    authors: [{ name: 'Grimm, Jacob', birth_year: 1785, death_year: 1863 }],
    subjects: ['Fairy tales'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2591/pg2591.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2591.html.images',
    },
    download_count: 30000,
  },
  {
    id: 5200,
    title: 'Metamorphosis',
    authors: [{ name: 'Kafka, Franz', birth_year: 1883, death_year: 1924 }],
    subjects: ['Fiction', 'Psychological fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/5200/pg5200.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/5200.html.images',
    },
    download_count: 29000,
  },
  {
    id: 98,
    title: 'A Tale of Two Cities',
    authors: [{ name: 'Dickens, Charles', birth_year: 1812, death_year: 1870 }],
    subjects: ['Historical fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/98/pg98.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/98.html.images',
    },
    download_count: 28000,
  },
  {
    id: 1400,
    title: 'Great Expectations',
    authors: [{ name: 'Dickens, Charles', birth_year: 1812, death_year: 1870 }],
    subjects: ['Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1400/pg1400.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1400.html.images',
    },
    download_count: 27000,
  },
  {
    id: 2000,
    title: 'Don Quijote',
    authors: [{ name: 'Cervantes Saavedra, Miguel de', birth_year: 1547, death_year: 1616 }],
    subjects: ['Spanish literature'],
    languages: ['es'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2000/pg2000.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2000.html.images',
    },
    download_count: 26000,
  },
  {
    id: 76,
    title: 'Adventures of Huckleberry Finn',
    authors: [{ name: 'Twain, Mark', birth_year: 1835, death_year: 1910 }],
    subjects: ['Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/76/pg76.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/76.html.images',
    },
    download_count: 25000,
  },
  {
    id: 1952,
    title: 'The Yellow Wallpaper',
    authors: [{ name: 'Gilman, Charlotte Perkins', birth_year: 1860, death_year: 1935 }],
    subjects: ['Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1952/pg1952.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1952.html.images',
    },
    download_count: 24000,
  },
  {
    id: 4300,
    title: 'Ulysses',
    authors: [{ name: 'Joyce, James', birth_year: 1882, death_year: 1941 }],
    subjects: ['Modernism', 'Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/4300/pg4300.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/4300.html.images',
    },
    download_count: 23000,
  },
];

export const MOCK_RESPONSE: GutendexResponse = {
  count: MOCK_BOOKS.length,
  next: null,
  previous: null,
  results: MOCK_BOOKS,
};
