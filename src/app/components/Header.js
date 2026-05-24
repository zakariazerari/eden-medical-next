"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaUser, FaPhone, FaTimes, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const hasAuth = cookies.find((c) => c.startsWith("admin-auth="));
      const cookieVal = hasAuth?.split("=")[1];
      setIsAdmin(!!cookieVal && cookieVal.includes("."));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainLinks = [
    { name: "Home", path: "/", color: "red" },
    { name: "About", path: "/about", color: "blue" },
    { name: "Gallery", path: "/gallery", color: "red" },
    { name: "Contact", path: "/contact", color: "blue" }
  ];

  const dropdownLinks = [
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" }
  ];

  const isDropdownActive = dropdownLinks.some(link => pathname === link.path);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 300);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-2xl py-2"
          : "bg-white/95 backdrop-blur-lg shadow-xl py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="group flex-shrink-0 -my-4 md:-my-6 relative">
          <div className="relative w-28 h-28 md:w-36 md:h-36 transform transition-all duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Eden Medical Transportation"
              fill
              sizes="(max-width: 768px) 112px, 144px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {mainLinks.map((link) => {
            const isActive = pathname === link.path;
            const isRed = link.color === "red";
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-3 xl:px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm xl:text-base ${
                  isActive
                    ? isRed
                      ? "text-white bg-red-600 shadow-lg"
                      : "text-white bg-blue-600 shadow-lg"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 xl:w-10 h-1 bg-white rounded-full shadow-lg"></span>
                )}
              </Link>
            );
          })}

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`relative px-3 xl:px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm xl:text-base flex items-center gap-2 ${
                isDropdownActive || dropdownOpen
                  ? "text-white bg-red-600 shadow-lg"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="relative z-10">Resources</span>
              <FaChevronDown className={`text-xs transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              {isDropdownActive && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 xl:w-10 h-1 bg-white rounded-full shadow-lg"></span>
              )}
            </button>

            {dropdownOpen && (
              <>
                <div className="absolute top-full left-0 right-0 h-3"></div>
                <div
                  className="absolute top-full mt-2 left-0 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {dropdownLinks.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                          isActive
                            ? "bg-red-600 text-white font-bold"
                            : "text-gray-700 hover:bg-red-50 hover:text-red-600 hover:pl-7"
                        }`}
                      >
                        <span className="font-semibold text-base">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <a
            href="tel:+15109578383"
            className="group flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <div className="w-9 h-9 xl:w-10 xl:h-10 flex items-center justify-center bg-blue-600 rounded-lg group-hover:scale-110 transition-all duration-300 shadow-lg">
              <FaPhone className="text-white text-xs xl:text-sm" />
            </div>
            <div className="text-xs xl:text-sm">
              <p className="font-bold text-gray-800">(510) 957-8383</p>
              <p className="text-xs text-gray-600 font-medium">24/7 Available</p>
            </div>
          </a>

          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm xl:text-base"
          >
            <FaUser className="text-sm" />
            <span>{isAdmin ? "Dashboard" : "Login"}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] z-40">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white shadow-2xl max-h-[calc(100vh-88px)] overflow-y-auto">
            <div className="px-6 py-6 space-y-3">
              {mainLinks.map((link) => {
                const isActive = pathname === link.path;
                const isRed = link.color === "red";
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-5 py-4 rounded-xl transition-all duration-300 font-semibold ${
                      isActive
                        ? isRed
                          ? "bg-red-600 text-white shadow-xl"
                          : "bg-blue-600 text-white shadow-xl"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
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

              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 space-y-2 border-2 border-blue-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-3 px-1">Resources</p>
                {dropdownLinks.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-red-600 text-white shadow-lg font-bold"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-semibold text-base">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="h-px bg-gray-300 my-4"></div>

              <div className="space-y-3">
                <a
                  href="tel:+15109578383"
                  className="flex items-center gap-4 px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-lg">(510) 957-8383</p>
                    <p className="text-xs opacity-90 font-medium">24/7 Emergency</p>
                  </div>
                </a>

                <Link
                  href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                  className="flex items-center justify-center gap-3 px-5 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xl transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="text-lg" />
                  <span>{isAdmin ? "Dashboard" : "Admin Login"}</span>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 font-medium">
                  <span className="text-green-600 font-bold">Available 24/7</span> for Transport
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
