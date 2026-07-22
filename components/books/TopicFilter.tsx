"use client";

import { cn } from "@/lib/utils";
import { TOPICS } from "@/lib/constants";

interface TopicFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function TopicFilter({
  selectedCategory,
  setSelectedCategory,
}: TopicFilterProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
      {TOPICS.map((topic) => (
        <button
          key={topic}
          onClick={() => setSelectedCategory(topic)}
          className={cn(
            "px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm font-bold border",
            selectedCategory === topic
              ? "bg-violet-600 text-white shadow-md shadow-violet-100 dark:shadow-violet-900/20 border-transparent"
              : "bg-[var(--background-sec)] border-[var(--border)] text-[var(--foreground-sec)] hover:border-violet-200 hover:text-violet-600 dark:hover:text-violet-400",
          )}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
