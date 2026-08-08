"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../services/api";

const cards = [
  {
    title: "Find Match",
    description:
      "Discover students looking for the same kind of connection.",
    icon: "💜",
    href: "/match",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    title: "Chats",
    description:
      "Continue your conversations and connect with your matches.",
    icon: "💬",
    href: "/chat",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Profile",
    description:
      "Manage your campus identity and connection preferences.",
    icon: "👤",
    href: "/profile",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Settings",
    description:
      "Manage your account, privacy and preferences.",
    icon: "⚙️",
    href: "/settings",
    gradient: "from-emerald-500 to-green-600",
  },
];

interface User {
  _id?: string;
  fullName?: string;
  username?: string;
  department?: string;
  year?: string;
  profileImage?: string;
}

interface DashboardData {
  matches: number;
  chats: number;
  friends: number;
}

const defaultStats = [
  {
    value: 0,
    label: "Matches",
    icon: "💜",
  },
  {
    value: 0,
    label: "Chats",
    icon: "💬",
  },
  {
    value: 0,
    label: "Friends",
    icon: "🤝",
  },
];

export default function Dashboard() {
  const [user, setUser] =
    useState<User>({});

  const [dashboard, setDashboard] =
    useState<DashboardData>({
      matches: 0,
      chats: 0,
      friends: 0,
    });

  const [loadingStats, setLoadingStats] =
    useState(true);

  // ==========================================
  // LOAD USER + DASHBOARD
  // ==========================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // --------------------------------------
        // Load local user
        // --------------------------------------

        const storedUser =
          localStorage.getItem("user");

        if (storedUser) {
          try {
            setUser(
              JSON.parse(storedUser)
            );
          } catch {
            setUser({});
          }
        }

        // --------------------------------------
        // Get token
        // --------------------------------------

        const token =
          localStorage.getItem("token");

        if (!token) {
          setLoadingStats(false);
          return;
        }

        // --------------------------------------
        // Get dashboard data
        // --------------------------------------

        const res = await axios.get(
          `${API_URL}/api/dashboard`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setDashboard({
          matches:
            Number(res.data.matches) || 0,

          chats:
            Number(res.data.chats) || 0,

          friends:
            Number(res.data.friends) || 0,
        });

      } catch (error) {
        console.error(
          "DASHBOARD LOAD ERROR:",
          error
        );
      } finally {
        setLoadingStats(false);
      }
    };

    loadDashboard();
  }, []);

  // ==========================================
  // LIVE STATS
  // ==========================================

  const stats = [
    {
      ...defaultStats[0],
      value: dashboard.matches,
    },
    {
      ...defaultStats[1],
      value: dashboard.chats,
    },
    {
      ...defaultStats[2],
      value: dashboard.friends,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]"
        />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[150px]" />

      </div>

      {/* ========================================= */}
      {/* NAVIGATION */}
      {/* ========================================= */}

      <nav className="relative z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          {/* Logo */}

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg shadow-purple-900/30">
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

          {/* Navigation */}

          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              href="/match"
              className="hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold transition hover:scale-105 sm:block"
            >
              Find Connection
            </Link>

            <Link
              href="/profile"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Profile
            </Link>

          </div>

        </div>

      </nav>

      {/* ========================================= */}
      {/* MAIN */}
      {/* ========================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-14">

        {/* ========================================= */}
        {/* WELCOME */}
        {/* ========================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-10"
        >

          <p className="mb-2 text-sm font-semibold tracking-wider text-purple-300">
            YOUR CAMPUS HUB
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">

            Welcome back,{" "}

            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {user.fullName ||
                "Student"}
            </span>

            {" "}👋

          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Your campus is full of people you
            haven't met yet. Find someone,
            start a conversation, and see where
            the connection goes.
          </p>

        </motion.section>

        {/* ========================================= */}
        {/* MAIN CONNECTION CTA */}
        {/* ========================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.7,
          }}
          className="relative mb-12 overflow-hidden rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-blue-600/10 p-7 shadow-2xl sm:p-10"
        >

          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[80px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/15 blur-[80px]" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-4 flex items-center gap-2">

                <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                  ✨ READY TO CONNECT?
                </span>

              </div>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Someone out there is
                waiting to meet you.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Choose what kind of connection
                you're looking for and we'll find
                a compatible student for you.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                  💕 Dating
                </span>

                <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                  ❤️ Friendship
                </span>

                <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                  ☕ Coffee Chat
                </span>

                <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300">
                  📚 Study Buddy
                </span>

              </div>

            </div>

            <Link
              href="/match"
              className="group flex shrink-0 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold shadow-xl shadow-purple-900/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            >

              <span>
                Find My Connection
              </span>

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </motion.section>

        {/* ========================================= */}
        {/* QUICK ACTIONS */}
        {/* ========================================= */}

        <section>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.25,
            }}
          >

            <h2 className="text-2xl font-bold">
              Explore CampusConnect
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Everything you need to connect
              with your campus.
            </p>

          </motion.div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {cards.map(
              (card, index) => (

                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.3 +
                      index * 0.1,
                    duration: 0.6,
                  }}
                >

                  <Link
                    href={card.href}
                    className="group block h-full"
                  >

                    <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-2xl">

                      <div
                        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl transition group-hover:opacity-25`}
                      />

                      <div
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-2xl shadow-lg transition duration-300 group-hover:scale-105`}
                      >
                        {card.icon}
                      </div>

                      <h3 className="relative mt-6 text-xl font-bold">
                        {card.title}
                      </h3>

                      <p className="relative mt-2 text-sm leading-6 text-slate-400">
                        {card.description}
                      </p>

                      <div className="relative mt-5 text-sm font-semibold text-purple-300 transition group-hover:text-purple-200">
                        Open →
                      </div>

                    </div>

                  </Link>

                </motion.div>

              )
            )}

          </div>

        </section>

        {/* ========================================= */}
        {/* CONNECTION STATS */}
        {/* ========================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.75,
            duration: 0.7,
          }}
          className="mt-14"
        >

          <div>

            <h2 className="text-2xl font-bold">
              Your Connections
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your CampusConnect activity
              at a glance.
            </p>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            {stats.map(
              (stat) => (

                <motion.div
                  key={stat.label}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-4xl font-extrabold">

                        {loadingStats ? (
                          <span className="inline-block h-10 w-10 animate-pulse rounded-lg bg-white/10" />
                        ) : (
                          stat.value
                        )}

                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {stat.label}
                      </p>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-2xl">
                      {stat.icon}
                    </div>

                  </div>

                </motion.div>

              )
            )}

          </div>

        </motion.section>

        {/* ========================================= */}
        {/* HOW IT WORKS */}
        {/* ========================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.9,
            duration: 0.7,
          }}
          className="mt-14"
        >

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              How CampusConnect Works
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Meeting someone new is just three
              steps away.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-xl">
                01
              </div>

              <h3 className="mt-5 font-bold">
                Choose your connection
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Decide whether you're looking
                for friendship, study partners,
                coffee chats, dating, or simply
                someone new to meet.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-xl">
                02
              </div>

              <h3 className="mt-5 font-bold">
                Find your match
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                CampusConnect finds a compatible
                student who is looking for the
                same kind of connection.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-xl">
                03
              </div>

              <h3 className="mt-5 font-bold">
                Start talking
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start with an anonymous chat.
                Get comfortable first, then
                reveal your identity when you're
                both ready.
              </p>

            </div>

          </div>

        </motion.section>

      </div>

      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-slate-600">
        CampusConnect · Connecting Campus.
        Creating Connections.
      </footer>

    </main>
  );
}