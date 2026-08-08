"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Campus() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.15,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 3,
        ease: "easeOut",
      }}
      className="absolute inset-0"
    >
      <Image
        src="/images/campus-background.png"
        alt="Campus"
        fill
        priority
        className="object-cover"
      />
    </motion.div>
  );
}