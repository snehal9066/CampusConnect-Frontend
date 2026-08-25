"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_URL from "@/services/api";

export default function TeaSpotForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in again.");
        setLoading(false);
        return;
      }

      const payload = {
        name,
        description,
        imageUrl,
        lat: Number(lat),
        lng: Number(lng),
      };

      const res = await fetch(
        `${API_URL}/api/tea-spots`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create tea spot"
        );
      }

      router.push(`/tea-spots/${data._id}`);
    } catch (err: unknown) {
      console.error("Create tea spot error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Add New Tea Spot
        </h1>

        <p className="mb-8 text-slate-400">
          Share a nice place to meet and connect.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Tea Spot Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Campus Coffee Corner"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>

            <textarea
              required
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell students about this place..."
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Image URL
            </label>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Latitude
            </label>

            <input
              type="number"
              step="any"
              required
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="9.9312"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Longitude
            </label>

            <input
              type="number"
              step="any"
              required
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="76.2673"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating..."
              : "Create Tea Spot"}
          </button>
        </form>
      </section>
    </main>
  );
}