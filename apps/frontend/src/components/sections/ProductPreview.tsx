"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProductPreview() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-bgPrimary">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            A workspace designed for clarity.
          </h2>
          <p className="text-brand-textMuted text-lg">
            Say goodbye to cluttered interfaces. TradeOXX AI delivers a premium, distraction-free environment for serious analysis.
          </p>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-blue/20 mb-12 group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bgPrimary/80 z-10 pointer-events-none"></div>
          <img 
            src="/dashboard_preview.jpg" 
            alt="TradeOXX AI Dashboard Preview" 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-8 left-8 z-20">
            <h3 className="text-2xl font-bold text-white mb-2">Command Center</h3>
            <p className="text-brand-textSecondary text-sm max-w-md">Your entire portfolio, AI insights, and real-time market data in one beautiful view.</p>
          </div>
        </motion.div>

        {/* Charts Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-purple/20 group w-full md:w-3/4 ml-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bgPrimary/80 z-10 pointer-events-none"></div>
          <img 
            src="/charts_preview.jpg" 
            alt="TradeOXX AI Charts Preview" 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-8 right-8 z-20 text-right">
            <h3 className="text-2xl font-bold text-white mb-2">Pro Charts</h3>
            <p className="text-brand-textSecondary text-sm max-w-md ml-auto">Advanced technical analysis with zero lag. Powered by WebGL.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
