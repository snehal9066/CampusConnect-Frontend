"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Heart,
  X,
  MapPin,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";

interface DatingPrompt {
  question: string;
  answer: string;
}

interface MatchCardProps {
  user: {
    _id?: string;
    userId?: string;
    fullName?: string;
    username: string;
    department?: string;
    year?: string | number;
    profileImage?: string;
    photos?: string[];
    bio?: string;
    interests?: string[];
    prompts?: DatingPrompt[];
    mysteryModeEnabled?: boolean;
    verified: boolean;
  };
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function MatchCard({
  user,
  onSwipeLeft,
  onSwipeRight,
}: MatchCardProps) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-250, 0, 250], [-12, 0, 12]);

  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);

  const [photoIndex, setPhotoIndex] = require("react").useState(0);

  const photos =
    user.photos && user.photos.length > 0
      ? user.photos
      : user.profileImage
      ? [user.profileImage]
      : ["/images/boy_silhouette.jpg"];

  const currentPhoto = photos[photoIndex];

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number } }
  ) => {
    const swipeThreshold = 120;

    if (info.offset.x > swipeThreshold) {
      onSwipeRight?.();
    } else if (info.offset.x < -swipeThreshold) {
      onSwipeLeft?.();
    }
  };

  const nextPhoto = () => {
    setPhotoIndex((prev: number) =>
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  const previousPhoto = () => {
    setPhotoIndex((prev: number) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto overflow-hidden rounded-[2rem] bg-slate-900 border border-white/10 shadow-2xl"
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
    >
      {/* LIKE / PASS INDICATORS */}

      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 z-30 rotate-[-15deg] border-4 border-emerald-400 px-4 py-2 rounded-xl"
      >
        <span className="text-3xl font-black tracking-wider text-emerald-400">
          LIKE
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: passOpacity }}
        className="absolute top-8 right-8 z-30 rotate-[15deg] border-4 border-red-400 px-4 py-2 rounded-xl"
      >
        <span className="text-3xl font-black tracking-wider text-red-400">
          PASS
        </span>
      </motion.div>

      {/* PHOTO */}

      <div className="relative h-[420px] w-full bg-slate-800">
        <Image
          src={currentPhoto}
          alt={user.fullName || user.username}
          fill
          priority
          className={`object-cover transition-all duration-500 ${
            user.mysteryModeEnabled ? "blur-[2px]" : ""
          }`}
        />

        {/* PHOTO OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

        {/* PHOTO NAVIGATION */}

        {photos.length > 1 && (
          <>
            <button
              onClick={previousPhoto}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-md"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-md"
            >
              <ChevronRight size={22} />
            </button>

            {/* PHOTO DOTS */}

            <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index === photoIndex
                      ? "bg-white"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* MYSTERY MODE */}

        {user.mysteryModeEnabled && (
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/70 px-3 py-1.5 text-xs font-medium text-purple-200 backdrop-blur-xl">
            <Sparkles size={14} />
            Mystery Mode
          </div>
        )}

        {/* USER NAME */}

        <div className="absolute bottom-5 left-6 right-6 z-20">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-white">
              {user.fullName || user.username}
            </h2>

            {user.verified && <VerifiedBadge />}
          </div>

          {user.department && (
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="flex items-center gap-1">
                <GraduationCap size={16} />
                {user.department}
              </span>

              {user.year && (
                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  Year {user.year}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PROFILE CONTENT */}

      <div className="max-h-[260px] overflow-y-auto p-6">
        {user.bio && (
          <p className="text-sm leading-relaxed text-slate-300">
            {user.bio}
          </p>
        )}

        {/* INTERESTS */}

        {user.interests && user.interests.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* PROMPTS */}

        {user.prompts && user.prompts.length > 0 && (
          <div className="mt-5 space-y-3">
            {user.prompts.slice(0, 2).map((prompt, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  {prompt.question}
                </p>

                <p className="mt-2 text-sm text-slate-200">
                  {prompt.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}

      <div className="flex items-center justify-center gap-8 border-t border-white/10 bg-slate-950/50 px-6 py-5">
        <button
          onClick={onSwipeLeft}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 text-red-400 transition hover:scale-110 hover:bg-red-500/20 active:scale-95"
          aria-label="Pass"
        >
          <X size={30} />
        </button>

        <button
          onClick={onSwipeRight}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-[0_0_35px_rgba(244,63,94,0.5)] transition hover:scale-110 active:scale-95"
          aria-label="Like"
        >
          <Heart size={34} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  );
}