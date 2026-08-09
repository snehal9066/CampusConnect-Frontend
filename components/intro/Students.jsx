"use client";

import Image from "next/image"; // Trigger rebuild
import { motion } from "framer-motion";

export default function Students() {
  return (
    <>
      {/* BOY */}
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          x: {
            duration: 2.5,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 1,
            delay: 1.8,
          },
        }}
        className="absolute bottom-0 left-[4%] z-20 sm:left-[12%] md:left-[18%]"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div className="bg-[rgba(0,30,60,0.4)] rounded-full p-2">
            <Image
              src="/images/boy_silhouette.jpg"
              alt="CampusConnect student"
              width={300}
              height={380}
              priority
              className="
                h-auto
                w-[135px]
                object-contain
                drop-shadow-[0_12px_25px_rgba(0,180,255,0.6)]
                sm:w-[210px]
                md:w-[260px]
                lg:w-[300px]
              "
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* GIRL */}
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          x: {
            duration: 2.5,
            delay: 2.4,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 1,
            delay: 2.4,
          },
        }}
        className="absolute bottom-0 right-[4%] z-20 sm:right-[12%] md:right-[18%]"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          <motion.div className="bg-[rgba(0,30,60,0.4)] rounded-full p-2">
            <Image
              src="/images/girl_silhouette.jpg"
              alt="CampusConnect student"
              width={300}
              height={380}
              priority
              className="
                h-auto
                w-[135px]
                object-contain
                drop-shadow-[0_12px_25px_rgba(0,180,255,0.6)]
                sm:w-[210px]
                md:w-[260px]
                lg:w-[300px]
              "
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}