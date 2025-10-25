"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaTimes, FaBars } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const hasAuth = cookies.find((c) => c.startsWith("admin-auth="));
      setIsAdmin(hasAuth?.split("=")[1] === "true");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-2xl py-2"
          : "bg-gradient-to-r from-white/95 via-gray-50/90 to-white/95 backdrop-blur-lg shadow-xl py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo - Enhanced */}
        <Link href="/" className="group flex-shrink-0 -my-6 relative">
          <div className="relative w-36 h-36 transform group-hover:scale-110 transition-all duration-500 ease-out">
            <Image
              src="/logo.png"
              alt="Eden Medical Transportation"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-blue-400/0 to-red-400/0 group-hover:from-red-400/20 group-hover:via-blue-400/20 group-hover:to-red-400/20 blur-xl transition-all duration-500 -z-10"></div>
          </div>
        </Link>

        {/* Center Navigation - Enhanced */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${
                pathname === link.path
                  ? "text-white bg-gradient-to-r from-red-600 via-red-700 to-blue-700 shadow-lg shadow-red-500/30"
                  : "text-gray-700 hover:text-blue-700"
              }`}
            >
              {/* Background Animation */}
              {pathname !== link.path && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl -z-10"></span>
              )}
              
              <span className="relative z-10">{link.name}</span>
              
              {/* Active Indicator */}
              {pathname === link.path && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full shadow-lg animate-pulse"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section - Enhanced */}
        <div className="hidden md:flex items-center gap-4">
          {/* Phone - Enhanced */}
          <a
            href="tel:+15109578383"
            className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <FaPhone className="text-white text-sm" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-800">(510) 957-8383</p>
              <p className="text-xs text-gray-600 font-medium">24/7 Available</p>
            </div>
          </a>

          {/* Admin Button - Enhanced */}
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Shine Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            <FaUser className="relative z-10" />
            <span className="relative z-10">{isAdmin ? "Dashboard" : "Login"}</span>
          </Link>
        </div>

        {/* Mobile Menu Button - Enhanced */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 flex items-center justify-center bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FaTimes className="text-xl animate-spin-slow" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Enhanced */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] z-40 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Content */}
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl animate-slide-down max-h-[calc(100vh-88px)] overflow-y-auto">
            <div className="px-6 py-6 space-y-3">
              {/* Navigation Links */}
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`block px-5 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    pathname === link.path
                      ? "bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold shadow-xl shadow-red-500/30"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 hover:from-blue-50 hover:to-red-50 font-semibold shadow-md"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {link.name}
                    <span className="text-xl">→</span>
                  </span>
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Phone Button */}
                <a
                  href="tel:+15109578383"
                  className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">(510) 957-8383</p>
                    <p className="text-xs opacity-90 font-medium">24/7 Emergency Hotline</p>
                  </div>
                </a>

                {/* Admin Button */}
                <Link
                  href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                  className="flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="text-lg" />
                  <span>{isAdmin ? "Go to Dashboard" : "Admin Login"}</span>
                </Link>
              </div>

              {/* Bottom Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 font-medium">
                  🚑 <span className="text-green-600 font-bold">Available 24/7</span> for Emergency Transport
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}