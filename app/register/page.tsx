"use client";

import API_URL from "../../services/api";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

const particles = Array.from({ length: 28 });

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Validation
    if (
      !form.fullName.trim() ||
      !form.username.trim() ||
      !form.department.trim() ||
      !form.year.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please fill in all the fields."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          fullName:
            form.fullName.trim(),

          username:
            form.username.trim(),

          department:
            form.department.trim(),

          year:
            form.year.trim(),

          password:
            form.password,
        }
      );

      setMessage(
        res.data.message ||
          "Registration successful!"
      );

      // Clear form
      setForm({
        fullName: "",
        username: "",
        department: "",
        year: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err: any) {
      console.error(
        "REGISTRATION ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #030512 0%, #070b1c 45%, #0d0620 100%)",
      }}
    >

      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-[130px]"
      />

      {/* ==========================================
          PARTICLES
      ========================================== */}

      <div className="pointer-events-none fixed inset-0">

        {particles.map((_, index) => {
          const left =
            (index * 37) % 100;

          const top =
            (index * 61) % 100;

          const size =
            index % 3 === 0 ? 3 : 2;

          return (
            <motion.span
              key={index}
              className="absolute rounded-full bg-blue-300"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
              }}
              animate={{
                y: [-10, -35, -10],
                opacity: [
                  0.1,
                  0.7,
                  0.1,
                ],
                scale: [
                  0.7,
                  1.3,
                  0.7,
                ],
              }}
              transition={{
                duration:
                  3 + (index % 4),
                delay:
                  index * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

      </div>

      {/* ==========================================
          MAIN
      ========================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center">

        {/* ========================================
            BRANDING
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-7 flex items-center gap-3"
        >

          <Link
            href="/login"
            className="flex items-center gap-3"
          >

            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6, #7c3aed)",
                color: "#ffffff",
              }}
            >
              🎓
            </div>

            <div>

              <h1
                className="text-xl font-extrabold"
                style={{
                  color: "#ffffff",
                }}
              >
                Campus
                <span
                  style={{
                    color: "#c084fc",
                  }}
                >
                  Connect
                </span>
              </h1>

              <p
                className="text-left text-[10px]"
                style={{
                  color: "#64748b",
                }}
              >
                Connecting Campus
              </p>

            </div>

          </Link>

        </motion.div>

        {/* ========================================
            CARD
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >

          <div
            className="relative overflow-hidden rounded-3xl border p-7 shadow-2xl sm:p-9"
            style={{
              background:
                "rgba(255,255,255,0.065)",
              borderColor:
                "rgba(255,255,255,0.14)",
              backdropFilter:
                "blur(24px)",
              boxShadow:
                "0 0 80px rgba(99,102,241,0.20)",
            }}
          >

            {/* Top light */}

            <motion.div
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-300 to-transparent"
            />

            {/* ======================================
                HEADER
            ====================================== */}

            <div className="mb-8 text-center">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.25))",
                }}
              >
                ✨
              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
                className="mt-5 text-3xl font-extrabold"
                style={{
                  color: "#ffffff",
                }}
              >
                Create your account
              </motion.h2>

              <p
                className="mt-2 text-sm leading-6"
                style={{
                  color: "#94a3b8",
                }}
              >
                Join CampusConnect and start
                meeting people from your
                campus.
              </p>

            </div>

            {/* ======================================
                FORM
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* FULL NAME */}

              <div>

                <label
                  className="mb-2 block text-sm font-medium"
                  style={{
                    color: "#e2e8f0",
                  }}
                >
                  Full Name
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    👤
                  </span>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border py-3.5 pl-12 pr-4 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                </div>

              </div>

              {/* USERNAME */}

              <div>

                <label
                  className="mb-2 block text-sm font-medium"
                  style={{
                    color: "#e2e8f0",
                  }}
                >
                  Username
                </label>

                <div className="relative">

                  <span
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                    style={{
                      color: "#64748b",
                    }}
                  >
                    @
                  </span>

                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="w-full rounded-xl border py-3.5 pl-12 pr-4 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                </div>

              </div>

              {/* DEPARTMENT + YEAR */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label
                    className="mb-2 block text-sm font-medium"
                    style={{
                      color: "#e2e8f0",
                    }}
                  >
                    Department
                  </label>

                  <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Computer Science"
                    className="w-full rounded-xl border px-4 py-3.5 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                </div>

                <div>

                  <label
                    className="mb-2 block text-sm font-medium"
                    style={{
                      color: "#e2e8f0",
                    }}
                  >
                    Year
                  </label>

                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="3rd Year"
                    className="w-full rounded-xl border px-4 py-3.5 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  className="mb-2 block text-sm font-medium"
                  style={{
                    color: "#e2e8f0",
                  }}
                >
                  Password
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border py-3.5 pl-12 pr-12 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

                <p
                  className="mt-2 text-xs"
                  style={{
                    color: "#64748b",
                  }}
                >
                  Use at least 6 characters.
                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label
                  className="mb-2 block text-sm font-medium"
                  style={{
                    color: "#e2e8f0",
                  }}
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔐
                  </span>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border py-3.5 pl-12 pr-12 outline-none transition"
                    style={{
                      background:
                        "rgba(255,255,255,0.92)",
                      borderColor:
                        "rgba(255,255,255,0.15)",
                      color: "#0f172a",
                    }}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm"
                  style={{
                    color: "#fca5a5",
                  }}
                >
                  ⚠️ {error}
                </motion.div>
              )}

              {/* SUCCESS */}

              {message && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm"
                  style={{
                    color: "#86efac",
                  }}
                >
                  ✅ {message}
                </motion.div>
              )}

              {/* REGISTER BUTTON */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading
                    ? 1
                    : 1.02,
                }}
                whileTap={{
                  scale: loading
                    ? 1
                    : 0.97,
                }}
                className="group relative mt-2 w-full overflow-hidden rounded-xl py-4 font-bold text-white shadow-xl"
                style={{
                  background:
                    "linear-gradient(90deg, #2563eb, #7c3aed, #db2777)",
                  opacity: loading
                    ? 0.6
                    : 1,
                }}
              >

                <span className="relative z-10">
                  {loading
                    ? "Creating account..."
                    : "✨ Create Account"}
                </span>

                {!loading && (
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />
                )}

              </motion.button>

            </form>

            {/* ======================================
                LOGIN LINK
            ====================================== */}

            <div
              className="mt-7 border-t pt-6 text-center"
              style={{
                borderColor:
                  "rgba(255,255,255,0.1)",
              }}
            >

              <p
                className="text-sm"
                style={{
                  color: "#64748b",
                }}
              >
                Already have an account?
              </p>

              <Link
                href="/login"
                className="mt-2 inline-block font-semibold transition"
                style={{
                  color: "#c084fc",
                }}
              >
                Login to CampusConnect →
              </Link>

            </div>

          </div>

        </motion.div>

        {/* ========================================
            FOOTER
        ======================================== */}

        <p
          className="mt-6 text-center text-xs"
          style={{
            color: "#475569",
          }}
        >
          CampusConnect · Connecting Campus.
          Creating Connections.
        </p>

      </div>

    </main>
  );
}