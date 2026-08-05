"use client";
import API_URL from "../../services/api";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { socket } from "../../services/socket";

export default function MatchPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    socket.connect();

    if (user?._id) {
      socket.emit("registerUser", user._id);
    }

    socket.on("matchFound", (data) => {
      console.log("🎉 Match Found!", data);

      localStorage.setItem("matchId", data.matchId);
      localStorage.setItem("partner", JSON.stringify(data.partner));

      router.push("/chat");
    });

    return () => {
      socket.off("matchFound");
      socket.disconnect();
    };
  }, [router]);

  const findMatch = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/match/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.matched) {
        setMessage("🎉 Match Found!");

        localStorage.setItem("matchId", res.data.matchId);
        localStorage.setItem("partner", JSON.stringify(res.data.partner));

        router.push("/chat");
      } else {
        setMessage("⏳ Waiting for another student to join...");
      }
    } catch (err: any) {
  if (axios.isAxiosError(err)) {
    setMessage(err.response?.data?.message || "Something went wrong");
  } else {
    setMessage("Unexpected error");
  }
}

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-10">

        {/* Heading */}

        <div className="text-center">

          <div className="text-7xl mb-5">
            🎓
          </div>

          <h1 className="text-5xl font-bold">
            Find Your Campus Connection
          </h1>

          <p className="mt-5 text-slate-300 text-lg">
            Meet verified students, chat anonymously,
            discover study buddies, friendships, coffee chats,
            and meaningful campus connections.
          </p>

        </div>

        {/* Purpose Badges */}

        <div className="mt-10 flex flex-wrap justify-center gap-3">

          <span className="rounded-full bg-blue-600/20 px-5 py-2">
            📚 Study Buddy
          </span>

          <span className="rounded-full bg-pink-600/20 px-5 py-2">
            ❤️ Friendship
          </span>

          <span className="rounded-full bg-green-600/20 px-5 py-2">
            ☕ Coffee Chat
          </span>

          <span className="rounded-full bg-purple-600/20 px-5 py-2">
            💘 Dating
          </span>

        </div>

        {/* Search Animation */}

        {loading ? (

          <div className="mt-14 text-center">

            <div className="text-7xl animate-pulse">
              🎭
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              Searching...
            </h2>

            <p className="mt-2 text-slate-300">
              Looking for a compatible student...
            </p>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-700">

              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>

            </div>

          </div>

        ) : (

          <div className="mt-14 text-center">

            <button
              onClick={findMatch}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-lg font-semibold shadow-xl transition duration-300 hover:scale-105 hover:shadow-blue-500/40"
            >
              🚀 Find Match
            </button>

          </div>

        )}

        {/* Status Message */}

        {message && (

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-5 text-center">

            <p className="text-lg font-medium">
              {message}
            </p>

          </div>

        )}

      </div>

    </main>
  );
}