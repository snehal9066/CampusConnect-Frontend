"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../services/api";

interface ProfileForm {
  username: string;
  bio: string;
  age: string;
  gender: string;
  interestedIn: string;
  location: string;
  interests: string;
}

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    username: "",
    bio: "",
    age: "",
    gender: "Male",
    interestedIn: "Female",
    location: "",
    interests: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState("");

 useEffect(() => {
  const loadProfile = async () => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) return;

      const user = JSON.parse(savedUser);

      const res = await axios.get(
        `${API_URL}/api/profile/${user.username}`
      );

      const profile = res.data;

      setProfileImage(profile.profileImage || "");

      setForm({
        username: profile.username || "",
        bio: profile.bio || "",
        age: profile.age ? String(profile.age) : "",
        gender: profile.gender || "Male",
        interestedIn: profile.interestedIn || "Female",
        location: profile.location || "",
        interests: Array.isArray(profile.interests)
          ? profile.interests.join(", ")
          : "",
      });

      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error(error);
    }
  };

  loadProfile();
}, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("username", form.username);
      formData.append("image", image);

      const res = await axios.post(
  `${API_URL}/api/profile/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileImage(res.data.user.profileImage);
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload Failed");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API_URL}/api/profile/update`,
      {
        username: form.username,
        bio: form.bio,
        age: Number(form.age),
        gender: form.gender,
        interestedIn: form.interestedIn,
        location: form.location,
        interests: form.interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    localStorage.setItem("user", JSON.stringify(res.data.user));
   setForm({
  username: res.data.user.username || "",
  bio: res.data.user.bio || "",
  age: res.data.user.age ? String(res.data.user.age) : "",
  gender: res.data.user.gender || "Male",
  interestedIn: res.data.user.interestedIn || "Female",
  location: res.data.user.location || "",
  interests: res.data.user.interests
    ? res.data.user.interests.join(", ")
    : "",
});
  } catch (err: any) {
  console.log(err);

  if (err.response) {
    alert(
      `Status: ${err.response.status}\nMessage: ${
        err.response.data?.message || "Unknown error"
      }`
    );
  } else if (err.request) {
    alert("No response from backend");
  } else {
    alert(err.message);
  }
}
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 py-10 px-5">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

          {/* Cover */}

          <div className="h-44 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"></div>

          {/* Avatar */}

          <div className="-mt-20 flex flex-col items-center">

            {image ? (
  <img
    src={URL.createObjectURL(image)}
    alt="Profile"
    className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl"
  />
) : profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl"
  />
) : (
  <div className="w-40 h-40 rounded-full bg-slate-700 border-4 border-white flex items-center justify-center text-7xl shadow-xl">
    👤
  </div>
)}

            <h1 className="mt-5 text-4xl font-bold text-white">
              {form.username}
            </h1>

            <p className="text-slate-300 mt-2">
              🎓 CampusConnect Student
            </p>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 p-10">

            <div className="bg-white/10 rounded-2xl p-6 text-center">

              <div className="text-4xl">❤️</div>

              <h2 className="text-white mt-3 font-semibold">
                Matches
              </h2>

              <p className="text-3xl text-blue-300 mt-2">
                0
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6 text-center">

              <div className="text-4xl">💬</div>

              <h2 className="text-white mt-3 font-semibold">
                Chats
              </h2>

              <p className="text-3xl text-blue-300 mt-2">
                0
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6 text-center">

              <div className="text-4xl">👥</div>

              <h2 className="text-white mt-3 font-semibold">
                Friends
              </h2>

              <p className="text-3xl text-blue-300 mt-2">
                0
              </p>

            </div>

          </div>

          {/* Upload */}

          <div className="px-10">

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (
                  e.target.files &&
                  e.target.files[0]
                ) {
                  setImage(e.target.files[0]);
                }
              }}
              className="text-white"
            />

            <button
              type="button"
              onClick={handleUploadImage}
              className="mt-5 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-semibold transition"
            >
              📷 Upload Profile Picture
            </button>

            <form
              onSubmit={handleSave}
              className="mt-10 space-y-6"
            >

                          {/* Bio */}

              <div>
                <label className="block text-white font-semibold mb-2">
                  📝 Bio
                </label>

                <textarea
                  name="bio"
                  rows={4}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell everyone about yourself..."
                  className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none focus:border-blue-400"
                />
              </div>

              {/* Age & Location */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-white font-semibold mb-2">
                    🎂 Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none"
                  />

                </div>

                <div>

                  <label className="block text-white font-semibold mb-2">
                    📍 Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none"
                  />

                </div>

              </div>

              {/* Gender & Interested In */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-white font-semibold mb-2">
                    🚻 Gender
                  </label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-800 border border-white/20 p-4 text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                </div>

                <div>

                  <label className="block text-white font-semibold mb-2">
                    ❤️ Interested In
                  </label>

                  <select
                    name="interestedIn"
                    value={form.interestedIn}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-800 border border-white/20 p-4 text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Everyone">Everyone</option>
                  </select>

                </div>

              </div>

              {/* Interests */}

              <div>

                <label className="block text-white font-semibold mb-2">
                  🎯 Interests
                </label>

                <input
                  type="text"
                  name="interests"
                  value={form.interests}
                  onChange={handleChange}
                  placeholder="Coding, AI, Music, Cricket..."
                  className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none"
                />

              </div>

              {/* Buttons */}

              <div className="flex flex-col md:flex-row gap-5 pt-4">

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-white font-bold hover:scale-105 transition"
                >
                  💾 Save Profile
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 py-4 rounded-xl text-white font-bold transition"
                >
                  🚪 Logout
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>

  );

}