import { UnifiedBook } from '../apiTypes';

/**
 * Litetary quotes for loading states (UX/Engagement).
 */
export const INSPIRATIONAL_QUOTES = [
  'No hay amigo tan leal como un libro. — Ernest Hemingway',
  'Lee y conducirás, no leas y serás conducido. — Santa Teresa de Jesús',
  'La lectura es para la mente lo que el ejercicio es para el cuerpo. — Joseph Addison',
  'Un libro es un regalo que puedes abrir una y otra vez. — Garrison Keillor',
  'La literatura es la forma más agradable de ignorar la vida. — Fernando Pessoa',
  'Para viajar lejos, no hay mejor nave que un libro. — Emily Dickinson',
  'Vivir sin leer sería vivir sin esperanza. — Víctor Hugo',
  'El que lee mucho y anda mucho, ve mucho y sabe mucho. — Miguel de Cervantes',
  'La lectura es el único medio por el cual nos deslizamos, involuntariamente, a menudo de forma desamparada, a la piel de otro, a la voz de otro, al alma de otro. — Joyce Carol Oates',
  'Los libros son espejos: solo ves en ellos lo que ya tienes dentro de ti. — Carlos Ruiz Zafón',
  'Si no te gusta leer, es que todavía no has encontrado el libro adecuado. — J.K. Rowling',
  'Escribir es una forma de terapia; a veces me pregunto cómo se las arreglan los que no escriben, los que no leen, los que no escuchan música. — Jorge Luis Borges',
];

/**
 * Curated list of essential books for instant initial loading.
 */
export const ESSENTIAL_BOOKS: UnifiedBook[] = [
  {
    id: '/works/OL27448W',
    title: 'El ingenioso hidalgo Don Quijote de la Mancha',
    authors: ['Miguel de Cervantes Saavedra'],
    coverImage: 'https://covers.openlibrary.org/b/id/14625765-L.jpg',
    publishYear: 1605,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/2000.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/2000.pdf',
      html: 'https://www.gutenberg.org/files/2000/2000-h/2000-h.htm',
    },
  },
  {
    id: '/works/OL1027321W',
    title: 'Crónica de una muerte anunciada',
    authors: ['Gabriel García Márquez'],
    coverImage: 'https://covers.openlibrary.org/b/id/12836261-L.jpg',
    publishYear: 1981,
    source: 'curated',
  },
  {
    id: '/works/OL45804W',
    title: 'El Hobbit',
    authors: ['J.R.R. Tolkien'],
    coverImage: 'https://covers.openlibrary.org/b/id/14588506-L.jpg',
    publishYear: 1937,
    source: 'curated',
  },
  {
    id: '/works/OL23919W',
    title: 'Alicia en el país de las maravillas',
    authors: ['Lewis Carroll'],
    coverImage: 'https://covers.openlibrary.org/b/id/14631627-L.jpg',
    publishYear: 1865,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/11.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/11.pdf',
      html: 'https://www.gutenberg.org/files/11/11-h/11-h.htm',
    },
  },
  {
    id: '/works/OL1168083W',
    title: 'Sherlock Holmes: Estudio en escarlata',
    authors: ['Arthur Conan Doyle'],
    coverImage: 'https://covers.openlibrary.org/b/id/14415497-L.jpg',
    publishYear: 1887,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/2852.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/2852.pdf',
    },
  },
  {
    id: '/works/OL27479W',
    title: 'Orgullo y prejuicio',
    authors: ['Jane Austen'],
    coverImage: 'https://covers.openlibrary.org/b/id/14605175-L.jpg',
    publishYear: 1813,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/1342.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/1342.pdf',
    },
  },
  {
    id: '/works/OL1032D',
    title: 'La Metamorfosis',
    authors: ['Franz Kafka'],
    coverImage: 'https://covers.openlibrary.org/b/id/12643501-L.jpg',
    publishYear: 1915,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/5200.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/5200.pdf',
    },
  },
  {
    id: '/works/OL54120W',
    title: 'Frankenstein',
    authors: ['Mary Shelley'],
    coverImage: 'https://covers.openlibrary.org/b/id/14594611-L.jpg',
    publishYear: 1818,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/84.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/84.pdf',
    },
  },
  {
    id: '/works/OL262758W',
    title: 'Moby Dick',
    authors: ['Herman Melville'],
    coverImage: 'https://covers.openlibrary.org/b/id/12839958-L.jpg',
    publishYear: 1851,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/2701.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/2701.pdf',
    },
  },
  {
    id: '/works/OL45644W',
    title: 'El retrato de Dorian Gray',
    authors: ['Oscar Wilde'],
    coverImage: 'https://covers.openlibrary.org/b/id/14588825-L.jpg',
    publishYear: 1890,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/174.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/174.pdf',
    },
  },
  {
    id: '/works/OL2591W',
    title: 'Cuentos de los hermanos Grimm',
    authors: ['Jacob Grimm', 'Wilhelm Grimm'],
    coverImage: 'https://covers.openlibrary.org/b/id/14603953-L.jpg',
    publishYear: 1812,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/2591.epub.images',
    },
  },
  {
    id: '/works/OL1952W',
    title: 'El papel tapiz amarillo',
    authors: ['Charlotte Perkins Gilman'],
    coverImage: 'https://covers.openlibrary.org/b/id/14357777-L.jpg',
    publishYear: 1892,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/1952.epub.images',
    },
  },
  {
    id: '/works/OL1513W',
    title: 'Romeo y Julieta',
    authors: ['William Shakespeare'],
    coverImage: 'https://covers.openlibrary.org/b/id/14594615-L.jpg',
    publishYear: 1597,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/1513.epub.images',
    },
  },
  {
    id: '/works/OL98W',
    title: 'Historia de dos ciudades',
    authors: ['Charles Dickens'],
    coverImage: 'https://covers.openlibrary.org/b/id/14603943-L.jpg',
    publishYear: 1859,
    source: 'curated',
    downloadFormats: {
      epub: 'https://www.gutenberg.org/ebooks/98.epub.images',
      pdf: 'https://www.gutenberg.org/ebooks/98.pdf',
    },
  },
];
