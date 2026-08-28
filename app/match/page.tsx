"use client";

import API_URL from "../../services/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { socket } from "../../services/socket";

type Preference =
  | "Male"
  | "Female"
  | "Everyone";

export default function MatchPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [cancelling, setCancelling] =
    useState(false);

  const [
    interestedIn,
    setInterestedIn,
  ] = useState<Preference | null>(
    null
  );

  // ==================================================
  // CHECK LOGIN
  // ==================================================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      router.push("/login");
    }
  }, [router]);

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

    const handleMatchFound = (
      data: any
    ) => {
      console.log(
        "Match Found!",
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

      localStorage.setItem(
        "matchPurpose",
        "Anonymous Chat"
      );

      setMessage(
        "Connection found!"
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
  // START ANONYMOUS CHAT
  // ==================================================

  const findMatch = async () => {
    if (loading) return;

    // ================================================
    // CHECK PREFERENCE
    // ================================================

    if (!interestedIn) {
      setMessage(
        "Please choose who you would like to connect with."
      );

      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setMessage(
          "Please login again."
        );

        router.push("/login");

        return;
      }

      // ================================================
      // JOIN QUEUE WITH PREFERENCE
      // ================================================

      const res = await axios.post(
        `${API_URL}/api/match/join`,
        {
          interestedIn:
            interestedIn,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // ================================================
      // MATCH FOUND IMMEDIATELY
      // ================================================

      if (res.data.matched) {
        console.log(
          "Immediate match!",
          res.data
        );

        localStorage.setItem(
          "matchId",
          String(
            res.data.matchId
          )
        );

        localStorage.setItem(
          "partner",
          JSON.stringify(
            res.data.partner || {}
          )
        );

        localStorage.setItem(
          "matchPurpose",
          "Anonymous Chat"
        );

        setMessage(
          "Connection found!"
        );

        router.push("/chat");

        return;
      }

      // ================================================
      // WAITING FOR PARTNER
      // ================================================

      setMessage(
        "Looking for a compatible student..."
      );
    } catch (err: any) {
      console.error(err);

      setMessage(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
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
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Search cancelled."
      );
    } catch (err: any) {
      console.error(err);

      setMessage(
        err?.response?.data?.message ||
          "Unable to cancel search."
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==================================================
  // SEARCH STATUS
  // ==================================================

  const isSearching =
    message.includes(
      "Looking for a compatible"
    );

  // ==================================================
  // PREFERENCE OPTIONS
  // ==================================================

  const preferenceOptions: {
    value: Preference;
    label: string;
    icon: string;
    description: string;
  }[] = [
    {
      value: "Male",
      label: "Male",
      icon: "👨",
      description:
        "Connect with a male student",
    },
    {
      value: "Female",
      label: "Female",
      icon: "👩",
      description:
        "Connect with a female student",
    },
    {
      value: "Everyone",
      label: "Everyone",
      icon: "🌍",
      description:
        "Connect with any student",
    },
  ];

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <main className="min-h-screen bg-[#090611] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ========================================== */}
        {/* HEADER */}
        {/* ========================================== */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl shadow-[0_0_60px_rgba(168,85,247,0.35)]">
            💬
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-purple-300">
            CampusConnect
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Anonymous Chat
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Connect with another student from your
            campus and start a conversation anonymously.
            No profiles. No pressure. Just talk.
          </p>

        </div>

        {/* ========================================== */}
        {/* ANONYMOUS CHAT CARD */}
        {/* ========================================== */}

        <div className="mx-auto mt-12 max-w-2xl">

          <div className="rounded-3xl border border-purple-400/30 bg-purple-500/10 p-6 shadow-lg shadow-purple-900/20 sm:p-8">

            <div className="text-center">

              <div className="text-6xl">
                💬
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Start an Anonymous Chat
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                Choose who you would like to connect
                with. Your identity will remain private
                until both of you decide to reveal it.
              </p>

            </div>

            {/* ====================================== */}
            {/* PREFERENCE SELECTION */}
            {/* ====================================== */}

            {!isSearching && (

              <div className="mt-8">

                <div className="text-center">

                  <p className="text-sm font-semibold text-white">
                    Who would you like to connect with?
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Your preference is used only for
                    finding a compatible connection.
                  </p>

                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">

                  {preferenceOptions.map(
                    (option) => {
                      const selected =
                        interestedIn ===
                        option.value;

                      return (

                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setInterestedIn(
                              option.value
                            );

                            setMessage("");
                          }}
                          className={`relative rounded-2xl border p-4 text-center transition-all ${
                            selected
                              ? "border-purple-400 bg-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                              : "border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:bg-purple-500/10"
                          }`}
                        >

                          {selected && (

                            <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px]">
                              ✓
                            </div>

                          )}

                          <div className="text-3xl">
                            {option.icon}
                          </div>

                          <p className="mt-3 text-sm font-bold">
                            {option.label}
                          </p>

                          <p className="mt-1 text-[11px] leading-4 text-slate-500">
                            {
                              option.description
                            }
                          </p>

                        </button>

                      );
                    }
                  )}

                </div>

              </div>

            )}

            {/* ====================================== */}
            {/* SEARCHING STATE */}
            {/* ====================================== */}

            {isSearching && (

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5 text-center">

                <div className="text-3xl">
                  🔎
                </div>

                <p className="mt-3 text-sm font-semibold text-blue-300">
                  Looking for your connection...
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Searching for a compatible student
                  based on both preferences.
                </p>

              </div>

            )}

            {/* ====================================== */}
            {/* BUTTON */}
            {/* ====================================== */}

            <div className="mt-8">

              {!isSearching ? (

                <button
                  type="button"
                  onClick={findMatch}
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(168,85,247,0.3)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Finding someone..."
                    : interestedIn
                    ? `Start Chat with ${
                        interestedIn ===
                        "Everyone"
                          ? "Anyone"
                          : interestedIn
                      }`
                    : "Choose a Preference"}
                </button>

              ) : (

                <button
                  type="button"
                  onClick={cancelSearch}
                  disabled={cancelling}
                  className="w-full rounded-2xl border border-red-400/20 bg-red-500/10 px-6 py-4 text-base font-bold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {cancelling
                    ? "Cancelling..."
                    : "Cancel Search"}
                </button>

              )}

            </div>

          </div>

          {/* ========================================== */}
          {/* STATUS MESSAGE */}
          {/* ========================================== */}

          {message && (

            <div
              className={`mx-auto mt-5 max-w-xl rounded-2xl border p-4 text-center ${
                message.includes(
                  "Looking for"
                )
                  ? "border-blue-400/20 bg-blue-500/10 text-blue-300"
                  : message.includes(
                      "cancelled"
                    )
                  ? "border-yellow-400/20 bg-yellow-500/10 text-yellow-300"
                  : message.includes(
                      "Connection found"
                    )
                  ? "border-green-400/20 bg-green-500/10 text-green-300"
                  : "border-red-400/20 bg-red-500/10 text-red-300"
              }`}
            >

              <p className="text-sm font-medium">
                {message}
              </p>

            </div>

          )}

        </div>

        {/* ========================================== */}
        {/* INFO CARDS */}
        {/* ========================================== */}

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              🔒
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Stay Anonymous
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your identity stays private while you
              get to know the other person.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              🤝
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Your Preference
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Choose Male, Female, or Everyone to find
              a compatible student.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center">

            <div className="text-2xl">
              💬
            </div>

            <h3 className="mt-3 text-sm font-semibold">
              Just Start Talking
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Once connected, start chatting anonymously
              and reveal your identity only if you both
              want to.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}