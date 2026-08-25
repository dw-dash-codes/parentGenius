import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");
      
      setSuccess("OTP has been sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP");
      
      setSuccess("OTP Verified! Set your new password.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");
      
      setSuccess("Password reset successfully! You can now login.");
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-5 border-b border-ink-100">
          <h3 className="text-lg font-bold text-ink-900">
            {step === 1 && "Reset Password"}
            {step === 2 && "Enter OTP"}
            {step === 3 && "New Password"}
          </h3>
          <button onClick={handleClose} className="text-ink-400 hover:text-ink-700 transition-colors">
            <FaXmark size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4 border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-4 border border-green-200">
              {success}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <p className="text-sm text-ink-500 mb-4">
                Enter your registered email address and we will send you a 6-digit OTP to reset your password.
              </p>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="h-12 w-full rounded-xl border border-ink-300 px-4 text-sm outline-none focus:border-brand-500 mb-6"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <p className="text-sm text-ink-500 mb-4">
                We sent a code to <span className="font-semibold text-ink-900">{email}</span>
              </p>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">6-Digit OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="123456"
                className="h-12 w-full rounded-xl border border-ink-300 px-4 text-center tracking-widest text-lg font-semibold outline-none focus:border-brand-500 mb-6"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <p className="text-sm text-ink-500 mb-4">
                Create a new strong password for your account.
              </p>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="h-12 w-full rounded-xl border border-ink-300 px-4 text-sm outline-none focus:border-brand-500 mb-6"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}