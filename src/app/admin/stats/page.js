"use client";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaEnvelope, FaCheckCircle, FaClock, FaTimesCircle, FaUsers, FaStar } from "react-icons/fa";

export default function StatsPage() {
  const [stats, setStats] = useState({
    bookings: { totalBookings: 0, confirmedBookings: 0, canceledBookings: 0, pendingBookings: 0, recentBookings: 0 },
    messages: { totalMessages: 0, pendingMessages: 0, confirmedMessages: 0, canceledMessages: 0, recentMessages: 0 },
    drivers: { totalDrivers: 0, activeDrivers: 0, inactiveDrivers: 0 },
    reviews: { totalReviews: 0, approvedReviews: 0, pendingReviews: 0, averageRating: 0, recentReviews: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      
      if (!res.ok) throw new Error("Failed to fetch stats");
      
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
      </div>
    );
  }

  const { bookings, messages, drivers, reviews } = stats;

  return (
    <div className="p-6 md:ml-64 space-y-8">
      <h1 className="text-3xl font-extrabold text-violet-800">Statistics & Analytics</h1>

      {/* Bookings Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Bookings Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value={bookings.totalBookings}
            icon={FaCalendarCheck}
            color="from-blue-500 to-blue-600"
            percentage={100}
          />
          <StatCard
            title="Confirmed"
            value={bookings.confirmedBookings}
            icon={FaCheckCircle}
            color="from-green-500 to-green-600"
            percentage={(bookings.confirmedBookings / bookings.totalBookings) * 100 || 0}
          />
          <StatCard
            title="Pending"
            value={bookings.pendingBookings}
            icon={FaClock}
            color="from-yellow-500 to-yellow-600"
            percentage={(bookings.pendingBookings / bookings.totalBookings) * 100 || 0}
          />
          <StatCard
            title="Canceled"
            value={bookings.canceledBookings}
            icon={FaTimesCircle}
            color="from-red-500 to-red-600"
            percentage={(bookings.canceledBookings / bookings.totalBookings) * 100 || 0}
          />
        </div>
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <p className="text-blue-800">
            <strong>📊 Recent Activity:</strong> {bookings.recentBookings} bookings in the last 7 days
          </p>
        </div>
      </div>

      {/* Messages Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📧 Messages Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Messages"
            value={messages.totalMessages}
            icon={FaEnvelope}
            color="from-purple-500 to-purple-600"
            percentage={100}
          />
          <StatCard
            title="Confirmed"
            value={messages.confirmedMessages}
            icon={FaCheckCircle}
            color="from-green-500 to-green-600"
            percentage={(messages.confirmedMessages / messages.totalMessages) * 100 || 0}
          />
          <StatCard
            title="Pending"
            value={messages.pendingMessages}
            icon={FaClock}
            color="from-yellow-500 to-yellow-600"
            percentage={(messages.pendingMessages / messages.totalMessages) * 100 || 0}
          />
          <StatCard
            title="Canceled"
            value={messages.canceledMessages}
            icon={FaTimesCircle}
            color="from-red-500 to-red-600"
            percentage={(messages.canceledMessages / messages.totalMessages) * 100 || 0}
          />
        </div>
        <div className="mt-4 bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
          <p className="text-purple-800">
            <strong>📊 Recent Activity:</strong> {messages.recentMessages} messages in the last 7 days
          </p>
        </div>
      </div>

      {/* Drivers Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🚗 Drivers Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Drivers"
            value={drivers.totalDrivers}
            icon={FaUsers}
            color="from-indigo-500 to-indigo-600"
            percentage={100}
          />
          <StatCard
            title="Active Drivers"
            value={drivers.activeDrivers}
            icon={FaCheckCircle}
            color="from-green-500 to-green-600"
            percentage={(drivers.activeDrivers / drivers.totalDrivers) * 100 || 0}
          />
          <StatCard
            title="Hidden Drivers"
            value={drivers.inactiveDrivers}
            icon={FaTimesCircle}
            color="from-gray-500 to-gray-600"
            percentage={(drivers.inactiveDrivers / drivers.totalDrivers) * 100 || 0}
          />
        </div>
      </div>

      {/* Reviews Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ Reviews Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reviews"
            value={reviews.totalReviews}
            icon={FaStar}
            color="from-pink-500 to-pink-600"
            percentage={100}
          />
          <StatCard
            title="Approved"
            value={reviews.approvedReviews}
            icon={FaCheckCircle}
            color="from-green-500 to-green-600"
            percentage={(reviews.approvedReviews / reviews.totalReviews) * 100 || 0}
          />
          <StatCard
            title="Pending"
            value={reviews.pendingReviews}
            icon={FaClock}
            color="from-yellow-500 to-yellow-600"
            percentage={(reviews.pendingReviews / reviews.totalReviews) * 100 || 0}
          />
          <StatCard
            title="Avg Rating"
            value={reviews.averageRating}
            icon={FaStar}
            color="from-amber-500 to-amber-600"
            percentage={100}
            suffix="⭐"
          />
        </div>
        <div className="mt-4 bg-pink-50 border-l-4 border-pink-500 p-4 rounded-lg">
          <p className="text-pink-800">
            <strong>📊 Recent Activity:</strong> {reviews.recentReviews} reviews in the last 7 days
          </p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📈 Status Breakdown</h2>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Bookings</h3>
          <ProgressBar
            label="Confirmed"
            value={bookings.confirmedBookings}
            total={bookings.totalBookings}
            color="bg-green-500"
          />
          <ProgressBar
            label="Pending"
            value={bookings.pendingBookings}
            total={bookings.totalBookings}
            color="bg-yellow-500"
          />
          <ProgressBar
            label="Canceled"
            value={bookings.canceledBookings}
            total={bookings.totalBookings}
            color="bg-red-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Messages</h3>
          <ProgressBar
            label="Confirmed"
            value={messages.confirmedMessages}
            total={messages.totalMessages}
            color="bg-green-500"
          />
          <ProgressBar
            label="Pending"
            value={messages.pendingMessages}
            total={messages.totalMessages}
            color="bg-yellow-500"
          />
          <ProgressBar
            label="Canceled"
            value={messages.canceledMessages}
            total={messages.totalMessages}
            color="bg-red-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Reviews</h3>
          <ProgressBar
            label="Approved"
            value={reviews.approvedReviews}
            total={reviews.totalReviews}
            color="bg-green-500"
          />
          <ProgressBar
            label="Pending Approval"
            value={reviews.pendingReviews}
            total={reviews.totalReviews}
            color="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, percentage, suffix = "" }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h3 className="text-4xl font-bold mt-1">{value}{suffix}</h3>
        </div>
        <Icon className="text-5xl opacity-80" />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex-1 bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="font-semibold">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, total, color }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-600">{value} / {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}