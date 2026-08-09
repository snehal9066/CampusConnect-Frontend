"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IntroOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {/* Tagline */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Connect. Collaborate. Succeed.
      </motion.h1>
      {/* Sub‑text */}
      <motion.p
        className="text-lg md:text-xl text-gray-200 mb-8 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      >
        A premium platform for students to find study buddies, make friends, and grow together.
      </motion.p>
      {/* Call‑to‑action button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
      >
        <Link
          href="/login"
          className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-colors pointer-events-auto"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
