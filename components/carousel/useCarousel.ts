import { useState, useRef, useCallback, useEffect } from "react";

interface UseCarouselOptions {
  totalItems: number;
  itemWidth: number;
  autoScrollSpeed?: number;
  pauseDuration?: number;
}

interface UseCarouselReturn {
  position: number;
  isPaused: boolean;
  isAnimating: boolean;
  scrollNext: () => void;
  scrollPrev: () => void;
  pauseCarousel: () => void;
  resumeCarousel: () => void;
}

export function useCarousel({
  totalItems,
  itemWidth,
  autoScrollSpeed = 0.3,
  pauseDuration = 7000,
}: UseCarouselOptions): UseCarouselReturn {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animatingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Calculate max position (last visible set of 4 books)
  const maxPosition = Math.max(0, (totalItems - 4) * itemWidth);

  const clearPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearPauseTimeout();
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, pauseDuration);
  }, [clearPauseTimeout, pauseDuration]);

  // Scroll to next item with smooth animation
  const scrollNext = useCallback(() => {
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsPaused(true);
    setIsAnimating(true);

    setPosition((prev) => {
      const next = prev + itemWidth;
      return next > maxPosition ? 0 : next;
    });

    // Keep animating flag for full duration of animation
    if (animatingTimeoutRef.current) {
      clearTimeout(animatingTimeoutRef.current);
    }
    animatingTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 650);

    scheduleResume();
  }, [itemWidth, maxPosition, scheduleResume]);

  // Scroll to previous item
  const scrollPrev = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsPaused(true);
    setIsAnimating(true);

    setPosition((prev) => {
      const next = prev - itemWidth;
      return next < 0 ? maxPosition : next;
    });

    if (animatingTimeoutRef.current) {
      clearTimeout(animatingTimeoutRef.current);
    }
    animatingTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 650);

    scheduleResume();
  }, [itemWidth, maxPosition, scheduleResume]);

  const pauseCarousel = useCallback(() => {
    setIsPaused(true);
    clearPauseTimeout();
  }, [clearPauseTimeout]);

  const resumeCarousel = useCallback(() => {
    scheduleResume();
  }, [scheduleResume]);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || totalItems === 0 || isAnimating) return;

    const animate = () => {
      setPosition((prev) => {
        const next = prev + autoScrollSpeed;
        if (next >= maxPosition) return 0;
        return next;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, totalItems, autoScrollSpeed, maxPosition, isAnimating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPauseTimeout();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (animatingTimeoutRef.current) {
        clearTimeout(animatingTimeoutRef.current);
      }
    };
  }, [clearPauseTimeout]);

  return {
    position,
    isPaused,
    isAnimating,
    scrollNext,
    scrollPrev,
    pauseCarousel,
    resumeCarousel,
  };
}
