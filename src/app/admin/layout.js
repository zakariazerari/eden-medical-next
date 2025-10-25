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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}