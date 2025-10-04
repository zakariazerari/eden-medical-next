"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser, FaPhone } from "react-icons/fa";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl py-3"
          : "bg-gradient-to-r from-white/90 to-violet-50/90 backdrop-blur-md shadow-lg py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent">
              Eden Transport
            </h1>
            <p className="text-xs text-gray-600">Medical Transportation</p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === link.path
                  ? "text-violet-700 bg-violet-50"
                  : "text-gray-700 hover:text-violet-700 hover:bg-violet-50/50"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-violet-600 rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Emergency Call */}
          <a
            href="tel:+15109578383"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-violet-700 transition-all group"
          >
            <FaPhone className="text-violet-600 group-hover:scale-110 transition-transform" />
            <div className="text-sm">
              <p className="font-bold">(510) 957-8383</p>
              <p className="text-xs text-gray-500">24/7 Available</p>
            </div>
          </a>

          {/* Login/Dashboard */}
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all"
          >
            <FaUser />
            {isAdmin ? "Dashboard" : "Login"}
          </Link>
        </div>

        {/* ✅ Mobile Menu Button (Accessible) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-violet-700 hover:bg-violet-50 rounded-lg transition"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="text-3xl">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-violet-100 shadow-xl animate-slide-down">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  pathname === link.path
                    ? "bg-violet-50 text-violet-700 font-semibold"
                    : "text-gray-700 hover:bg-violet-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <a
                href="tel:+15109578383"
                className="flex items-center gap-3 px-4 py-3 bg-violet-50 rounded-lg"
              >
                <FaPhone className="text-violet-600" />
                <div className="text-sm">
                  <p className="font-bold text-gray-800">(510) 957-8383</p>
                  <p className="text-xs text-gray-600">24/7 Emergency</p>
                </div>
              </a>

              <Link
                href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                <FaUser />
                {isAdmin ? "Dashboard" : "Admin Login"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
