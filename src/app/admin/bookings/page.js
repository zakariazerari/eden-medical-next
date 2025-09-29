"use client";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-2xl font-bold text-violet-800 mb-6">📅 Client Bookings (Last 7 Days)</h1>

      {loading ? (
        <p className="text-gray-500">⏳ Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings in the last 7 days</p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-4">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-violet-700 text-white">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Pickup</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-violet-50">
                    <td className="p-3 font-semibold">{b.patientName}</td>
                    <td className="p-3">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">{b.pickup}</td>
                    <td className="p-3">{b.destination}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : b.status === "canceled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border rounded-xl p-4 shadow-md bg-white space-y-3"
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-violet-700">{b.patientName}</h3>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : b.status === "canceled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <p>📅 {new Date(b.date).toLocaleDateString()} ⏰ {b.time}</p>
                <p>🚖 {b.pickup} ➝ {b.destination}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
