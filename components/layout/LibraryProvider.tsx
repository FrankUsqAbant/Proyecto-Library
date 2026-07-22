'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserQuote, Achievement } from '@/lib/userTypes';

interface LibraryContextType {
  quotes: UserQuote[];
  achievements: Achievement[];
  stats: {
    totalReadingTime: number;
    dayStreak: number;
    lastActiveDate: string;
  };
  saveQuote: (bookId: string, bookTitle: string, text: string) => void;
  removeQuote: (quoteId: string) => void;
  unlockAchievement: (id: string, title: string, description: string, icon: string) => void;
  incrementReadingTime: (minutes: number) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<UserQuote[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState({
    totalReadingTime: 0,
    dayStreak: 0,
    lastActiveDate: new Date().toISOString(),
  });
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedQuotes = localStorage.getItem('lib_quotes');
      const savedAchievements = localStorage.getItem('lib_achievements');
      const savedStats = localStorage.getItem('lib_stats');

      if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          if (parsedStats && typeof parsedStats === 'object') {
            // Sync streak and active date with default fallbacks
            const today = new Date().toDateString();
            const lastActiveDateStr = parsedStats.lastActiveDate || new Date().toISOString();
            const lastActiveDate = new Date(lastActiveDateStr);
            const lastActive = isNaN(lastActiveDate.getTime()) ? '' : lastActiveDate.toDateString();

            if (lastActive && today !== lastActive) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);

              if (lastActive === yesterday.toDateString()) {
                parsedStats.dayStreak = (parsedStats.dayStreak || 0) + 1;
              } else {
                parsedStats.dayStreak = 1;
              }
              parsedStats.lastActiveDate = new Date().toISOString();
            }

            setStats({
              totalReadingTime: Number(parsedStats.totalReadingTime) || 0,
              dayStreak: Number(parsedStats.dayStreak) || 0,
              lastActiveDate: parsedStats.lastActiveDate || new Date().toISOString(),
            });
          }
        } catch (e) {
          console.error('Failed to parse stats:', e);
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setMounted(true);
    }
  }, []);

  // Persist logic
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('lib_quotes', JSON.stringify(quotes));
      localStorage.setItem('lib_achievements', JSON.stringify(achievements));
      localStorage.setItem('lib_stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [quotes, achievements, stats, mounted]);

  const unlockAchievement = useCallback(
    (id: string, title: string, description: string, icon: string) => {
      setAchievements((prev) => {
        if (prev.some((a) => a.id === id)) return prev;
        return [
          {
            id,
            title,
            description,
            icon,
            unlockedAt: new Date().toISOString(),
          },
          ...prev,
        ];
      });
    },
    []
  );

  const saveQuote = useCallback((bookId: string, bookTitle: string, text: string) => {
    const newQuote: UserQuote = {
      id: Date.now().toString(),
      bookId,
      bookTitle,
      text,
      date: new Date().toISOString(),
    };
    setQuotes((prev) => [newQuote, ...prev]);
  }, []);

  const removeQuote = useCallback((quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
  }, []);

  const incrementReadingTime = useCallback((minutes: number) => {
    setStats((prev) => ({
      ...prev,
      totalReadingTime: prev.totalReadingTime + minutes,
    }));
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        quotes,
        achievements,
        stats,
        saveQuote,
        removeQuote,
        unlockAchievement,
        incrementReadingTime,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
