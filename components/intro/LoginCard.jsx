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
      className="
        absolute
        bottom-4
        left-1/2
        z-50
        w-[calc(100%-32px)]
        max-w-[340px]
        -translate-x-1/2
        sm:bottom-6
        sm:w-[320px]
        md:bottom-8
        md:w-[340px]
      "
    >
      {/* Purple glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-16
          left-1/2
          h-32
          w-32
          -translate-x-1/2
          rounded-full
          bg-purple-500/20
          blur-3xl
          sm:-top-20
          sm:h-40
          sm:w-40
        "
      />

      <div className="relative">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Welcome Back
        </h2>

        <p className="mt-1 text-xs text-blue-200 sm:mt-2 sm:text-sm">
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
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-purple-900/30
            sm:mt-6
            sm:py-3
            sm:text-base
          "
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}