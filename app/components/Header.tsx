"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  IconPhoto,
  IconVideo,
  IconSparkles,
  IconLogout,
} from "@tabler/icons-react";

import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");

      toast.success("Logged out successfully");

      setUser(null);

      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <IconSparkles
            size={28}
            className="text-blue-500"
          />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            CloudAI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            href="/social-share"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <IconPhoto size={18} />
            Images
          </Link>

          <Link
            href="/video-upload"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <IconVideo size={18} />
            Videos
          </Link>
        </nav>

        {/* Right Side */}
        {loading ? (
          <div className="loading loading-spinner loading-sm"></div>
        ) : user ? (
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">
                {user.username}
              </p>

              <p className="text-xs text-slate-400">
                {user.email}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
            >
              <IconLogout size={18} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}