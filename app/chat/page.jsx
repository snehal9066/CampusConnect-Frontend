"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { socket } from "../../services/socket";
import API_URL from "../../services/api";

const starters = [
  "Hey! What are you studying? 👋",
  "Which year are you in?",
  "What's your favorite thing about campus?",
  "Any good places to hang out around campus?",
];

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // =====================================================
  // GET LOCAL USER DATA
  // =====================================================

  const getStoredData = () => {
    if (typeof window === "undefined") {
      return {
        user: {},
        partner: {},
        matchId: null,
        purpose: "Campus Connection",
      };
    }

    let user = {};
    let partner = {};

    try {
      user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );
    } catch {
      user = {};
    }

    try {
      partner = JSON.parse(
        localStorage.getItem("partner") || "{}"
      );
    } catch {
      partner = {};
    }

    return {
      user,
      partner,
      matchId:
        localStorage.getItem("matchId"),
      purpose:
        localStorage.getItem(
          "matchPurpose"
        ) || "Campus Connection",
    };
  };

  const {
    user,
    partner,
    matchId,
    purpose: connectionPurpose,
  } = getStoredData();

  const sender = user?._id;

  // =====================================================
  // PURPOSE
  // =====================================================

  const purposeLabel = {
    dating: "💕 Dating",
    friendship: "❤️ Friendship",
    coffee: "☕ Coffee Chat",
    study: "📚 Study Buddy",
    connect: "🤝 Meet & Connect",

    Dating: "💕 Dating",
    Friendship: "❤️ Friendship",
    "Coffee Chat": "☕ Coffee Chat",
    "Study Buddy": "📚 Study Buddy",
    "Meet & Connect": "🤝 Meet & Connect",
  };

  const displayPurpose =
    purposeLabel[connectionPurpose] ||
    connectionPurpose;

  // =====================================================
  // LOAD CHAT + SOCKET
  // =====================================================

  useEffect(() => {
    if (!sender || !matchId) {
      setLoadingMessages(false);

      setError(
        "Chat information is missing."
      );

      return;
    }

    let mounted = true;

    // ---------------------------------------------------
    // LOAD EXISTING MESSAGES
    // ---------------------------------------------------

    const loadMessages = async () => {
      try {
        setLoadingMessages(true);
        setError("");

        const token =
          localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/messages/${matchId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!mounted) return;

        const loadedMessages =
          Array.isArray(res.data)
            ? res.data
            : [];

        setMessages(
          loadedMessages
        );

        if (loadedMessages.length > 0) {
          setShowStarters(false);
        }
      } catch (err) {
        console.error(
          "FAILED TO LOAD MESSAGES:",
          err
        );

        if (
          err.response?.status === 401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          router.push("/login");
          return;
        }

        if (
          err.response?.status === 403
        ) {
          setError(
            "You are not allowed to access this conversation."
          );

          return;
        }

        if (
          err.response?.status === 404
        ) {
          setError(
            "This conversation could not be found."
          );

          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load messages."
        );
      } finally {
        if (mounted) {
          setLoadingMessages(false);
        }
      }
    };

    // ---------------------------------------------------
    // SOCKET EVENTS
    // ---------------------------------------------------

    const handleConnect = () => {
      console.log(
        "🟢 Chat socket connected"
      );

      setConnected(true);

      socket.emit(
        "registerUser",
        sender
      );

      socket.emit(
        "joinRoom",
        matchId
      );
    };

    const handleReceiveMessage = (
      message
    ) => {
      if (!message) return;

      // Make sure this message belongs
      // to the current conversation
      const messageMatch =
        message.match?._id ||
        message.match;

      if (
        messageMatch &&
        messageMatch.toString() !==
          matchId.toString()
      ) {
        return;
      }

      setMessages((prev) => {

        // Avoid accidental duplicate messages
        if (
          message._id &&
          prev.some(
            (item) =>
              item._id === message._id
          )
        ) {
          return prev;
        }

        return [...prev, message];
      });

      setShowStarters(false);
    };

    const handleTyping = () => {
      setTyping(true);
    };

    const handleStoppedTyping = () => {
      setTyping(false);
    };

    const handleDisconnect = () => {
      console.log(
        "🔴 Chat socket disconnected"
      );

      setConnected(false);
      setTyping(false);
    };

    // Register listeners BEFORE connect
    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "receiveMessage",
      handleReceiveMessage
    );

    socket.on(
      "userTyping",
      handleTyping
    );

    socket.on(
      "userStoppedTyping",
      handleStoppedTyping
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    // Connect
    socket.connect();

    // If socket is already connected
    if (socket.connected) {
      handleConnect();
    }

    loadMessages();

    // ---------------------------------------------------
    // CLEANUP
    // ---------------------------------------------------

    return () => {
      mounted = false;

      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "receiveMessage",
        handleReceiveMessage
      );

      socket.off(
        "userTyping",
        handleTyping
      );

      socket.off(
        "userStoppedTyping",
        handleStoppedTyping
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current
        );
      }

      socket.disconnect();
    };
  }, [
    sender,
    matchId,
    router,
  ]);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    messages,
    typing,
  ]);

  // =====================================================
  // REVEAL IDENTITY
  // =====================================================

  const revealIdentity = async () => {
    if (!matchId) {
      alert(
        "Chat information is missing."
      );

      return;
    }

    try {
      setRevealing(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

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

      alert(
        res.data.message ||
          "Reveal request completed."
      );
    } catch (err) {
      console.error(
        "REVEAL ERROR:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setRevealing(false);
    }
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = () => {
    const cleanText =
      text.trim();

    if (
      !cleanText ||
      !matchId ||
      !sender
    ) {
      return;
    }

    if (!socket.connected) {
      alert(
        "Chat connection is offline. Please wait a moment and try again."
      );

      return;
    }

    socket.emit(
      "sendMessage",
      {
        matchId,
        sender,
        text: cleanText,
      }
    );

    setText("");
    setShowStarters(false);

    socket.emit(
      "stopTyping",
      {
        matchId,
      }
    );
  };

  // =====================================================
  // TYPING
  // =====================================================

  const handleTyping = (e) => {
    const value =
      e.target.value;

    setText(value);

    if (!matchId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(
        typingTimeoutRef.current
      );
    }

    if (value.trim()) {
      socket.emit(
        "typing",
        {
          matchId,
        }
      );

      typingTimeoutRef.current =
        setTimeout(() => {
          socket.emit(
            "stopTyping",
            {
              matchId,
            }
          );
        }, 1200);
    } else {
      socket.emit(
        "stopTyping",
        {
          matchId,
        }
      );
    }
  };

  // =====================================================
  // STARTER
  // =====================================================

  const useStarter = (
    starter
  ) => {
    setText(starter);
    setShowStarters(false);

    setTimeout(() => {
      document
        .getElementById(
          "chat-input"
        )
        ?.focus();
    }, 50);
  };

  // =====================================================
  // MESSAGE TIME
  // =====================================================

  const getTime = (
    date
  ) => {
    if (!date) return "";

    return new Date(
      date
    ).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // MISSING CHAT
  // =====================================================

  if (!matchId || !sender) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-50 text-5xl">
            💬
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-800">
            Chat unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We couldn't find the conversation
            information. Please return to your
            matches and open the conversation
            again.
          </p>

          <button
            onClick={() =>
              router.push("/match")
            }
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            ✨ Find a Connection
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-100 text-slate-900">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[140px]" />

        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-[150px]" />

        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-pink-200/30 blur-[140px]" />

      </div>

      {/* =================================================
          APP
      ================================================= */}

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1450px] overflow-hidden border-x border-slate-200 bg-white shadow-2xl">

        {/* =================================================
            LEFT SIDEBAR
        ================================================= */}

        <aside className="hidden w-[300px] shrink-0 border-r border-slate-200 bg-slate-50 lg:flex lg:flex-col">

          {/* Logo */}

          <div className="border-b border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
                🎓
              </div>

              <div>

                <h1 className="font-bold text-slate-800">
                  Campus
                  <span className="text-purple-600">
                    Connect
                  </span>
                </h1>

                <p className="text-[10px] text-slate-400">
                  Connecting Campus
                </p>

              </div>

            </div>

          </div>

          {/* Connection */}

          <div className="p-5">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your Connection
            </p>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-3xl">

                  🎭

                  {connected && (
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                  )}

                </div>

                <div className="min-w-0">

                  <h2 className="truncate font-bold text-slate-800">
                    {partner.username ||
                      "Anonymous"}
                  </h2>

                  <p
                    className={`mt-1 text-xs ${
                      connected
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {connected
                      ? "● Online"
                      : "● Offline"}
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50 px-3 py-2 text-center text-xs font-medium text-purple-600">
                {displayPurpose}
              </div>

            </div>

          </div>

          {/* Conversation tip */}

          <div className="mt-auto p-5">

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

              <p className="text-xs font-semibold text-blue-600">
                💡 Conversation Tip
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Don't overthink it. Ask something
                simple and let the conversation
                naturally grow.
              </p>

            </div>

          </div>

        </aside>

        {/* =================================================
            MAIN CHAT
        ================================================= */}

        <section className="flex min-w-0 flex-1 flex-col">

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">

            <div className="flex min-w-0 items-center gap-3">

              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-purple-100 bg-gradient-to-br from-purple-100 to-pink-100 text-2xl shadow-sm"
              >
                🎭

                {connected && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                )}

              </motion.div>

              <div className="min-w-0">

                <h1 className="truncate font-bold text-slate-800">
                  {partner.username ||
                    "Anonymous Student"}
                </h1>

                <div className="flex items-center gap-2 text-xs">

                  <span
                    className={
                      connected
                        ? "text-green-600"
                        : "text-slate-400"
                    }
                  >
                    {connected
                      ? "Online"
                      : "Offline"}
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="truncate text-purple-600">
                    {displayPurpose}
                  </span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/friends"
                  )
                }
                className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 sm:block"
              >
                ← Friends
              </button>

              <motion.button
                onClick={
                  revealIdentity
                }
                disabled={revealing}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-600 transition hover:bg-purple-100 sm:px-4"
              >
                {revealing
                  ? "Revealing..."
                  : "👤 Reveal"}
              </motion.button>

            </div>

          </header>

          {/* =================================================
              MATCH BANNER
          ================================================= */}

          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-5 py-3">

            <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-center text-xs font-medium text-slate-500">

              <span>
                ✨
              </span>

              <span>
                You matched! Start a conversation
                and see where it goes.
              </span>

              <span>
                ✨
              </span>

            </div>

          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-blue-50/40 px-4 py-6 sm:px-8">

            <div className="mx-auto max-w-3xl">

              {/* ERROR */}

              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

                  <div className="text-3xl">
                    ⚠️
                  </div>

                  <p className="mt-2 text-sm font-medium text-red-600">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      window.location.reload()
                    }
                    className="mt-4 rounded-xl bg-red-100 px-5 py-2 text-xs font-semibold text-red-600 hover:bg-red-200"
                  >
                    Try Again
                  </button>

                </div>
              )}

              {/* LOADING */}

              {loadingMessages &&
                !error && (
                  <div className="space-y-5">

                    <div className="flex justify-start">

                      <div className="h-20 w-56 animate-pulse rounded-3xl bg-slate-200" />

                    </div>

                    <div className="flex justify-end">

                      <div className="h-16 w-48 animate-pulse rounded-3xl bg-blue-200" />

                    </div>

                    <div className="flex justify-start">

                      <div className="h-14 w-64 animate-pulse rounded-3xl bg-slate-200" />

                    </div>

                  </div>
                )}

              {/* EMPTY STATE */}

              {!loadingMessages &&
                !error &&
                messages.length === 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mb-8"
                  >

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl">
                          💬
                        </div>

                        <div>

                          <h2 className="font-bold text-slate-800">
                            Break the ice 👋
                          </h2>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            Not sure what to say?
                            Pick a conversation starter
                            and get things moving.
                          </p>

                        </div>

                      </div>

                      {showStarters && (
                        <motion.div
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="mt-5 grid gap-2 sm:grid-cols-2"
                        >

                          {starters.map(
                            (
                              starter,
                              index
                            ) => (
                              <motion.button
                                key={
                                  starter
                                }
                                initial={{
                                  opacity: 0,
                                  x: -10,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay:
                                    index *
                                    0.08,
                                }}
                                onClick={() =>
                                  useStarter(
                                    starter
                                  )
                                }
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                              >
                                {
                                  starter
                                }
                              </motion.button>
                            )
                          )}

                        </motion.div>
                      )}

                    </div>

                  </motion.div>
                )}

              {/* MESSAGE LIST */}

              {!loadingMessages &&
                messages.length > 0 && (
                  <div className="space-y-5">

                    <AnimatePresence
                      initial={false}
                    >

                      {messages.map(
                        (
                          msg,
                          index
                        ) => {

                          const isMe =
                            msg.sender?._id?.toString() ===
                              sender?.toString() ||
                            msg.sender?.toString() ===
                              sender?.toString();

                          return (
                            <motion.div
                              key={
                                msg._id ||
                                `${index}-${msg.createdAt}`
                              }
                              initial={{
                                opacity: 0,
                                y: 12,
                                scale: 0.98,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className={`flex ${
                                isMe
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >

                              <div className="max-w-[85%] sm:max-w-[68%]">

                                <p
                                  className={`mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider ${
                                    isMe
                                      ? "text-right text-purple-500"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {isMe
                                    ? "You"
                                    : "🎭 Anonymous"}
                                </p>

                                <div
                                  className={`rounded-3xl px-5 py-3.5 shadow-sm ${
                                    isMe
                                      ? "rounded-br-md bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                                  }`}
                                >

                                  <p className="break-words text-sm leading-6">
                                    {
                                      msg.text
                                    }
                                  </p>

                                </div>

                                <p
                                  className={`mt-1.5 px-2 text-[10px] ${
                                    isMe
                                      ? "text-right text-slate-400"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {getTime(
                                    msg.createdAt
                                  )}
                                </p>

                              </div>

                            </motion.div>
                          );
                        }
                      )}

                    </AnimatePresence>

                  </div>
                )}

              {/* TYPING */}

              <AnimatePresence>

                {typing && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-5 flex items-end gap-2"
                  >

                    <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">

                      <div className="flex gap-1">

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />

                      </div>

                    </div>

                    <span className="text-[10px] text-slate-400">
                      Anonymous is typing...
                    </span>

                  </motion.div>
                )}

              </AnimatePresence>

              <div ref={bottomRef} />

            </div>

          </div>

          {/* =================================================
              COMPOSER
          ================================================= */}

          <div className="border-t border-slate-200 bg-white p-4 shadow-[0_-5px_20px_rgba(15,23,42,0.04)] sm:p-5">

            <div className="mx-auto max-w-3xl">

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">

                <button
                  type="button"
                  onClick={() =>
                    setText(
                      (prev) =>
                        `${prev} 😊`.trimStart()
                    )
                  }
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition hover:bg-white sm:flex"
                >
                  😊
                </button>

                <input
                  id="chat-input"
                  type="text"
                  placeholder="Start a conversation..."
                  value={text}
                  onChange={
                    handleTyping
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                        "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <motion.button
                  type="button"
                  onClick={
                    sendMessage
                  }
                  disabled={
                    !text.trim() ||
                    !connected
                  }
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ➤
                </motion.button>

              </div>

              <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400">

                <span>
                  🔒
                </span>

                <span>
                  Anonymous conversation · Reveal
                  identity only when you're ready
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}