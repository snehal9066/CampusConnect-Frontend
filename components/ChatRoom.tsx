"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Message {
  _id: string;
  user: string;
  content: string;
  createdAt: string;
}

export default function ChatRoom({ spotId }: { spotId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Initialize socket connection
    const sock = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      transports: ["websocket"],
    });
    setSocket(sock);

    // Join room for this spot
    sock.emit("joinRoom", `spot-${spotId}`);

    // Receive messages
    sock.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      sock.disconnect();
    };
  }, [spotId]);

  // Load existing messages
  useEffect(() => {
    fetch(`/api/tea-spots/${spotId}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.error);
  }, [spotId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !socket) return;
    const payload = { content: newMsg };
    try {
      await fetch(`/api/tea-spots/${spotId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setNewMsg("");
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
            <span className="font-medium text-white">{msg.user}:</span> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md bg-white/10 p-2 text-white focus:outline-none"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
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
