"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import API_URL from "../../services/api";

const particles = Array.from({ length: 28 });

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
        `${API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      router.push("/dashboard");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(135deg, #030512 0%, #070b1c 45%, #0d0620 100%)",
      }}
    >

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[140px]"
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
        className="pointer-events-none absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px]"
      />

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {particles.map((_, index) => {
          const left = (index * 37) % 100;
          const top = (index * 61) % 100;
          const size = index % 3 === 0 ? 3 : 2;

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
                opacity: [0.15, 0.8, 0.15],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: 3 + (index % 4),
                delay: index * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

      </div>

      {/* =====================================================
          LOGIN WRAPPER
      ===================================================== */}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">

        {/* =================================================
            CAMPUSCONNECT BRANDING
        ================================================= */}

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
          className="mb-6 flex items-center gap-3"
        >

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #3b82f6, #7c3aed)",
              color: "#ffffff",
            }}
          >
            🎓
          </div>

          <div>

            <h2
              className="text-xl font-extrabold tracking-tight"
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
            </h2>

            <p
              className="text-[10px]"
              style={{
                color: "#64748b",
              }}
            >
              Connecting Campus
            </p>

          </div>

        </motion.div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >

          <div
            className="relative overflow-hidden rounded-3xl border p-8 shadow-2xl sm:p-10"
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

            {/* =================================================
                ICON
            ================================================= */}

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
                duration: 0.7,
              }}
              className="mb-5 text-center"
            >

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.25))",
                  color: "#ffffff",
                }}
              >
                👋
              </motion.div>

            </motion.div>

            {/* =================================================
                HEADING
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
              className="text-center"
            >

              <h1
                className="text-4xl font-extrabold tracking-tight"
                style={{
                  color: "#ffffff",
                }}
              >
                Welcome Back
              </h1>

              <p
                className="mt-3 text-sm leading-6"
                style={{
                  color: "#94a3b8",
                }}
              >
                Your campus connections are
                waiting for you.
              </p>

            </motion.div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

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

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                    👤
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border py-3.5 pl-11 pr-4 outline-none transition"
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

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border py-3.5 pl-11 pr-12 outline-none transition"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              {/* LOGIN BUTTON */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: loading
                    ? 1
                    : 1.025,
                }}
                whileTap={{
                  scale: loading
                    ? 1
                    : 0.97,
                }}
                className="mt-2 w-full rounded-xl py-3.5 font-semibold text-white shadow-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #2563eb, #7c3aed, #db2777)",
                  color: "#ffffff",
                  opacity: loading
                    ? 0.6
                    : 1,
                }}
              >
                {loading
                  ? "Logging in..."
                  : "🚀 Login"}
              </motion.button>

            </form>

            {/* =================================================
                REGISTER
            ================================================= */}

            <div
              className="my-6 h-px"
              style={{
                background:
                  "rgba(255,255,255,0.1)",
              }}
            />

            <p
              className="text-center text-sm"
              style={{
                color: "#64748b",
              }}
            >
              New to CampusConnect?
            </p>

            <Link
              href="/register"
              className="mt-2 block text-center font-semibold transition"
              style={{
                color: "#c084fc",
              }}
            >
              Create your account →
            </Link>

          </div>

        </motion.div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <p
          className="mt-5 text-center text-xs"
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