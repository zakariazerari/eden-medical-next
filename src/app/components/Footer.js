"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-gray-900 bg-gradient-to-tr from-indigo-50 via-violet-100 to-blue-50 pt-16 pb-10 px-6 md:px-20">
      {/* Gradient background instead of image */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50/30 via-indigo-50/30 to-blue-50/30"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
            Eden Transport
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            California's trusted medical transportation provider since 2014.
            Safe, comfortable, and reliable non-emergency transport services.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-violet-600" />
            <span>Serving all 58 CA Counties</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-violet-700">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-gray-700 hover:text-violet-700 hover:translate-x-1 transform transition-all duration-300 inline-block"
                >
                  → {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-violet-700">Contact Us</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+15109578383"
                className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition group"
              >
                <div className="p-2 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition">
                  <FaPhoneAlt className="text-violet-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">24/7 Hotline</p>
                  <p>(510) 957-8383</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@edentransport.com"
                className="flex items-center gap-3 text-gray-700 hover:text-violet-700 transition group"
              >
                <div className="p-2 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition">
                  <FaEnvelope className="text-violet-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Email Us</p>
                  <p>info@edentransport.com</p>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-violet-700">Follow Us</h3>
          <p className="text-sm text-gray-600">
            Stay connected for updates and health tips
          </p>
          <div className="flex gap-4">
            {[
              { Icon: FaFacebookF, link: "#", color: "hover:bg-blue-600" },
              { Icon: FaInstagram, link: "#", color: "hover:bg-pink-600" },
              { Icon: FaTwitter, link: "#", color: "hover:bg-sky-500" },
            ].map(({ Icon, link, color }, i) => (
              <a
                key={i}
                href={link}
                className={`w-12 h-12 flex items-center justify-center bg-violet-100 text-violet-700 rounded-xl ${color} hover:text-white transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 pt-8 border-t border-violet-300/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Eden Medical Transport. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-violet-700 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-violet-700 transition">
              Terms of Service
            </Link>
            <Link href="/admin/login" className="hover:text-violet-700 transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
