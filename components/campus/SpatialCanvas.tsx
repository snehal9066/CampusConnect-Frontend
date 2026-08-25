"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, Calendar, MapPin, Users, Compass, Laptop } from "lucide-react";
import { SpatialNodeCard } from "./SpatialNodeCard";
import { NetworkGraph } from "./NetworkGraph";
import { HeroContent } from "./HeroContent";

export const SpatialCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const bgRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const bgRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  const midTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const midTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#030712] overflow-hidden select-none"
      style={{ perspective: "1200px" }}
    >
      {/* ATMOSPHERIC BACKGROUND LAYER */}
      <motion.div
        style={{
          rotateX: bgRotateX,
          rotateY: bgRotateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />

        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </motion.div>

      {/* SVG NETWORK CONNECTIONS LAYER */}
      <NetworkGraph />

      {/* FLOATING SPATIAL NODES (Academic & Campus Life Focus) */}
      <motion.div
        style={{
          x: midTranslateX,
          y: midTranslateY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 pointer-events-none z-20"
      >
        {/* Node 1: Quiet Study Corner */}
        <SpatialNodeCard
          title="Central Library 3rd Floor"
          subtitle="Quiet Study Corner • Silent Zone"
          meta="18 Students Active Now"
          icon={BookOpen}
          badge="Study Hub"
          x="12%"
          y="22%"
          z={80}
          delay={0.6}
        />

        {/* Node 2: Campus Event */}
        <SpatialNodeCard
          title="Tech Symposium 2026 🎉"
          subtitle="Auditorium Block • 4:00 PM"
          meta="210 Students Registered"
          icon={Calendar}
          badge="Campus Event"
          x="72%"
          y="18%"
          z={110}
          delay={0.9}
        />

        {/* Node 3: Coding & Project Collaboration */}
        <SpatialNodeCard
          title="Innovation Lab"
          subtitle="Group Project Desk B4"
          meta="4/5 Team Members Present"
          icon={Laptop}
          badge="Project Space"
          x="14%"
          y="68%"
          z={60}
          delay={1.2}
        />

        {/* Node 4: Main Campus Quad */}
        <SpatialNodeCard
          title="Central Quadrangle"
          subtitle="Open Air Student Plaza"
          meta="Popular Student Hangout"
          icon={MapPin}
          x="75%"
          y="65%"
          z={95}
          delay={1.5}
        />

        {/* Node 5: Peer Study Group */}
        <SpatialNodeCard
          title="Algorithms Study Circle"
          subtitle="Exam Prep & Problem Solving"
          meta="Room 204 • Open Join"
          icon={Users}
          badge="Study Circle"
          x="42%"
          y="78%"
          z={120}
          delay={1.8}
        />
      </motion.div>

      {/* CENTRAL HERO TYPOGRAPHY & CTA */}
      <HeroContent />
    </div>
  );
};