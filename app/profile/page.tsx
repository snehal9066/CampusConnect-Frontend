"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import API_URL from "../../services/api";

interface ProfileForm {
  username: string;
  bio: string;
  age: string;
  gender: string;
  location: string;
  interests: string;
}

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    username: "",
    bio: "",
    age: "",
    gender: "Male",
    location: "",
    interests: "",
  });

  const [image, setImage] =
    useState<File | null>(null);

  const [profileImage, setProfileImage] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedUser =
          localStorage.getItem("user");

        if (!savedUser) return;

        const user =
          JSON.parse(savedUser);

        const res = await axios.get(
          `${API_URL}/api/profile/${user.username}`
        );

        const profile = res.data;

        setProfileImage(
          profile.profileImage || ""
        );

        setForm({
          username:
            profile.username || "",

          bio:
            profile.bio || "",

          age: profile.age
            ? String(profile.age)
            : "",

          gender:
            profile.gender || "Male",

          location:
            profile.location || "",

          interests:
            Array.isArray(profile.interests)
              ? profile.interests.join(", ")
              : "",
        });

        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );
      } catch (err) {
        console.error(
          "Profile loading error:",
          err
        );
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };

  // ==========================================
  // UPLOAD PROFILE IMAGE
  // ==========================================

  const handleUploadImage = async () => {
    if (!image) {
      setError(
        "Please select an image first."
      );
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append(
        "username",
        form.username
      );

      formData.append(
        "image",
        image
      );

      const res = await axios.post(
        `${API_URL}/api/profile/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const newProfileImage =
        res.data.user?.profileImage || "";

      setProfileImage(
        newProfileImage
      );

      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          profileImage:
            newProfileImage,
        })
      );

      setImage(null);

      setMessage(
        "Profile picture updated successfully."
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Profile picture upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Please login again."
        );
        return;
      }

      const res = await axios.put(
        `${API_URL}/api/profile/update`,
        {
          username:
            form.username,

          bio:
            form.bio,

          age: form.age
            ? Number(form.age)
            : null,

          gender:
            form.gender,

          location:
            form.location,

          interests:
            form.interests
              .split(",")
              .map((i) =>
                i.trim()
              )
              .filter(Boolean),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const updatedUser =
        res.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setProfileImage(
        updatedUser.profileImage ||
          profileImage
      );

      setForm({
        username:
          updatedUser.username || "",

        bio:
          updatedUser.bio || "",

        age:
          updatedUser.age
            ? String(updatedUser.age)
            : "",

        gender:
          updatedUser.gender ||
          "Male",

        location:
          updatedUser.location || "",

        interests:
          Array.isArray(
            updatedUser.interests
          )
            ? updatedUser.interests.join(", ")
            : "",
      });

      setMessage(
        "Profile saved successfully! ✨"
      );
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            "Unable to update profile."
        );
      } else if (err.request) {
        setError(
          "No response from backend."
        );
      } else {
        setError(
          err.message ||
            "Something went wrong."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "matchId"
    );

    localStorage.removeItem(
      "partner"
    );

    localStorage.removeItem(
      "matchPurpose"
    );

    window.location.href =
      "/login";
  };

  // ==========================================
  // IMAGE PREVIEW
  // ==========================================

  const previewImage = image
    ? URL.createObjectURL(image)
    : profileImage;

  // ==========================================
  // INTEREST TAGS
  // ==========================================

  const interestTags =
    form.interests
      .split(",")
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ====================================== */}
      {/* BACKGROUND */}
      {/* ====================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]"
        />

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/[0.04] blur-[150px]" />

      </div>

      {/* ====================================== */}
      {/* NAVBAR */}
      {/* ====================================== */}

      <nav className="relative z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
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

      {/* ====================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================== */}

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl"
        >

          {/* COVER */}

          <div className="h-44 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500" />

          {/* AVATAR */}

          <div className="-mt-20 flex flex-col items-center px-5">

            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-slate-700 text-7xl shadow-xl">
                👤
              </div>
            )}

            <h1 className="mt-5 text-center text-4xl font-bold text-white">
              {form.username ||
                "Your Profile"}
            </h1>

            <p className="mt-2 text-slate-300">
              🎓 CampusConnect Student
            </p>

          </div>

          {/* ====================================== */}
          {/* FORM */}
          {/* ====================================== */}

          <form
            onSubmit={handleSave}
            className="px-6 pb-8 pt-10 sm:px-10"
          >

            {/* PERSONAL INFORMATION */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Personal Information
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Tell us about yourself
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* USERNAME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={
                      form.username
                    }
                    disabled
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/40 p-4 text-sm text-slate-400 outline-none"
                  />

                </div>

                {/* AGE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    min="13"
                    max="100"
                    value={form.age}
                    onChange={
                      handleChange
                    }
                    placeholder="Your age"
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-500/10"
                  />

                </div>

              </div>

              {/* BIO */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={
                    handleChange
                  }
                  rows={4}
                  placeholder="Tell other students a little about yourself..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-500/10"
                />

              </div>

              {/* GENDER + LOCATION */}

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* GENDER */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    🚻 Gender
                  </label>

                  <select
                    name="gender"
                    value={
                      form.gender
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-800 p-4 text-sm text-white outline-none focus:border-purple-400/40"
                  >
                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                </div>

                {/* LOCATION */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    📍 Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={
                      form.location
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Where are you from?"
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-500/10"
                  />

                </div>

              </div>

            </div>

            {/* ====================================== */}
            {/* INTERESTS */}
            {/* ====================================== */}

            <div className="mt-8">

              <label className="mb-2 block text-sm font-semibold">
                🎯 Your Interests
              </label>

              <input
                type="text"
                name="interests"
                value={
                  form.interests
                }
                onChange={
                  handleChange
                }
                placeholder="Coding, AI, Music, Cricket..."
                className="w-full rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-500/10"
              />

              {interestTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {interestTags.map(
                    (
                      interest,
                      index
                    ) => (
                      <span
                        key={`${interest}-${index}`}
                        className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300"
                      >
                        {interest}
                      </span>
                    )
                  )}

                </div>
              )}

              <p className="mt-2 text-xs text-slate-600">
                Separate interests with commas.
              </p>

            </div>

            {/* ====================================== */}
            {/* PROFILE IMAGE */}
            {/* ====================================== */}

            <div className="mt-10 border-t border-white/10 pt-8">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Profile Picture
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Make your profile yours
                </h2>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    {previewImage ? (

                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                    ) : (

                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                        👤
                      </div>

                    )}

                    <div>

                      <h3 className="font-semibold">
                        Profile photo
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        JPG, PNG or WEBP
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3 sm:items-end">

                    <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-white/10">

                      Choose Image

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (
                            e.target.files &&
                            e.target.files[0]
                          ) {
                            setImage(
                              e.target.files[0]
                            );
                          }
                        }}
                      />

                    </label>

                    <button
                      type="button"
                      onClick={
                        handleUploadImage
                      }
                      disabled={
                        uploading ||
                        !image
                      }
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {uploading
                        ? "Uploading..."
                        : "📷 Upload Picture"}
                    </button>

                  </div>

                </div>

              </div>

            </div>

            {/* STATUS */}

            {message && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-7 rounded-2xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-300"
              >
                ✓ {message}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-7 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* BUTTONS */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "💾 Save Profile"}
              </button>

              <Link
                href="/dashboard"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Link>

            </div>

          </form>

          {/* ====================================== */}
          {/* ACCOUNT */}
          {/* ====================================== */}

          <div className="border-t border-white/10 px-6 py-8 sm:px-10">

            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

              <div>

                <p className="text-sm font-semibold">
                  Account
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Sign out of your CampusConnect
                  account on this device.
                </p>

              </div>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                🚪 Logout
              </button>

            </div>

          </div>

        </motion.div>

      </div>

      {/* FOOTER */}

      <footer className="relative z-10 py-8 text-center text-xs text-slate-600">
        CampusConnect · Connecting Campus.
        Creating Connections.
      </footer>

    </main>
  );
}