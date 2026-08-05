"use client";

import Link from "next/link";

export default function Dashboard() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const cards = [
    {
      title: "Find Match",
      icon: "❤️",
      href: "/match",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Chats",
      icon: "💬",
      href: "/chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Profile",
      icon: "👤",
      href: "/profile",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Settings",
      icon: "⚙️",
      href: "/settings",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Welcome */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-slate-300 text-lg">
            Hello, <span className="font-semibold">
              {user.fullName || "Student"}
            </span>

            <br />

            Ready to make a new campus connection today?
          </p>

        </div>

        {/* Quick Actions */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {cards.map((card) => (

            <Link
              key={card.title}
              href={card.href}
              className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-8 hover:-translate-y-2 transition duration-300 hover:shadow-2xl"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-3xl`}
              >
                {card.icon}
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                {card.title}
              </h2>

              <p className="mt-2 text-slate-400">
                Open {card.title}
              </p>

            </Link>

          ))}

        </div>

        {/* Stats */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">
            📊 Quick Stats
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white/10 p-8">
              <h3 className="text-5xl font-bold">
                ❤️ 0
              </h3>

              <p className="mt-3 text-slate-400">
                Matches
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-8">
              <h3 className="text-5xl font-bold">
                💬 0
              </h3>

              <p className="mt-3 text-slate-400">
                Chats
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-8">
              <h3 className="text-5xl font-bold">
                🤝 0
              </h3>

              <p className="mt-3 text-slate-400">
                Friends
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}