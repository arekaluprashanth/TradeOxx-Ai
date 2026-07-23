"use client";

import Link from "next/link";
import { Activity, Code, MessageSquare, Briefcase, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02050E] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan p-[1px]">
                <div className="w-full h-full bg-brand-bgPrimary rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                  <Activity className="text-white w-4 h-4" />
                </div>
              </div>
              <span className="text-lg font-heading font-bold text-white tracking-tight">
                TradeOXX <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">AI</span>
              </span>
            </Link>
            <p className="text-brand-textMuted text-sm leading-relaxed mb-6 max-w-sm">
              The AI-powered portfolio intelligence platform designed for clarity, transparency, and education. We turn complex market data into understandable insights.
            </p>
            <div className="flex gap-4">
              {[MessageSquare, Code, Briefcase, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-textSecondary hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              {['Features', 'AI Assistant', 'Portfolio Intelligence', 'Market Analysis', 'Pricing'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-brand-textMuted hover:text-brand-cyan text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              {['Learning Center', 'Documentation', 'API Reference', 'Community', 'Blog'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-brand-textMuted hover:text-brand-cyan text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-brand-textMuted text-sm mb-4">Subscribe to our newsletter for the latest platform updates and market insights.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple flex-1 transition-colors"
              />
              <button 
                type="submit"
                className="bg-brand-blue hover:bg-brand-purple text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-textMuted text-sm">
            © {currentYear} TradeOXX AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-brand-textMuted">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">AI Transparency</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-brand-textMuted/50 max-w-4xl mx-auto">
          TradeOXX AI provides educational tools and portfolio analysis. We do not provide financial, investment, tax, or legal advice. AI-generated insights are for informational purposes only and should not be considered as guaranteed outcomes or trading recommendations.
        </div>
      </div>
    </footer>
  );
}
