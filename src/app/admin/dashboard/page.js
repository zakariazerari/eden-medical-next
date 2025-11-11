"use client";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaEnvelope, FaCheckCircle, FaClock } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalMessages: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, statsRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/stats"),
      ]);

      if (!bookingsRes.ok || !statsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const bookings = await bookingsRes.json();
      const statsData = await statsRes.json();

      const bookingsArray = Array.isArray(bookings) ? bookings : [];
      setRecentBookings(bookingsArray.slice(0, 5));

      setStats({
        totalBookings: statsData?.bookings?.totalBookings || 0,
        confirmedBookings: statsData?.bookings?.confirmedBookings || 0,
        pendingBookings: statsData?.bookings?.pendingBookings || 0,
        totalMessages: statsData?.messages?.totalMessages || 0,
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
            Welcome Back, Admin 👋
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Here's what's happening with your business today</p>
        </div>
      </div>

      {/* Stats Grid - 4 Cards Only */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={FaCalendarCheck}
          color="from-blue-500 to-blue-600"
          link="/admin/bookings"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmedBookings}
          icon={FaCheckCircle}
          color="from-green-400 to-green-500"
          link="/admin/bookings"
        />
        <StatCard
          title="Pending"
          value={stats.pendingBookings}
          icon={FaClock}
          color="from-yellow-400 to-yellow-500"
          link="/admin/bookings"
        />
        <StatCard
          title="Messages"
          value={stats.totalMessages}
          icon={FaEnvelope}
          color="from-red-500 to-red-600"
          link="/admin/contact"
        />
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-blue-600 hover:text-blue-700 font-semibold transition text-sm sm:text-base">
            View All →
          </Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-md hover:border-gray-300 transition-all bg-white gap-2 sm:gap-0"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{booking.patientName}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {booking.serviceType} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">
                    📍 {booking.pickup} → 🎯 {booking.destination}
                  </p>
                </div>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold self-start sm:self-auto flex-shrink-0 ${
                    booking.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : booking.status === "canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 text-gray-500">
            <p className="text-base sm:text-lg mb-2">No bookings yet</p>
            <p className="text-xs sm:text-sm">New bookings will appear here</p>
          </div>
        )}
      </div>

      {/* Quick Actions - 2 Only */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link href="/admin/bookings" className="bg-white/15 hover:bg-white/25 p-4 rounded-lg sm:rounded-xl transition-all text-center backdrop-blur-sm border border-white/10">
            <FaCalendarCheck className="text-2xl sm:text-3xl mx-auto mb-2" />
            <p className="font-semibold text-sm sm:text-base">View Bookings</p>
          </Link>
          <Link href="/admin/contact" className="bg-white/15 hover:bg-white/25 p-4 rounded-lg sm:rounded-xl transition-all text-center backdrop-blur-sm border border-white/10">
            <FaEnvelope className="text-2xl sm:text-3xl mx-auto mb-2" />
            <p className="font-semibold text-sm sm:text-base">Messages</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, link }) {
  return (
    <Link href={link}>
      <div className={`bg-gradient-to-br ${color} p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm opacity-90">{title}</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2">{value}</h3>
          </div>
          <Icon className="text-3xl sm:text-4xl lg:text-5xl opacity-80" />
        </div>
      </div>
    </Link>
  );
}