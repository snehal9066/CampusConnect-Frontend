"use client";

import Link from 'next/link';
import TeaSpotCard from '@/components/TeaSpotCard';
import { useEffect, useState } from 'react';

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function TeaSpotsPage() {
  const [spots, setSpots] = useState<TeaSpot[]>([]);

  useEffect(() => {
    fetch('/api/tea-spots')
      .then((res) => res.json())
      .then(setSpots)
      .catch(console.error);
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Tea Spots</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <Link key={spot._id} href={`/tea-spots/${spot._id}`}> 
            <TeaSpotCard spot={spot} />
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/tea-spots/create"
          className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
        >
          + Add New Tea Spot
        </Link>
      </div>
    </section>
  );
}
