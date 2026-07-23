"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-bgPrimary">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-surfaceElevated border border-white/10 p-8 rounded-3xl shadow-2xl shadow-brand-blue/5 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-black text-white tracking-tight">
                TradeOXX <span className="text-transparent bg-clip-text bg-brand-gradient">AI</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            {subtitle && <p className="text-brand-textMuted text-sm">{subtitle}</p>}
          </div>
          
          {children}
        </motion.div>
      </div>
    </div>
  );
}
