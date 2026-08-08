"use client";

import { motion } from "framer-motion";

export default function Connection() {
  const particles = Array.from({ length: 16 });

  return (
    <div className="pointer-events-none absolute inset-0 z-30">

      {/* Main energy beam */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          delay: 7,
          duration: 2.5,
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
          shadow-[0_0_12px_3px_rgba(129,140,248,0.8)]
        "
      />

      {/* Soft glow around the connection */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          delay: 7,
          duration: 2.5,
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
          opacity: [0, 1, 1, 0],
          scale: [0.4, 1.4, 1.1, 0.4],
        }}
        transition={{
          delay: 7.2,
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
          opacity: [0, 1, 1, 0],
          scale: [0, 1.8, 2.5, 3],
        }}
        transition={{
          delay: 7.8,
          duration: 1.5,
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

      {/* Heart */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, 1.4, 1.1, 0.7],
        }}
        transition={{
          delay: 7.9,
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[calc(61%-45px)]
          -translate-x-1/2
          text-4xl
          drop-shadow-[0_0_15px_rgba(244,114,182,0.9)]
        "
      >
        ❤️
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
              delay: 7.8 + index * 0.03,
              duration: 1.6,
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