"use client";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaEnvelope, FaCheckCircle, FaClock, FaUsers, FaStar } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalMessages: 0,
    totalDrivers: 0,
    totalReviews: 0,
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
        totalDrivers: statsData?.drivers?.totalDrivers || 0,
        totalReviews: statsData?.reviews?.totalReviews || 0,
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
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome Back, Admin 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your business today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <StatCard
          title="Drivers"
          value={stats.totalDrivers}
          icon={FaUsers}
          color="from-gray-600 to-gray-700"
          link="/admin/drivers"
        />
        <StatCard
          title="Reviews"
          value={stats.totalReviews}
          icon={FaStar}
          color="from-red-600 to-red-700"
          link="/admin/reviews"
        />
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-blue-600 hover:text-blue-700 font-semibold transition">
            View All →
          </Link>
        </div>

        {recentBookings.length > 0 ? (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all bg-white"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{booking.patientName}</h3>
                  <p className="text-sm text-gray-600">
                    {booking.serviceType} • {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📍 {booking.pickup} → 🎯 {booking.destination}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
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
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No bookings yet</p>
            <p className="text-sm">New bookings will appear here</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/bookings" className="bg-white/15 hover:bg-white/25 p-4 rounded-xl transition-all text-center backdrop-blur-sm border border-white/10">
            <FaCalendarCheck className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">View Bookings</p>
          </Link>
          <Link href="/admin/drivers" className="bg-white/15 hover:bg-white/25 p-4 rounded-xl transition-all text-center backdrop-blur-sm border border-white/10">
            <FaUsers className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">Manage Drivers</p>
          </Link>
          <Link href="/admin/reviews" className="bg-white/15 hover:bg-white/25 p-4 rounded-xl transition-all text-center backdrop-blur-sm border border-white/10">
            <FaStar className="text-3xl mx-auto mb-2" />
            <p className="font-semibold">Review Management</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, link }) {
  return (
    <Link href={link}>
      <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{title}</p>
            <h3 className="text-4xl font-bold mt-2">{value}</h3>
          </div>
          <Icon className="text-5xl opacity-80" />
        </div>
      </div>
    </Link>
  );
}
