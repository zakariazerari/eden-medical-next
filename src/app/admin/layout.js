"use client";
import Sidebar from "@/app/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-violet-50 to-indigo-100">
      <Toaster position="top-center" />
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}