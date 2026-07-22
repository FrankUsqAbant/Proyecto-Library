import type { Metadata } from 'next';
import { Lora, Outfit, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { LibraryProvider } from '@/components/layout/LibraryProvider';
import { PageWrapper } from '@/components/layout/PageWrapper';

const lora = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-classic',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Leer es Pensar | Biblioteca Digital Zen',
    template: '%s | Leer es Pensar',
  },
  description:
    'Descubre más de 60,000 libros clásicos gratuitos en una experiencia de lectura minimalista y zen.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Leer Pensar',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Leer es Pensar',
    title: 'Leer es Pensar | Biblioteca Digital Zen',
    description:
      'La biblioteca digital para los amantes de la lectura clásica y el pensamiento profundo.',
  },
};

export const viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import { I18nProvider } from '@/hooks/useI18n';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://gutendex.com" />
        <link rel="dns-prefetch" href="https://covers.openlibrary.org" />
        <link rel="preconnect" href="https://gutendex.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${lora.variable} ${outfit.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <I18nProvider>
          <ThemeProvider>
            <LibraryProvider>
              <Navbar />
              <main className="min-h-screen">
                <PageWrapper>{children}</PageWrapper>
              </main>
              <Footer />
            </LibraryProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
