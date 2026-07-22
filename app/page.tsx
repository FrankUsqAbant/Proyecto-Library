import { Suspense } from 'react';
import { HomeClient } from './home-client';
import { getCuratedBooks } from '@/lib/api';

// Force static rendering for static exports
export const dynamic = 'force-static';

function HomeContent() {
  const initialBooks = getCuratedBooks();
  return <HomeClient initialBooks={initialBooks} initialCount={initialBooks.length} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 italic">Entrando a la biblioteca...</p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
