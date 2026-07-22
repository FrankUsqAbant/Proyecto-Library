'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Ambient3DGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic 3D Following Ambient Orb 1 */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-500/15 blur-[160px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      />

      {/* Dynamic 3D Following Ambient Orb 2 */}
      <motion.div
        animate={{
          x: -mousePos.x * 1.5,
          y: -mousePos.y * 1.5,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 150 }}
        className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-orange-500/10 dark:bg-orange-500/10 blur-[180px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none"
      />

      {/* Floating 3D Sparkle Dust */}
      <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.07]" />
    </div>
  );
}
