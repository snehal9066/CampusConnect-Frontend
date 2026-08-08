"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [anonymousChat, setAnonymousChat] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [messageNotifications, setMessageNotifications] =
    useState(true);
  const [matchNotifications, setMatchNotifications] =
    useState(true);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem(
      "campusConnectSettings"
    );

    if (settings) {
      try {
        const data = JSON.parse(settings);

        setNotifications(
          data.notifications ?? true
        );

        setAnonymousChat(
          data.anonymousChat ?? true
        );

        setProfileVisibility(
          data.profileVisibility ?? true
        );

        setMessageNotifications(
          data.messageNotifications ?? true
        );

        setMatchNotifications(
          data.matchNotifications ?? true
        );
      } catch {
        console.log(
          "Unable to load settings"
        );
      }
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      notifications,
      anonymousChat,
      profileVisibility,
      messageNotifications,
      matchNotifications,
    };

    localStorage.setItem(
      "campusConnectSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("matchId");
    localStorage.removeItem("partner");
    localStorage.removeItem("matchPurpose");

    window.location.href = "/login";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040714] text-white">

      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-700/15 blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-700/15 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-pink-600/10 blur-[150px]" />

      </div>

      {/* Navigation */}

      <nav className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
              🎓
            </div>

            <div>

              <h1 className="text-lg font-bold">
                Campus
                <span className="text-purple-400">
                  Connect
                </span>
              </h1>

              <p className="text-[10px] text-slate-500">
                Connecting Campus
              </p>

            </div>

          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ← Dashboard
          </Link>

        </div>

      </nav>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 md:py-14">

        {/* Header */}

        <div className="mb-10">

          <p className="text-sm font-semibold tracking-wider text-purple-300">
            CAMPUSCONNECT
          </p>

          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Manage your privacy, notifications,
            and CampusConnect experience.
          </p>

        </div>

        {/* =========================================
            NOTIFICATIONS
        ========================================= */}

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
              🔔
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Control how CampusConnect
                keeps you updated.
              </p>
            </div>

          </div>

          <div className="space-y-2">

            <SettingToggle
              title="Enable Notifications"
              description="Receive CampusConnect notifications."
              enabled={notifications}
              onChange={setNotifications}
            />

            <SettingToggle
              title="New Messages"
              description="Get notified when someone sends you a message."
              enabled={
                messageNotifications
              }
              onChange={
                setMessageNotifications
              }
              disabled={!notifications}
            />

            <SettingToggle
              title="New Matches"
              description="Get notified when you find a new connection."
              enabled={
                matchNotifications
              }
              onChange={
                setMatchNotifications
              }
              disabled={!notifications}
            />

          </div>

        </section>

        {/* =========================================
            PRIVACY
        ========================================= */}

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
              🔒
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Privacy
              </h2>

              <p className="text-sm text-slate-500">
                Control what other students can
                see about you.
              </p>
            </div>

          </div>

          <div className="space-y-2">

            <SettingToggle
              title="Anonymous Chat"
              description="Keep your identity hidden until both users agree to reveal it."
              enabled={anonymousChat}
              onChange={setAnonymousChat}
            />

            <SettingToggle
              title="Profile Visibility"
              description="Allow your profile information to be visible to your connections."
              enabled={
                profileVisibility
              }
              onChange={
                setProfileVisibility
              }
            />

          </div>

        </section>

        {/* =========================================
            CONNECTION
        ========================================= */}

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-2xl">
              💫
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Connection Preferences
              </h2>

              <p className="text-sm text-slate-500">
                Your matching preferences can be
                changed from your profile.
              </p>
            </div>

          </div>

          <Link
            href="/profile"
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-purple-400/30 hover:bg-purple-500/5"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                👤
              </div>

              <div>

                <h3 className="font-semibold">
                  Edit Matching Preferences
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Purpose, gender, interested in,
                  and interests
                </p>

              </div>

            </div>

            <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-purple-300">
              →
            </span>

          </Link>

        </section>

        {/* =========================================
            SAFETY
        ========================================= */}

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-2xl">
              🛡️
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Safety & Privacy
              </h2>

              <p className="text-sm text-slate-500">
                Stay safe while connecting with
                other students.
              </p>
            </div>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-red-400/20 hover:bg-red-500/5"
            >
              <div className="text-xl">
                🚫
              </div>

              <h3 className="mt-2 font-semibold">
                Blocked Users
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Manage people you have blocked.
              </p>
            </button>

            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-orange-400/20 hover:bg-orange-500/5"
            >
              <div className="text-xl">
                ⚠️
              </div>

              <h3 className="mt-2 font-semibold">
                Safety Guidelines
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Learn how to stay safe on CampusConnect.
              </p>
            </button>

          </div>

        </section>

        {/* =========================================
            SAVE
        ========================================= */}

        <div className="mb-8">

          <button
            type="button"
            onClick={saveSettings}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-4 font-bold shadow-xl transition hover:-translate-y-1 hover:shadow-purple-500/20"
          >
            💾 Save Settings
          </button>

          {saved && (
            <p className="mt-3 text-center text-sm font-medium text-green-400">
              ✓ Settings saved successfully
            </p>
          )}

        </div>

        {/* =========================================
            LOGOUT
        ========================================= */}

        <section className="rounded-3xl border border-red-400/10 bg-red-500/[0.03] p-6">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-bold">
                Sign out of CampusConnect
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                You'll need to log in again to
                access your account.
              </p>

            </div>

            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-red-400/20 bg-red-500/10 px-6 py-3 font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              🚪 Logout
            </button>

          </div>

        </section>

        {/* Footer */}

        <p className="mt-10 text-center text-xs text-white/20">
          CampusConnect · Connecting Campus.
          Creating Connections.
        </p>

      </div>

    </main>
  );
}

// ======================================================
// TOGGLE COMPONENT
// ======================================================

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
  disabled = false,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 rounded-2xl p-4 transition ${
        disabled
          ? "opacity-40"
          : "hover:bg-white/[0.03]"
      }`}
    >

      <div>

        <h3 className="font-medium">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange(!enabled)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-purple-600"
            : "bg-slate-700"
        } ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >

        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}