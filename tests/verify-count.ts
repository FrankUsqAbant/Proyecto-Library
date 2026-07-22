import { searchUnifiedBooks, getCuratedBooks } from '../lib/api';

async function verify() {
  console.log('--- Inicia Verificación de 15 Libros ---');

  // 1. Verificar Home (getCuratedBooks)
  const homeBooks = getCuratedBooks();
  console.log(`Página de Inicio (Curated): ${homeBooks.length} libros`);

  // 2. Verificar Categorías (searchUnifiedBooks)
  const categories = ['Fiction', 'Philosophy', 'Science'];
  for (const cat of categories) {
    const results = await searchUnifiedBooks(`subject:${cat}`, 15);
    console.log(`Categoría [${cat}]: ${results.length} libros`);
  }

  console.log('--- Fin de la Verificación ---');
}

verify();
