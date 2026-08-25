"use client";

import React from "react";
import { motion } from "framer-motion";

export const NetworkGraph: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
          <stop offset="50%" stopColor="rgba(147, 51, 234, 0.4)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
        </linearGradient>

        <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
          <stop offset="50%" stopColor="rgba(6, 182, 212, 0.4)" />
          <stop offset="100%" stopColor="rgba(147, 51, 234, 0.05)" />
        </linearGradient>

        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
        </radialGradient>
      </defs>

      {/* Path 1: Top-Left to Center */}
      <motion.path
        d="M 180 160 Q 350 240, 500 450 T 850 650"
        fill="none"
        stroke="url(#line-gradient-1)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Dynamic Pulse Particle on Path 1 */}
      <motion.circle
        r="3"
        fill="#06b6d4"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{
          offsetPath: "path('M 180 160 Q 350 240, 500 450 T 850 650')",
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Path 2: Bottom-Left to Top-Right */}
      <motion.path
        d="M 220 720 Q 450 600, 680 400 T 1100 200"
        fill="none"
        stroke="url(#line-gradient-2)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.8 }}
      />
      {/* Dynamic Pulse Particle on Path 2 */}
      <motion.circle
        r="3.5"
        fill="#a855f7"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        style={{
          offsetPath: "path('M 220 720 Q 450 600, 680 400 T 1100 200')",
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
      />

      {/* Node Points */}
      <circle cx="180" cy="160" r="4" fill="#06b6d4" opacity="0.7" />
      <circle cx="180" cy="160" r="12" fill="url(#node-glow)" opacity="0.4" />

      <circle cx="1100" cy="200" r="4" fill="#a855f7" opacity="0.7" />
      <circle cx="1100" cy="200" r="14" fill="url(#node-glow)" opacity="0.3" />

      <circle cx="220" cy="720" r="4" fill="#3b82f6" opacity="0.7" />
    </svg>
  );
};