"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      filterMessages();
    }
  }, [searchTerm, statusFilter, messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setMessages(data);
        setFilteredMessages(data);
      } else {
        setMessages([]);
        setFilteredMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
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

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    setFilteredMessages(filtered);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status } : m))
        );
        toast.success(`Message marked as ${status}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        toast.success("Message deleted");
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
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
      <h1 className="text-3xl font-extrabold text-violet-800">Contact Messages</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="text-gray-600">
        Showing {filteredMessages.length} of {messages.length} messages
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Message</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr key={msg._id} className="border-b hover:bg-violet-50">
                    <td className="px-6 py-4 font-semibold">{msg.fullName}</td>
                    <td className="px-6 py-4">{msg.email}</td>
                    <td className="px-6 py-4">
                      <p className="truncate max-w-xs">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          msg.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : msg.status === "canceled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {msg.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => updateStatus(msg._id, "confirmed")}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() => updateStatus(msg._id, "canceled")}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <FaTimesCircle />
                        </button>
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 p-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div key={msg._id} className="border rounded-xl p-4 shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-violet-700">{msg.fullName}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      msg.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : msg.status === "canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {msg.status || "pending"}
                  </span>
                </div>
                <p className="text-sm">{msg.email}</p>
                <p className="text-sm text-gray-600">{msg.message}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(msg._id, "confirmed")}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(msg._id, "canceled")}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="flex-1 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No messages found
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
      )}
    </div>
  );
}

function MessageModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-violet-800">Message Details</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">From:</label>
            <p className="text-gray-900">{message.fullName}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Email:</label>
            <p className="text-gray-900">{message.email}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Message:</label>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{message.message}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Date:</label>
            <p className="text-gray-900">{new Date(message.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}