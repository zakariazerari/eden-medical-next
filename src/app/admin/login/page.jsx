"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast"; // 👈 استورد toast

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("⚠️ Email and Password are required"); // 👈 toast بدل error العادي
      return;
    }

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("✅ Welcome back, Admin!"); // 👈 نجاح
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "❌ Invalid credentials"); // 👈 خطأ
      }
    } catch (err) {
      toast.error("🚨 Network error, try again later."); // 👈 مشكلة فالنت
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-violet-100 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100 hover:shadow-2xl transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-violet-700 mb-8 text-center tracking-tight drop-shadow-sm">
          Admin Login
        </h2>

        <div className="mb-6 relative">
          <FaUser className="absolute top-3.5 left-3 text-violet-500" />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <div className="mb-6 relative">
          <FaLock className="absolute top-3.5 left-3 text-violet-500" />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder-gray-400 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Login
        </button>
      </form>
    </div>
  );
}
