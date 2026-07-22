import {
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  LucideIcon,
  Compass,
  GraduationCap,
  History as HistoryIcon,
  FlaskConical,
  Book as BookIcon,
  PenTool,
} from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Categorías', href: '/categorias' },
];

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/frankabanto',
    label: 'LinkedIn',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@frankabanto',
    label: 'YouTube',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/frank_abant',
    label: 'Instagram',
  },
  { icon: Twitter, href: 'https://x.com/FrankUsqAbanto', label: 'X' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export const TOPICS = ['Todos', 'Fiction', 'Philosophy', 'History', 'Science', 'Classic', 'Poetry'];

export const CATEGORIES_DATA = [
  {
    name: 'Fiction',
    icon: Compass,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
    count: '+50k',
  },
  {
    name: 'Philosophy',
    icon: GraduationCap,
    color: 'bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400',
    count: '850',
  },
  {
    name: 'History',
    icon: HistoryIcon,
    color: 'bg-stone-50 text-stone-600 dark:bg-stone-900/50 dark:text-stone-400',
    count: '1.2k',
  },
  {
    name: 'Science',
    icon: FlaskConical,
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
    count: '450',
  },
  {
    name: 'Classic',
    icon: BookIcon,
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
    count: '+5k',
  },
  {
    name: 'Poetry',
    icon: PenTool,
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400',
    count: '950',
  },
];

export const LITERARY_QUOTES = [
  {
    text: 'No hay amigo tan leal como un libro.',
    author: 'Ernest Hemingway',
  },
  {
    text: 'La lectura de todos los buenos libros es como una conversación con las mejores mentes de los siglos pasados.',
    author: 'René Descartes',
  },
  {
    text: 'Un libro debe ser el hacha que rompa el mar helado dentro de nosotros.',
    author: 'Franz Kafka',
  },
  {
    text: 'Para viajar lejos, no hay mejor nave que un libro.',
    author: 'Emily Dickinson',
  },
  {
    text: 'La biblioteca es una esfera cuyo centro cabal es cualquier hexágono y cuya circunferencia es inaccesible.',
    author: 'Jorge Luis Borges',
  },
  {
    text: 'Leer un libro es como despertar de un sueño para entrar en otro aún más real.',
    author: 'Anónimo',
  },
];
// CONFIGURACIÓN DE DESCARGAS
export const DOWNLOAD_CONFIG = {
  MAX_DOWNLOADS_PER_MINUTE: 3,
  TIMEOUT_MS: 30000,
  VALID_FORMATS: ['epub', 'pdf', 'mobi', 'txt'],
  MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
  AVAILABLE_LANGUAGES: ['es', 'en'],
};

export const DOWNLOAD_MODAL_CONFIG = {
  ANIMATION_DURATION: 0.3, // segundos (framer-motion)
  CLOSE_ON_SUCCESS: true,
  SHOW_PROGRESS_BAR: true,
};
