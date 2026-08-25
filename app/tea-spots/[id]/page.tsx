"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MapView from '@/components/tea-spots/MapView';
import CheckInButton from '@/components/tea-spots/CheckInButton';
import RatingStars from '@/components/tea-spots/RatingStars';
import ChatRoom from '@/components/ChatRoom';
import TeaSpotCard from '@/components/TeaSpotCard';
import API_URL from '@/services/api';

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  images?: string[];
  lat: number;
  lng: number;
}

export default function TeaSpotDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [spot, setSpot] = useState<TeaSpot | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/api/tea-spots/${id}`)
      .then((res) => res.json())
      .then(setSpot)
      .catch(() => router.push('/tea-spots'));
  }, [id, router]);

  if (!spot) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section className="p-6 space-y-6">
      <TeaSpotCard spot={spot} />
      <div className="rounded-lg overflow-hidden shadow-lg">
        <MapView spot={spot} />
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <CheckInButton spotId={spot._id} />
        <RatingStars spotId={spot._id} />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-white">Group Chat</h2>
        <ChatRoom spotId={spot._id} />
      </div>
    </section>
  );
}
