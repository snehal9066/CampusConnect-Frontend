"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl shadow-lg">
            🎓
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              CampusConnect
            </h1>

            <p className="text-xs text-slate-400">
              Connect • Chat • Discover
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-slate-300 transition hover:text-white"
          >
            Home
          </Link>

          <a
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-slate-300 transition hover:text-white"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-slate-300 transition hover:text-white"
          >
            Contact
          </a>

        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg transition duration-300 hover:scale-105"
          >
            🚀 Get Started
          </Link>

        </div>

      </nav>
    </header>
  );
}