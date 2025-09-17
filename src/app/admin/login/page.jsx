// app/admin/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // يمكنك تبديل هادشي بـ real auth later
    if (email === "admin@eden.com" && password === "123456") {
      router.push("/admin/dashboard");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full border border-violet-200"
      >
        <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center drop-shadow-md">
          Admin Login
        </h2>

        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-violet-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <FaLock className="absolute top-3 left-3 text-violet-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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