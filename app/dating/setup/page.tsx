"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Sparkles,
  User,
  Image as ImageIcon,
  MessageCircleHeart,
  EyeOff,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_URL from "@/services/api";

const INTEREST_OPTIONS = [
  "Music",
  "Movies",
  "Gaming",
  "Photography",
  "Travel",
  "Food",
  "Fitness",
  "Sports",
  "Coding",
  "Books",
  "Anime",
  "Coffee",
  "Art",
  "Fashion",
  "Dance",
  "Memes",
  "Cars",
  "Tech",
];

const PROMPT_OPTIONS = [
  "The way to win me over is...",
  "My ideal campus date is...",
  "You should know that I...",
  "A random thing I love is...",
  "Let's make a plan to...",
  "My most controversial opinion is...",
];

const DatingSetupPage: React.FC = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [bio, setBio] = useState("");

  const [gender, setGender] = useState("");

  const [interestedIn, setInterestedIn] = useState<string[]>([]);

  const [interests, setInterests] = useState<string[]>([]);

  const [photos, setPhotos] = useState<string[]>([""]);

  const [promptQuestion, setPromptQuestion] =
    useState(PROMPT_OPTIONS[0]);

  const [promptAnswer, setPromptAnswer] =
    useState("");

  const [mysteryModeEnabled, setMysteryModeEnabled] =
    useState(true);

  const totalSteps = 5;

  const toggleInterest = (interest: string) => {
    setInterests((previous) => {
      if (previous.includes(interest)) {
        return previous.filter(
          (item) => item !== interest
        );
      }

      if (previous.length >= 6) {
        return previous;
      }

      return [...previous, interest];
    });
  };

  const toggleInterestedIn = (value: string) => {
    setInterestedIn((previous) => {
      if (previous.includes(value)) {
        return previous.filter(
          (item) => item !== value
        );
      }

      return [...previous, value];
    });
  };

  const updatePhoto = (
    index: number,
    value: string
  ) => {
    setPhotos((previous) =>
      previous.map((photo, photoIndex) =>
        photoIndex === index
          ? value
          : photo
      )
    );
  };

  const addPhotoField = () => {
    if (photos.length < 6) {
      setPhotos((previous) => [
        ...previous,
        "",
      ]);
    }
  };

  const removePhotoField = (
    index: number
  ) => {
    if (photos.length === 1) {
      setPhotos([""]);
      return;
    }

    setPhotos((previous) =>
      previous.filter(
        (_, photoIndex) =>
          photoIndex !== index
      )
    );
  };

  const canContinue = () => {
    if (step === 1) {
      return gender !== "" &&
        interestedIn.length > 0;
    }

    if (step === 2) {
      return true;
    }

    if (step === 3) {
      return interests.length > 0;
    }

    if (step === 4) {
      return promptAnswer.trim().length > 0;
    }

    return true;
  };

  const handleNext = () => {
    if (!canContinue()) {
      setError(
        "Please complete this step before continuing."
      );
      return;
    }

    setError("");

    if (step < totalSteps) {
      setStep((previous) =>
        previous + 1
      );
    }
  };

  const handleBack = () => {
    setError("");

    if (step > 1) {
      setStep((previous) =>
        previous - 1
      );
    } else {
      router.push("/dating");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const token =
        localStorage.getItem("token");

      const cleanPhotos = photos.filter(
        (photo) =>
          photo.trim().length > 0
      );

      const prompts =
        promptAnswer.trim().length > 0
          ? [
              {
                question:
                  promptQuestion,
                answer:
                  promptAnswer.trim(),
              },
            ]
          : [];

      await axios.post(
        `${API_URL}/api/dating/profile`,
        {
          bio: bio.trim(),
          gender,
          interestedIn,
          interests,
          photos: cleanPhotos,
          prompts,
          mysteryModeEnabled,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      router.push("/dating");
    } catch (err: any) {
      console.error(
        "Failed to save dating profile",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to create your dating profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070711] text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.18),transparent_35%)]" />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* HEADER */}

        <header className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-white/5">

          <button
            onClick={handleBack}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-white" />
            </div>

            <div>
              <h1 className="font-bold">
                CampusConnect Dating
              </h1>

              <p className="text-xs text-pink-300">
                Create your vibe
              </p>
            </div>

          </div>

          <div className="text-sm text-slate-400">
            {step}/{totalSteps}
          </div>

        </header>

        {/* PROGRESS */}

        <div className="px-5 md:px-10 pt-6">

          <div className="max-w-2xl mx-auto h-1.5 rounded-full bg-white/5 overflow-hidden">

            <motion.div
              animate={{
                width:
                  `${(step / totalSteps) * 100}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
            />

          </div>

        </div>

        {/* CONTENT */}

        <div className="flex-1 flex items-center justify-center px-5 py-10">

          <div className="w-full max-w-2xl">

            <AnimatePresence mode="wait">

              {/* STEP 1 */}

              {step === 1 && (

                <motion.div
                  key="step1"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                  className="text-center"
                >

                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <User className="w-9 h-9 text-pink-400" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black">
                    Who are you looking for?
                  </h2>

                  <p className="mt-3 text-slate-400">
                    This helps us find compatible
                    people around your campus.
                  </p>

                  <div className="mt-8 text-left">

                    <p className="text-sm font-medium mb-3 text-slate-300">
                      I identify as
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                      {[
                        "male",
                        "female",
                        "other",
                      ].map((item) => (

                        <button
                          key={item}
                          onClick={() =>
                            setGender(item)
                          }
                          className={`py-4 rounded-2xl border capitalize transition ${
                            gender === item
                              ? "bg-pink-500 border-pink-400 text-white"
                              : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {item}
                        </button>

                      ))}

                    </div>

                  </div>

                  <div className="mt-7 text-left">

                    <p className="text-sm font-medium mb-3 text-slate-300">
                      Interested in
                    </p>

                    <div className="grid grid-cols-3 gap-3">

                      {[
                        "male",
                        "female",
                        "other",
                      ].map((item) => {

                        const selected =
                          interestedIn.includes(
                            item
                          );

                        return (
                          <button
                            key={item}
                            onClick={() =>
                              toggleInterestedIn(
                                item
                              )
                            }
                            className={`py-4 rounded-2xl border capitalize transition ${
                              selected
                                ? "bg-purple-500 border-purple-400 text-white"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}

                    </div>

                  </div>

                </motion.div>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <motion.div
                  key="step2"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                >

                  <div className="text-center">

                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <ImageIcon className="w-9 h-9 text-purple-400" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black">
                      Show your vibe
                    </h2>

                    <p className="mt-3 text-slate-400">
                      Add up to 6 photo URLs.
                      You can skip this for now.
                    </p>

                  </div>

                  <div className="mt-8 space-y-3">

                    {photos.map(
                      (photo, index) => (

                        <div
                          key={index}
                          className="flex gap-3"
                        >

                          <input
                            type="url"
                            value={photo}
                            onChange={(e) =>
                              updatePhoto(
                                index,
                                e.target.value
                              )
                            }
                            placeholder={`Photo ${index + 1} URL`}
                            className="flex-1 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-pink-500 text-white placeholder:text-slate-600"
                          />

                          <button
                            onClick={() =>
                              removePhotoField(
                                index
                              )
                            }
                            className="w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20"
                          >
                            <X className="w-5 h-5 text-red-400" />
                          </button>

                        </div>

                      )
                    )}

                  </div>

                  {photos.length < 6 && (

                    <button
                      onClick={addPhotoField}
                      className="mt-4 w-full py-4 rounded-2xl border border-dashed border-white/20 text-slate-400 hover:bg-white/5 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />

                      Add another photo

                    </button>

                  )}

                  <div className="mt-7">

                    <label className="text-sm font-medium text-slate-300">
                      A little about you
                    </label>

                    <textarea
                      value={bio}
                      onChange={(e) =>
                        setBio(
                          e.target.value.slice(
                            0,
                            500
                          )
                        )
                      }
                      placeholder="What makes you, you?"
                      className="mt-3 w-full min-h-[130px] resize-none px-4 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-pink-500 text-white placeholder:text-slate-600"
                    />

                    <p className="text-right text-xs text-slate-500 mt-2">
                      {bio.length}/500
                    </p>

                  </div>

                </motion.div>

              )}

              {/* STEP 3 */}

              {step === 3 && (

                <motion.div
                  key="step3"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                >

                  <div className="text-center">

                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Sparkles className="w-9 h-9 text-cyan-400" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black">
                      What are you into?
                    </h2>

                    <p className="mt-3 text-slate-400">
                      Pick up to 6 interests.
                      These can create instant
                      conversation starters.
                    </p>

                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mt-9">

                    {INTEREST_OPTIONS.map(
                      (interest) => {

                        const selected =
                          interests.includes(
                            interest
                          );

                        return (
                          <button
                            key={interest}
                            onClick={() =>
                              toggleInterest(
                                interest
                              )
                            }
                            className={`px-5 py-3 rounded-full border transition ${
                              selected
                                ? "bg-pink-500 border-pink-400 text-white"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }`}
                          >
                            {selected && (
                              <Check className="inline w-4 h-4 mr-2" />
                            )}

                            {interest}
                          </button>
                        );
                      }
                    )}

                  </div>

                  <p className="text-center text-sm text-slate-500 mt-6">
                    {interests.length}/6 selected
                  </p>

                </motion.div>

              )}

              {/* STEP 4 */}

              {step === 4 && (

                <motion.div
                  key="step4"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                >

                  <div className="text-center">

                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                      <MessageCircleHeart className="w-9 h-9 text-pink-400" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black">
                      Give them something to reply to
                    </h2>

                    <p className="mt-3 text-slate-400">
                      A good answer can start
                      an unexpectedly good conversation.
                    </p>

                  </div>

                  <select
                    value={promptQuestion}
                    onChange={(e) =>
                      setPromptQuestion(
                        e.target.value
                      )
                    }
                    className="mt-9 w-full px-4 py-4 rounded-2xl bg-[#141421] border border-white/10 outline-none focus:border-pink-500 text-white"
                  >

                    {PROMPT_OPTIONS.map(
                      (prompt) => (

                        <option
                          key={prompt}
                          value={prompt}
                        >
                          {prompt}
                        </option>

                      )
                    )}

                  </select>

                  <textarea
                    value={promptAnswer}
                    onChange={(e) =>
                      setPromptAnswer(
                        e.target.value.slice(
                          0,
                          300
                        )
                      )
                    }
                    placeholder="Your answer..."
                    className="mt-4 w-full min-h-[180px] resize-none px-5 py-5 rounded-3xl bg-white/5 border border-white/10 outline-none focus:border-pink-500 text-white placeholder:text-slate-600 text-lg"
                  />

                  <p className="text-right text-xs text-slate-500 mt-2">
                    {promptAnswer.length}/300
                  </p>

                </motion.div>

              )}

              {/* STEP 5 */}

              {step === 5 && (

                <motion.div
                  key="step5"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                  className="text-center"
                >

                  <div className="w-24 h-24 mx-auto mb-7 rounded-[32px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <EyeOff className="w-11 h-11 text-purple-300" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm">
                    <Sparkles className="w-4 h-4" />

                    The CampusConnect Secret Feature

                  </div>

                  <h2 className="mt-6 text-3xl md:text-5xl font-black">
                    Mystery Mode
                  </h2>

                  <p className="max-w-xl mx-auto mt-4 text-slate-400 leading-relaxed">
                    Turn dating into a little mystery.
                    Your profile can stay mysterious
                    until the right moment.
                  </p>

                  <div className="mt-9 p-6 rounded-[28px] bg-white/5 border border-white/10 text-left">

                    <div className="flex items-start justify-between gap-6">

                      <div>

                        <h3 className="font-bold text-lg">
                          Enable Mystery Mode
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Add an extra layer of surprise
                          to your CampusConnect dating
                          experience.
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          setMysteryModeEnabled(
                            !mysteryModeEnabled
                          )
                        }
                        className={`relative w-16 h-9 rounded-full transition ${
                          mysteryModeEnabled
                            ? "bg-gradient-to-r from-pink-500 to-purple-600"
                            : "bg-white/10"
                        }`}
                      >

                        <motion.div
                          animate={{
                            x:
                              mysteryModeEnabled
                                ? 30
                                : 4,
                          }}
                          className="absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg"
                        />

                      </button>

                    </div>

                  </div>

                  <div className="mt-8 p-5 rounded-2xl bg-pink-500/5 border border-pink-500/10">

                    <p className="text-sm text-pink-200">
                      💘 Your profile will only be
                      shown to verified CUSAT students
                      who match your preferences.
                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

            {/* ERROR */}

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
                className="mt-6 text-center text-sm text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>

            )}

            {/* BUTTONS */}

            <div className="flex gap-4 mt-10">

              <button
                onClick={handleBack}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
              >
                Back
              </button>

              {step < totalSteps ? (

                <button
                  onClick={handleNext}
                  className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition font-bold flex items-center justify-center gap-2"
                >
                  Continue

                  <ArrowRight className="w-5 h-5" />
                </button>

              ) : (

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >

                  {saving ? (

                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />

                      Creating your profile...

                    </>

                  ) : (

                    <>
                      <Heart className="w-5 h-5 fill-white" />

                      Enter Dating

                    </>

                  )}

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default DatingSetupPage;