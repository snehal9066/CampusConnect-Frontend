"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatchCard from "@/components/dating/MatchCard";
import VerifiedBadge from "@/components/dating/VerifiedBadge";
import useVerification from "@/hooks/useVerification";
import axios from "axios";
import API_URL from "@/services/api";

interface MatchUser {
  username: string;
  profileImage: string;
  verified: boolean;
  // Additional fields can be added as needed
}

const DatingPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isVerified, verify } = useVerification();

  // Load potential matches (placeholder implementation)
  useEffect(() => {
    const loadMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/match/study`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error("Failed to load matches", err);
      }
    };
    loadMatches();
  }, []);

  const handleSwipe = async (direction: "right" | "left") => {
  try {
    const token = localStorage.getItem("token");
    if (token && matches[currentIndex]) {
      await axios.post(`${API_URL}/api/match/swipe`, {
        matchId: matches[currentIndex].username,
        direction,
      }, { headers: { Authorization: `Bearer ${token}` } });
    }
  } catch (err) {
    console.error("Swipe error", err);
  }
  setCurrentIndex((prev) => Math.min(prev + 1, matches.length - 1));
};

  const currentUser = matches[currentIndex];

  return (
    <main className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-pink-600/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
        <h1 className="mb-6 text-4xl font-bold text-center">
          CampusConnect Dating
        </h1>
        {isVerified ? (
          <VerifiedBadge />
        ) : (
          <button
            onClick={() => verify()}
            className="px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Verify Email
          </button>
        )}
        <div className="w-full max-w-sm h-[600px] relative">
          <AnimatePresence>
            {currentUser && (
              <motion.div
                key={currentUser.username}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MatchCard
                  user={currentUser}
                  onSwipeLeft={() => handleSwipe("left")}
                  onSwipeRight={() => handleSwipe("right")}
                  isMutual={currentUser.verified}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {matches.length === 0 && (
          <p className="mt-8 text-center text-slate-400">
            No matches available. Try adjusting your preferences.
          </p>
        )}
      </div>
    </main>
  );
};

export default DatingPage;
