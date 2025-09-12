"use client";
import { FaPhoneAlt } from "react-icons/fa";
import FloatingBubblesBg from "./component/FloatingBubblesBg";

export default function Contact() {
  const contacts = [
    { label: "Alameda County", number: "510-957-8383" },
    { label: "San Francisco County", number: "415-994-1442" },
    { label: "Contra Costa County", number: "925-465-0366" },
    { label: "Santa Clara County", number: "408-579-9775" },
    { label: "San Mateo County", number: "650-474-5777" },
  ];

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-white via-indigo-50 to-violet-100 py-16 sm:py-24 overflow-hidden"
    >
      {/* خلفية فقاعات */}
      <FloatingBubblesBg />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-violet-800 drop-shadow">
          Contact Us
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* فورم الاتصال */}
          <form className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100 transition-transform hover:scale-[1.02]">
            <h4 className="text-xl font-semibold mb-6 text-violet-800">Send us a message</h4>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <button className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition">
              Send Message
            </button>
          </form>

          {/* معلومات الاتصال */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-violet-800">Contact Information</h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white border border-violet-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <FaPhoneAlt className="text-violet-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">{contact.label}</p>
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