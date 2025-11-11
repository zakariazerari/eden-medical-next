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
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ NO Reviews link
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Bookings", path: "/admin/bookings", icon: FaCalendarCheck },
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
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-gradient-to-r from-red-700 to-blue-700 text-white shadow-2xl hover:scale-110 transition-transform"
        aria-label="Open menu"
      >
        <FaBars className="text-xl" />
      </button>

      <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl fixed top-0 left-0">
        <div className="p-6 text-center border-b border-gray-700/40">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Eden Admin
          </h2>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === path
                  ? "bg-gradient-to-r from-red-600 to-red-700 shadow-lg scale-105"
                  : "hover:bg-gray-700/50 hover:translate-x-1"
              }`}
            >
              <Icon className="text-xl flex-shrink-0" />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl transition-all duration-300"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in md:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-0 left-0 w-[280px] sm:w-[320px] h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-[70] shadow-2xl overflow-y-auto animate-slide-in-left md:hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/40">
              <h2 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                🚀 Eden Admin
              </h2>
              <button 
                onClick={() => setOpen(false)} 
                className="text-2xl hover:text-red-400 transition p-2"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="p-4 sm:p-6 space-y-2">
              {links.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  href={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl transition-all text-sm sm:text-base ${
                    pathname === path
                      ? "bg-gradient-to-r from-red-600 to-red-700 shadow-lg"
                      : "hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="text-lg sm:text-xl flex-shrink-0" />
                  <span className="font-medium">{name}</span>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-700/40 bg-gray-900">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 w-full px-3 sm:px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition text-sm sm:text-base"
              >
                <FaSignOutAlt className="flex-shrink-0" />
                <span>Logout</span>
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
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
}