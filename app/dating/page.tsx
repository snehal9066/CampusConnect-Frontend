"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Sparkles,
  MapPin,
  GraduationCap,
  RefreshCw,
  Settings,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import API_URL from "@/services/api";

interface DatingPrompt {
  question: string;
  answer: string;
}

interface DatingUser {
  _id: string;
  userId: string;
  fullName: string;
  username: string;
  department: string;
  year: string | number;
  profileImage: string;
  photos: string[];
  bio: string;
  interests: string[];
  prompts: DatingPrompt[];
  mysteryModeEnabled: boolean;
  verified: boolean;
}

const DatingPage: React.FC = () => {
  const [matches, setMatches] = useState<DatingUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] =
    useState<DatingUser | null>(null);

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ===============================
  // LOAD DATING PROFILES
  // ===============================

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/dating/discover`,
        getHeaders()
      );

      setMatches(response.data.matches || []);
      setCurrentIndex(0);
    } catch (err: any) {
      console.error("Failed to load dating profiles", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load dating profiles"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // ===============================
  // LIKE OR PASS
  // ===============================

  const handleInteraction = async (
    action: "like" | "pass"
  ) => {
    const currentUser = matches[currentIndex];

    if (!currentUser) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/dating/interact`,
        {
          targetUserId: currentUser.userId,
          action,
        },
        getHeaders()
      );

      // If mutual match
      if (response.data.isMutualMatch) {
        setMatchedUser(currentUser);
        setShowMatch(true);
      }

      // Move to next profile
      setCurrentIndex((prev) => prev + 1);
    } catch (err: any) {
      console.error("Dating interaction failed", err);

      alert(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const currentUser = matches[currentIndex];

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-pink-400 animate-spin" />

          <p className="text-slate-400">
            Finding someone interesting...
          </p>
        </div>
      </main>
    );
  }

  // ===============================
  // ERROR
  // ===============================

  if (error) {
    return (
      <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center bg-white/5 border border-red-500/30 rounded-3xl p-8">
          <h1 className="text-2xl font-bold mb-3">
            Dating needs a profile first
          </h1>

          <p className="text-slate-400 mb-6">
            {error}
          </p>

          <button
            onClick={loadMatches}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070711] text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.15),transparent_40%)]" />

      {/* HEADER */}

      <div className="relative z-20 flex items-center justify-between px-5 md:px-10 py-5">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              CampusConnect
            </h1>

            <p className="text-xs text-pink-300">
              CUSAT Dating
            </p>
          </div>
        </div>

        <button className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Settings className="w-5 h-5 text-slate-300" />
        </button>

      </div>

      {/* MAIN */}

      <div className="relative z-10 flex flex-col items-center px-4 pb-10">

        <div className="mb-5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
            <Sparkles className="w-4 h-4 text-pink-400" />

            <span className="text-sm text-pink-200">
              Only verified CUSAT students
            </span>
          </div>
        </div>

        {/* CARD AREA */}

        <div className="relative w-full max-w-md h-[620px]">

          <AnimatePresence mode="wait">

            {currentUser ? (
              <motion.div
                key={currentUser._id}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  x: -80,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="absolute inset-0"
              >

                <div className="relative h-full rounded-[32px] overflow-hidden border border-white/10 bg-[#11111d] shadow-2xl">

                  {/* IMAGE */}

                  <div className="relative h-[62%]">

                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={currentUser.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-indigo-500/40 flex items-center justify-center">
                        <span className="text-7xl font-bold text-white/40">
                          {currentUser.fullName?.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#11111d] via-transparent to-transparent" />

                    {/* VERIFIED */}

                    <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                      CUSAT Verified
                    </div>

                  </div>

                  {/* PROFILE DETAILS */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <div className="flex items-end justify-between gap-4">

                      <div>

                        <h2 className="text-3xl font-bold flex items-center gap-2">
                          {currentUser.fullName || currentUser.username}

                          {currentUser.mysteryModeEnabled && (
                            <span className="text-sm px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300">
                              Mystery
                            </span>
                          )}
                        </h2>

                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-300">

                          {currentUser.department && (
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4 text-pink-400" />

                              {currentUser.department}
                            </span>
                          )}

                          {currentUser.year && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-purple-400" />

                              Year {currentUser.year}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* BIO */}

                    {currentUser.bio && (
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {currentUser.bio}
                      </p>
                    )}

                    {/* INTERESTS */}

                    {currentUser.interests?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">

                        {currentUser.interests
                          .slice(0, 5)
                          .map((interest) => (
                            <span
                              key={interest}
                              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                            >
                              {interest}
                            </span>
                          ))}

                      </div>
                    )}

                    {/* PROMPT */}

                    {currentUser.prompts?.[0] && (
                      <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10">

                        <p className="text-xs text-pink-300 mb-1">
                          {currentUser.prompts[0].question}
                        </p>

                        <p className="text-sm text-white">
                          {currentUser.prompts[0].answer}
                        </p>

                      </div>
                    )}

                  </div>

                </div>

              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center px-8"
              >

                <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-9 h-9 text-pink-400" />
                </div>

                <h2 className="text-2xl font-bold">
                  You've seen everyone for now
                </h2>

                <p className="text-slate-400 mt-3">
                  New CUSAT students will appear here when they join CampusConnect Dating.
                </p>

                <button
                  onClick={loadMatches}
                  className="mt-6 flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition"
                >
                  <RefreshCw className="w-4 h-4" />

                  Refresh
                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* ACTION BUTTONS */}

        {currentUser && (
          <div className="relative z-20 flex items-center justify-center gap-7 mt-7">

            {/* PASS */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() =>
                handleInteraction("pass")
              }
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/40 transition"
            >
              <X className="w-8 h-8 text-red-400" />
            </motion.button>

            {/* LIKE */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() =>
                handleInteraction("like")
              }
              className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl shadow-pink-500/30"
            >
              <Heart className="w-9 h-9 fill-white text-white" />
            </motion.button>

          </div>
        )}

      </div>

      {/* MUTUAL MATCH MODAL */}

      <AnimatePresence>

        {showMatch && matchedUser && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center px-5"
          >

            <motion.div
              initial={{
                scale: 0.7,
                y: 40,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
              exit={{
                scale: 0.8,
                y: 30,
              }}
              className="w-full max-w-md rounded-[32px] p-8 text-center bg-gradient-to-br from-pink-600 to-purple-700 shadow-2xl"
            >

              <div className="text-6xl mb-4">
                💘
              </div>

              <h2 className="text-3xl font-black">
                It's a Match!
              </h2>

              <p className="mt-3 text-pink-100">
                You and{" "}
                <span className="font-bold">
                  {matchedUser.fullName}
                </span>{" "}
                liked each other.
              </p>

              <div className="flex flex-col gap-3 mt-7">

                <button
                  className="w-full py-4 rounded-2xl bg-white text-pink-600 font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />

                  Start Talking
                </button>

                <button
                  onClick={() =>
                    setShowMatch(false)
                  }
                  className="w-full py-4 rounded-2xl bg-black/20 border border-white/20 font-semibold"
                >
                  Keep Discovering
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
};

export default DatingPage;