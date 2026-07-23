"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect & Sync",
    description: "Securely connect your brokerages or add assets manually. We use bank-grade encryption."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our intelligence engine instantly processes your portfolio, identifying risks and opportunities."
  },
  {
    number: "03",
    title: "Ask Questions",
    description: "Chat with your data. Ask 'Why did my tech stocks drop today?' and get a clear, sourced answer."
  },
  {
    number: "04",
    title: "Learn & Grow",
    description: "We don't just give you numbers; we explain what they mean so you become a better investor."
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#02050E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            From data to clarity in minutes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[1px] bg-gradient-to-r from-brand-cyan/50 to-transparent"></div>
              )}
              
              <div className="text-5xl font-black text-white/5 mb-6">{step.number}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-brand-textMuted text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
