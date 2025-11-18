"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Don't show sidebar on login page
  const isLoginPage = pathname === "/admin/login" || 
                      pathname === "/admin/forgot-password" ||
                      pathname === "/admin/reset-password";

  if (isLoginPage) {
    return (
      <>
        <Toaster position="top-center" />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-blue-50">
      <Sidebar />
      
      {/* ✅ FIXED: Added top padding for mobile menu button */}
      <main className="md:ml-64 pt-20 md:pt-8 p-4 sm:p-6 lg:p-8 min-h-screen">
        {children}
      </main>
      
      <Toaster position="top-center" />
    </div>
  );
}