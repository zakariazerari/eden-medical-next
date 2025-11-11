"use client";
import { useEffect, useState } from "react";
import { FaCalendarCheck, FaEnvelope, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function StatsPage() {
  const [stats, setStats] = useState({
    bookings: { totalBookings: 0, confirmedBookings: 0, canceledBookings: 0, pendingBookings: 0, recentBookings: 0 },
    messages: { totalMessages: 0, pendingMessages: 0, confirmedMessages: 0, canceledMessages: 0, recentMessages: 0 },
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-200 rounded-full border-t-slate-500 animate-spin"></div>
      </div>
    );
  }

  const { bookings, messages } = stats;

  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-700">Statistics & Analytics</h1>

      {/* Bookings Stats */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">📅 Bookings Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <StatCard
            title="Total Bookings"
            value={bookings.totalBookings}
            icon={FaCalendarCheck}
            color="from-sky-400 to-sky-500"
            percentage={100}
          />
          <StatCard
            title="Confirmed"
            value={bookings.confirmedBookings}
            icon={FaCheckCircle}
            color="from-green-400 to-green-500"
            percentage={(bookings.confirmedBookings / bookings.totalBookings) * 100 || 0}
          />
          <StatCard
            title="Pending"
            value={bookings.pendingBookings}
            icon={FaClock}
            color="from-yellow-400 to-yellow-500"
            percentage={(bookings.pendingBookings / bookings.totalBookings) * 100 || 0}
          />
          <StatCard
            title="Canceled"
            value={bookings.canceledBookings}
            icon={FaTimesCircle}
            color="from-red-400 to-red-500"
            percentage={(bookings.canceledBookings / bookings.totalBookings) * 100 || 0}
          />
        </div>
        <div className="mt-3 sm:mt-4 bg-sky-50 border-l-4 border-sky-400 p-3 sm:p-4 rounded-lg">
          <p className="text-sky-800 text-xs sm:text-sm lg:text-base">
            <strong>📊 Recent Activity:</strong> {bookings.recentBookings} bookings in the last 7 days
          </p>
        </div>
      </div>

      {/* Messages Stats */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">📧 Messages Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <StatCard
            title="Total Messages"
            value={messages.totalMessages}
            icon={FaEnvelope}
            color="from-slate-400 to-slate-500"
            percentage={100}
          />
          <StatCard
            title="Confirmed"
            value={messages.confirmedMessages}
            icon={FaCheckCircle}
            color="from-emerald-400 to-emerald-500"
            percentage={(messages.confirmedMessages / messages.totalMessages) * 100 || 0}
          />
          <StatCard
            title="Pending"
            value={messages.pendingMessages}
            icon={FaClock}
            color="from-amber-400 to-amber-500"
            percentage={(messages.pendingMessages / messages.totalMessages) * 100 || 0}
          />
          <StatCard
            title="Canceled"
            value={messages.canceledMessages}
            icon={FaTimesCircle}
            color="from-rose-400 to-rose-500"
            percentage={(messages.canceledMessages / messages.totalMessages) * 100 || 0}
          />
        </div>
        <div className="mt-3 sm:mt-4 bg-slate-50 border-l-4 border-slate-400 p-3 sm:p-4 rounded-lg">
          <p className="text-slate-800 text-xs sm:text-sm lg:text-base">
            <strong>📊 Recent Activity:</strong> {messages.recentMessages} messages in the last 7 days
          </p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6 border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">📈 Status Breakdown</h2>
        
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">Bookings</h3>
          <ProgressBar
            label="Confirmed"
            value={bookings.confirmedBookings}
            total={bookings.totalBookings}
            color="bg-emerald-500"
          />
          <ProgressBar
            label="Pending"
            value={bookings.pendingBookings}
            total={bookings.totalBookings}
            color="bg-amber-500"
          />
          <ProgressBar
            label="Canceled"
            value={bookings.canceledBookings}
            total={bookings.totalBookings}
            color="bg-rose-500"
          />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">Messages</h3>
          <ProgressBar
            label="Confirmed"
            value={messages.confirmedMessages}
            total={messages.totalMessages}
            color="bg-emerald-500"
          />
          <ProgressBar
            label="Pending"
            value={messages.pendingMessages}
            total={messages.totalMessages}
            color="bg-amber-500"
          />
          <ProgressBar
            label="Canceled"
            value={messages.canceledMessages}
            total={messages.totalMessages}
            color="bg-rose-500"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, percentage, suffix = "" }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <p className="text-xs sm:text-sm opacity-90">{title}</p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">{value}{suffix}</h3>
        </div>
        <Icon className="text-3xl sm:text-4xl lg:text-5xl opacity-80" />
      </div>
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <div className="flex-1 bg-white/20 rounded-full h-1.5 sm:h-2">
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
    <div className="mb-3 sm:mb-4">
      <div className="flex justify-between text-xs sm:text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-600">{value} / {total}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}