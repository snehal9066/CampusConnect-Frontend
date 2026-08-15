"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const connectionTypes = [
  { icon: "🤝", label: "Friendship", color: "from-red-500 to-orange-500", glow: "rgba(248,113,113,0.9)" },
  { icon: "☕", label: "Coffee Chat", color: "from-amber-500 to-orange-500", glow: "rgba(251,146,60,0.9)" },
  { icon: "📚", label: "Study Buddy", color: "from-blue-500 to-cyan-500", glow: "rgba(96,165,250,0.9)" },
];

export default function Connection() {
  const particles = Array.from({ length: 16 });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % connectionTypes.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const currentType = connectionTypes[activeIdx];

  return (
    <div className="pointer-events-none absolute inset-0 z-30">

      {/* Main energy beam */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0.9],
          opacity: [0, 1, 1, 0.85],
        }}
        transition={{
          delay: 6.8,
          duration: 3,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[27%]
          right-[27%]
          top-[61%]
          h-[4px]
          origin-left
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          via-purple-400
          to-pink-400
          shadow-[0_0_14px_4px_rgba(129,140,248,0.8)]
        "
      />

      {/* Soft glow around the connection */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0.9],
          opacity: [0, 0.7, 0.7, 0.6],
        }}
        transition={{
          delay: 6.8,
          duration: 3,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[27%]
          right-[27%]
          top-[60.7%]
          h-8
          origin-left
          rounded-full
          bg-purple-500/20
          blur-xl
        "
      />

      {/* Traveling energy orb */}
      <motion.div
        initial={{
          left: "27%",
          opacity: 0,
          scale: 0,
        }}
        animate={{
          left: ["27%", "50%", "73%"],
          opacity: [0, 1, 1, 0.8],
          scale: [0.4, 1.4, 1.1, 0.8],
        }}
        transition={{
          delay: 7.0,
          duration: 2.2,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[calc(61%-6px)]
          h-3
          w-3
          rounded-full
          bg-white
          shadow-[0_0_20px_8px_rgba(96,165,250,0.9)]
        "
      />

      {/* Center connection pulse */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0.8],
          scale: [0, 1.8, 2.5, 2.8],
        }}
        transition={{
          delay: 7.4,
          duration: 2,
          ease: "easeOut",
        }}
        className="
          absolute
          left-1/2
          top-[61%]
          -translate-x-1/2
          -translate-y-1/2
          h-10
          w-10
          rounded-full
          bg-purple-400/30
          blur-md
        "
      />

      {/* Dynamic Cycling Connection Icons & Pill */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 1],
          scale: [0, 1.2, 1, 1],
        }}
        transition={{
          delay: 7.5,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          absolute
          left-1/2
          top-[calc(61%-52px)]
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-1
        "
      >
        <motion.div
          key={currentType.label}
          initial={{ scale: 0.5, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-4 py-1.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-xl"
        >
          <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            {currentType.icon}
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            {currentType.label}
          </span>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {particles.map((_, index) => {
        const angle = (index / particles.length) * Math.PI * 2;

        return (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos(angle) * (50 + (index % 3) * 25),
              y: Math.sin(angle) * (35 + (index % 4) * 15),
            }}
            transition={{
              delay: 7.6 + index * 0.03,
              duration: 2,
              ease: "easeOut",
            }}
            className="
              absolute
              left-1/2
              top-[61%]
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
              shadow-[0_0_10px_3px_rgba(103,232,249,0.8)]
            "
          />
        );
      })}
    </div>
  );
}