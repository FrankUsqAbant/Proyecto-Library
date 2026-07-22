import { UnifiedBook } from './api';

export interface UserQuote {
  id: string;
  bookId: string;
  bookTitle: string;
  text: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string; // ISO date
  icon: string;
}

export interface LibraryState {
  favorites: UnifiedBook[];
  quotes: UserQuote[];
  achievements: Achievement[];
  stats: {
    totalReadingTime: number; // minutes
    dayStreak: number;
    lastActiveDate: string;
  };
}
