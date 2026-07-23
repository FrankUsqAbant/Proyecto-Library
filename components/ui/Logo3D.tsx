'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Logo3DProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo3D({ size = 'md', className = '' }: Logo3DProps) {
  const dimensions = {
    sm: { container: 'w-8 h-8 rounded-xl', icon: 18 },
    md: { container: 'w-11 h-11 rounded-2xl', icon: 24 },
    lg: { container: 'w-14 h-14 rounded-2.5xl', icon: 30 },
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative flex items-center justify-center select-none ${dimensions.container} ${className}`}
    >
      {/* Soft Organic Shadow */}
      <div className="absolute inset-0 bg-stone-900/10 dark:bg-amber-900/20 rounded-2xl blur-sm" />

      {/* Warm Natural Leather/Wood Frame */}
      <div className="relative w-full h-full bg-stone-900 dark:bg-stone-850 border border-amber-900/30 dark:border-amber-700/30 rounded-2xl shadow-md flex items-center justify-center overflow-hidden">
        {/* Soft Parchment Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 via-transparent to-amber-100/5 pointer-events-none" />

        {/* Natural Organic Book Isotype */}
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Left Warm Parchment Page */}
          <path
            d="M5 8C5 6.34315 6.34315 5 8 5H15V24H8C6.34315 24 5 25.3431 5 27V8Z"
            fill="url(#organic-left-page)"
          />
          {/* Right Warm Parchment Page */}
          <path
            d="M27 8C27 6.34315 25.6569 5 24 5H17V24H24C25.6569 24 27 25.3431 27 27V8Z"
            fill="url(#organic-right-page)"
          />
          {/* Natural Wood Spine */}
          <path d="M15 5H17V24H15V5Z" fill="#d97706" />
          {/* Warm Amber Reading Leaf */}
          <circle cx="16" cy="11" r="2.2" fill="#f59e0b" />

          {/* Organic Gradients */}
          <defs>
            <linearGradient
              id="organic-left-page"
              x1="5"
              y1="5"
              x2="15"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <linearGradient
              id="organic-right-page"
              x1="17"
              y1="5"
              x2="27"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fef3c7" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}
