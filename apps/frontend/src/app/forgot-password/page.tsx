"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      // Mocking the API call for password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Failed to send reset link. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent a password reset link.">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-16 h-16 bg-brand-success/10 rounded-full flex items-center justify-center text-brand-success mb-4">
            <CheckCircle size={32} />
          </div>
          <p className="text-brand-textSecondary text-sm mb-8">
            If an account exists for <span className="text-white font-medium">{email}</span>, you will receive an email with instructions on how to reset your password.
          </p>
          <Link 
            href="/login"
            className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
          >
            Return to login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {status === "error" && (
          <div className="p-3 text-sm text-brand-danger bg-brand-danger/10 border border-brand-danger/20 rounded-lg">
            {errorMsg}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-brand-textSecondary mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-brand-textMuted" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full mt-6 py-3 px-4 bg-brand-cyan text-brand-bgPrimary rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>Send Reset Link <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-textMuted">
        Remember your password?{" "}
        <Link href="/login" className="text-brand-textSecondary font-medium hover:text-white transition-colors">
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
