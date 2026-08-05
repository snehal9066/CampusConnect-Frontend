"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import API_URL from "../../services/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
  "http://localhost:5000/api/auth/login",
  {
    username,
    password,
  }
);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-2xl">

        <div className="text-center">

          <div className="text-6xl mb-4">
            🎓
          </div>

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-300">
            Login to continue your CampusConnect journey.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >

          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full rounded-xl bg-slate-800/70 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="🔒 Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl bg-slate-800/70 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-slate-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-semibold text-white transition hover:scale-105"
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </button>

        </form>

        <p className="mt-8 text-center text-slate-300">

          New here?

          <Link
            href="/register"
            className="ml-2 font-semibold text-blue-400"
          >
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}