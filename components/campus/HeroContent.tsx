"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";

export const HeroContent: React.FC = () => {
  return (
    <div className="relative z-30 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">

      {/* Atmosphere Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 backdrop-blur-md"
      >
        <Sparkles className="h-4 w-4 animate-pulse text-cyan-400" />

        <span className="text-xs font-medium uppercase tracking-widest text-cyan-300">
          The Living Digital Campus
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="text-5xl font-black leading-[1.08] tracking-tight text-white md:text-7xl lg:text-8xl"
      >
        YOUR CAMPUS.
        <br />

        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 bg-clip-text text-transparent">
          SPATIALLY CONNECTED.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.7 }}
        className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-slate-400 md:text-xl"
      >
        Enter a living network of students, real-time hangouts, tea spots,
        and live events unfolding across your university in real time.
      </motion.p>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/login"
          className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] active:scale-95"
        >
          {/* Inner Light Sweep Effect */}
          <div className="absolute inset-0 h-full w-1/2 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-1000 ease-in-out group-hover:translate-x-[300%]" />

          <Compass className="h-5 w-5 text-cyan-200 transition-transform duration-500 group-hover:rotate-45" />

          <span>STEP INTO CAMPUSCONNECT</span>

          <ArrowUpRight className="h-5 w-5 text-cyan-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      {/* Live Active Status Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="mt-12 flex items-center gap-6 font-mono text-xs text-slate-500"
      >
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          1,420 Students Live
        </span>

        <span className="text-slate-700">•</span>

        <span>42 Active Spots Around CUSAT</span>
      </motion.div>

    </div>
  );
};