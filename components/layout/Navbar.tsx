"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center px-6 py-4">
        
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

      </nav>
    </header>
  );
}