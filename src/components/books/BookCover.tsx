'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  title: string;
  coverImage?: string;
  fallbackUrl?: string;
  className?: string;
  priority?: boolean;
}

export const BookCover = React.memo(
  function BookCover({
    title,
    coverImage,
    fallbackUrl = 'https://images.unsplash.com/photo-1543005814-14975d47ba79?auto=format&fit=crop&q=80&w=600',
    className,
    priority = false,
  }: BookCoverProps) {
    const cleanTitle = (title || '').split('\n')[0].split('(')[0].trim();
    const openLibraryFallback = `https://covers.openlibrary.org/b/title/${encodeURIComponent(cleanTitle)}-L.jpg?default=false`;

    const [imgSrc, setImgSrc] = useState(coverImage || openLibraryFallback);
    const [errorStage, setErrorStage] = useState(0);

    // Synchronize state if props change (important for async loading)
    React.useEffect(() => {
      setImgSrc(coverImage || openLibraryFallback);
      setErrorStage(0);
    }, [coverImage, openLibraryFallback]);

    const handleImageError = () => {
      if (errorStage === 0 && openLibraryFallback !== imgSrc) {
        // Try Open Library title-based fallback
        setErrorStage(1);
        setImgSrc(openLibraryFallback);
      } else if (errorStage <= 1) {
        // Final fallback
        setErrorStage(2);
        setImgSrc(fallbackUrl);
      }
    };

    return (
      <div
        className={cn(
          'relative overflow-hidden w-full h-full bg-stone-100 dark:bg-stone-900/50',
          className
        )}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority={priority}
          quality={90}
          loading={priority ? undefined : 'lazy'}
          className={cn(
            'object-cover transition-all duration-700',
            errorStage > 0 ? 'grayscale' : ''
          )}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 440px"
          onError={handleImageError}
        />
      </div>
    );
  },
  (prev, next) => prev.title === next.title && prev.coverImage === next.coverImage
);
