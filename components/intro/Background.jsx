"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">

      {/* Main animated sky */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Blue Aurora */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[500px] w-[700px] rounded-full bg-blue-500/20 blur-[140px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, -20, 0],
          opacity: [0.25, 0.5, 0.3, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Aurora */}
      <motion.div
        className="absolute -bottom-40 right-1/4 h-[500px] w-[700px] rounded-full bg-purple-600/20 blur-[150px]"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, -50, 30, 0],
          opacity: [0.2, 0.45, 0.25, 0.2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cinematic center glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.75)_100%)]" />

    </div>
  );
}