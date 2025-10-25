"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaEye, FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      filterBookings();
    }
  }, [searchTerm, statusFilter, dateFilter, bookings]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      const bookingsArray = Array.isArray(data) ? data : [];
      setBookings(bookingsArray);
      setFilteredBookings(bookingsArray);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (!bookings || !Array.isArray(bookings)) {
      setFilteredBookings([]);
      return;
    }

    let filtered = [...bookings];

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const daysAgo = new Date();
      
      switch(dateFilter) {
        case "7days":
          daysAgo.setDate(now.getDate() - 7);
          break;
        case "15days":
          daysAgo.setDate(now.getDate() - 15);
          break;
        case "30days":
          daysAgo.setDate(now.getDate() - 30);
          break;
        case "month":
          daysAgo.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter((b) => {
        const bookingDate = new Date(b.createdAt || b.date);
        return bookingDate >= daysAgo;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.phone?.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status } : b))
        );
        toast.success(`Booking ${status}!`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Booking deleted!");
      }
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Patient", "Service", "Mobility", "Date", "Time", "Pickup", "Destination", "Phone", "Email", "Status"],
      ...filteredBookings.map((b) => [
        b.patientName,
        b.serviceType,
        b.mobility,
        new Date(b.date).toLocaleDateString(),
        b.time,
        b.pickup,
        b.destination,
        b.phone,
        b.email,
        b.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-slate-200 rounded-full border-t-slate-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-700">Bookings Management</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="15days">Last 15 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-slate-600">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Service</th>
                <th className="px-6 py-4 text-left">Date & Time</th>
                <th className="px-6 py-4 text-left">Route</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-800">{booking.patientName}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
                          {booking.serviceType}
                        </div>
                        <div className="text-slate-500">{booking.mobility}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <div>{new Date(booking.date).toLocaleDateString()}</div>
                      <div className="text-sm text-slate-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        <div>📍 {booking.pickup}</div>
                        <div>🎯 {booking.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <div>{booking.phone}</div>
                      <div className="text-sm text-slate-500">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "canceled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                          title="Confirm"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "canceled")}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          title="Cancel"
                        >
                          <FaTimesCircle />
                        </button>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="p-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="border border-slate-200 rounded-xl p-4 shadow-md space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-700">{booking.patientName}</h3>
                    <div className="text-sm mt-1">
                      <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
                        {booking.serviceType}
                      </span>
                      <span className="text-slate-400 mx-1">•</span>
                      <span className="text-slate-500">{booking.mobility}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status || "pending"}
                  </span>
                </div>
                <div className="text-sm space-y-1 text-slate-600">
                  <p>📅 {new Date(booking.date).toLocaleDateString()} ⏰ {booking.time}</p>
                  <p>📍 From: {booking.pickup}</p>
                  <p>🎯 To: {booking.destination}</p>
                  <p>📞 {booking.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => updateStatus(booking._id, "confirmed")}
                    className="py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(booking._id, "canceled")}
                    className="py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="py-2 bg-slate-500 text-white rounded-lg text-sm hover:bg-slate-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">No bookings found</div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </div>
  );
}

function BookingModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-700">Booking Details</h2>
          <button onClick={onClose} className="text-3xl text-slate-400 hover:text-slate-600">×</button>
        </div>
        <div className="space-y-4">
          <DetailRow label="Patient Name" value={booking.patientName} />
          <DetailRow label="Service Type" value={
            <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
              {booking.serviceType}
            </span>
          } />
          <DetailRow label="Mobility" value={booking.mobility} />
          <DetailRow label="Date" value={new Date(booking.date).toLocaleDateString()} />
          <DetailRow label="Time" value={booking.time} />
          <DetailRow label="Pickup Address" value={booking.pickup} />
          <DetailRow label="Destination" value={booking.destination} />
          <DetailRow label="Phone" value={booking.phone} />
          <DetailRow label="Email" value={booking.email} />
          <DetailRow label="Payment Method" value={booking.paymentMethod} />
          {booking.specialNotes && <DetailRow label="Special Notes" value={booking.specialNotes} />}
          <DetailRow label="Status" value={
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "canceled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {booking.status || "pending"}
            </span>
          } />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-slate-100">
      <div className="font-semibold text-slate-600">{label}</div>
      <div className="col-span-2 text-slate-800">{value}</div>
    </div>
  );
}