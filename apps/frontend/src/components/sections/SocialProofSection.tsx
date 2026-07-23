"use client";

import { motion } from "framer-motion";

export function SocialProofSection() {
  return (
    <section className="py-12 border-y border-white/5 bg-brand-bgSecondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-brand-textMuted text-sm font-medium mb-8 uppercase tracking-widest">
          Trusted by modern investors and analysts
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {/* Partner Logo Placeholders */}
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
              <div className="h-4 w-24 rounded bg-white/20"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
