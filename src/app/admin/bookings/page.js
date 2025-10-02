"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaEye, FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      filterBookings();
    }
  }, [searchTerm, statusFilter, bookings]);

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
        toast.success(`Booking ${status}`);
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
        toast.success("Booking deleted");
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
        <div className="w-16 h-16 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-violet-800">Bookings Management</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-gray-600">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-violet-600 text-white">
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
                  <tr key={booking._id} className="border-b hover:bg-violet-50 transition">
                    <td className="px-6 py-4 font-semibold">{booking.patientName}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className={`font-semibold ${booking.serviceType === "Emergency" ? "text-red-600" : "text-blue-600"}`}>
                          {booking.serviceType}
                        </div>
                        <div className="text-gray-500">{booking.mobility}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{new Date(booking.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>📍 {booking.pickup}</div>
                        <div>🎯 {booking.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{booking.phone}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
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
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          title="Confirm"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "canceled")}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          title="Cancel"
                        >
                          <FaTimesCircle />
                        </button>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 p-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="border rounded-xl p-4 shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-violet-700">{booking.patientName}</h3>
                    <div className="text-sm mt-1">
                      <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-red-600" : "text-blue-600"}`}>
                        {booking.serviceType}
                      </span>
                      <span className="text-gray-500 mx-1">•</span>
                      <span className="text-gray-500">{booking.mobility}</span>
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
                <div className="text-sm space-y-1">
                  <p>📅 {new Date(booking.date).toLocaleDateString()} ⏰ {booking.time}</p>
                  <p>📍 From: {booking.pickup}</p>
                  <p>🎯 To: {booking.destination}</p>
                  <p>📞 {booking.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="py-2 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => updateStatus(booking._id, "confirmed")}
                    className="py-2 bg-green-500 text-white rounded-lg text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(booking._id, "canceled")}
                    className="py-2 bg-red-500 text-white rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="py-2 bg-gray-500 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No bookings found</div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </div>
  );
}

function BookingModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-violet-800">Booking Details</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="space-y-4">
          <DetailRow label="Patient Name" value={booking.patientName} />
          <DetailRow label="Service Type" value={
            <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-red-600" : "text-blue-600"}`}>
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
    <div className="grid grid-cols-3 gap-4 py-3 border-b">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="col-span-2 text-gray-900">{value}</div>
    </div>
  );
}