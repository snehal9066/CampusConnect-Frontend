"use client";

import { motion } from "framer-motion";

export default function CampusBackground() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.08,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: 1.5,
          ease: "easeOut",
        },
        scale: {
          duration: 8,
          ease: "easeOut",
        },
      }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <motion.img
        src="/images/campus-background.png"
        alt="Cochin University campus"
        className="h-full w-full object-cover"
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* Purple brand glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(35,10,70,0.35)_100%)]" />
    </motion.div>
  );
}