import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, Server, Database, KeyRound, Globe, Cloud, GitBranch, 
  ShieldAlert, Activity, Wifi, ArrowUpRight, Heart, RefreshCw 
} from 'lucide-react';

export default function ArchitectureSpecsPage() {
  const specs = [
    {
      icon: Laptop,
      title: "1. Frontend",
      desc: "Optimized React 18 SPA built with Vite and Zustand. Highly responsive dark-mode theme customized for full-screen ratio displays and ultra-low input lag running at 165Hz.",
      status: "Active (165Hz)"
    },
    {
      icon: Server,
      title: "2. APIs & Backend Logic",
      desc: "Express.js API server running on Node.js. Drives secure authorization endpoints, user transaction ledgers, and a mathematical pricing drift loop simulating markets every 2 seconds.",
      status: "Active (2s Tick)"
    },
    {
      icon: Database,
      title: "3. Database & Storage",
      desc: "Ephemeral in-memory document database with auto-serialization backups in JSON. Formatted to read/write directories dynamically in serverless /tmp drives to adapt to cloud rules.",
      status: "Stateless (Active)"
    },
    {
      icon: KeyRound,
      title: "4. Auth & Permission",
      desc: "Secure credentials authorization. Passwords hashed using bcryptjs (10 salt rounds) and session contexts validated using bearer JSON Web Tokens (JWT).",
      status: "Secure (JWT)"
    },
    {
      icon: Globe,
      title: "5. Hosting & Deployment",
      desc: "Multi-routed vercel.json configurations. Serves compiled React bundles from root and proxies all REST calls to cloud serverless execution handlers.",
      status: "Vercel Deployed"
    },
    {
      icon: Cloud,
      title: "6. Cloud & Compute",
      desc: "Stateless lambda execution segments on demand. Alternate multi-stage Docker container environments coordinates build stages for AWS, GCP, or local engines.",
      status: "Docker Ready"
    },
    {
      icon: GitBranch,
      title: "7. CI/CD & Version Control",
      desc: "Managed source tracking on GitHub. Background Actions workflows handle automated workspace configurations and project settings verification on push events.",
      status: "Pushed to GitHub"
    },
    {
      icon: ShieldAlert,
      title: "8. Security & RLS",
      desc: "Helmet header injections, custom CORS restriction configurations, frontend form sanitation parameters, and local data level logic boundaries.",
      status: "Enforced"
    },
    {
      icon: Activity,
      title: "9. Rate Limiting",
      desc: "Express rate-limiter prevents DDoS attacks. Restricts unique IP addresses to a max of 200 requests per 15-minute window, outputting HTTP 429 warnings if breached.",
      status: "Enforced (200 reqs)"
    },
    {
      icon: Wifi,
      title: "10. Caching & CDN",
      desc: "Static assets compiled with unique chunk hashes and served globally from Edge Network CDNs nearest to the visitor for instant, cacheable loads.",
      status: "Edge CDN Live"
    },
    {
      icon: ArrowUpRight,
      title: "11. Load Balancing & Scaling",
      desc: "Fully decoupled static/dynamic scale layers. Reverse proxy configuration inside Traefik coordinates multi-container load balancing to support scaling.",
      status: "Scalable Setup"
    },
    {
      icon: Heart,
      title: "12. Error Tracking & Logs",
      desc: "Morgan HTTP logs formatted in 'combined' layout outputted to console. Diagnostic warning hooks capture and resolve file store load/write exceptions.",
      status: "Morgan Logger"
    },
    {
      icon: RefreshCw,
      title: "13. Availability & Recovery",
      desc: "Stateless auto-recreation of missing user portfolios from JWT parameters on context recycle, coupled with seed fallbacks to guarantee high availability.",
      status: "Fail-Safe Active"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-cyan/10 to-transparent border border-white/5 p-6 sm:p-8 backdrop-blur-md">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(0,212,255,0.15)]">
            <Server size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-accent-cyan font-black uppercase tracking-widest block">System Specifications</span>
            <h1 className="text-3xl font-black text-white mt-0.5">Technical Architecture</h1>
          </div>
        </div>
      </div>

      {/* Grid of 13 categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative bg-dark-900/60 border border-white/5 rounded-3xl p-5 hover:border-accent-cyan/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.05)] transition-all flex flex-col justify-between space-y-4 overflow-hidden"
          >
            <div className="space-y-3">
              {/* Icon & Title */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-dark-950 border border-white/5 text-dark-300 group-hover:text-accent-cyan group-hover:border-accent-cyan/20 transition-all">
                  <spec.icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">{spec.title}</h3>
              </div>
              
              {/* Description */}
              <p className="text-xs text-dark-300 leading-relaxed font-medium">
                {spec.desc}
              </p>
            </div>

            {/* Status indicator badge */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[9px] text-dark-400 font-bold uppercase tracking-wider">Status Parameters</span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-dark-950 border border-white/5 text-accent-green font-mono">
                {spec.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
