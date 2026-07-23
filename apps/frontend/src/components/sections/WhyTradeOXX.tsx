"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Fingerprint } from "lucide-react";

export function WhyTradeOXX() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-bgPrimary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
              Built on transparency, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">driven by education.</span>
            </h2>
            <p className="text-brand-textMuted text-lg mb-8 leading-relaxed">
              We believe AI should empower you, not replace you. TradeOXX AI is designed to explain the 'why' behind market movements, helping you build your own financial intuition safely and securely.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "No Hype, Just Facts", desc: "We don't predict the future or promise returns. We analyze present data." },
                { icon: BookOpen, title: "Education First", desc: "Every insight comes with an explanation so you learn as you go." },
                { icon: Fingerprint, title: "Absolute Privacy", desc: "Your portfolio data is yours. We never sell it or use it to train public models." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center text-brand-purple">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-brand-textMuted text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] rounded-3xl bg-gradient-to-br from-brand-surfaceElevated to-brand-bgSecondary border border-white/10 p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-gradient opacity-5"></div>
            
            {/* Abstract UI Representation */}
            <div className="h-full flex flex-col gap-4">
              <div className="h-12 w-1/3 bg-white/5 rounded-lg"></div>
              <div className="h-32 w-full bg-white/5 rounded-xl"></div>
              <div className="flex-1 w-full bg-white/5 rounded-xl border border-white/5 p-6 flex flex-col gap-3">
                <div className="h-6 w-1/4 bg-brand-cyan/20 rounded"></div>
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                <div className="h-4 w-4/6 bg-white/5 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
