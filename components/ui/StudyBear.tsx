"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function StudyBear() {
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x =
        (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const y =
        (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      mouseX.set(x * 12);
      mouseY.set(y * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const eyeX = useTransform(mouseX, [-12, 12], [-3, 3]);
  const eyeY = useTransform(mouseY, [-8, 8], [-2, 2]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 flex items-center justify-center pointer-events-none select-none -translate-x-4"
      style={{ perspective: "1000px" }}
    >
      {/* --- THOUGHT CLOUD (Style: Thinking) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.4 }}
        className="absolute -top-24 left-1/2 -translate-x-1/4 bg-white/95 dark:bg-stone-50 p-4 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] z-[100] border-2 border-violet-50/50 backdrop-blur-sm min-w-[180px]"
      >
        <p className="text-violet-500/80 font-serif italic text-base leading-tight text-center tracking-tight">
          Leer para entender, <br />
          pensar para <br />
          <span className="text-orange-400 font-bold">ser libres...</span>
        </p>

        {/* Thought Bubbles (Circles) - Positions adjusted for the smaller size */}
        <div className="absolute bottom-[-10px] left-8 w-4 h-4 bg-white border-2 border-violet-50/50 rounded-full" />
        <div className="absolute bottom-[-24px] left-12 w-2.5 h-2.5 bg-white border-2 border-violet-50/50 rounded-full" />
        <div className="absolute bottom-[-34px] left-15 w-1.5 h-1.5 bg-white border-2 border-violet-50/50 rounded-full" />
      </motion.div>

      {/* --- THE BEAR (CSS ART - Smaller & Cuter) --- */}
      <motion.div
        style={{
          rotateX: mouseY,
          rotateY: mouseX,
          transformStyle: "preserve-3d",
          filter:
            "drop-shadow(0 0 0 6px white) drop-shadow(0 10px 25px rgba(0,0,0,0.12))",
        }}
        className="relative w-48 h-52 flex flex-col items-center pointer-events-auto"
      >
        {/* EARS */}
        <div className="absolute -top-5 w-full flex justify-between px-4 z-0">
          <div className="w-16 h-16 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-full flex items-center justify-center">
            <div className="w-9 h-9 bg-[#f4e4d0] rounded-full" />
          </div>
          <div className="w-16 h-16 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-full flex items-center justify-center">
            <div className="w-9 h-9 bg-[#f4e4d0] rounded-full" />
          </div>
        </div>

        {/* HEAD */}
        <div className="relative w-44 h-36 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-[80px_80px_70px_70px] z-20 flex flex-col items-center pt-8 overflow-hidden">
          {/* Eyes */}
          <div className="flex justify-between w-24 mt-4">
            <div className="w-3.5 h-3.5 bg-[#3d2b1f] rounded-full relative">
              <motion.div
                style={{ x: eyeX, y: eyeY }}
                className="absolute w-1 h-1 bg-white rounded-full top-0.5 right-0.5"
              />
            </div>
            <div className="w-3.5 h-3.5 bg-[#3d2b1f] rounded-full relative">
              <motion.div
                style={{ x: eyeX, y: eyeY }}
                className="absolute w-1 h-1 bg-white rounded-full top-0.5 right-0.5"
              />
            </div>
          </div>

          {/* Blush */}
          <div className="flex justify-between w-32 mt-0.5 opacity-40">
            <div className="w-7 h-4 bg-[#ffb6a3] rounded-full blur-[3px]" />
            <div className="w-7 h-4 bg-[#ffb6a3] rounded-full blur-[3px]" />
          </div>

          {/* Muzzle */}
          <div className="w-22 h-16 bg-[#fffdfa] border border-[#6b4e3d]/10 rounded-full -mt-2 flex flex-col items-center justify-center">
            <div className="w-7 h-4 bg-[#6b4e3d] rounded-full relative">
              <div className="absolute top-0.5 left-1 w-2.5 h-1.5 bg-white/20 rounded-full" />
            </div>
            <div className="flex -mt-1 scale-125">
              <div className="w-3.5 h-3.5 border-b-2 border-[#6b4e3d] rounded-full" />
              <div className="w-3.5 h-3.5 border-b-2 border-[#6b4e3d] rounded-full" />
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="relative w-36 h-36 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] -mt-10 rounded-[60px_60px_50px_50px] z-10 flex justify-center overflow-hidden">
          <div className="absolute bottom-[-8px] w-28 h-28 bg-[#fffdfa] rounded-full opacity-80" />
        </div>

        {/* WAVING HAND (Paw) */}
        <motion.div
          animate={{ rotate: [-15, 15, -15], y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "0%", originY: "50%" }}
          className="absolute right-[-28px] top-10 w-24 h-24 z-30"
        >
          <div className="relative w-18 h-20 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-[35px_35px_45px_45px] shadow-sm flex flex-col items-center justify-center p-2">
            {/* Paw Fingers (Top Pads) */}
            <div className="flex space-x-1.5 mb-1.5">
              <div className="w-3 h-4 bg-[#ffb6a3]/50 rounded-full border border-[#6b4e3d]/10" />
              <div className="w-3.5 h-4.5 bg-[#ffb6a3]/50 rounded-full border border-[#6b4e3d]/10 -mt-1" />
              <div className="w-3 h-4 bg-[#ffb6a3]/50 rounded-full border border-[#6b4e3d]/10" />
            </div>
            {/* Main Palm Pad */}
            <div className="w-10 h-8 bg-[#ffb6a3]/70 rounded-[40%_40%_50%_50%] border border-[#6b4e3d]/10" />
          </div>
        </motion.div>

        {/* LEFT ARM */}
        <div className="absolute left-[-12px] top-24 w-12 h-20 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-[50px_10px_10px_50px] z-0 -rotate-10" />

        {/* LEGS */}
        <div className="absolute bottom-[-10px] w-full flex justify-center space-x-6 z-0">
          <div className="w-16 h-16 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-[15px_15px_25px_25px]" />
          <div className="w-16 h-16 bg-[#fdf2e3] border-[2px] border-[#6b4e3d] rounded-[15px_15px_25px_25px]" />
        </div>
      </motion.div>
    </div>
  );
}
