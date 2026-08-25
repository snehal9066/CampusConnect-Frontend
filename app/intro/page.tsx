"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  MessageCircle,
  CalendarDays,
  Heart,
  MapPin,
  Sparkles,
  Users,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";

function Student({
  className = "",
  delay = 0,
  color = "from-blue-500 to-purple-600",
}: {
  className?: string;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 2.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`absolute ${className}`}
    >
      {/* Head */}
      <div className="mx-auto h-7 w-7 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 shadow-md" />

      {/* Body */}
      <div
        className={`mx-auto mt-1 h-10 w-11 rounded-t-2xl rounded-b-lg bg-gradient-to-br ${color} shadow-lg`}
      />

      {/* Legs */}
      <div className="mx-auto flex w-7 justify-between">
        <div className="h-6 w-2 rounded-b-full bg-slate-700" />
        <div className="h-6 w-2 rounded-b-full bg-slate-700" />
      </div>
    </motion.div>
  );
}

function ActivityCard({
  icon: Icon,
  title,
  text,
  className,
  delay,
  gradient,
}: {
  icon: any;
  title: string;
  text: string;
  className: string;
  delay: number;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration: 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      className={`absolute ${className} z-30 hidden sm:block`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="max-w-[150px] text-xs text-slate-500">{text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function IntroPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set((event.clientX - window.innerWidth / 2) / 40);
      mouseY.set((event.clientY - window.innerHeight / 2) / 40);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2ff] text-slate-900">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-300/50 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-purple-300/50 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-300px] left-1/3 h-[600px] w-[600px] rounded-full bg-pink-300/40 blur-[140px]"
        />
      </div>

      {/* ================= HEADER ================= */}

      <header className="relative z-50 mx-auto flex max-w-7xl justify-center px-6 py-7">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white shadow-xl shadow-purple-500/30">
            <GraduationCap size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Campus
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect
            </span>
          </span>
        </motion.div>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col items-center px-6 pb-20 pt-8 text-center">
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg shadow-slate-300/20 backdrop-blur-xl"
        >
          <Sparkles size={15} className="text-purple-500" />
          Your campus, brought together
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-7 max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl md:text-7xl"
        >
          Campus isn&apos;t just
          <br />

          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            a place.
          </span>

          <br />

          It&apos;s the people you connect with.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg"
        >
          A living digital space where students meet, talk, discover,
          explore and experience campus life together.
        </motion.p>

        {/* ================= LIVING CAMPUS ================= */}

        <motion.div
          style={{
            x: mounted ? springX : 0,
            y: mounted ? springY : 0,
          }}
          className="relative mt-10 h-[400px] w-full max-w-5xl"
        >
          {/* Activity Cards */}

          <ActivityCard
            icon={Coffee}
            title="Tea Spot"
            text="12 students hanging out"
            delay={0.5}
            gradient="from-orange-400 to-amber-500"
            className="left-0 top-10"
          />

          <ActivityCard
            icon={MessageCircle}
            title="Campus Chat"
            text="New conversation happening"
            delay={0.8}
            gradient="from-blue-500 to-cyan-400"
            className="right-0 top-16"
          />

          <ActivityCard
            icon={CalendarDays}
            title="Event Tonight"
            text="248 students interested"
            delay={1.1}
            gradient="from-purple-500 to-pink-500"
            className="bottom-8 left-[5%]"
          />

          <ActivityCard
            icon={Heart}
            title="New Connection"
            text="Someone wants to connect"
            delay={1.4}
            gradient="from-pink-500 to-rose-500"
            className="bottom-10 right-[5%]"
          />

          {/* Connection Lines */}

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M250 180 C350 100, 450 250, 500 200 S700 120, 800 200"
              fill="none"
              stroke="rgba(139,92,246,0.35)"
              strokeWidth="2"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </svg>

          {/* ================= CAMPUS PLATFORM ================= */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.35,
              type: "spring",
            }}
            className="absolute left-1/2 top-1/2 h-[260px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[60px] border border-white/80 bg-gradient-to-br from-white/90 to-blue-50/80 shadow-2xl shadow-blue-900/15 backdrop-blur-xl sm:h-[300px] sm:w-[560px]"
          >
            {/* Campus title */}

            <div className="absolute left-1/2 top-6 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <MapPin size={13} />
                CAMPUS LIVE
              </div>
            </div>

            {/* Main Building */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-[70px] -translate-x-1/2"
            >
              <div className="relative h-[100px] w-[170px] rounded-t-[32px] bg-gradient-to-br from-blue-600 to-purple-700 shadow-xl">
                {/* Building windows */}

                <div className="grid grid-cols-4 gap-2 p-5">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
                        repeat: Infinity,
                      }}
                      className="h-5 rounded-md bg-white/60"
                    />
                  ))}
                </div>

                <div className="absolute -bottom-8 left-1/2 h-10 w-14 -translate-x-1/2 rounded-t-xl bg-slate-800" />
              </div>

              <div className="mx-auto h-4 w-[210px] rounded-full bg-blue-900/10 blur-md" />
            </motion.div>

            {/* Tea spot */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-xl">
                <Coffee size={27} />
              </div>

              <motion.div
                animate={{
                  y: [0, -12],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute left-7 -top-6 text-2xl text-orange-300"
              >
                ~
              </motion.div>
            </motion.div>

            {/* Event area */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl"
            >
              <CalendarDays size={27} />
            </motion.div>

            {/* Students */}

            <Student
              className="bottom-6 left-[30%]"
              delay={0.7}
              color="from-blue-500 to-cyan-500"
            />

            <Student
              className="bottom-5 right-[30%]"
              delay={1}
              color="from-purple-500 to-pink-500"
            />

            <Student
              className="bottom-10 left-[45%]"
              delay={1.3}
              color="from-emerald-500 to-teal-400"
            />

            {/* Chat bubble */}

            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute right-20 top-20 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg"
            >
              <MessageCircle size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="relative z-40 mt-4"
        >
          <Link
            href="/login"
            className="group inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white shadow-2xl shadow-slate-900/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-slate-900/40"
          >
            Enter Your Campus

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400">
            <Users size={15} />
            One campus. Thousands of connections.
          </div>
        </motion.div>
      </section>
    </main>
  );
}