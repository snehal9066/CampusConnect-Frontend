"use client";
import API_URL from "../../services/api";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
       `${API_URL}/api/auth/register`,
        {
          fullName: form.fullName,
          username: form.username,
          department: form.department,
          year: form.year,
          password: form.password,
        }
      );

      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Your CampusConnect Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <input
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <input
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700"
          >
            Register
          </button>

          <p className="text-center text-gray-400">
            Already have an account?
            <Link href="/login" className="text-blue-400 ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}