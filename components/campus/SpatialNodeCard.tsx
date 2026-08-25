"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SpatialNodeCardProps {
  title: string;
  subtitle: string;
  meta?: string;
  icon: LucideIcon;
  badge?: string;
  x: string;
  y: string;
  z: number;
  delay: number;
}

export const SpatialNodeCard: React.FC<SpatialNodeCardProps> = ({
  title,
  subtitle,
  meta,
  icon: Icon,
  badge,
  x,
  y,
  z,
  delay,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, translateZ: z - 100 }}
      animate={{
        opacity: 1,
        scale: 1,
        translateZ: z,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        scale: { duration: 1.2, delay },
        translateZ: { duration: 1.2, delay },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        transformStyle: "preserve-3d",
      }}
      className="hidden md:block z-20 cursor-pointer"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.06, translateZ: z + 40 }}
        className="group relative backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-cyan-500/40 hover:bg-slate-900/60"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 transition-colors">
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide text-slate-200">
                {title}
              </span>
              {badge && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400 mt-0.5">{subtitle}</span>
            {meta && (
              <span className="text-[11px] text-purple-400/90 font-mono mt-1">
                {meta}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};