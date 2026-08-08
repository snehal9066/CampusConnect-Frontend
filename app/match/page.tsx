"use client";

import API_URL from "../../services/api";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { socket } from "../../services/socket";

const connectionTypes = [
  {
    id: "Dating",
    title: "Dating",
    icon: "💕",
    description: "Meet someone special",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "Friendship",
    title: "Friendship",
    icon: "❤️",
    description: "Make a genuine friend",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "Coffee Chat",
    title: "Coffee Chat",
    icon: "☕",
    description: "Have a casual conversation",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "Study Buddy",
    title: "Study Buddy",
    icon: "📚",
    description: "Find someone to study with",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function MatchPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] =
    useState("Friendship");
  const [cancelling, setCancelling] =
    useState(false);

  // ==================================================
  // SOCKET CONNECTION
  // ==================================================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) return;

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      return;
    }

    if (!user?._id) return;

    socket.connect();

    socket.emit(
      "registerUser",
      user._id
    );

    const handleMatchFound = (data: any) => {
      console.log(
        "🎉 Match Found!",
        data
      );

      localStorage.setItem(
        "matchId",
        String(data.matchId)
      );

      localStorage.setItem(
        "partner",
        JSON.stringify(
          data.partner || {}
        )
      );

      // Purpose comes from the partner/match data
      if (data.partner?.purpose) {
        localStorage.setItem(
          "matchPurpose",
          data.partner.purpose
        );
      }

      setMessage(
        "🎉 Connection found!"
      );

      router.push("/chat");
    };

    socket.on(
      "matchFound",
      handleMatchFound
    );

    return () => {
      socket.off(
        "matchFound",
        handleMatchFound
      );
    };
  }, [router]);

  // ==================================================
  // FIND MATCH
  // ==================================================

  const findMatch = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setMessage("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setMessage(
          "Please login again."
        );

        setLoading(false);

        router.push("/login");

        return;
      }

      // Save selected purpose
      localStorage.setItem(
        "matchPurpose",
        selectedType
      );

      console.log(
        "🔎 Searching for:",
        selectedType
      );

      const res = await axios.post(
        `${API_URL}/api/match/join`,
        {
          purpose: selectedType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ==================================================
      // MATCH FOUND IMMEDIATELY
      // ==================================================

      if (res.data.matched) {
        console.log(
          "🎉 Immediate match!",
          res.data
        );

        setMessage(
          "🎉 Connection found!"
        );

        localStorage.setItem(
          "matchId",
          String(res.data.matchId)
        );

        localStorage.setItem(
          "partner",
          JSON.stringify(
            res.data.partner || {}
          )
        );

        localStorage.setItem(
          "matchPurpose",
          selectedType
        );

        router.push("/chat");

        return;
      }

      // ==================================================
      // WAITING FOR PARTNER
      // ==================================================

      setMessage(
        `⏳ Looking for someone interested in ${selectedType}...`
      );
    } catch (err: any) {
      console.error(
        "❌ MATCH ERROR:",
        err
      );

      if (axios.isAxiosError(err)) {
        console.error(
          "STATUS:",
          err.response?.status
        );

        console.error(
          "DATA:",
          err.response?.data
        );

        setMessage(
          err.response?.data?.message ||
            "Unable to find a connection."
        );
      } else {
        setMessage(
          "Something went wrong."
        );
      }

      setLoading(false);
    }
  };

  // ==================================================
  // CANCEL SEARCH
  // ==================================================

  const cancelSearch = async () => {
    if (cancelling) return;

    try {
      setCancelling(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      await axios.delete(
        `${API_URL}/api/match/cancel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "🛑 Match search cancelled"
      );

      setLoading(false);

      setMessage(
        "Search cancelled. You can try again whenever you're ready."
      );
    } catch (err: any) {
      console.error(
        "❌ CANCEL SEARCH ERROR:",
        err
      );

      if (axios.isAxiosError(err)) {
        setMessage(
          err.response?.data?.message ||
            "Unable to cancel search."
        );
      } else {
        setMessage(
          "Unable to cancel search."
        );
      }
    } finally {
      setCancelling(false);
    }
  };

  // ==================================================
  // SELECTED CONNECTION
  // ==================================================

  const selectedConnection =
    connectionTypes.find(
      (type) =>
        type.id === selectedType
    );

  // ==================================================
  // UI
  // ==================================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ============================================
          BACKGROUND
      ============================================ */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[160px]" />

        <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-pink-600/10 blur-[150px]" />

      </div>

      {/* ============================================
          MAIN
      ============================================ */}

      <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.07] text-5xl shadow-2xl">
            🎓
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your
            <span className="ml-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Campus Connection
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Meet someone from your campus,
            start a conversation, and discover
            a connection that feels natural.
          </p>

        </div>

        {/* ============================================
            CONNECTION TYPES
        ============================================ */}

        <div className="mx-auto mt-12 max-w-5xl">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold">
                What kind of connection?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose what you're looking for
                today.
              </p>
            </div>

            <div className="hidden text-sm text-slate-600 sm:block">
              Step 1 of 2
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {connectionTypes.map(
              (type) => {

                const selected =
                  selectedType === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      setSelectedType(
                        type.id
                      )
                    }
                    className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition duration-300 ${
                      selected
                        ? "border-purple-400/50 bg-purple-500/10 shadow-[0_0_30px_rgba(139,92,246,0.12)]"
                        : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                    } ${
                      loading
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >

                    {/* Glow */}

                    {selected && (
                      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-purple-500/20 blur-2xl" />
                    )}

                    {/* Icon */}

                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color} text-2xl shadow-lg transition duration-300 group-hover:scale-105`}
                    >
                      {type.icon}
                    </div>

                    {/* Text */}

                    <h3 className="relative mt-5 font-bold">
                      {type.title}
                    </h3>

                    <p className="relative mt-1 text-xs leading-5 text-slate-500">
                      {type.description}
                    </p>

                    {/* Selected */}

                    {selected && (
                      <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs">
                        ✓
                      </div>
                    )}

                  </button>
                );
              }
            )}

          </div>

        </div>

        {/* ============================================
            SELECTED CONNECTION
        ============================================ */}

        <div className="mx-auto mt-8 max-w-5xl">

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-6">

            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedConnection?.color} text-2xl shadow-lg`}
                >
                  {selectedConnection?.icon}
                </div>

                <div>

                  <p className="text-xs uppercase tracking-wider text-slate-600">
                    Selected
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {selectedConnection?.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {selectedConnection?.description}
                  </p>

                </div>

              </div>

              <div className="max-w-sm text-center sm:text-right">

                <p className="text-xs leading-5 text-slate-600">
                  Your connection will be matched
                  based on your purpose and
                  compatibility preferences.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ============================================
            SEARCH
        ============================================ */}

        <div className="mx-auto mt-10 max-w-3xl">

          {loading ? (

            <div className="rounded-3xl border border-purple-400/20 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-xl">

              {/* Animated Icon */}

              <div className="relative mx-auto h-24 w-24">

                <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />

                <div className="absolute inset-2 animate-pulse rounded-full bg-blue-500/10" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-purple-400/20 bg-purple-500/10 text-5xl">
                  🎭
                </div>

              </div>

              <h2 className="mt-7 text-2xl font-bold">
                Finding your connection...
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                We're looking for a student
                interested in{" "}
                <span className="font-semibold text-purple-300">
                  {selectedType}
                </span>
                .
              </p>

              {/* Animated dots */}

              <div className="mt-6 flex justify-center gap-2">

                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />

                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />

                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:300ms]" />

              </div>

              {/* Progress */}

              <div className="mx-auto mt-7 max-w-sm">

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                </div>

              </div>

              {/* Cancel */}

              <button
                type="button"
                onClick={cancelSearch}
                disabled={cancelling}
                className="mt-8 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-medium text-slate-400 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling
                  ? "Cancelling..."
                  : "✕ Cancel Search"}
              </button>

            </div>

          ) : (

            <div className="text-center">

              <button
                type="button"
                onClick={findMatch}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-10 py-4 text-lg font-bold shadow-2xl shadow-purple-900/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >

                <span className="relative z-10">
                  ✨ Find My Connection
                </span>

                <div className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />

              </button>

              <p className="mt-4 text-xs text-slate-600">
                🔒 Your identity stays private
                during anonymous chat.
              </p>

            </div>

          )}

        </div>

        {/* ============================================
            STATUS MESSAGE
        ============================================ */}

        {message && (
          <div className="mx-auto mt-8 max-w-2xl">

            <div
              className={`rounded-2xl border p-5 text-center ${
                message.includes("🎉")
                  ? "border-green-400/20 bg-green-500/10 text-green-300"
                  : message.includes("⏳")
                  ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
                  : message.includes("cancelled")
                  ? "border-yellow-400/20 bg-yellow-500/10 text-yellow-300"
                  : "border-red-400/20 bg-red-500/10 text-red-300"
              }`}
            >
              <p className="text-sm font-medium">
                {message}
              </p>
            </div>

          </div>
        )}

        {/* ============================================
            INFO CARDS
        ============================================ */}

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              🔒
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Anonymous First
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              Chat privately before deciding
              whether to reveal yourself.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              🎯
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Purpose Based
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              Find people looking for the same
              type of connection.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              💬
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Start Talking
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              No awkward profiles. Just start
              with a conversation.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}