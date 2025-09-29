"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartPie,
  FaUserMd,
  FaCommentDots,
} from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Stats", path: "/admin/stats", icon: FaChartPie },
    { name: "Drivers", path: "/admin/drivers", icon: FaUserMd },
    { name: "Reviews", path: "/admin/contact", icon: FaCommentDots },
  ];

  return (
    <>
      {/* 🔹 Mobile Header */}
      {/* 🔹 زر Menu مدموج مع الـ Sidebar */}
<div className="md:hidden fixed top-4 left-4 z-50">
  <button
    onClick={() => setOpen(true)}
    className="p-3 rounded-full bg-gradient-to-r from-violet-700 to-indigo-800 text-white shadow-lg hover:scale-110 transition-transform"
  >
    <FaBars className="text-2xl" />
  </button>
</div>


      {/* 🔹 Sidebar Desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-900 to-violet-900 text-white shadow-xl">
        <div className="p-6 text-center border-b border-violet-600/40">
          <h2 className="text-xl font-extrabold">Eden Admin</h2>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                pathname === path
                  ? "bg-violet-600 shadow-lg"
                  : "hover:bg-violet-700"
              }`}
            >
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 🔹 Fancy Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* خلفية ضبابية */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%", rotateY: 45, opacity: 0 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              exit={{ x: "-100%", rotateY: 45, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="fixed top-0 left-0 w-72 h-full bg-gradient-to-br from-violet-700/95 to-indigo-900/95 text-white z-50 shadow-2xl rounded-r-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-violet-400/40">
                <h2 className="text-xl font-extrabold">🚀 Eden Admin</h2>
                <button onClick={() => setOpen(false)} className="text-2xl">
                  <FaTimes />
                </button>
              </div>

              <nav className="p-6 space-y-4">
                {links.map(({ name, path, icon: Icon }) => (
                  <Link
                    key={name}
                    href={path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                      pathname === path
                        ? "bg-violet-600/90 shadow-lg"
                        : "hover:bg-violet-500/60"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="text-base font-medium">{name}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
