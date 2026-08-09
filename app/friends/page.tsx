"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_URL from "../../services/api";
import { socket } from "../../services/socket";

interface Friend {
  _id: string;

  fullName?: string;
  username?: string;

  department?: string;
  year?: string;

  profileImage?: string;

  bio?: string;
  age?: number;
  gender?: string;
  location?: string;

  interests?: string[];

  purpose?: string;

  // Match information
  matchId?: string;

  // Friendship information
  friendshipId?: string;
  friendsSince?: string;
}

export default function FriendsPage() {
  const router = useRouter();

  const [friends, setFriends] =
    useState<Friend[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [onlineUserIds, setOnlineUserIds] =
    useState<Set<string>>(new Set());

  // =====================================================
  // LOAD FRIENDS
  // =====================================================

  useEffect(() => {
    const loadFriends = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/friends`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "FRIENDS RESPONSE:",
          res.data
        );

        if (Array.isArray(res.data)) {
          setFriends(res.data);

          // Check online status for each friend
          socket.connect();
          res.data.forEach((f: Friend) => {
            if (f._id) {
              socket.emit("checkUserStatus", f._id);
            }
          });
        } else {
          setFriends([]);
        }
      } catch (err: any) {
        console.error(
          "GET FRIENDS ERROR:",
          err
        );

        if (
          err.response?.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          router.push("/login");

          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your friends."
        );
      } finally {
        setLoading(false);
      }
    };

    const handleUserOnline = (id: string) => {
      setOnlineUserIds((prev) => new Set(prev).add(String(id)));
    };

    const handleUserOffline = (id: string) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        next.delete(String(id));
        return next;
      });
    };

    const handleUserStatusResult = (data: { userId: string; isOnline: boolean }) => {
      if (data.isOnline) {
        setOnlineUserIds((prev) => new Set(prev).add(String(data.userId)));
      } else {
        setOnlineUserIds((prev) => {
          const next = new Set(prev);
          next.delete(String(data.userId));
          return next;
        });
      }
    };

    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);
    socket.on("userStatusResult", handleUserStatusResult);

    loadFriends();

    return () => {
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
      socket.off("userStatusResult", handleUserStatusResult);
    };
  }, [router]);

  // =====================================================
  // PURPOSE ICON
  // =====================================================

  const getPurposeIcon = (
    purpose?: string
  ) => {
    switch (purpose) {
      case "Dating":
        return "💕";

      case "Friendship":
        return "❤️";

      case "Study Buddy":
        return "📚";

      case "Coffee Chat":
        return "☕";

      default:
        return "🤝";
    }
  };

  // =====================================================
  // OPEN CHAT
  // =====================================================

  const startChat = (
    friend: Friend
  ) => {
    console.log(
      "STARTING CHAT WITH:",
      friend
    );

    // Make sure we actually have a Match
    if (!friend.matchId) {
      alert(
        "The previous conversation could not be found."
      );

      return;
    }

    // Save match information
    localStorage.setItem(
      "matchId",
      friend.matchId
    );

    // Save partner information
    localStorage.setItem(
      "partner",
      JSON.stringify(friend)
    );

    // Save purpose
    localStorage.setItem(
      "matchPurpose",
      friend.purpose ||
        "Friendship"
    );

    // Open chat
    router.push("/chat");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040714] text-white">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-700/15 blur-[140px]" />

        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-700/15 blur-[150px]" />

        <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-pink-600/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_45%)]" />

      </div>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
              🎓
            </div>

            <div>

              <h1 className="text-lg font-bold">
                Campus
                <span className="text-purple-400">
                  Connect
                </span>
              </h1>

              <p className="text-[10px] text-slate-500">
                Connecting Campus
              </p>

            </div>

          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-14">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-10">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>

              <p className="text-sm font-semibold tracking-wider text-purple-300">
                YOUR CONNECTIONS
              </p>

              <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">

                Friends

                <span className="ml-2 bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  & Connections
                </span>

              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                People you've connected with
                after getting to know each other.
              </p>

            </div>

            {!loading && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-center">

                <p className="text-2xl font-bold">
                  {friends.length}
                </p>

                <p className="text-xs text-slate-500">
                  Connection
                  {friends.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>
            )}

          </div>

        </section>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-white/10 bg-white/[0.05] p-6"
                >

                  <div className="flex gap-5">

                    <div className="h-24 w-24 rounded-3xl bg-white/10" />

                    <div className="flex-1">

                      <div className="h-5 w-32 rounded bg-white/10" />

                      <div className="mt-3 h-3 w-48 rounded bg-white/10" />

                      <div className="mt-3 h-3 w-24 rounded bg-white/10" />

                    </div>

                  </div>

                  <div className="mt-6 h-10 rounded-xl bg-white/10" />

                </div>
              )
            )}

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center">

            <div className="text-5xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold">
              Couldn't load your friends
            </h2>

            <p className="mt-2 text-sm text-red-200/70">
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-red-500/20 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
            >
              Try Again
            </button>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading &&
          !error &&
          friends.length === 0 && (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-10 text-center backdrop-blur-xl">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-6xl">
                🤝
              </div>

              <h2 className="mt-7 text-3xl font-bold">
                No connections yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Your connections will appear
                here after you and another
                student both reveal your
                identities.
              </p>

              <Link
                href="/match"
                className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-7 py-3.5 font-semibold shadow-xl transition hover:-translate-y-1"
              >
                ✨ Find a Connection
              </Link>

            </div>
          )}

        {/* =================================================
            FRIEND CARDS
        ================================================= */}

        {!loading &&
          !error &&
          friends.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">

              {friends.map(
                (friend) => (
                  <div
                    key={
                      friend.friendshipId ||
                      friend._id
                    }
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                  >

                    {/* Glow */}

                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

                    {/* =================================================
                        PROFILE HEADER
                    ================================================= */}

                    <div className="relative flex gap-5">

                      {/* Avatar */}

                      <div className="relative shrink-0">
                        {friend.profileImage ? (
                          <img
                            src={
                              friend.profileImage
                            }
                            alt={
                              friend.fullName ||
                              friend.username ||
                              "Friend"
                            }
                            className="h-24 w-24 rounded-3xl border-2 border-white/10 object-cover shadow-xl"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-5xl shadow-xl">
                            👤
                          </div>
                        )}

                        {onlineUserIds.has(String(friend._id)) && (
                          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#040714] bg-green-500 shadow-sm" title="Online" />
                        )}
                      </div>

                      {/* User information */}

                      <div className="min-w-0 flex-1">

                        <h2 className="truncate text-xl font-bold">
                          {friend.fullName ||
                            friend.username ||
                            "Campus User"}
                        </h2>

                        {friend.username && (
                          <p className="mt-1 text-sm text-purple-300">
                            @{friend.username}
                          </p>
                        )}

                        <div className="mt-3 space-y-1">

                          {friend.department && (
                            <p className="text-xs text-slate-500">
                              🎓{" "}
                              {
                                friend.department
                              }

                              {friend.year
                                ? ` · ${friend.year}`
                                : ""}
                            </p>
                          )}

                          {friend.location && (
                            <p className="text-xs text-slate-500">
                              📍{" "}
                              {
                                friend.location
                              }
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* =================================================
                        BIO
                    ================================================= */}

                    {friend.bio && (
                      <p className="relative mt-6 line-clamp-2 text-sm leading-6 text-slate-400">
                        "{friend.bio}"
                      </p>
                    )}

                    {/* =================================================
                        PURPOSE + AGE
                    ================================================= */}

                    <div className="relative mt-5 flex flex-wrap gap-2">

                      {friend.purpose && (
                        <span className="rounded-full border border-purple-400/10 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                          {getPurposeIcon(
                            friend.purpose
                          )}{" "}
                          {friend.purpose}
                        </span>
                      )}

                      {friend.age && (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400">
                          🎂 {friend.age}
                        </span>
                      )}

                    </div>

                    {/* =================================================
                        INTERESTS
                    ================================================= */}

                    {friend.interests &&
                      friend.interests.length >
                        0 && (
                        <div className="relative mt-4 flex flex-wrap gap-2">

                          {friend.interests
                            .slice(0, 4)
                            .map(
                              (
                                interest,
                                index
                              ) => (
                                <span
                                  key={`${interest}-${index}`}
                                  className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-slate-500"
                                >
                                  #{interest}
                                </span>
                              )
                            )}

                        </div>
                      )}

                    {/* =================================================
                        FRIEND SINCE
                    ================================================= */}

                    {friend.friendsSince && (
                      <p className="relative mt-4 text-xs text-slate-600">
                        Connected{" "}
                        {new Date(
                          friend.friendsSince
                        ).toLocaleDateString(
                          [],
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}

                    {/* =================================================
                        CHAT BUTTON
                    ================================================= */}

                    <div className="relative mt-6 border-t border-white/10 pt-5">

                      {friend.matchId ? (
                        <button
                          type="button"
                          onClick={() =>
                            startChat(
                              friend
                            )
                          }
                          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-purple-500/20"
                        >
                          💬 Chat with{" "}
                          {friend.fullName ||
                            friend.username ||
                            "Friend"}
                        </button>
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-center text-sm text-slate-600">
                          Previous chat unavailable
                        </div>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="relative z-10 py-8 text-center text-xs text-white/20">
        CampusConnect · Connecting Campus.
        Creating Connections.
      </footer>

    </main>
  );
}