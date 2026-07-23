"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, setLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Connect to real backend API once running
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user, data.access_token);
      // Redirect to dashboard or onboarding
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your intelligent portfolio."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-brand-danger bg-brand-danger/10 border border-brand-danger/20 rounded-lg">
            {error}
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-brand-textSecondary">Password</label>
            <Link href="/forgot-password" className="text-xs text-brand-cyan hover:text-brand-blue transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-brand-textMuted" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-3 px-4 bg-white text-brand-bgPrimary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-cyan hover:text-white transition-all disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>Sign In <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-textMuted">
        Don't have an account?{" "}
        <Link href="/register" className="text-brand-purple font-medium hover:text-brand-cyan transition-colors">
          Create one now
        </Link>
      </div>
    </AuthLayout>
  );
}
