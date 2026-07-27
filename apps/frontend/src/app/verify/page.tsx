"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Loader2, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResending, setIsResending] = useState(false);
  const { login, isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/verify", { email, code });
      if (res.data.access_token) {
        login(res.data.user, res.data.access_token);
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/resend-code", { email });
      setSuccess("Verification code resent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout 
      title="Verify your identity" 
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/40">
          <ShieldCheck className="text-brand-cyan w-8 h-8" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-brand-danger bg-brand-danger/10 border border-brand-danger/20 rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-center">
            {success}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-brand-textSecondary mb-2 text-center">
            Enter 6-Digit Code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // only numbers
            className="block w-full text-center text-3xl tracking-[1em] pl-[1em] py-4 border border-white/10 rounded-xl bg-white/5 text-white placeholder-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all font-mono"
            placeholder="000000"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || code.length < 6}
          className="w-full mt-6 py-3 px-4 bg-brand-cyan text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-blue transition-all disabled:opacity-70 disabled:hover:bg-brand-cyan"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>Verify <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-textMuted">
        Didn't receive the code?{" "}
        <button 
          onClick={handleResend}
          disabled={isResending}
          className="text-brand-cyan font-medium hover:text-brand-blue transition-colors inline-flex items-center gap-1 disabled:opacity-50"
        >
          {isResending ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
          Resend code
        </button>
      </div>
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bgPrimary flex items-center justify-center"><Loader2 className="animate-spin text-brand-cyan w-8 h-8" /></div>}>
      <VerifyContent />
    </Suspense>
  );
}
