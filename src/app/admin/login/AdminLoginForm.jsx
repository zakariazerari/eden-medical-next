"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Security features
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  
  const router = useRouter();

  // Check if blocked on mount
  useEffect(() => {
    const blockedUntil = localStorage.getItem("loginBlockedUntil");
    if (blockedUntil) {
      const timeLeft = parseInt(blockedUntil) - Date.now();
      if (timeLeft > 0) {
        setIsBlocked(true);
        setBlockTimeLeft(Math.ceil(timeLeft / 1000));
      } else {
        localStorage.removeItem("loginBlockedUntil");
        localStorage.removeItem("loginAttempts");
      }
    }
    
    const attempts = localStorage.getItem("loginAttempts");
    if (attempts) {
      setLoginAttempts(parseInt(attempts));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setInterval(() => {
        setBlockTimeLeft((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            localStorage.removeItem("loginBlockedUntil");
            localStorage.removeItem("loginAttempts");
            toast.success("You can try logging in again");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeLeft]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      toast.error(`Too many attempts. Try again in ${blockTimeLeft}s`);
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Reset attempts on success
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("loginBlockedUntil");
        setLoginAttempts(0);
        
        toast.success("✅ Welcome back, Admin!");
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 500);
      } else {
        // Increment failed attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem("loginAttempts", newAttempts.toString());

        if (newAttempts >= 5) {
          // Block for 1 minute
          const blockUntil = Date.now() + 60000; // 1 minute
          localStorage.setItem("loginBlockedUntil", blockUntil.toString());
          setIsBlocked(true);
          setBlockTimeLeft(60);
          toast.error("🔒 Too many failed attempts! Blocked for 1 minute");
        } else {
          toast.error(`❌ ${data.error || "Invalid credentials"} (${newAttempts}/5)`);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setResetLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset link sent to your email!");
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        toast.error(data.error || "Failed to send reset link");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setResetLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-violet-100 via-white to-indigo-100 px-4">
        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-4xl text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-violet-700 mb-4 text-center">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email to receive a password reset link
          </p>

          <div className="mb-6 relative">
            <FaUser className="absolute top-3.5 left-3 text-violet-500" />
            <input
              type="email"
              placeholder="admin@eden.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              disabled={resetLoading}
            />
          </div>

          <button
            type="submit"
            disabled={resetLoading}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform disabled:opacity-50"
          >
            {resetLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            onClick={() => setShowForgotPassword(false)}
            className="w-full mt-4 text-violet-600 hover:text-violet-700 font-medium"
          >
            Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-violet-100 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-violet-100 hover:shadow-2xl transition-all duration-300"
      >
        {/* Security Shield Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <FaShieldAlt className="text-4xl text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-violet-700 mb-2 text-center">
          Secure Admin Login
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Protected access to Eden Medical Transport
        </p>

        {isBlocked && (
          <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="text-red-700 font-bold text-lg">Account Locked</p>
                <p className="text-red-600 text-sm">Too many failed login attempts</p>
              </div>
            </div>
            
            <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Time remaining</span>
                <span className="text-2xl font-bold text-red-600">{blockTimeLeft}s</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(blockTimeLeft / 60) * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-xs text-red-600 text-center mt-3">
              Please wait before attempting to login again
            </p>
          </div>
        )}

        {!isBlocked && loginAttempts > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-800 font-semibold text-sm">
                Security Alert
              </p>
              <span className="text-xs font-bold text-orange-600">
                {loginAttempts}/5 attempts
              </span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  loginAttempts >= 4 ? 'bg-red-500' : 
                  loginAttempts >= 3 ? 'bg-orange-500' : 
                  'bg-yellow-500'
                }`}
                style={{ width: `${(loginAttempts / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              {5 - loginAttempts} {5 - loginAttempts === 1 ? 'attempt' : 'attempts'} remaining before temporary lock
            </p>
          </div>
        )}

        <div className="mb-6 relative">
          <FaUser className="absolute top-3.5 left-3 text-violet-500" />
          <input
            type="email"
            placeholder="admin@eden.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            disabled={loading || isBlocked}
          />
        </div>

        <div className="mb-4 relative">
          <FaLock className="absolute top-3.5 left-3 text-violet-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            disabled={loading || isBlocked}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3.5 right-3 text-violet-500 hover:text-violet-700 transition-colors focus:outline-none"
            disabled={loading || isBlocked}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" />
            ) : (
              <FaEye className="text-xl" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
              disabled={isBlocked}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-violet-600 hover:text-violet-700 font-medium"
            disabled={isBlocked}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || isBlocked}
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : isBlocked ? `Blocked (${blockTimeLeft}s)` : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Default: exumple@gmail.com / mode pass: xxxxxxx
        </p>
      </form>
    </div>
  );
}