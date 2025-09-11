"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg z-50 border-b border-violet-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-violet-700 tracking-wide transform transition duration-300 hover:scale-105 hover:rotate-1 drop-shadow-md"
        >
          Eden Transport
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative px-3 py-2 transition duration-300 ease-in-out 
                ${pathname === link.path
                  ? "text-violet-700 font-semibold scale-105"
                  : "hover:text-violet-600 hover:scale-105"} 
                transform hover:drop-shadow-lg`}
            >
              {link.name}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-violet-600 rounded-full transition-all duration-300 
                  ${pathname === link.path ? "w-full" : "w-0"} group-hover:w-full`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-violet-700 text-3xl focus:outline-none"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block px-6 py-4 text-gray-800 font-medium hover:text-violet-600 ${
                pathname === link.path ? "text-violet-700 font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}