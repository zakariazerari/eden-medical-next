"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarCheck,
  FaEnvelope,
  FaChartBar,
  FaSignOutAlt,
  FaCog,
  FaImages,
  FaBlog,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Bookings", path: "/admin/bookings", icon: FaCalendarCheck },
    { name: "Blog Posts", path: "/admin/blog", icon: FaBlog },
    { name: "Gallery", path: "/admin/gallery", icon: FaImages },
    { name: "Messages", path: "/admin/contact", icon: FaEnvelope },
    { name: "Statistics", path: "/admin/stats", icon: FaChartBar },
    { name: "Settings", path: "/admin/settings", icon: FaCog },
  ];

  const handleLogout = () => {
    document.cookie = "admin-auth=; path=/; max-age=0";
    toast.success("👋 Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed Top Left */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
        aria-label="Open menu"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-red-900 via-red-800 to-gray-900 text-white shadow-2xl fixed top-0 left-0 z-40">
        <div className="p-6 text-center border-b border-red-700/40">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-300 to-white bg-clip-text text-transparent">
            🚑 Eden Admin
          </h2>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === path
                  ? "bg-gradient-to-r from-red-600 to-red-700 shadow-lg scale-105 border-2 border-white"
                  : "hover:bg-red-800/50 hover:translate-x-1"
              }`}
            >
              <Icon className="text-xl flex-shrink-0" />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-red-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 border-2 border-red-400"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] animate-fade-in"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-0 left-0 w-[280px] h-full bg-gradient-to-b from-red-900 via-red-800 to-gray-900 text-white z-[999] shadow-2xl overflow-hidden animate-slide-in-left border-r-4 border-red-600 flex flex-col">
            
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b-2 border-red-700/50 flex-shrink-0">
              <h2 className="text-lg font-extrabold bg-gradient-to-r from-red-300 to-white bg-clip-text text-transparent">
                🚑 Eden Admin
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="text-2xl hover:text-red-400 transition p-2 hover:bg-red-800/50 rounded-lg"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            {/* Navigation Links - Scrollable */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {links.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  href={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    pathname === path
                      ? "bg-gradient-to-r from-red-600 to-red-700 shadow-xl border-2 border-white"
                      : "hover:bg-red-800/50 active:scale-95"
                  }`}
                >
                  <Icon className="text-lg flex-shrink-0" />
                  <span className="font-semibold text-sm">{name}</span>
                </Link>
              ))}
            </nav>

            {/* Logout Button - Fixed Bottom */}
            <div className="p-4 border-t-2 border-red-700/50 bg-red-900 flex-shrink-0">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition shadow-xl border-2 border-red-400 active:scale-95"
              >
                <FaSignOutAlt className="text-lg flex-shrink-0" />
                <span className="font-semibold text-sm">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-left {
          from { 
            transform: translateX(-100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}