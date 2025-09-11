"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function SciFiFooter2() {
  return (
    <footer className="relative overflow-hidden text-gray-900 bg-gradient-to-tr from-indigo-50 via-violet-100 to-blue-50 dark:from-indigo-900 dark:via-violet-800 dark:to-blue-900 pt-16 pb-10 px-6 md:px-20 z-40">
      {/* Background with tech lines */}
      <div className="absolute inset-0 -z-10 bg-[url('/patterns/tech-lines.png')] opacity-20 dark:opacity-30"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-4 transform hover:scale-105 transition duration-700">
          <h2 className="text-3xl font-extrabold text-violet-700">Eden Transport</h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Safe and premium medical transportation. Non-emergency service where your comfort comes first.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-violet-600">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "About Us", "Gallery", "Contact"].map((linkText) => (
              <li key={linkText}>
                <Link
                  href={linkText === "Home" ? "/" : `/${linkText.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-800 dark:text-gray-200 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300"
                >
                  {linkText}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-violet-600">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-violet-700 transition duration-300">
              <FaPhoneAlt className="text-xl" />
              +1 (234) 567-890
            </li>
            <li className="flex items-center gap-2 hover:text-violet-700 transition duration-300">
              <FaEnvelope className="text-xl" />
              contact@edentransport.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-violet-600">Follow Us</h3>
          <div className="flex gap-6 text-2xl">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="relative text-gray-800 dark:text-gray-200 hover:text-violet-700 transition-colors duration-300"
              >
                <Icon className="transform hover:scale-125 transition-transform duration-500" />
                <span className="absolute inset-0 rounded-full bg-violet-200/30 dark:bg-violet-700/30 blur-lg scale-0 hover:scale-100 transition-all duration-500"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-violet-300/50 dark:border-violet-700/50 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Eden Transport. All rights reserved.
      </div>
    </footer>
  );
}
