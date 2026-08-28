"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

interface MatchCelebrationProps {
  open: boolean;
  matchedUser: {
    fullName?: string;
    username: string;
    profileImage?: string;
  } | null;
  onClose: () => void;
  onMessage: () => void;
}

export default function MatchCelebration({
  open,
  matchedUser,
  onClose,
  onMessage,
}: MatchCelebrationProps) {
  return (
    <AnimatePresence>
      {open && matchedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#090611]/95 px-4 backdrop-blur-xl"
        >
          {/* Background glow */}
          <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-pink-600/20 blur-[120px]" />

          <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />

          {/* Floating hearts */}
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0,
                y: 80,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.3, 0.8],
                y: -500,
                x:
                  (index % 2 === 0 ? 1 : -1) *
                  (40 + index * 12),
                rotate:
                  index % 2 === 0 ? 25 : -25,
              }}
              transition={{
                duration: 3 + (index % 3),
                delay: index * 0.08,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute bottom-0 text-pink-400"
              style={{
                left: `${5 + index * 8}%`,
              }}
            >
              <Heart
                size={18 + (index % 4) * 8}
                fill="currentColor"
              />
            </motion.div>
          ))}

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </motion.button>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-md text-center">
            {/* Sparkles */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -45,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                delay: 0.15,
              }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_60px_rgba(236,72,153,0.55)]"
            >
              <Sparkles
                size={38}
                className="text-white"
              />
            </motion.div>

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
                delay: 0.3,
              }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300"
            >
              CampusConnect Dating
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                delay: 0.4,
              }}
              className="mt-3 text-5xl font-black tracking-tight text-white md:text-6xl"
            >
              IT&apos;S A

              <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                MATCH!
              </span>
            </motion.h1>

            {/* Profile circles */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.7,
                type: "spring",
              }}
              className="relative mx-auto mt-10 flex items-center justify-center"
            >
              {/* You */}
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_0_40px_rgba(236,72,153,0.5)]">
                <Heart
                  size={48}
                  fill="white"
                  className="text-white"
                />
              </div>

              {/* Center heart */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="relative z-20 -mx-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#090611] bg-white text-pink-500 shadow-xl"
              >
                <Heart
                  size={30}
                  fill="currentColor"
                />
              </motion.div>

              {/* Match */}
              <div className="relative z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-purple-400 bg-purple-600 shadow-[0_0_40px_rgba(168,85,247,0.45)]">
                {matchedUser.profileImage ? (
                  <img
                    src={matchedUser.profileImage}
                    alt={
                      matchedUser.fullName ||
                      matchedUser.username
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {(
                      matchedUser.fullName ||
                      matchedUser.username
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Match text */}
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
                delay: 0.9,
              }}
              className="mt-8 text-lg text-slate-300"
            >
              You and{" "}

              <span className="font-bold text-white">
                {matchedUser.fullName ||
                  matchedUser.username}
              </span>{" "}

              liked each other.
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.1,
              }}
              className="mt-2 text-sm text-slate-500"
            >
              Something interesting might just begin here.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.2,
              }}
              className="mt-10 space-y-3"
            >
              <button
                onClick={onMessage}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 font-bold text-white shadow-[0_0_40px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={20} />

                SAY HELLO
              </button>

              <button
                onClick={onClose}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                KEEP DISCOVERING
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}