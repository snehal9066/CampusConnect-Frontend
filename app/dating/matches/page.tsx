"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_URL from "@/services/api";

interface DatingMatch {
  interactionId: string;
  matchId: string | null;
  userId: string;
  fullName: string;
  username: string;
  department: string;
  year: string | number;
  profileImage: string;
  matchedAt: string;
}

export default function DatingMatchesPage() {
  const router = useRouter();

  const [matches, setMatches] = useState<DatingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // ==========================================
  // LOAD MUTUAL DATING MATCHES
  // ==========================================

  const loadMatches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/dating/matches`,
        getHeaders()
      );

      setMatches(response.data.matches || []);
    } catch (err: any) {
      console.error(
        "Failed to load dating matches",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load your matches"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // ==========================================
  // OPEN CHAT
  // ==========================================

  const openChat = (match: DatingMatch) => {
    if (!match.matchId) {
      alert(
        "Chat is still being created. Please refresh and try again."
      );
      return;
    }

    // Uses your existing chat route
    router.push(`/messages/${match.matchId}`);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-pink-400 animate-spin" />

          <p className="text-slate-400">
            Finding your matches...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-white/5 p-8 text-center">
          <h1 className="text-2xl font-bold">
            Couldn't load matches
          </h1>

          <p className="mt-3 text-slate-400">
            {error}
          </p>

          <button
            onClick={loadMatches}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold"
          >
            <RefreshCw className="w-4 h-4" />

            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070711] text-white">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),transparent_40%)]" />

      {/* HEADER */}

      <header className="relative z-10 flex items-center justify-between px-5 md:px-10 py-5 border-b border-white/5 bg-[#0b0b16]/80 backdrop-blur-xl">

        <div className="flex items-center gap-4">

          <button
            onClick={() => router.push("/dating")}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-white" />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Your Matches
              </h1>

              <p className="text-xs text-pink-300">
                CampusConnect Dating
              </p>
            </div>

          </div>

        </div>

        <button
          onClick={loadMatches}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
        >
          <RefreshCw className="w-5 h-5 text-slate-300" />
        </button>

      </header>

      {/* CONTENT */}

      <div className="relative z-10 max-w-5xl mx-auto px-5 py-10">

        {matches.length > 0 ? (

          <>
            <div className="mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
                <Sparkles className="w-4 h-4 text-pink-400" />

                <span className="text-sm text-pink-200">
                  {matches.length}{" "}
                  {matches.length === 1
                    ? "mutual match"
                    : "mutual matches"}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                People who liked you back 💘
              </h2>

              <p className="mt-2 text-slate-400">
                Start a conversation and see where it goes.
              </p>

            </div>

            {/* MATCH GRID */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {matches.map((match) => (

                <div
                  key={match.interactionId}
                  className="group overflow-hidden rounded-[28px] bg-white/[0.04] border border-white/10 hover:border-pink-500/30 transition-all duration-300"
                >

                  {/* IMAGE */}

                  <div className="relative h-64 bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-indigo-500/30">

                    {match.profileImage ? (
                      <img
                        src={match.profileImage}
                        alt={match.fullName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-7xl font-bold text-white/30">
                          {match.fullName?.charAt(0) ||
                            match.username?.charAt(0) ||
                            "?"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#11111d] via-transparent to-transparent" />

                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-pink-500/20 backdrop-blur-xl border border-pink-400/20 text-xs text-pink-100">
                      💘 Matched
                    </div>

                  </div>

                  {/* DETAILS */}

                  <div className="p-5">

                    <h3 className="text-xl font-bold">
                      {match.fullName || match.username}
                    </h3>

                    {match.username && (
                      <p className="mt-1 text-sm text-pink-300">
                        @{match.username}
                      </p>
                    )}

                    <div className="mt-4 space-y-1 text-sm text-slate-400">

                      {match.department && (
                        <p>
                          {match.department}
                        </p>
                      )}

                      {match.year && (
                        <p>
                          Year {match.year}
                        </p>
                      )}

                    </div>

                    {/* CHAT BUTTON */}

                    <button
                      onClick={() => openChat(match)}
                      className="mt-5 w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                      <MessageCircle className="w-5 h-5" />

                      Start Talking
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        ) : (

          /* EMPTY STATE */

          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">

            <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-pink-400" />
            </div>

            <h2 className="text-3xl font-bold">
              No matches yet
            </h2>

            <p className="mt-3 max-w-md text-slate-400">
              Keep discovering people. When someone you like
              likes you back, they will appear here.
            </p>

            <button
              onClick={() => router.push("/dating")}
              className="mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold"
            >
              Discover People
            </button>

          </div>

        )}

      </div>

    </main>
  );
}