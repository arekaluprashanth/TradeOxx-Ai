"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-brand-bgPrimary"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
          <span className="text-sm font-medium text-brand-textSecondary">TradeOXX AI Version 1.0 is live</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight tracking-tight mb-6">
            The AI-Powered <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple">
              Portfolio Intelligence
            </span> Engine.
          </h1>
          <p className="text-lg md:text-xl text-brand-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn complex market data into understandable insights. Track performance, analyze risk, and explore the market with unparalleled clarity and transparency.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/register"
            className="group relative px-8 py-4 w-full sm:w-auto rounded-full bg-white text-brand-bgPrimary text-base font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 w-full sm:w-auto rounded-full bg-white/5 border border-white/10 text-white text-base font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            Explore Features
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/5 pt-8"
        >
          {[
            { icon: Activity, title: "Real-time Intelligence", desc: "Live market processing" },
            { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption" },
            { icon: Zap, title: "Lightning Fast", desc: "Powered by Next.js & Rust" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-cyan">
                <item.icon size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-white text-sm font-bold">{item.title}</h4>
                <p className="text-brand-textMuted text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
