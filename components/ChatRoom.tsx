"use client";

import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import API_URL from '@/services/api';

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: Date;
}

interface ChatRoomProps {
  spotId: string;
}

let socket: Socket;

export default function ChatRoom({ spotId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('Anonymous');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.username) setUsername(u.username);
      } catch (e) {}
    }

    // Initialize socket connection directly to backend
    socket = io(API_URL, {
      transports: ["websocket"],
    });

    socket.emit('joinSpot', spotId);

    socket.on('receiveMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    fetch(`${API_URL}/api/tea-spots/${spotId}/messages`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(console.error);

    return () => {
      socket.disconnect();
    };
  }, [spotId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const payload = { sender: username, text: input };
    try {
      await fetch(`${API_URL}/api/tea-spots/${spotId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8 rounded-xl bg-white/5 p-4 backdrop-blur-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">Tea Spot Chat</h2>
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg._id} className="text-slate-300">
            <span className="font-medium text-white">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md bg-white/10 p-2 text-white focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 px-4 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
