// app/components/admin/Sidebar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarCheck,
  FaEnvelope,
  FaChartBar,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Bookings", path: "/admin/bookings", icon: FaCalendarCheck },
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
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-full bg-gradient-to-r from-violet-700 to-indigo-800 text-white shadow-2xl hover:scale-110 transition-transform"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-900 via-violet-900 to-indigo-950 text-white shadow-2xl fixed">
        <div className="p-6 text-center border-b border-violet-600/40">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            🚀 Eden Admin
          </h2>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === path
                  ? "bg-violet-600 shadow-lg scale-105"
                  : "hover:bg-violet-700/50 hover:translate-x-1"
              }`}
            >
              <Icon className="text-xl" />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-violet-600/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl transition-all duration-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-indigo-900 via-violet-900 to-indigo-950 text-white z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-violet-400/40">
                <h2 className="text-xl font-extrabold">🚀 Eden Admin</h2>
                <button onClick={() => setOpen(false)} className="text-2xl">
                  <FaTimes />
                </button>
              </div>

              <nav className="p-6 space-y-2">
                {links.map(({ name, path, icon: Icon }) => (
                  <Link
                    key={name}
                    href={path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      pathname === path
                        ? "bg-violet-600 shadow-lg"
                        : "hover:bg-violet-700/50"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{name}</span>
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}