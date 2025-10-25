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
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setCurrentTime(`${dateString} - ${timeString}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative overflow-hidden text-gray-900 bg-gradient-to-tr from-gray-50 via-white to-gray-100 pt-12 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-50/30 via-white/50 to-blue-50/30"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent">
            Eden Medical Transport
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            California&apos;s trusted non-emergency medical transportation provider since 2014. 
            Safe, comfortable, and reliable wheelchair accessible transport services.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-red-600 flex-shrink-0" />
            <span>Serving all 58 California Counties</span>
          </div>
          
          {mounted && currentTime && (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-red-50 p-3 rounded-lg border border-gray-200">
              <BiTime className="text-blue-600 text-xl animate-pulse flex-shrink-0" />
              <div>
                <p className="font-semibold text-xs text-gray-500 uppercase">Current Time</p>
                <p className="font-mono text-xs">{currentTime}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-red-600 pb-2 inline-block">
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
                  className="text-gray-700 hover:text-red-700 hover:translate-x-1 transform transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="text-red-600 group-hover:text-red-700">→</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2 inline-block">
            Our Services
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/services/wheelchair-transport"
                className="flex items-start gap-3 text-gray-700 hover:text-blue-700 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">♿</span>
                <div>
                  <div className="font-semibold group-hover:text-blue-700">Wheelchair Transportation</div>
                  <div className="text-xs text-gray-600">ADA accessible vans</div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/services/stretcher-transport"
                className="flex items-start gap-3 text-gray-700 hover:text-purple-700 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🏥</span>
                <div>
                  <div className="font-semibold group-hover:text-purple-700">Stretcher Service</div>
                  <div className="text-xs text-gray-600">For bed-bound patients</div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/services/dialysis-transport"
                className="flex items-start gap-3 text-gray-700 hover:text-red-700 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">💉</span>
                <div>
                  <div className="font-semibold group-hover:text-red-700">Dialysis Transport</div>
                  <div className="text-xs text-gray-600">Recurring appointments</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-green-600 pb-2 inline-block">
            Contact Us
          </h3>
          
          <a
            href="tel:+15109578383"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-700 transition-all duration-300 group"
          >
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <FaPhoneAlt className="text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">24/7 Hotline</p>
              <p className="text-gray-900 font-bold">(510) 957-8383</p>
            </div>
          </a>

          <a
            href="mailto:info@edenmedical.com"
            className="flex items-center gap-3 text-gray-700 hover:text-red-700 transition-all duration-300 group"
          >
            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
              <FaEnvelope className="text-red-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Email Us</p>
              <p className="text-xs text-gray-900 break-all">info@edenmedical.com</p>
            </div>
          </a>

          <div className="pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, link: "https://www.facebook.com/edenmedical", color: "hover:bg-blue-600", label: "Facebook" },
                { Icon: FaInstagram, link: "https://www.instagram.com/edenmedical", color: "hover:bg-gradient-to-br hover:from-pink-600 hover:to-red-600", label: "Instagram" },
                { Icon: FaTwitter, link: "https://twitter.com/edenmedical", color: "hover:bg-sky-500", label: "Twitter" },
              ].map(({ Icon, link, color, label }) => (
                <a 
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl ${color} hover:text-white transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-xl`}
                  aria-label={`Follow Eden Medical Transport on ${label}`}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-14 pt-6 md:pt-8 border-t border-gray-300/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Eden Medical Transport. All rights reserved.
            <span className="hidden md:inline"> | </span>
            <span className="block md:inline mt-1 md:mt-0 text-gray-700 font-semibold">
              Licensed & Insured in California
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <Link href="/privacy" className="hover:text-blue-700 transition-colors font-medium">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-red-700 transition-colors font-medium">Terms of Service</Link>
            <Link href="/faq" className="hover:text-purple-700 transition-colors font-semibold">FAQ</Link>
            <Link href="/admin/login" className="hover:text-gray-900 transition-colors font-semibold">Admin</Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200/50">
          <div className="text-center space-y-3">
            <div className="text-xs leading-relaxed text-gray-600">
              <strong className="text-gray-800 font-semibold">Service Areas:</strong>{" "}
              <span className="text-gray-700">Alameda County (Oakland, Berkeley, Fremont, Hayward) • San Francisco • Contra Costa County (Concord, Walnut Creek) • Santa Clara County (San Jose, Palo Alto, Sunnyvale) • San Mateo County (Redwood City, Daly City) • Marin County (San Rafael, Novato) • All 58 California Counties</span>
            </div>
            <div className="text-xs leading-relaxed text-gray-600">
              <strong className="text-gray-800 font-semibold">Services:</strong>{" "}
              <span className="text-gray-700">Medical Transportation California • Wheelchair Transport • Non-Emergency Medical Transport (NEMT) • Dialysis Transportation • Stretcher Service • ADA Compliant Vans • Patient Transport • Ambulette Service • Hospital Discharge Transport • Medi-Cal Transportation • Medicare Transport</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 px-3 sm:px-4 py-2 rounded-full border border-green-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-800">Available 24/7 • Same-Day Service • Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}