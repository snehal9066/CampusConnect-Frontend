"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TeaSpotCard from '@/components/TeaSpotCard';
import ChatRoom from '@/components/ChatRoom';

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function TeaSpotDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [spot, setSpot] = useState<TeaSpot | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/tea-spots/${id}`)
      .then((res) => res.json())
      .then(setSpot)
      .catch(() => router.push('/tea-spots'));
  }, [id]);

  if (!spot) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section className="p-6">
      <TeaSpotCard spot={spot} />
      <ChatRoom spotId={spot._id} />
    </section>
  );
}
