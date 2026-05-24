"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import { BiTime } from "react-icons/bi";

export default function SiteFooter() {
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateString = now.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const timeZone = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        timeZoneName: "short"
      }).split(' ').pop();
      setCurrentTime(`${dateString} - ${timeString} ${timeZone}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 - About */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white">
            Eden Transport Services
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            For over a decade, our transportation service has been the Bay Area's go-to provider for safe, comfortable, and dependable rides. Wheelchair, gurney, and stair assistance transport.
          </p>
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <FaMapMarkerAlt className="text-red-500 flex-shrink-0 mt-0.5" />
            <span>Serving Alameda, San Francisco, Santa Clara, Contra Costa, and San Mateo counties</span>
          </div>
          {mounted && currentTime && (
            <div className="flex items-center gap-2 text-sm bg-gray-800 p-3 rounded-lg border border-gray-700">
              <BiTime className="text-blue-400 text-xl flex-shrink-0" />
              <div>
                <p className="font-semibold text-xs text-gray-500 uppercase">California Time</p>
                <p className="font-mono text-xs text-gray-300">{currentTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Column 2 - Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-red-600 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Fleet Gallery", path: "/gallery" },
              { name: "FAQ", path: "/faq" },
              { name: "Blog", path: "/blog" },
              { name: "Contact Us", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transform transition-all duration-300 inline-flex items-center gap-2 group text-sm"
                >
                  <span className="text-red-500 group-hover:text-red-400">→</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-blue-600 pb-2">
            Our Services
          </h3>
          <ul className="space-y-4">
            <li>
              <Link href="/services/premium-rides" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-yellow-600 transition-colors">
                  <FaStar className="text-yellow-500 group-hover:text-white text-sm" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-300 group-hover:text-white">Premium Rides</div>
                  <div className="text-xs text-gray-500">Comfortable transportation</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/services/recurring-rides" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <FaCalendarAlt className="text-blue-400 group-hover:text-white text-sm" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-300 group-hover:text-white">Recurring Rides</div>
                  <div className="text-xs text-gray-500">Daily & weekly schedules</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/services/group-transport" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
                  <FaUsers className="text-red-400 group-hover:text-white text-sm" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-300 group-hover:text-white">Group Transport</div>
                  <div className="text-xs text-gray-500">Families & groups</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-green-600 pb-2">
            Contact Us
          </h3>
          <a href="tel:+15109578383" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group">
            <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors">
              <FaPhoneAlt className="text-blue-400 group-hover:text-white text-sm" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-300">24/7 Hotline</p>
              <p className="text-white font-bold">(510) 957-8383</p>
            </div>
          </a>
          <a href="mailto:edenmedtrans@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group">
            <div className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded-lg group-hover:bg-red-600 transition-colors">
              <FaEnvelope className="text-red-400 group-hover:text-white text-sm" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-300">Email Us</p>
              <p className="text-xs text-gray-400 break-all">edenmedtrans@gmail.com</p>
            </div>
          </a>
          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-400 mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, link: "https://www.facebook.com/edentransport", bg: "hover:bg-blue-600", label: "Facebook" },
                { Icon: FaInstagram, link: "https://www.instagram.com/edentransport", bg: "hover:bg-pink-600", label: "Instagram" },
                { Icon: FaTwitter, link: "https://twitter.com/edentransport", bg: "hover:bg-sky-500", label: "Twitter" },
              ].map(({ Icon, link, bg, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 rounded-xl ${bg} hover:text-white transform hover:scale-110 transition-all duration-300`}
                  aria-label={label}
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Eden Transport Services. All rights reserved.
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline mt-1 md:mt-0 text-gray-400">Licensed & Insured in California</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-gray-800 text-center space-y-2">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-500">Service Areas:</strong> Alameda County · San Francisco County · Santa Clara County · Contra Costa County · San Mateo County
          </p>
          <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-gray-300">Available 24/7 · Same-Day Service · Licensed & Insured</span>
          </div>
          <div className="pt-3">
            <p className="text-xs text-gray-600">
              Developed by{" "}
              <span className="font-semibold text-gray-500 hover:text-white transition-colors">
                Zakaria Zerari
              </span>
              {" "}- Full Stack Web Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
