"use client";
import { useState, useEffect } from 'react';
import API_URL from '@/services/api';

interface RatingStarsProps {
  spotId: string;
}

export default function RatingStars({ spotId }: RatingStarsProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [average, setAverage] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Fetch current average rating on mount
  useEffect(() => {
    fetch(`${API_URL}/api/tea-spots/${spotId}`)
      .then((res) => res.json())
      .then((spot) => {
        if (spot.rating && spot.rating.length) {
          const sum = spot.rating.reduce((a: number, b: number) => a + b, 0);
          setAverage(sum / spot.rating.length);
        }
      })
      .catch(() => {});
  }, [spotId]);

  const submitRating = async (rating: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tea-spots/${spotId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rating }),
      });
      if (res.ok) {
        setUserRating(rating);
        // Update average locally (optimistic)
        setAverage((prev) => (prev * 0 + rating) / 1);
      } else {
        console.error('Rating failed');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (userRating ?? Math.round(average));
      stars.push(
        <span
          key={i}
          onClick={() => submitRating(i)}
          style={{
            cursor: loading ? 'default' : 'pointer',
            color: filled ? '#ffb400' : '#ccc',
            fontSize: '1.5rem',
            marginRight: '4px',
          }}
        >
          {filled ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center space-x-2">
      <div>{renderStars()}</div>
      <span className="text-sm text-gray-400">Avg: {average.toFixed(1)}</span>
    </div>
  );
}
