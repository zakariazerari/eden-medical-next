"use client";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-extrabold text-violet-800 mb-6">
        🚀 Welcome to Admin Dashboard
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/admin/bookings"
          className="p-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-2xl shadow-xl hover:scale-105 transition"
        >
          📅 Manage Bookings
        </Link>
        <Link
          href="/admin/contact"
          className="p-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-xl hover:scale-105 transition"
        >
          📩 Contact
        </Link>
        <Link
          href="/admin/stats"
          className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl hover:scale-105 transition"
        >
          📊 View Stats
        </Link>
      </div>
    </div>
  );
}
