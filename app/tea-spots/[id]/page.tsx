"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Coffee,
  MessageCircle,
} from "lucide-react";

import MapView from "@/components/tea-spots/MapView";
import CheckInButton from "@/components/tea-spots/CheckInButton";
import RatingStars from "@/components/tea-spots/RatingStars";
import ChatRoom from "@/components/ChatRoom";
import TeaSpotCard from "@/components/TeaSpotCard";
import API_URL from "@/services/api";

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  images?: string[];
  lat: number;
  lng: number;
}

export default function TeaSpotDetail() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [spot, setSpot] = useState<TeaSpot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("Invalid tea spot.");
      setLoading(false);
      return;
    }

    const fetchSpot = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${API_URL}/api/tea-spots/${id}`
        );

        if (!res.ok) {
          throw new Error("Tea spot not found");
        }

        const data = await res.json();

        setSpot(data);
      } catch (err) {
        console.error("Error fetching tea spot:", err);
        setError("Unable to load this tea spot.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b16] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
          <p className="text-slate-400">Loading tea spot...</p>
        </div>
      </main>
    );
  }

  if (error || !spot) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b16] px-6 text-white">
        <div className="max-w-md text-center">
          <Coffee
            size={50}
            className="mx-auto mb-5 text-orange-400"
          />

          <h1 className="text-2xl font-bold">
            Oops! Spot not found
          </h1>

          <p className="mt-3 text-slate-400">
            {error || "This tea spot doesn't exist anymore."}
          </p>

          <Link
            href="/tea-spots"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold transition hover:bg-orange-400"
          >
            <ArrowLeft size={18} />
            Back to Tea Spots
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b16] px-4 py-6 text-white md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back button */}
        <button
          onClick={() => router.push("/tea-spots")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Tea Spots
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <TeaSpotCard spot={spot} />
        </motion.div>

        {/* Info */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left side */}
          <div className="space-y-6 lg:col-span-2">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <Coffee className="text-orange-400" size={20} />

                <h2 className="text-xl font-bold">
                  About this spot
                </h2>
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                {spot.description}
              </p>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
            >
              <div className="flex items-center gap-2 p-5">
                <MapPin className="text-orange-400" size={20} />

                <h2 className="font-bold">
                  Find this spot
                </h2>
              </div>

              <MapView spot={spot} />
            </motion.div>

            {/* Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="mb-5 flex items-center gap-2">
                <MessageCircle
                  className="text-purple-400"
                  size={20}
                />

                <h2 className="text-xl font-bold">
                  Spot Chat
                </h2>
              </div>

              <ChatRoom spotId={spot._id} />
            </motion.div>

          </div>

          {/* Right side */}
          <div className="space-y-6">

            {/* Actions */}
            <div className="rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 to-purple-500/10 p-6">

              <h2 className="text-lg font-bold">
                Enjoying this spot? ☕
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Check in and share your rating with other students.
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    Rate this place
                  </p>

                  <RatingStars spotId={spot._id} />
                </div>

                <CheckInButton spotId={spot._id} />

              </div>

            </div>

            {/* Location info */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-orange-400"
                />

                <h3 className="font-bold">
                  Location
                </h3>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                Latitude: {spot.lat}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Longitude: {spot.lng}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}