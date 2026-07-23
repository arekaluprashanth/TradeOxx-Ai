"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What does TradeOXX AI actually do?",
    answer: "TradeOXX AI acts as a smart portfolio assistant. It connects to your brokerages (or manual portfolios), analyzes your holdings, tracks performance, and uses AI to explain market movements and portfolio concentration in plain English."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use enterprise-grade encryption (AES-256) for all data at rest and in transit. Your portfolio data is never sold, and it is strictly isolated—meaning it is never used to train public AI models like ChatGPT."
  },
  {
    question: "Can beginners use it?",
    answer: "Absolutely. In fact, TradeOXX AI is designed specifically to translate complex financial jargon into simple, educational insights. If a stock drops, the AI will explain *why* it dropped based on news and fundamentals."
  },
  {
    question: "Does the AI guarantee investment results?",
    answer: "No. TradeOXX AI provides intelligence, analysis, and education based on current data. It does not provide financial advice, nor can it predict the future. The AI explains the market; you make the decisions."
  },
  {
    question: "How do I upgrade to Pro?",
    answer: "You can upgrade to the Pro tier at any time from your billing dashboard. It unlocks real-time data, unlimited AI queries, and advanced alerting features."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative bg-[#02050E] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-textMuted text-lg">
            Everything you need to know about the platform and how it works.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-colors hover:border-brand-purple/50"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-bold">{faq.question}</span>
                <ChevronDown 
                  className={`text-brand-textMuted transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-brand-textSecondary text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
