"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";

export const HeroContent: React.FC = () => {
  return (
    <div className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-screen">
      {/* Atmosphere Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md mb-8"
      >
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-xs font-medium tracking-widest text-cyan-300 uppercase">
          The Living Digital Campus
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-sans leading-[1.08]"
      >
        YOUR CAMPUS. <br />
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 bg-clip-text text-transparent">
          SPATIALLY CONNECTED.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.7 }}
        className="mt-6 text-base md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
      >
        Enter a living network of students, real-time hangouts, tea spots, and live 
        events unfolding across your university in real time.
      </motion.p>

      {/* Main Spatial CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden">
          {/* Inner Light Sweep Effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
          <Compass className="w-5 h-5 text-cyan-200 group-hover:rotate-45 transition-transform duration-500" />
          <span>STEP INTO CAMPUSCONNECT</span>
          <ArrowUpRight className="w-5 h-5 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </motion.div>

      {/* Live Active Status Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="mt-12 flex items-center gap-6 text-xs text-slate-500 font-mono"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          1,420 Students Live
        </span>
        <span className="text-slate-700">•</span>
        <span>42 Active Spots Around CUSAT</span>
      </motion.div>
    </div>
  );
};