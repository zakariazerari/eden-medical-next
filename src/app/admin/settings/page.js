"use client";
import { useState, useEffect } from "react";
import { FaUser, FaLock, FaBell, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current admin email from cookie or API
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const emailCookie = cookies.find((c) => c.startsWith("admin-email="));
      if (emailCookie) {
        const email = emailCookie.split("=")[1];
        setAdminEmail(decodeURIComponent(email));
      }
    }
    setLoading(false);
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!currentPasswordForEmail) {
      toast.error("Please enter your current password");
      return;
    }

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "updateEmail",
          email: adminEmail,
          currentPassword: currentPasswordForEmail
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Email updated successfully!");
        setCurrentPasswordForEmail("");
      } else {
        toast.error(data.error || "Failed to update email");
      }
    } catch (error) {
      toast.error("Failed to update email");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "updatePassword",
          currentPassword,
          newPassword 
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-6">
      <h1 className="text-3xl font-extrabold text-violet-800">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-2xl text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password (to confirm)
            </label>
            <input
              type="password"
              value={currentPasswordForEmail}
              onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
          >
            <FaSave /> Save Email
          </button>
        </form>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaLock className="text-2xl text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
          >
            <FaSave /> Update Password
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-2xl text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        </div>

        <label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
          <span className="font-medium">Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => {
              setEmailNotifications(e.target.checked);
              toast.success(e.target.checked ? "Enabled" : "Disabled");
            }}
            className="w-5 h-5 text-violet-600 rounded"
          />
        </label>
      </div>
    </div>
  );
}