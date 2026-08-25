"use client";
import { useState } from 'react';
import API_URL from '@/services/api';

interface CheckInButtonProps {
  spotId: string;
}

export default function CheckInButton({ spotId }: CheckInButtonProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tea-spots/${spotId}/checkin`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setCount(data.checkInCount);
      } else {
        console.error('Check‑in failed', data);
      }
    } catch (err) {
      console.error('Check‑in error', err);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckIn}
      disabled={loading}
      className="px-4 py-2 bg-tea-green text-white rounded-md hover:bg-tea-green-dark transition"
    >
      {loading ? 'Checking…' : `Check‑In${count !== null ? ` (${count})` : ''}`}
    </button>
  );
}
