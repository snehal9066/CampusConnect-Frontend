"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.92,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 10.2,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute bottom-8 left-1/2 z-50 w-[340px] -translate-x-1/2"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-950/70 p-7 text-center shadow-[0_0_60px_rgba(99,102,241,0.3)] backdrop-blur-2xl">

        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative">

          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-blue-200">
            Connect with your campus.
          </p>

          <motion.button
            onClick={handleContinue}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-purple-900/30"
          >
            Continue
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}