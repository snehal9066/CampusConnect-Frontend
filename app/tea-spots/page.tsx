"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Coffee,
  MapPin,
  Sparkles,
  Flame,
} from "lucide-react";

import TeaSpotCard from "@/components/TeaSpotCard";
import API_URL from "@/services/api";

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function TeaSpotsPage() {
  const [spots, setSpots] = useState<TeaSpot[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/tea-spots`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSpots(data);
        }
      })
      .catch(console.error);
  }, []);

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) =>
      `${spot.name} ${spot.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [spots, search]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b16] text-white">

      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-60 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]"
        />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 py-10 md:px-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-purple-500/10 p-8 md:p-12"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-400/10 blur-[100px]" />

          <div className="relative max-w-3xl">
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm text-orange-300">
              <Sparkles size={16} />
              Discover Campus Hangouts
            </div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Find your next
              <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-pink-400 bg-clip-text text-transparent">
                favorite spot ☕
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Discover the best places around campus for coffee, snacks,
              conversations, group study, and unforgettable memories.
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-xl">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a coffee, snack or hangout..."
                className="w-full rounded-2xl border border-white/10 bg-black/30 py-4 pl-14 pr-5 text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-orange-400/50 focus:ring-4 focus:ring-orange-400/10"
              />
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-3">
              {["☕ Coffee", "🍔 Snacks", "😌 Chill", "👥 Friends"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag.split(" ")[1])}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 transition hover:border-orange-400/40 hover:bg-orange-400/10 hover:text-orange-300"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-end justify-between gap-5"
        >
          <div>
            <div className="flex items-center gap-2 text-orange-400">
              <Flame size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Explore
              </span>
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Popular around campus
            </h2>

            <p className="mt-2 text-slate-400">
              {filteredSpots.length} spot
              {filteredSpots.length !== 1 ? "s" : ""} waiting to be explored.
            </p>
          </div>

          <Link
            href="/tea-spots/create"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:scale-105 hover:shadow-orange-500/40"
          >
            <Plus
              size={20}
              className="transition group-hover:rotate-90"
            />
            Add a Spot
          </Link>
        </motion.div>

        {/* CARDS */}
        {filteredSpots.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot, index) => (
              <Link
                key={spot._id}
                href={`/tea-spots/${spot._id}`}
                className="block"
              >
                <TeaSpotCard spot={spot} index={index} />
              </Link>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center"
          >
            <Coffee
              size={45}
              className="mx-auto text-orange-400"
            />

            <h3 className="mt-5 text-xl font-bold">
              No spots found
            </h3>

            <p className="mt-2 text-slate-400">
              Try searching for something else.
            </p>
          </motion.div>
        )}

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-orange-500/20 p-8 text-center md:p-12"
        >
          <MapPin className="mx-auto text-orange-400" size={35} />

          <h2 className="mt-4 text-2xl font-bold md:text-3xl">
            Know a hidden campus gem?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Help other students discover great places for food, coffee,
            conversations and memories.
          </p>

          <Link
            href="/tea-spots/create"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:scale-105"
          >
            <Plus size={19} />
            Add Your Favorite Spot
          </Link>
        </motion.div>

      </section>
    </main>
  );
}