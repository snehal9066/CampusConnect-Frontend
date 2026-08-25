"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Code,
  Laptop,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface CampusEvent {
  id: string;
  title: string;
  category: "techfest" | "workshop" | "club" | "hackathon";
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxCapacity: number;
  featured?: boolean;
  status: "Upcoming" | "Registration Open" | "Filling Fast";
}

const EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "Internal Hackathon - SIH 2026",
    category: "hackathon",
    date: "Aug 28",
    time: "09:00 AM - 09:00 PM",
    location: "Department of Computer Science",
    organizer: "CDeC & Innovation Cell",
    attendees: 184,
    maxCapacity: 200,
    featured: true,
    status: "Filling Fast",
  },
  {
    id: "evt-2",
    title: "Dhishna 2026: AI & Robotics Expo",
    category: "techfest",
    date: "Sep 12",
    time: "10:00 AM - 05:00 PM",
    location: "School of Engineering Grounds",
    organizer: "SOE Tech Fest Cell",
    attendees: 420,
    maxCapacity: 500,
    featured: true,
    status: "Registration Open",
  },
  {
    id: "evt-3",
    title: "Confocal Microscopy & Cytometry",
    category: "workshop",
    date: "Sep 25",
    time: "11:00 AM - 03:30 PM",
    location: "DMB Seminar Hall",
    organizer: "Dept. of Biotechnology",
    attendees: 62,
    maxCapacity: 80,
    status: "Registration Open",
  },
  {
    id: "evt-4",
    title: "Frontiers in Nanoscience (COCHIN NANO)",
    category: "techfest",
    date: "Oct 12",
    time: "09:30 AM - 04:30 PM",
    location: "PSRT Auditorium",
    organizer: "Department of Physics",
    attendees: 145,
    maxCapacity: 250,
    status: "Upcoming",
  },
  {
    id: "evt-5",
    title: "Full-Stack Web3 & Rust Bootcamp",
    category: "club",
    date: "Oct 20",
    time: "05:00 PM - 07:00 PM",
    location: "Software Lab 2",
    organizer: "Coders Guild CUSAT",
    attendees: 88,
    maxCapacity: 100,
    status: "Filling Fast",
  },
];

export const EventTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [rsvpedEvents, setRsvpedEvents] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredEvents =
    selectedCategory === "all"
      ? EVENTS
      : EVENTS.filter((e) => e.category === selectedCategory);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleRSVP = (id: string) => {
    setRsvpedEvents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryIcon = (category: CampusEvent["category"]) => {
    switch (category) {
      case "hackathon":
        return Code;
      case "techfest":
        return Sparkles;
      case "workshop":
        return Laptop;
      case "club":
        return Users;
      default:
        return Zap;
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 z-30">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>CAMPUS CHRONICLES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Upcoming Events & Workshops
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Explore live hackathons, symposiums, and student club activities happening across [Cochin University of Science and Technology](http://googleusercontent.com/map_location_reference/2).
          </p>
        </div>

        {/* Scroll Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleScroll("left")}
            className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {[
          { id: "all", label: "All Events" },
          { id: "hackathon", label: "Hackathons" },
          { id: "techfest", label: "Tech Fests" },
          { id: "workshop", label: "Workshops" },
          { id: "club", label: "Club Events" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "bg-slate-900/40 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable Timeline */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none scroll-smooth snap-x snap-mandatory"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => {
            const CategoryIcon = getCategoryIcon(evt.category);
            const isRSVPed = !!rsvpedEvents[evt.id];
            const currentCapacity = isRSVPed ? evt.attendees + 1 : evt.attendees;

            return (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="snap-start flex-shrink-0 w-[340px] md:w-[380px] group relative backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300"
              >
                {/* Highlight Glow for Featured Events */}
                {evt.featured && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                )}

                <div>
                  {/* Card Header: Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-cyan-300">
                      <CategoryIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="capitalize">{evt.category}</span>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${
                        evt.status === "Filling Fast"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  {/* Date Badge & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 min-w-[60px]">
                      <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
                        {evt.date.split(" ")[0]}
                      </span>
                      <span className="text-xl font-bold text-white">
                        {evt.date.split(" ")[1]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        by {evt.organizer}
                      </p>
                    </div>
                  </div>

                  {/* Location & Time Info */}
                  <div className="space-y-2 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Attendees & RSVP Trigger */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span>
                        <strong className="text-slate-200">
                          {currentCapacity}
                        </strong>{" "}
                        / {evt.maxCapacity} Seats
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-cyan-400">
                      {Math.round((currentCapacity / evt.maxCapacity) * 100)}% Full
                    </span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                      style={{
                        width: `${(currentCapacity / evt.maxCapacity) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Interactive Action Button */}
                  <button
                    onClick={() => toggleRSVP(evt.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      isRSVPed
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                        : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950"
                    }`}
                  >
                    {isRSVPed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Spot Confirmed</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4" />
                        <span>Reserve Spot</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};