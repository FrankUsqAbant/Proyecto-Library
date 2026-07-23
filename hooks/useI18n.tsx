'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  es: {
    // Nav & Brand
    'nav.brand_first': 'Leer es ',
    'nav.brand_second': 'Pensar',
    'nav.tagline': 'Est. 2025 • Biblioteca Digital',
    'nav.library': 'Biblioteca',
    'nav.explore': 'Explorar',
    'nav.favorites': 'Favoritos',
    'nav.categories': 'Categorías',

    // Hero Quotes
    'hero.quote': '“La lectura es para la mente lo que el ejercicio es para el cuerpo.”',
    'hero.author': '— Joseph Addison',
    'hero.author_label': 'Autor',

    // Search
    'search.placeholder': 'Busca por título, autor o tema...',
    'search.voice': 'Búsqueda por voz',
    'home.title': 'Busca cualquier clásico para descargar',
    'home.subtitle':
      'Nuestra biblioteca se conecta con miles de obras universales de dominio público.',
    'home.search_btn': 'Buscar',
    'home.lang_label': 'IDIOMA / LANGUAGE:',
    'home.lang_all': 'Todos / All',
    'filter.all': 'Todos',

    // Topics / Categories
    'topic.Todos': 'Todos',
    'topic.Fiction': 'Ficción',
    'topic.Philosophy': 'Filosofía',
    'topic.History': 'Historia',
    'topic.Science': 'Ciencia',
    'topic.Classic': 'Clásicos',
    'topic.Poetry': 'Poesía',

    // Categories Page
    'categories.title': 'Explorar por Temas',
    'categories.subtitle':
      '“La lectura es para la mente lo que el ejercicio es para el cuerpo.” — Joseph Addison',
    'categories.available': 'obras disponibles',

    // Explorar Page
    'explore.title': 'Explorar Biblioteca',
    'explore.subtitle': 'Descubre tesoros reales entre miles de páginas.',
    'explore.found': 'libros encontrados',

    // Detail Page
    'detail.back': 'Volver a la biblioteca',
    'detail.download': 'Descargar Libro',
    'detail.save': 'Añadir a mi lista',
    'detail.saved': 'En tu lista',
    'detail.formats': 'Formatos Disponibles',
    'detail.about': 'Acerca de este libro',
    'detail.similar': 'Libros Similares',
    'detail.unknown_author': 'Autor desconocido',
    'detail.fallback_desc':
      'Esta obra clásica nos sumerge en una narrativa profunda y atemporal de la literatura universal que puedes disfrutar de forma gratuita.',
    'detail.share': 'Compartir',
    'detail.read_now': 'Leer Ahora',

    // Footer & Common
    'footer.title': 'Leer es Pensar',
    'footer.description':
      'Navegando por el vasto mar del conocimiento humano a través de los clásicos.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.map': 'MAPA',
    'footer.newsletter_title': 'NEWSLETTER ZEN',
    'footer.newsletter_sub': 'Únete y recibe un clásico cada semana.',
    'footer.email_placeholder': 'Tu correo electrónico...',
    'footer.join': 'UNIRSE',
    'footer.privacy': 'PRIVACIDAD',
    'footer.terms': 'TÉRMINOS',
    'footer.made_by': 'HECHO POR FRANK ABANTO',
    'not_found.title': 'Una estantería vacía.',
    'not_found.desc':
      'La página que buscas parece haberse perdido entre miles de libros de nuestra colección.',
    'not_found.back': 'Volver',
    'not_found.explore': 'Explorar Biblioteca',
    'common.loading': 'Cargando biblioteca...',
    'common.no_results': 'No se encontraron libros.',
    'common.retry': 'Reintentar',
    'common.clear': 'Limpiar búsqueda',
    'common.load_more': 'Cargar más libros',
    'book.details': 'Detalles del libro',
    'book.read': 'Leer ahora',
    'book.save': 'Guardar',
    'book.saved': 'Guardado',
  },
  en: {
    // Nav & Brand
    'nav.brand_first': 'Read is to ',
    'nav.brand_second': 'Think',
    'nav.tagline': 'Est. 2025 • Digital Library',
    'nav.library': 'Library',
    'nav.explore': 'Explore',
    'nav.favorites': 'Favorites',
    'nav.categories': 'Categories',

    // Hero Quotes
    'hero.quote': '“Reading is to the mind what exercise is to the body.”',
    'hero.author': '— Joseph Addison',
    'hero.author_label': 'Author',

    // Search
    'search.placeholder': 'Search by title, author, or topic...',
    'search.voice': 'Voice search',
    'home.title': 'Search any classic to download',
    'home.subtitle': 'Our library connects with thousands of public domain universal classics.',
    'home.search_btn': 'Search',
    'home.lang_label': 'LANGUAGE / IDIOMA:',
    'home.lang_all': 'All / Todos',
    'filter.all': 'All',

    // Topics / Categories
    'topic.Todos': 'All',
    'topic.Fiction': 'Fiction',
    'topic.Philosophy': 'Philosophy',
    'topic.History': 'History',
    'topic.Science': 'Science',
    'topic.Classic': 'Classics',
    'topic.Poetry': 'Poetry',

    // Categories Page
    'categories.title': 'Explore by Topics',
    'categories.subtitle':
      '“Reading is to the mind what exercise is to the body.” — Joseph Addison',
    'categories.available': 'classics available',

    // Explorar Page
    'explore.title': 'Explore Library',
    'explore.subtitle': 'Discover real treasures among thousands of pages.',
    'explore.found': 'books found',

    // Detail Page
    'detail.back': 'Back to library',
    'detail.download': 'Download Book',
    'detail.save': 'Add to my list',
    'detail.saved': 'In your list',
    'detail.formats': 'Available Formats',
    'detail.about': 'About this book',
    'detail.similar': 'Similar Books',
    'detail.unknown_author': 'Unknown author',
    'detail.fallback_desc':
      'This classic work immerses us in a deep, timeless narrative of world literature that you can enjoy free and legally.',
    'detail.share': 'Share',
    'detail.read_now': 'Read Now',

    // Footer & Common
    'footer.title': 'Read to Think',
    'footer.description': 'Navigating the vast sea of human knowledge through the classics.',
    'footer.rights': 'All rights reserved.',
    'footer.map': 'MAP',
    'footer.newsletter_title': 'ZEN NEWSLETTER',
    'footer.newsletter_sub': 'Join and receive a classic every week.',
    'footer.email_placeholder': 'Your email...',
    'footer.join': 'JOIN',
    'footer.privacy': 'PRIVACY',
    'footer.terms': 'TERMS',
    'footer.made_by': 'MADE BY FRANK ABANTO',
    'not_found.title': 'An empty shelf.',
    'not_found.desc':
      'The page you are looking for seems to have been lost among the thousands of books in our collection.',
    'not_found.back': 'Go back',
    'not_found.explore': 'Explore Library',
    'common.loading': 'Loading library...',
    'common.no_results': 'No books found.',
    'common.retry': 'Retry',
    'common.clear': 'Clear search',
    'common.load_more': 'Load more books',
    'book.details': 'Book details',
    'book.read': 'Read now',
    'book.save': 'Save',
    'book.saved': 'Saved',
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const initLang = () => {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang) {
        setLang(savedLang);
      } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en' || browserLang === 'es') {
          setLang(browserLang);
        }
      }
    };
    initLang();
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
