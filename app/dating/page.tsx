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
} from "lucide-react";
import axios from "axios";
import API_URL from "@/services/api";
import MatchCelebration from "@/components/dating/MatchCelebration";

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

  // Match celebration
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
      console.error(
        "Failed to load dating profiles",
        err
      );

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

      // 💘 MUTUAL MATCH
      if (response.data.isMutualMatch) {
        setMatchedUser(currentUser);
        setShowMatch(true);
      }

      // Move to the next profile
      setCurrentIndex((prev) => prev + 1);
    } catch (err: any) {
      console.error(
        "Dating interaction failed",
        err
      );

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
      <main className="flex min-h-screen items-center justify-center bg-[#070711] text-white">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-pink-400" />

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
      <main className="flex min-h-screen items-center justify-center bg-[#070711] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-white/5 p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold">
            Dating needs a profile first
          </h1>

          <p className="mb-6 text-slate-400">
            {error}
          </p>

          <button
            onClick={loadMatches}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold"
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

      <div className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
            <Heart className="h-5 w-5 fill-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              CampusConnect
            </h1>

            <p className="text-xs text-pink-300">
              Campus Dating
            </p>
          </div>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10">
          <Settings className="h-5 w-5 text-slate-300" />
        </button>
      </div>

      {/* MAIN */}

      <div className="relative z-10 flex flex-col items-center px-4 pb-10">
        <div className="mb-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-pink-400" />

            <span className="text-sm text-pink-200">
              Meet someone interesting
            </span>
          </div>
        </div>

        {/* CARD AREA */}

        <div className="relative h-[620px] w-full max-w-md">
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
                <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-[#11111d] shadow-2xl">
                  {/* IMAGE */}

                  <div className="relative h-[62%]">
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={currentUser.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-indigo-500/40">
                        <span className="text-7xl font-bold text-white/40">
                          {currentUser.fullName?.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#11111d] via-transparent to-transparent" />

                    {/* VERIFIED */}

                    <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium backdrop-blur-xl">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      Verified
                    </div>
                  </div>

                  {/* PROFILE DETAILS */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">
                      {currentUser.fullName ||
                        currentUser.username}

                      {currentUser.mysteryModeEnabled && (
                        <span className="rounded-lg bg-purple-500/20 px-2 py-1 text-sm text-purple-300">
                          Mystery
                        </span>
                      )}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-300">
                      {currentUser.department && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-pink-400" />
                          {currentUser.department}
                        </span>
                      )}

                      {currentUser.year && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-purple-400" />
                          Year {currentUser.year}
                        </span>
                      )}
                    </div>

                    {currentUser.bio && (
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {currentUser.bio}
                      </p>
                    )}

                    {currentUser.interests?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {currentUser.interests
                          .slice(0, 5)
                          .map((interest) => (
                            <span
                              key={interest}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                            >
                              {interest}
                            </span>
                          ))}
                      </div>
                    )}

                    {currentUser.prompts?.[0] && (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="mb-1 text-xs text-pink-300">
                          {
                            currentUser.prompts[0]
                              .question
                          }
                        </p>

                        <p className="text-sm text-white">
                          {
                            currentUser.prompts[0]
                              .answer
                          }
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
                className="flex h-full flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 px-8 text-center"
              >
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/10">
                  <Sparkles className="h-9 w-9 text-pink-400" />
                </div>

                <h2 className="text-2xl font-bold">
                  You've seen everyone for now
                </h2>

                <p className="mt-3 text-slate-400">
                  New people will appear here when
                  they join CampusConnect Dating.
                </p>

                <button
                  onClick={loadMatches}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 transition hover:bg-white/15"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACTION BUTTONS */}

        {currentUser && (
          <div className="relative z-20 mt-7 flex items-center justify-center gap-7">
            {/* PASS */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() =>
                handleInteraction("pass")
              }
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-red-500/40 hover:bg-red-500/10"
            >
              <X className="h-8 w-8 text-red-400" />
            </motion.button>

            {/* LIKE */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              onClick={() =>
                handleInteraction("like")
              }
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-xl shadow-pink-500/30"
            >
              <Heart className="h-9 w-9 fill-white text-white" />
            </motion.button>
          </div>
        )}
      </div>

      {/* 💘 PREMIUM MATCH CELEBRATION */}

      <MatchCelebration
        open={showMatch}
        matchedUser={matchedUser}
        onClose={() => {
          setShowMatch(false);
          setMatchedUser(null);
        }}
        onMessage={() => {
          // We'll connect this to the real chat
          // system in the next step.
          setShowMatch(false);
          setMatchedUser(null);
        }}
      />
    </main>
  );
};

export default DatingPage;