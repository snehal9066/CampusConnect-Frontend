"use client";


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API_URL from '@/services/api';

export default function TeaSpotForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, description, imageUrl };
    try {
      const res = await fetch(`${API_URL}/api/tea-spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/tea-spots/${data._id}`);
      } else {
        console.error('Failed to create spot');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Add New Tea Spot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-white/10 p-2 text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-white/10 p-2 text-white focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Image URL</label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-md bg-white/10 p-2 text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-2 text-white font-semibold hover:scale-105 transition"
        >
          Create Spot
        </button>
      </form>
    </section>
  );
}
