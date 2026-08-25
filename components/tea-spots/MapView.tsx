"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface TeaSpot {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  spot?: TeaSpot;
  spots?: TeaSpot[];
  userLocation?: {
    lat: number;
    lng: number;
  } | null;
}

export default function MapView({
  spot,
  spots,
  userLocation,
}: MapViewProps) {
  // If a single spot is passed, use it.
  // Otherwise use all spots.
  const mapSpots = spots || (spot ? [spot] : []);

  if (mapSpots.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] text-slate-400">
        No locations available yet.
      </div>
    );
  }

  // Center map on user location if available.
  // Otherwise center on the first Tea Spot.
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [mapSpots[0].lat, mapSpots[0].lng];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        style={{
          height: "450px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* TEA SPOT MARKERS */}

        {mapSpots.map((teaSpot) => (
          <Marker
            key={teaSpot._id}
            position={[teaSpot.lat, teaSpot.lng]}
          >
            <Popup>
              <div className="min-w-[200px] p-1">
                <h3 className="text-base font-bold">
                  ☕ {teaSpot.name}
                </h3>

                {teaSpot.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {teaSpot.description}
                  </p>
                )}

                <Link
                  href={`/tea-spots/${teaSpot._id}`}
                  className="mt-3 inline-block rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  View Spot →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* USER LOCATION */}

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
          >
            <Popup>
              📍 You are here
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="absolute left-4 top-4 z-[500] rounded-xl border border-white/10 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-xl">
        <p className="text-sm font-bold text-white">
          🗺️ Explore Tea Spots
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {mapSpots.length} location
          {mapSpots.length !== 1 ? "s" : ""} on the map
        </p>
      </div>
    </div>
  );
}