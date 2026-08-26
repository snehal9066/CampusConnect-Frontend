"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API_URL from "@/services/api";

interface User {
  _id: string;
  fullName: string;
  username: string;
  department: string;
  year: string;
  role: "user" | "admin";
  isSuspended: boolean;
  verified: boolean;
  profileImage?: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  suspendedUsers: number;
  adminUsers: number;
  activeUsers: number;
}

interface CurrentUser {
  _id?: string;
  id?: string;
  fullName?: string;
  username?: string;
  role?: string;
}

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getHeaders = () => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // ==========================================
  // FRONTEND ADMIN ACCESS CHECK
  // ==========================================

  const checkAdminAccess = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return false;
    }

    // Try common storage keys used by the app
    const storedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("currentUser");

    if (!storedUser) {
      router.replace("/dashboard");
      return false;
    }

    try {
      const user: CurrentUser = JSON.parse(storedUser);

      if (user.role !== "admin") {
        router.replace("/dashboard");
        return false;
      }

      setAuthorized(true);
      return true;
    } catch (error) {
      console.error("Failed to verify frontend admin access:", error);

      localStorage.removeItem("token");

      router.replace("/login");
      return false;
    }
  };

  // ==========================================
  // FETCH ADMIN DATA
  // ==========================================

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const [statsResponse, usersResponse] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`, {
          headers: getHeaders(),
        }),
        fetch(`${API_URL}/api/admin/users`, {
          headers: getHeaders(),
        }),
      ]);

      // Unauthorized
      if (
        statsResponse.status === 401 ||
        usersResponse.status === 401
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");

        router.replace("/login");
        return;
      }

      // Forbidden — backend says this user is not an admin
      if (
        statsResponse.status === 403 ||
        usersResponse.status === 403
      ) {
        router.replace("/dashboard");
        return;
      }

      if (!statsResponse.ok || !usersResponse.ok) {
        throw new Error(
          `Admin API failed. Stats: ${statsResponse.status}, Users: ${usersResponse.status}`
        );
      }

      const statsData = await statsResponse.json();
      const usersData = await usersResponse.json();

      setStats(statsData);
      setUsers(usersData);
    } catch (err) {
      console.error("Admin dashboard error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load admin dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL ACCESS CHECK
  // ==========================================

  useEffect(() => {
    const isAdmin = checkAdminAccess();

    if (isAdmin) {
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // SUSPEND / UNSUSPEND USER
  // ==========================================

  const toggleSuspension = async (user: User) => {
    try {
      setActionLoading(user._id);

      const endpoint = user.isSuspended
        ? `${API_URL}/api/admin/users/${user._id}/unsuspend`
        : `${API_URL}/api/admin/users/${user._id}/suspend`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");

        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        router.replace("/dashboard");
        return;
      }

      if (!response.ok) {
        alert(data.message || "Action failed");
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser._id === user._id
            ? {
                ...currentUser,
                isSuspended: !currentUser.isSuspended,
              }
            : currentUser
        )
      );

      // Refresh statistics
      const statsResponse = await fetch(
        `${API_URL}/api/admin/stats`,
        {
          headers: getHeaders(),
        }
      );

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("User action error:", err);
      alert("Something went wrong while updating the user.");
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    );
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading || !authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="text-white/60">
            Checking access...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] p-6 text-white">
        <div className="max-w-lg rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h1 className="text-xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm text-white/60">
            {error}
          </p>

          <button
            onClick={fetchAdminData}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/40">
              CampusConnect
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-white/50">
              Manage users and monitor your CampusConnect platform.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* STATS */}

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            subtitle="Registered accounts"
          />

          <StatCard
            title="Active Users"
            value={stats?.activeUsers ?? 0}
            subtitle="Currently allowed"
          />

          <StatCard
            title="Suspended"
            value={stats?.suspendedUsers ?? 0}
            subtitle="Restricted accounts"
          />

          <StatCard
            title="Administrators"
            value={stats?.adminUsers ?? 0}
            subtitle="Platform managers"
          />
        </div>

        {/* USER MANAGEMENT */}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">
                User Management
              </h2>

              <p className="mt-1 text-sm text-white/45">
                {filteredUsers.length} user
                {filteredUsers.length !== 1 ? "s" : ""} shown
              </p>
            </div>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25 md:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-white/35">
                <tr>
                  <th className="px-6 py-4 font-medium">
                    User
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Department
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Year
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Role
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-white/[0.06] transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold">
                          {user.fullName?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </div>

                        <div>
                          <p className="font-medium">
                            {user.fullName}
                          </p>

                          <p className="text-sm text-white/40">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-white/65">
                      {user.department}
                    </td>

                    <td className="px-6 py-5 text-sm text-white/65">
                      {user.year}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500/15 text-purple-300"
                            : "bg-white/5 text-white/60"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.isSuspended
                            ? "bg-red-500/15 text-red-300"
                            : "bg-emerald-500/15 text-emerald-300"
                        }`}
                      >
                        {user.isSuspended
                          ? "Suspended"
                          : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      {user.role === "admin" ? (
                        <span className="text-xs text-white/30">
                          Protected
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleSuspension(user)}
                          disabled={actionLoading === user._id}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            user.isSuspended
                              ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                              : "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                          }`}
                        >
                          {actionLoading === user._id
                            ? "Please wait..."
                            : user.isSuspended
                            ? "Unsuspend"
                            : "Suspend"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center text-white/40">
                No users found.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]">
      <p className="text-sm text-white/45">
        {title}
      </p>

      <p className="mt-3 text-4xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/30">
        {subtitle}
      </p>
    </div>
  );
}