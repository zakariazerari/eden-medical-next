// app/contact/page.js - ✅ UPDATED WITH CSRF PROTECTION

"use client";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { secureFetch } from '@/lib/csrf' // ✅ ADDED

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const contacts = [
    { label: "Alameda County", number: "510-957-8383" },
    { label: "San Francisco", number: "415-994-1442" },
    { label: "Contra Costa", number: "925-465-0366" },
    { label: "Santa Clara", number: "408-579-9775" },
    { label: "San Mateo", number: "650-474-5777" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      // ✅ CHANGED: Using secureFetch instead of fetch
      const res = await secureFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Error sending message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-blue-50/30 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900">Get In Touch</h1>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Available 24/7 for your medical transportation needs across Bay Area and surrounding counties 
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="John Doe" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="john@example.com" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="(555) 123-4567" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                <textarea rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Tell us about your transportation needs..." required />
              </div>
              
              <button type="submit" disabled={submitting} className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">Email</p>
                    <a href="mailto:info@edenmedical.com" className="text-blue-600 hover:text-blue-700">edenmedtrans@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-2xl text-red-600 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">Service Area</p>
                    <p className="text-gray-600">Serving Alameda, San Francisco, Santa Clara, Contra Costa and Solano counties</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <FaClock className="text-2xl text-gray-700 mt-1" />
                  <div>
                    <p className="font-bold text-gray-800">Availability</p>
                    <p className="text-gray-600">24/7 Emergency & Scheduled Rides</p>
                  </div>
                </div>
              </div>
            </div>

            {/* County Numbers */}
            <div className="bg-gradient-to-br from-red-600 to-blue-700 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Call Your County</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contacts.map((c, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition">
                    <p className="font-bold mb-2">{c.label}</p>
                    <a href={`tel:${c.number}`} className="flex items-center gap-2 text-lg hover:text-red-200 transition">
                      <FaPhoneAlt className="text-sm" /> {c.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}