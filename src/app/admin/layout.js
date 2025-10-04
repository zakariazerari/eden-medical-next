"use client";
import Sidebar from "@/app/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-violet-50 to-indigo-100">
      <Toaster position="top-center" />

      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="skip-link absolute left-[-999px] top-auto w-px h-px overflow-hidden 
                   focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:p-2 
                   focus:bg-violet-600 focus:text-white focus:rounded-md focus:z-50"
      >
        Skip to main content
      </a>

      <Sidebar />

      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
