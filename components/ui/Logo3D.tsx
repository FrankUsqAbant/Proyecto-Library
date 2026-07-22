'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Logo3DProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo3D({ size = 'md', className = '' }: Logo3DProps) {
  const dimensions = {
    sm: { container: 'w-8 h-8 rounded-xl', icon: 18, font: 'text-lg' },
    md: { container: 'w-11 h-11 rounded-2xl', icon: 24, font: 'text-2xl' },
    lg: { container: 'w-14 h-14 rounded-2.5xl', icon: 30, font: 'text-3xl' },
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.06, rotateY: 10, rotateX: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative flex items-center justify-center perspective-1000 ${dimensions.container} ${className}`}
    >
      {/* Glow Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 3D Glass Container */}
      <div
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
        className="relative w-full h-full bg-stone-950 dark:bg-stone-900 border border-violet-400/40 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden"
      >
        {/* Shimmer Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* 3D Illuminated Book Isotype */}
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 filter drop-shadow-[0_4px_8px_rgba(124,58,237,0.5)]"
        >
          {/* Left Book Page */}
          <path
            d="M5 8C5 6.34315 6.34315 5 8 5H15V24H8C6.34315 24 5 25.3431 5 27V8Z"
            fill="url(#left-page-gradient)"
          />
          {/* Right Book Page */}
          <path
            d="M27 8C27 6.34315 25.6569 5 24 5H17V24H24C25.6569 24 27 25.3431 27 27V8Z"
            fill="url(#right-page-gradient)"
          />
          {/* Center Book Spine */}
          <path
            d="M15 5H17V24H15V5Z"
            fill="#a78bfa"
          />
          {/* Glowing Bookmark Star/Sparkle */}
          <circle cx="16" cy="11" r="2.5" fill="#facc15" className="animate-pulse" />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="left-page-gradient"
              x1="5"
              y1="5"
              x2="15"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient
              id="right-page-gradient"
              x1="17"
              y1="5"
              x2="27"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}
