"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 جلب الرسائل من API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // 📌 تحديث حالة الرسالة (confirm / cancel)
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
      }
    } catch (error) {
      console.error("❌ Error updating message:", error);
    }
  };

  // 🗑 حذف الرسالة
  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.error("❌ Error deleting message:", error);
    }
  };

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-extrabold text-violet-800 drop-shadow-lg mb-6">
        📩 Client Contact Messages
      </h1>

      {loading ? (
        <p className="text-gray-500">⏳ Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No recent messages</p>
      ) : (
        <div className="bg-white shadow-xl rounded-xl p-4">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-violet-700 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m._id} className="border-b hover:bg-violet-50">
                    <td className="p-3 font-semibold">{m.fullName}</td>
                    <td className="p-3">{m.email}</td>
                    <td className="p-3">{m.message}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          m.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : m.status === "canceled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => updateStatus(m._id, "confirmed")}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(m._id, "canceled")}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteMessage(m._id)}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden space-y-4">
            {messages.map((m) => (
              <div
                key={m._id}
                className="border rounded-xl p-4 shadow-md bg-white space-y-3"
              >
                <h3 className="font-bold text-violet-700">{m.fullName}</h3>
                <p>📧 {m.email}</p>
                <p>{m.message}</p>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    m.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : m.status === "canceled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {m.status}
                </span>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(m._id, "confirmed")}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(m._id, "canceled")}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteMessage(m._id)}
                    className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
