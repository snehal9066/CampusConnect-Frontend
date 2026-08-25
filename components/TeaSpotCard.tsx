import Image from "next/image";

interface TeaSpot {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  rating?: number[];
  checkInCount?: number;
}

interface Props {
  spot: TeaSpot;
  distance?: number | null;
}

export default function TeaSpotCard({
  spot,
  distance,
}: Props) {
  const ratings = Array.isArray(spot.rating)
    ? spot.rating
    : [];

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating, 0) /
        ratings.length
      : null;

  const formatDistance = (value: number) => {
    if (value < 1) {
      return `${Math.round(value * 1000)} m away`;
    }

    return `${value.toFixed(1)} km away`;
  };

  return (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:shadow-2xl hover:shadow-orange-950/20">
      {/* IMAGE */}

      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-slate-800">
        {spot.imageUrl ? (
          <Image
            src={spot.imageUrl}
            alt={spot.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500/30 to-purple-600/30 text-6xl">
            ☕
          </div>
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-orange-300/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-orange-200 backdrop-blur-xl">
          🔥 Popular
        </div>

        {spot.checkInCount && spot.checkInCount > 0 ? (
          <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
            👥 {spot.checkInCount} checked in
          </div>
        ) : null}
      </div>

      {/* CONTENT */}

      <div className="p-3 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="line-clamp-1 text-xl font-bold text-white">
              {spot.name}
            </h2>

            <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-400">
              {spot.description ||
                "A great place to grab something and hang out."}
            </p>
          </div>
        </div>

        {/* DETAILS */}

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          {averageRating !== null ? (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1.5 text-amber-300">
              <span>⭐</span>
              <span className="font-semibold">
                {averageRating.toFixed(1)}
              </span>
            </div>
          ) : (
            <div className="rounded-full bg-white/[0.05] px-3 py-1.5 text-slate-400">
              ⭐ New spot
            </div>
          )}

          {distance !== null && distance !== undefined ? (
            <div className="rounded-full bg-blue-500/10 px-3 py-1.5 text-blue-300">
              📍 {formatDistance(distance)}
            </div>
          ) : (
            <div className="rounded-full bg-white/[0.05] px-3 py-1.5 text-slate-400">
              📍 CUSAT
            </div>
          )}
        </div>
      </div>
    </article>
  );
}