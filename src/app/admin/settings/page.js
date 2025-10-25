"use client";
import { useState, useEffect } from "react";
import { FaUser, FaLock, FaBell, FaSave, FaShieldAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

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

    if (!adminEmail || adminEmail.trim() === "") {
      toast.error("Email cannot be empty");
      return;
    }

    setUpdatingEmail(true);
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
        
        // Update cookie
        document.cookie = `admin-email=${encodeURIComponent(adminEmail)}; path=/; max-age=${30 * 24 * 60 * 60}`;
      } else {
        toast.error(data.error || "Failed to update email");
      }
    } catch (error) {
      toast.error("Failed to update email");
    } finally {
      setUpdatingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setUpdatingPassword(true);
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
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your admin account settings</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-2xl text-blue-600" />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
              placeholder="Enter your current password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updatingEmail}
            className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition ${
              updatingEmail ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaSave /> {updatingEmail ? "Saving..." : "Save Email"}
          </button>
        </form>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FaLock className="text-2xl text-red-600" />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
              placeholder="Enter your current password"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
              placeholder="Enter new password (min 6 characters)"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updatingPassword}
            className={`flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition ${
              updatingPassword ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaSave /> {updatingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-2xl text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        </div>

        <label className="flex items-center justify-between p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FaBell className="text-gray-600" />
            </div>
            <div>
              <span className="font-medium text-gray-800">Email Notifications</span>
              <p className="text-sm text-gray-600">Receive email alerts for new bookings and messages</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => {
              setEmailNotifications(e.target.checked);
              toast.success(e.target.checked ? "Notifications enabled" : "Notifications disabled");
            }}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaShieldAlt className="text-3xl text-blue-600" />
          <h3 className="text-lg font-bold text-blue-800">Security Tips</h3>
        </div>
        <ul className="text-blue-700 space-y-2 text-sm">
          <li>• Use a strong password with at least 8 characters</li>
          <li>• Include uppercase, lowercase, numbers, and symbols</li>
          <li>• Don't share your admin credentials with anyone</li>
          <li>• Change your password regularly (every 3-6 months)</li>
          <li>• Log out when using shared computers</li>
        </ul>
      </div>
    </div>
  );
}