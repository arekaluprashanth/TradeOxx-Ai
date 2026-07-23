"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started and exploring the platform.",
    features: [
      "1 Watchlist",
      "End-of-day market data",
      "Basic AI queries (10/day)",
      "Standard Portfolio tracking"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For serious investors who need real-time intelligence.",
    features: [
      "Unlimited Watchlists",
      "Real-time market data",
      "Unlimited AI assistant",
      "Advanced risk analysis",
      "Custom alerts & notifications"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For funds, teams, and high-net-worth individuals.",
    features: [
      "Everything in Pro",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "White-label reporting"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-brand-bgPrimary">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            Simple, transparent pricing.
          </h2>
          <p className="text-brand-textMuted text-lg">
            Choose the intelligence tier that fits your investment style. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border ${
                plan.popular 
                  ? 'bg-brand-surfaceElevated border-brand-purple shadow-glow-purple' 
                  : 'bg-white/5 border-white/10'
              } flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-purple px-4 py-1 rounded-full text-xs font-bold text-white tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-brand-textMuted text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-brand-textMuted">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="text-brand-cyan w-5 h-5 shrink-0" />
                    <span className="text-sm text-brand-textSecondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full py-4 rounded-xl text-center font-bold transition-all ${
                  plan.popular
                    ? 'bg-white text-brand-bgPrimary hover:bg-brand-cyan'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
