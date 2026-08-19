'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function StudyBear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWinking, setIsWinking] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  // Mouse Tracking Physics Spring
  const springConfig = { damping: 20, stiffness: 140 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      mouseX.set(x * 12);
      mouseY.set(y * 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Head and Eye Offsets
  const headRotateX = useTransform(mouseY, [-10, 10], [6, -6]);
  const headRotateY = useTransform(mouseX, [-12, 12], [-10, 10]);
  const eyeX = useTransform(mouseX, [-12, 12], [-3, 3]);
  const eyeY = useTransform(mouseY, [-10, 10], [-2, 2]);

  const handleClick = () => {
    setIsWinking(true);
    setHeartBurst(true);
    setTimeout(() => setIsWinking(false), 800);
    setTimeout(() => setHeartBurst(false), 1500);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-64 h-64 flex items-center justify-center select-none cursor-pointer group"
    >
      {/* Interactive Heart Burst Effect */}
      {heartBurst && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{ opacity: 1, scale: 1.4, y: -40 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-16 z-40 text-rose-500 font-bold text-lg flex items-center gap-1 bg-white/90 dark:bg-stone-900/90 px-3 py-1 rounded-full shadow-lg border border-rose-200"
        >
          ❤️ ¡Leamos juntos!
        </motion.div>
      )}

      {/* Thought Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-50/95 dark:bg-stone-900/95 px-4 py-2 rounded-2xl shadow-lg border border-amber-900/20 z-30"
      >
        <p className="text-[11px] font-serif italic text-amber-900 dark:text-amber-200 font-bold whitespace-nowrap">
          {isWinking ? '¡Guiño! 📖✨' : '“Un libro abierto es una mente que habla...”'}
        </p>
      </motion.div>

      {/* Alive SVG Bear */}
      <motion.svg
        width="220"
        height="220"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 filter drop-shadow-xl"
      >
        {/* Soft Ambient Shadow Base */}
        <ellipse cx="100" cy="182" rx="70" ry="12" fill="#000000" fillOpacity="0.15" />

        {/* Desk Lamp Beam */}
        <path d="M155 45L120 170H180L155 45Z" fill="url(#lamp-light)" opacity="0.4" />

        {/* Bear Body with Breathing Motion */}
        <motion.path
          d="M60 120C60 95 80 85 100 85C120 85 140 95 140 120C140 150 135 178 100 178C65 178 60 150 60 120Z"
          fill="url(#bear-fur)"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Bear Chest/Belly */}
        <ellipse cx="100" cy="138" rx="28" ry="24" fill="#fde68a" fillOpacity="0.4" />

        {/* Interactive Dynamic Head Layer */}
        <motion.g
          style={{ rotateX: headRotateX, rotateY: headRotateY, originX: '100px', originY: '84px' }}
        >
          {/* Bear Ears (Wiggle on Hover) */}
          <motion.g whileHover={{ rotate: [-2, 4, -2] }}>
            <circle cx="72" cy="72" r="16" fill="url(#bear-fur)" />
            <circle cx="72" cy="72" r="9" fill="#d97706" fillOpacity="0.5" />
            <circle cx="128" cy="72" r="16" fill="url(#bear-fur)" />
            <circle cx="128" cy="72" r="9" fill="#d97706" fillOpacity="0.5" />
          </motion.g>

          {/* Bear Head */}
          <ellipse cx="100" cy="84" rx="36" ry="30" fill="url(#bear-fur)" />

          {/* Muzzle */}
          <ellipse cx="100" cy="92" rx="16" ry="12" fill="#fef3c7" />

          {/* Nose */}
          <ellipse cx="100" cy="87" rx="6" ry="4.5" fill="#451a03" />

          {/* Gentle Mouth */}
          <path d="M96 93Q100 97 104 93" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />

          {/* Dynamic Pupil & Wink Eyes */}
          {isWinking ? (
            <>
              {/* Wink Left Eye */}
              <path d="M82 80Q87 84 92 80" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
              {/* Open Right Eye */}
              <path
                d="M108 80Q113 76 118 80"
                stroke="#451a03"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <g>
                <path
                  d="M82 80Q87 76 92 80"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <motion.circle style={{ x: eyeX, y: eyeY }} cx="87" cy="81" r="2" fill="#451a03" />
              </g>
              {/* Right Eye */}
              <g>
                <path
                  d="M108 80Q113 76 118 80"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <motion.circle style={{ x: eyeX, y: eyeY }} cx="113" cy="81" r="2" fill="#451a03" />
              </g>
            </>
          )}

          {/* Reading Glasses */}
          <circle cx="87" cy="80" r="9" stroke="#78350f" strokeWidth="2.2" fill="none" />
          <circle cx="113" cy="80" r="9" stroke="#78350f" strokeWidth="2.2" fill="none" />
          <line x1="96" y1="80" x2="104" y2="80" stroke="#78350f" strokeWidth="2.2" />
        </motion.g>

        {/* Waving Paw in Book */}
        <motion.g
          animate={isWinking ? { rotate: [-10, 15, -10] } : { rotate: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '130px', originY: '140px' }}
        >
          {/* Open Book in Paws */}
          <g transform="translate(68, 140)">
            <path
              d="M5 8C15 5 28 8 32 14V34C28 28 15 25 5 28V8Z"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <path
              d="M59 8C49 5 36 8 32 14V34C36 28 49 25 59 28V8Z"
              fill="#fffbeb"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <line x1="32" y1="14" x2="32" y2="34" stroke="#78350f" strokeWidth="2" />
            <line
              x1="12"
              y1="14"
              x2="26"
              y2="15"
              stroke="#b45309"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <line
              x1="12"
              y1="18"
              x2="24"
              y2="19"
              stroke="#b45309"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <line
              x1="38"
              y1="15"
              x2="52"
              y2="14"
              stroke="#b45309"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <line
              x1="38"
              y1="19"
              x2="50"
              y2="18"
              stroke="#b45309"
              strokeWidth="1.2"
              opacity="0.6"
            />
          </g>
        </motion.g>

        {/* Cozy Lamp */}
        <path d="M152 40L145 160" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <path d="M140 160H164" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
        <path d="M140 40L152 28L164 40H140Z" fill="#f59e0b" />
        <circle cx="152" cy="42" r="4" fill="#fef08a" />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="bear-fur"
            x1="60"
            y1="60"
            x2="140"
            y2="175"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b45309" />
            <stop offset="0.7" stopColor="#78350f" />
            <stop offset="1" stopColor="#451a03" />
          </linearGradient>
          <linearGradient
            id="lamp-light"
            x1="152"
            y1="40"
            x2="100"
            y2="170"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
