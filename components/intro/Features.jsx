"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "💬",
    title: "Friendship",
    subtitle: "Meet people like you",
  },
  {
    icon: "📚",
    title: "Study Buddy",
    subtitle: "Learn together",
  },
  {
    icon: "🎉",
    title: "Campus Events",
    subtitle: "Discover what's happening",
  },
];

export default function Features() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-4 max-w-[700px] px-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 5 + index * 0.45,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-[150px] rounded-2xl border border-white/20 bg-slate-950/60 p-4 text-center shadow-[0_0_30px_rgba(99,102,241,0.18)] backdrop-blur-xl"
          >
            <div className="mb-2 text-3xl">
              {feature.icon}
            </div>

            <h3 className="text-sm font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-1 text-[11px] leading-4 text-blue-200/80">
              {feature.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}