import { Metadata } from 'next';
import { getUnifiedBook, ESSENTIAL_BOOKS } from '@/lib/api';
import { BookDetailClient } from './BookDetailClient';
import { BookJsonLd } from '@/components/seo/BookJsonLd';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return ESSENTIAL_BOOKS.map((book) => ({
    id: encodeURIComponent(book.id),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const book = await getUnifiedBook(decodedId);

  if (!book) {
    return {
      title: 'Libro no encontrado',
    };
  }

  return {
    title: `${book.title} | Leer es Pensar`,
    description: `Descarga gratuita de ${book.title}. Una obra clásica de la literatura universal disponible en Leer es Pensar.`,
    openGraph: {
      title: book.title,
      description: `Disfruta de ${book.title} de forma gratuita.`,
      images: book.coverImage ? [book.coverImage] : [],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const book = await getUnifiedBook(decodedId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Libro no encontrado</h1>
      </div>
    );
  }

  return (
    <>
      <BookJsonLd book={book} />
      <BookDetailClient book={book} id={decodedId} />
    </>
  );
}
