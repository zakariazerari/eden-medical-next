"use client";
import { useState } from "react";
import {
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import ContactSnowTwinkleBG from "../components/ContactSnowTwinkleBG";

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
    setTimeout(() => setPopup(""), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
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

      if (res.ok) {
        setStatus("");
        showPopup("✅ Message sent successfully!", "success");
        setFullName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        showPopup("❌ Error sending message", "error");
      }
    } catch (error) {
      console.error(error);
      showPopup("❌ Error sending message", "error");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-indigo-50 to-violet-100 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ContactSnowTwinkleBG />
      </div>

      {/* ✅ Popup */}
      {popup && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white z-50
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
        <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-violet-800">
          Contact Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100"
          >
            <h4 className="text-xl font-semibold mb-6 text-violet-800">
              Send us a message
            </h4>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 mb-4 border rounded-xl"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-xl"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 mb-4 border rounded-xl"
              rows={5}
            />
            <button
              type="submit"
              className="w-full py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
            >
              {status === "Sending..." ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-violet-800">
              Contact Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-white border rounded-2xl shadow-md"
                >
                  <FaPhoneAlt className="text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold">{c.label}</p>
                    <p className="text-sm">{c.number}</p>
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
