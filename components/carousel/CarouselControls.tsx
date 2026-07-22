"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselControls({ onPrev, onNext }: CarouselControlsProps) {
  return (
    <div className="hidden sm:flex gap-2">
      <button
        onClick={onPrev}
        className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center 
                   hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] 
                   transition-all duration-300 text-[var(--muted)] active:scale-90"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={onNext}
        className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center 
                   hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] 
                   transition-all duration-300 text-[var(--muted)] active:scale-90"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
