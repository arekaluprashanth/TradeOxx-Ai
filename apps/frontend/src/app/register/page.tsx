"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, setLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      login(data.user, data.access_token);
      window.location.href = "/onboarding";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start your intelligent portfolio journey today."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-brand-danger bg-brand-danger/10 border border-brand-danger/20 rounded-lg">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-brand-textSecondary mb-1.5">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-brand-textMuted" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-brand-textMuted focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
              placeholder="Jane Doe"
            />
          </div>
        </div>

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
          <label className="block text-sm font-medium text-brand-textSecondary mb-1.5">Password</label>
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
          <PasswordStrengthMeter password={password} />
        </div>

        <button
          type="submit"
          disabled={isLoading || password.length < 8}
          className="w-full mt-6 py-3 px-4 bg-white text-brand-bgPrimary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-cyan hover:text-white transition-all disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-brand-bgPrimary"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>Create Account <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-brand-textMuted">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-cyan font-medium hover:text-brand-blue transition-colors">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
