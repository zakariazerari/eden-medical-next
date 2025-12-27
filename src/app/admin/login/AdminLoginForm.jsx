"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
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
  
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  
  const router = useRouter();

  const successToast = (message) => {
    toast.success(message, {
      duration: 2000,
      position: 'top-center',
      style: {
        background: 'linear-gradient(to right, #10b981, #059669)',
        color: '#fff',
        fontWeight: 'bold',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      },
      icon: '✅',
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'linear-gradient(to right, #ef4444, #dc2626)',
        color: '#fff',
        fontWeight: 'bold',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
      },
      icon: '❌',
    });
  };

  const warningToast = (message) => {
    toast(message, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: 'linear-gradient(to right, #f59e0b, #ea580c)',
        color: '#fff',
        fontWeight: 'bold',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
      },
      icon: '⚠️',
    });
  };

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

  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setInterval(() => {
        setBlockTimeLeft((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            localStorage.removeItem("loginBlockedUntil");
            localStorage.removeItem("loginAttempts");
            successToast("You can try logging in again");
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
      warningToast(`Too many attempts. Try again in ${blockTimeLeft}s`);
      return;
    }

    if (!email.trim() || !password.trim()) {
      errorToast("Email and Password are required");
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
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("loginBlockedUntil");
        setLoginAttempts(0);
        
        successToast("Welcome back, Admin! Redirecting...");
        
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 2000);
        
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem("loginAttempts", newAttempts.toString());

        if (newAttempts >= 5) {
          const blockUntil = Date.now() + 60000;
          localStorage.setItem("loginBlockedUntil", blockUntil.toString());
          setIsBlocked(true);
          setBlockTimeLeft(60);
          errorToast("Too many failed attempts! Blocked for 1 minute");
        } else {
          errorToast(`${data.error || "Invalid credentials"} (Attempt ${newAttempts}/5)`);
        }
        
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      errorToast("Network error, please try again later");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      errorToast("Please enter your email");
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
        successToast("Password reset link sent to your email!");
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        errorToast(data.error || "Failed to send reset link");
      }
    } catch (err) {
      errorToast("Network error, please try again");
    } finally {
      setResetLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-100 px-4">
        <Link 
          href="/"
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-sm"
        >
          <FaHome className="text-lg" />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>

        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-200"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-4xl text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email to receive a password reset link
          </p>

          <div className="mb-6 relative">
            <FaUser className="absolute top-3.5 left-3 text-blue-500 z-10" />
            <input
              type="email"
              placeholder="example@gmail.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
              disabled={resetLoading}
              style={{ WebkitTextFillColor: '#111827' }}
            />
          </div>

          <button
            type="submit"
            disabled={resetLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform disabled:opacity-50"
          >
            {resetLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            onClick={() => setShowForgotPassword(false)}
            className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-100 px-4">
      <Link 
        href="/"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold text-sm"
      >
        <FaHome className="text-lg" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <style jsx global>{`
        /* Hide browser's password reveal buttons */
        input.password-input::-ms-reveal,
        input.password-input::-ms-clear {
          display: none !important;
        }
        
        input.password-input::-webkit-contacts-auto-fill-button,
        input.password-input::-webkit-credentials-auto-fill-button {
          visibility: hidden;
          position: absolute;
          right: 0;
        }
      `}</style>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <FaShieldAlt className="text-4xl text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Secure Admin Login
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Protected access to Eden Medical Transport
        </p>

        {isBlocked && (
          <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl shadow-lg">
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
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000 ease-linear"
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
              <p className="text-yellow-800 font-semibold text-sm">Security Alert</p>
              <span className="text-xs font-bold text-orange-600">{loginAttempts}/5 attempts</span>
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
          <FaUser className="absolute top-3.5 left-3 text-blue-500 z-10" />
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-900"
            disabled={loading || isBlocked}
            style={{ WebkitTextFillColor: '#111827' }}
          />
        </div>

        <div className="mb-4 relative">
          <FaLock className="absolute top-3.5 left-3 text-red-500 z-10" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-900 password-input"
            disabled={loading || isBlocked}
            style={{ WebkitTextFillColor: '#111827' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3.5 right-3 text-red-500 hover:text-red-600 transition-colors focus:outline-none z-10"
            disabled={loading || isBlocked}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              disabled={isBlocked}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            disabled={isBlocked}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || isBlocked}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : isBlocked ? `Blocked (${blockTimeLeft}s)` : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Default: exemple@gmail.com / Password: xxxxxxxx
        </p>
      </form>
    </div>
  );
}