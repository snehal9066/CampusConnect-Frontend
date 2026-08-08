"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.65,
        y: 30,
      }}
      animate={{
        opacity: [0, 0, 1, 1],
        scale: [0.65, 0.65, 1.05, 1],
        y: [30, 30, 0, 0],
      }}
      transition={{
        delay: 8.8,
        duration: 2,
        times: [0, 0.35, 0.7, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        left-1/2
        top-6
        z-40
        w-full
        -translate-x-1/2
        px-4
        text-center
        sm:top-8
        md:top-10
      "
    >
      {/* Glow behind logo */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: [0, 0.8, 0.4],
          scale: [0.5, 1.3, 1],
        }}
        transition={{
          delay: 8.8,
          duration: 2,
          ease: "easeOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -z-10
          h-24
          w-48
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-500/30
          blur-3xl
          sm:h-32
          sm:w-64
          md:h-32
          md:w-72
        "
      />

      {/* Logo */}
      <motion.h1
        initial={{ letterSpacing: "0.25em" }}
        animate={{ letterSpacing: "0.02em" }}
        transition={{
          delay: 9,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          text-3xl
          font-extrabold
          tracking-tight
          text-white
          drop-shadow-[0_0_20px_rgba(129,140,248,0.8)]
          sm:text-4xl
          md:text-6xl
        "
      >
        Campus
        <span className="text-purple-400">Connect</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 9.6,
          duration: 0.8,
        }}
        className="
          mt-2
          text-xs
          tracking-wide
          text-blue-100/90
          sm:mt-3
          sm:text-sm
          md:text-lg
        "
      >
        Connecting Campus.
        <br />
        Creating Connections.
      </motion.p>
    </motion.div>
  );
}