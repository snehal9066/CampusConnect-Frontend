"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Coffee } from "lucide-react";

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Props {
  spot: TeaSpot;
  index?: number;
}

export default function TeaSpotCard({ spot, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={spot.imageUrl}
          alt={spot.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <Coffee size={14} className="text-orange-400" />
          Tea Spot
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          4.8
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <h2 className="text-xl font-bold text-white transition group-hover:text-orange-300">
          {spot.name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <MapPin size={15} className="text-orange-400" />
          Campus Hangout
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-300">
          {spot.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-orange-400">
            Explore spot →
          </span>

          <motion.div
            whileHover={{ rotate: 10 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-lg shadow-lg shadow-orange-500/20"
          >
            ☕
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}