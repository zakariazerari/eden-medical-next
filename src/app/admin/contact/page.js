"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-6 md:ml-64">
      <h1 className="text-3xl font-bold text-violet-800 mb-6">📩 Contact Messages</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages in the last 7 days</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-4 border rounded-lg shadow bg-white">
              <h3 className="font-bold text-violet-700">{msg.fullName}</h3>
              <p className="text-sm text-gray-600">{msg.email}</p>
              <p className="mt-2">{msg.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
