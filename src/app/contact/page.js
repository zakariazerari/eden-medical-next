"use client";
import { useState } from "react";
import {
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import FloatingBubblesBg from "./component/FloatingBubblesBg";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState("");

  const contacts = [
    { label: "Alameda County", number: "510-957-8383" },
    { label: "San Francisco County", number: "415-994-1442" },
    { label: "Contra Costa County", number: "925-465-0366" },
    { label: "Santa Clara County", number: "408-579-9775" },
    { label: "San Mateo County", number: "650-474-5777" },
  ];

  const showPopup = (message, type = "info") => {
    setPopup({ message, type });
    setTimeout(() => setPopup(""), 4000); // Hide after 4s
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus("");
      showPopup("❗ Please fill in all fields", "error");
      return;
    }

    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("");
        showPopup("✅ Message sent successfully!", "success");
        setFullName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        showPopup(
          "❌ Error: " + (data.error || "Something went wrong"),
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showPopup("❌ Error sending message", "error");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-white via-indigo-50 to-violet-100 py-16 sm:py-24 overflow-hidden"
    >
      <FloatingBubblesBg />

      {/* ✅ Popup Message */}
      {popup && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white z-50 transition-all duration-300
            ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {popup.type === "success" ? (
            <FaCheckCircle className="inline mr-2" />
          ) : (
            <FaExclamationTriangle className="inline mr-2" />
          )}
          {popup.message}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-violet-800 drop-shadow">
          Contact Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100 transition-transform hover:scale-[1.02]"
          >
            <h4 className="text-xl font-semibold mb-6 text-violet-800">
              Send us a message
            </h4>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className={`w-full p-3 rounded-xl border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-violet-500`}
              />
              {errors.fullName && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full p-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-violet-500`}
              />
              {errors.email && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                className={`w-full p-3 rounded-xl border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-violet-500`}
              />
              {errors.message && (
                <div className="text-red-600 text-sm mt-1 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  {errors.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
              disabled={status === "Sending..."}
            >
              {status === "Sending..." ? (
                <span className="flex items-center justify-center gap-2 animate-pulse">
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-violet-800">
              Contact Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white border border-violet-100 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.03]"
                >
                  <FaPhoneAlt className="text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {contact.label}
                    </p>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
