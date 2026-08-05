"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../../services/socket";
import API_URL from "../../services/api";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const partner =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("partner") || "{}")
      : {};

  const matchId =
    typeof window !== "undefined"
      ? localStorage.getItem("matchId")
      : null;

  const sender = user?._id;

  useEffect(() => {
    if (!user || !matchId) return;

    socket.connect();

    socket.emit("registerUser", user._id);

    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/messages/${matchId}`
        );

        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("joinRoom", matchId);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("userTyping", () => {
      setTyping(true);
    });

    socket.on("userStoppedTyping", () => {
      setTyping(false);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
      socket.off("disconnect");

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const revealIdentity = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/match/reveal`,
        {
          matchId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      matchId,
      sender,
      text,
    });

    setText("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center p-5">
      <div className="w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-3xl shadow-lg">
              🎭
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {partner.username || "Anonymous Partner"}
              </h1>

              <p className="text-sm text-blue-100">
                {connected ? "🟢 Online" : "🔴 Offline"}
              </p>
            </div>
          </div>

          <button
            onClick={revealIdentity}
            className="rounded-xl bg-green-500 px-5 py-3 font-semibold hover:bg-green-600 transition"
          >
            👤 Reveal Identity
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-100 to-white p-6 space-y-4">

          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center">
              <div className="text-8xl mb-5">🎭</div>

              <h2 className="text-3xl font-bold text-slate-700">
                Anonymous Chat
              </h2>

              <p className="text-gray-500 mt-3">
                Say hello and start your first conversation.
              </p>
            </div>
          ) : (
            messages.map((msg: any, index) => {
              const isMe =
                msg.sender?._id === sender ||
                msg.sender === sender;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isMe
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-lg transition-all ${
                      isMe
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-xs opacity-70 mb-2 font-semibold">
                      {isMe ? "You" : "🎭 Anonymous"}
                    </p>

                    <p className="text-base break-words">
                      {msg.text}
                    </p>

                    <div className="flex justify-end mt-2">
                      <p className="text-[11px] opacity-70">
                        {new Date(
                          msg.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {typing && (
            <p className="text-gray-500 italic">
              Anonymous is typing...
            </p>
          )}

          <div ref={bottomRef}></div>
        </div>

        <div className="border-t border-white/10 bg-white px-5 py-4">
          <div className="flex items-center gap-3">

            <button
              className="text-3xl hover:scale-110 transition"
              type="button"
            >
              😊
            </button>

            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 rounded-full border border-slate-300 px-6 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />

            <button
              className="text-2xl hover:scale-110 transition"
              type="button"
            >
              📎
            </button>

            <button
              onClick={sendMessage}
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-4 text-white font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              🚀
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}