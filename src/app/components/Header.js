"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 👇 نجيبو الكوكي من المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const hasAuth = cookies.find((c) => c.startsWith("admin-auth="));
      setIsAdmin(hasAuth?.split("=")[1] === "true");
    }
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/90 to-violet-100/90 backdrop-blur-xl shadow-xl border-b border-violet-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 transform hover:scale-110 hover:rotate-1 transition-all duration-300"
        >
          Eden Transport
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium flex-grow justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative group transition-transform duration-300 hover:scale-105 ${
                pathname === link.path ? "text-violet-700 font-semibold" : ""
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full ${
                  pathname === link.path ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* ✅ Login / Dashboard Button */}
        <Link
          href={isAdmin ? "/admin/dashboard" : "/admin/login"}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
        >
          <FaUser className="text-white text-lg" />{" "}
          {isAdmin ? "Dashboard" : "Login"}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-violet-700 focus:outline-none"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block px-6 py-4 text-gray-800 hover:text-violet-600 ${
                pathname === link.path ? "text-violet-700 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="block px-6 py-4 text-violet-700 font-semibold hover:bg-violet-50 flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="text-violet-700" />
            {isAdmin ? "Dashboard" : "Login"}
          </Link>
        </div>
      )}
    </header>
  );
}
