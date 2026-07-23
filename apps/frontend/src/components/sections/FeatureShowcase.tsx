"use client";

import { motion } from "framer-motion";
import { Brain, LineChart, Lock, Eye, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Assistant",
    description: "Ask natural language questions about your portfolio, watchlists, or global markets.",
    color: "from-brand-purple to-brand-cyan",
    shadow: "group-hover:shadow-glow-purple"
  },
  {
    icon: LineChart,
    title: "Market Analysis",
    description: "Deep dive into stock performance with interactive charts and automated insights.",
    color: "from-brand-blue to-brand-cyan",
    shadow: "group-hover:shadow-glow-blue"
  },
  {
    icon: Layers,
    title: "Portfolio Intelligence",
    description: "Understand your diversification, sector exposure, and risk profile instantly.",
    color: "from-brand-cyan to-brand-success",
    shadow: "group-hover:shadow-glow-cyan"
  },
  {
    icon: Eye,
    title: "Smart Watchlists",
    description: "Track the assets you care about with AI-generated summaries of daily movements.",
    color: "from-brand-warning to-brand-danger",
    shadow: "group-hover:shadow-glow-red"
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Built on Next.js 15 and Rust for lightning-fast data processing and rendering.",
    color: "from-brand-success to-brand-cyan",
    shadow: "group-hover:shadow-glow-green"
  },
  {
    icon: Lock,
    title: "Enterprise Privacy",
    description: "Your financial data is encrypted, secure, and never used to train global AI models.",
    color: "from-brand-textMuted to-brand-textSecondary",
    shadow: "group-hover:shadow-glass"
  }
];

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#02050E]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            Intelligence without the complexity.
          </h2>
          <p className="text-brand-textMuted text-lg">
            Everything you need to understand your portfolio and the markets, beautifully designed and powered by transparent AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${feature.shadow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
              
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} p-[1px]`}>
                <div className="w-full h-full bg-brand-surfaceElevated rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-brand-textMuted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
