"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaEye, FaCheckCircle, FaTimesCircle, FaTrash, FaClock } from "react-icons/fa";
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
      ["Patient", "Service", "Mobility", "Date", "Pickup Time", "Appointment Time", "Return Time", "Pickup", "Destination", "Phone", "Email", "Status"],
      ...filteredBookings.map((b) => [
        b.patientName,
        b.serviceType,
        b.mobility,
        new Date(b.date).toLocaleDateString(),
        b.time || 'N/A',
        b.appointmentTime || 'N/A',
        b.returnTime || 'N/A',
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-200 rounded-full border-t-slate-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-700">
          Bookings Management
        </h1>
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition text-xs sm:text-sm lg:text-base w-full sm:w-auto shadow-md hover:shadow-lg"
        >
          <FaDownload className="text-sm sm:text-base" /> 
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900 text-xs sm:text-sm"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm pointer-events-none z-10" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900 text-xs sm:text-sm appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="relative sm:col-span-2 lg:col-span-1">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm pointer-events-none z-10" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-slate-400 text-gray-900 text-xs sm:text-sm appearance-none bg-white cursor-pointer"
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

      <div className="text-slate-600 text-xs sm:text-sm lg:text-base">
        Showing <span className="font-semibold">{filteredBookings.length}</span> of <span className="font-semibold">{bookings.length}</span> bookings
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Patient</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Service</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Date & Times</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Route</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Contact</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Status</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-semibold text-slate-800 text-xs lg:text-sm whitespace-nowrap">{booking.patientName}</td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <div className="text-xs lg:text-sm">
                        <div className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
                          {booking.serviceType}
                        </div>
                        <div className="text-slate-500 text-[10px] lg:text-xs">{booking.mobility}</div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-slate-700 text-xs lg:text-sm">
                      <div className="space-y-1">
                        <div className="font-semibold">{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1 text-[10px] lg:text-xs">
                          <FaClock className="text-blue-500" />
                          <span>Pickup: {booking.time || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] lg:text-xs">
                          <FaClock className="text-purple-500" />
                          <span>Appt: {booking.appointmentTime || 'N/A'}</span>
                        </div>
                        {booking.returnTime && (
                          <div className="flex items-center gap-1 text-[10px] lg:text-xs">
                            <FaClock className="text-green-500" />
                            <span>Return: {booking.returnTime}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <div className="text-slate-600 text-[10px] lg:text-xs max-w-[150px] lg:max-w-[200px]">
                        <div className="truncate">📍 {booking.pickup}</div>
                        <div className="truncate">🎯 {booking.destination}</div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-slate-700 text-xs lg:text-sm whitespace-nowrap">
                      <div>{booking.phone}</div>
                      <div className="text-slate-500 text-[10px] lg:text-xs max-w-[120px] lg:max-w-[150px] truncate">{booking.email}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <span
                        className={`px-2 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold ${
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
                    <td className="px-3 lg:px-4 py-3 lg:py-4 whitespace-nowrap">
                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-1.5 lg:p-2 bg-sky-500 text-white rounded-md lg:rounded-lg hover:bg-sky-600 transition"
                          title="View"
                        >
                          <FaEye className="text-xs lg:text-sm" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "confirmed")}
                          className="p-1.5 lg:p-2 bg-green-500 text-white rounded-md lg:rounded-lg hover:bg-green-600 transition"
                          title="Confirm"
                        >
                          <FaCheckCircle className="text-xs lg:text-sm" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "canceled")}
                          className="p-1.5 lg:p-2 bg-red-500 text-white rounded-md lg:rounded-lg hover:bg-red-600 transition"
                          title="Cancel"
                        >
                          <FaTimesCircle className="text-xs lg:text-sm" />
                        </button>
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="p-1.5 lg:p-2 bg-slate-500 text-white rounded-md lg:rounded-lg hover:bg-slate-600 transition"
                          title="Delete"
                        >
                          <FaTrash className="text-xs lg:text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500 text-sm">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white border border-slate-200 rounded-lg shadow-md space-y-3 p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-700 text-sm truncate">{booking.patientName}</h3>
                  <div className="text-[11px] mt-1">
                    <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
                      {booking.serviceType}
                    </span>
                    <span className="text-slate-400 mx-1">•</span>
                    <span className="text-slate-500">{booking.mobility}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
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
              <div className="text-[11px] space-y-1 text-slate-600">
                <p>📅 {new Date(booking.date).toLocaleDateString()}</p>
                <p>🕐 Pickup: {booking.time || 'N/A'}</p>
                <p>🕑 Appointment: {booking.appointmentTime || 'N/A'}</p>
                {booking.returnTime && <p>🕒 Return: {booking.returnTime}</p>}
                <p className="truncate">📍 {booking.pickup}</p>
                <p className="truncate">🎯 {booking.destination}</p>
                <p>📞 {booking.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="py-1.5 bg-sky-500 text-white rounded-md text-[11px] hover:bg-sky-600 transition font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "confirmed")}
                  className="py-1.5 bg-green-500 text-white rounded-md text-[11px] hover:bg-green-600 transition font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "canceled")}
                  className="py-1.5 bg-red-500 text-white rounded-md text-[11px] hover:bg-red-600 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteBooking(booking._id)}
                  className="py-1.5 bg-slate-500 text-white rounded-md text-[11px] hover:bg-slate-600 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white text-center py-8 rounded-lg shadow-md text-slate-500 text-sm">
            No bookings found
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </div>
  );
}

function BookingModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-5 lg:p-6 border border-slate-200 shadow-2xl">
        <div className="flex justify-between items-center mb-4 sm:mb-5 lg:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-700">Booking Details</h2>
          <button 
            onClick={onClose} 
            className="text-2xl sm:text-3xl text-slate-400 hover:text-slate-600 transition p-1"
          >
            ×
          </button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <DetailRow label="Patient Name" value={booking.patientName} />
          <DetailRow label="Service Type" value={
            <span className={`font-semibold ${booking.serviceType === "Emergency" ? "text-rose-600" : "text-sky-600"}`}>
              {booking.serviceType}
            </span>
          } />
          <DetailRow label="Mobility" value={booking.mobility} />
          <DetailRow label="Date" value={new Date(booking.date).toLocaleDateString()} />
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <FaClock className="text-blue-600" />
              Schedule Times
            </h3>
            <div className="space-y-2 text-sm">
              <DetailRow label="Pick-Up Time" value={booking.time || <span className="text-slate-400 italic">Not specified</span>} />
              <DetailRow label="Appointment Time" value={booking.appointmentTime || <span className="text-slate-400 italic">Not specified</span>} />
              <DetailRow label="Return Time" value={booking.returnTime || <span className="text-slate-400 italic">Not specified</span>} />
            </div>
          </div>
          
          <DetailRow label="Pickup Address" value={booking.pickup} />
          <DetailRow label="Destination" value={booking.destination} />
          <DetailRow label="Phone" value={booking.phone} />
          <DetailRow label="Email" value={booking.email} />
          <DetailRow label="Payment Method" value={booking.paymentMethod} />
          {booking.specialNotes && <DetailRow label="Special Notes" value={booking.specialNotes} />}
          <DetailRow label="Status" value={
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-4 py-2 sm:py-3 border-b border-slate-100 last:border-0">
      <div className="font-semibold text-slate-600 text-xs sm:text-sm lg:text-base">{label}</div>
      <div className="sm:col-span-2 text-slate-800 text-xs sm:text-sm lg:text-base break-words">{value}</div>
    </div>
  );
}