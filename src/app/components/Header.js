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
    { name: "Home", path: "/", color: "red" },
    { name: "About", path: "/about", color: "blue" },
    { name: "Gallery", path: "/gallery", color: "red" },
    { name: "Contact", path: "/contact", color: "blue" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-2xl py-2"
          : "bg-white/95 backdrop-blur-lg shadow-xl py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* Logo - Responsive Size */}
        <Link href="/" className="group flex-shrink-0 -my-4 md:-my-6 relative">
          <div className="relative w-28 h-28 md:w-36 md:h-36 transform transition-all duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Eden Medical Transportation"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* Simple Gray Glow on Hover */}
            <div className="absolute inset-0 bg-gray-400/0 group-hover:bg-gray-400/10 blur-xl transition-all duration-300 -z-10 rounded-full"></div>
          </div>
        </Link>

        {/* ✅ Center Navigation - Show on Tablet (md) & Desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const isRed = link.color === "red";
            
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-3 md:px-4 lg:px-6 py-2 md:py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? isRed
                      ? "text-white bg-red-600 shadow-lg" 
                      : "text-white bg-blue-600 shadow-lg"
                    : "text-gray-700 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 md:w-12 h-1 bg-white rounded-full shadow-lg"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section - Responsive */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* Phone Button - Responsive */}
          <a
            href="tel:+15109578383"
            className="group flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-2 lg:py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-blue-600 rounded-lg group-hover:scale-110 transition-all duration-300 shadow-lg">
              <FaPhone className="text-white text-xs lg:text-sm" />
            </div>
            <div className="text-xs lg:text-sm hidden lg:block">
              <p className="font-bold text-gray-800">(510) 957-8383</p>
              <p className="text-xs text-gray-600 font-medium">24/7 Available</p>
            </div>
          </a>

          {/* Admin Button - Responsive */}
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="group relative flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm lg:text-base"
          >
            <FaUser className="text-sm lg:text-base" />
            <span className="hidden lg:inline">{isAdmin ? "Dashboard" : "Login"}</span>
          </Link>
        </div>

        {/* ✅ Mobile Menu Button - Only on Small Screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu - Only on Small Screens */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] z-40 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Content */}
          <div className="relative bg-white shadow-2xl animate-slide-down max-h-[calc(100vh-88px)] overflow-y-auto">
            <div className="px-6 py-6 space-y-3">
              {/* Navigation Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                const isRed = link.color === "red";
                
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-5 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold ${
                      isActive
                        ? isRed
                          ? "bg-red-600 text-white shadow-xl"
                          : "bg-blue-600 text-white shadow-xl"
                        : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-600 shadow-md border border-gray-200"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {link.name}
                      <span className="text-xl">→</span>
                    </span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-px bg-gray-300 my-4"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Phone Button */}
                <a
                  href="tel:+15109578383"
                  className="flex items-center gap-4 px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                  className="flex items-center justify-center gap-3 px-5 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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