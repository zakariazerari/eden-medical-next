"use client";
import { useEffect, useState } from "react";

export default function StatsPage() {
  const [stats, setStats] = useState({ confirmed: 0, canceled: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();

        // 🧮 حساب الحالات
        const confirmed = data.filter((b) => b.status === "confirmed").length;
        const canceled = data.filter((b) => b.status === "canceled").length;
        const pending = data.filter((b) => b.status === "pending").length;

        setStats({ confirmed, canceled, pending });
      } catch (error) {
        console.error("❌ Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:ml-64 text-center text-gray-500">
        ⏳ Loading stats...
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-extrabold text-violet-800 drop-shadow-lg mb-8">
        📊 Booking Statistics
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Confirmed */}
        <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
          <h2 className="text-xl font-bold text-green-600">✅ Confirmed</h2>
          <p className="text-4xl font-extrabold mt-4 text-gray-800">
            {stats.confirmed}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
          <h2 className="text-xl font-bold text-yellow-600">⏳ Pending</h2>
          <p className="text-4xl font-extrabold mt-4 text-gray-800">
            {stats.pending}
          </p>
        </div>

        {/* Canceled */}
        <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
          <h2 className="text-xl font-bold text-red-600">❌ Canceled</h2>
          <p className="text-4xl font-extrabold mt-4 text-gray-800">
            {stats.canceled}
          </p>
        </div>
      </div>
    </div>
  );
}
