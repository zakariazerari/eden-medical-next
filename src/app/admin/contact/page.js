"use client";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaCalendar,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [searchTerm, statusFilter, dateFilter, messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const messagesArray = Array.isArray(data) ? data : [];
      setMessages(messagesArray);
      setFilteredMessages(messagesArray);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch messages");
      setMessages([]);
      setFilteredMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    if (!messages || !Array.isArray(messages)) {
      setFilteredMessages([]);
      return;
    }

    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.phone?.includes(searchTerm) ||
          m.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "7days":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "15days":
          filterDate.setDate(now.getDate() - 15);
          break;
        case "30days":
          filterDate.setDate(now.getDate() - 30);
          break;
        case "1month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter((m) => {
        const messageDate = new Date(m.createdAt);
        return messageDate >= filterDate;
      });
    }

    setFilteredMessages(filtered);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status } : m))
        );
        toast.success(`Message ${status}!`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        toast.success("Message deleted!");
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Message", "Status", "Date"],
      ...filteredMessages.map((m) => [
        m.fullName || "",
        m.email || "",
        m.phone || "N/A",
        m.message || "",
        m.status || "pending",
        m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Contact Messages
        </h1>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="relative">
            <FaCalendar className="absolute left-3 top-3.5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="15days">Last 15 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="1month">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-gray-600">
        Showing {filteredMessages.length} of {messages.length} messages
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-200">
        <table className="w-full hidden md:table">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left whitespace-nowrap">Name</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Email</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Phone</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Message</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Date</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Status</th>
              <th className="px-6 py-4 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr
                  key={message._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                    {message.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{message.email}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{message.phone || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs text-gray-700">{message.message}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        message.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : message.status === "canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {message.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(message._id, "confirmed")
                        }
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        title="Confirm"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => updateStatus(message._id, "canceled")}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        title="Cancel"
                      >
                        <FaTimesCircle />
                      </button>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
                <td
                  colSpan="7"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                className="border border-gray-200 rounded-xl p-4 shadow-md space-y-3 bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {message.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">{message.email}</p>
                    {message.phone && (
                      <p className="text-sm text-gray-600">📞 {message.phone}</p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      message.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : message.status === "canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {message.status || "pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{message.message}</p>
                <p className="text-xs text-gray-500">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleDateString()
                    : ""}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => updateStatus(message._id, "confirmed")}
                    className="py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(message._id, "canceled")}
                    className="py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages found</p>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}
    </div>
  );
}

function MessageModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Message Details</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="space-y-4">
          <DetailRow label="Name" value={message.fullName} />
          <DetailRow label="Email" value={message.email} />
          <DetailRow label="Phone" value={message.phone || 'Not provided'} />
          <DetailRow label="Message" value={message.message} />
          <DetailRow label="Date" value={new Date(message.createdAt).toLocaleString()} />
          <DetailRow label="Status" value={
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              message.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : message.status === "canceled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {message.status || "pending"}
            </span>
          } />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="col-span-2 text-gray-800">{value}</div>
    </div>
  );
}