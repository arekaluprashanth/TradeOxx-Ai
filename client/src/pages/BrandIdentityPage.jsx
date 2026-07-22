import React from 'react';
import { Palette, Type, Hexagon, Zap, Feather, Layout, CheckCircle } from 'lucide-react';

export default function BrandIdentityPage() {
  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 space-y-16 animate-fade-in text-white font-sans min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold mb-6">
          <Feather size={14} /> Volume 9
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
          Brand Identity & <br/>Design System
        </h1>
        <p className="text-brand-textMuted text-lg">
          The complete visual language of TradeOXX AI. Built to communicate innovation, trust, intelligence, and premium quality.
        </p>
      </div>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Clarity & Precision', desc: 'Every component must serve a purpose. Remove clutter, emphasize data.' },
          { title: 'Intelligent Trust', desc: 'Design choices that reinforce reliability, security, and transparency.' },
          { title: 'Premium Craftsmanship', desc: 'Glassmorphism, aurora gradients, and 60 FPS fluid motion.' }
        ].map((value, i) => (
          <div key={i} className="bg-brand-surfaceElevated/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-brand-cyan/50 transition-colors">
            <h3 className="text-lg font-heading font-black text-white mb-2">{value.title}</h3>
            <p className="text-sm text-brand-textMuted">{value.desc}</p>
          </div>
        ))}
      </section>

      {/* Logo System */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Hexagon className="text-brand-cyan" size={24} />
          <h2 className="text-2xl font-heading font-black text-white">Logo System</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-900 border border-white/10 rounded-3xl p-12 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow-blue">
                <span className="font-heading font-black text-xl text-white">T</span>
              </div>
              <span className="font-heading font-black text-3xl tracking-tight text-white">TradeOXX AI</span>
            </div>
          </div>
          <div className="bg-white border border-white/10 rounded-3xl p-12 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-dark-900 flex items-center justify-center">
                <span className="font-heading font-black text-xl text-white">T</span>
              </div>
              <span className="font-heading font-black text-3xl tracking-tight text-dark-900">TradeOXX AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Color System */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Palette className="text-brand-purple" size={24} />
          <h2 className="text-2xl font-heading font-black text-white">Color System</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ColorSwatch name="Dark Luxury" hex="#0B0E14" bg="bg-[#0B0E14]" border="border-white/20" />
          <ColorSwatch name="Electric Cyan" hex="#00E5FF" bg="bg-[#00E5FF]" border="border-transparent" darkText />
          <ColorSwatch name="Aurora Purple" hex="#8B5CF6" bg="bg-[#8B5CF6]" border="border-transparent" />
          <ColorSwatch name="Deep Navy" hex="#111627" bg="bg-[#111627]" border="border-white/10" />
          <ColorSwatch name="Pure White" hex="#FFFFFF" bg="bg-white" border="border-transparent" darkText />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <ColorSwatch name="Success" hex="#10B981" bg="bg-[#10B981]" border="border-transparent" />
          <ColorSwatch name="Warning" hex="#F59E0B" bg="bg-[#F59E0B]" border="border-transparent" />
          <ColorSwatch name="Error" hex="#EF4444" bg="bg-[#EF4444]" border="border-transparent" />
          <ColorSwatch name="Info" hex="#3B82F6" bg="bg-[#3B82F6]" border="border-transparent" />
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Type className="text-brand-success" size={24} />
          <h2 className="text-2xl font-heading font-black text-white">Typography</h2>
        </div>
        
        <div className="bg-brand-surfaceElevated/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8 border-b border-white/10 pb-8">
              <span className="text-xs text-brand-textMuted uppercase font-bold tracking-widest block mb-4">Primary Heading Font</span>
              <h3 className="text-5xl font-heading font-black text-white mb-2">Satoshi</h3>
              <p className="text-sm text-brand-textMuted leading-relaxed">Used exclusively for major headings, brand moments, and numbers. It provides a geometric, modern, and highly legible appearance that scales beautifully.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4"><span className="text-3xl font-heading font-black text-white w-24">H1</span> <span className="text-3xl font-heading font-black text-white">48px / Black</span></div>
              <div className="flex items-center gap-4"><span className="text-2xl font-heading font-bold text-white w-24">H2</span> <span className="text-2xl font-heading font-bold text-white">32px / Bold</span></div>
              <div className="flex items-center gap-4"><span className="text-xl font-heading font-medium text-white w-24">H3</span> <span className="text-xl font-heading font-medium text-white">24px / Medium</span></div>
            </div>
          </div>
          
          <div>
            <div className="mb-8 border-b border-white/10 pb-8">
              <span className="text-xs text-brand-textMuted uppercase font-bold tracking-widest block mb-4">Secondary Body Font</span>
              <h3 className="text-5xl font-sans font-normal text-white mb-2">Inter</h3>
              <p className="text-sm text-brand-textMuted leading-relaxed">The utilitarian workhorse. Designed specifically for computer screens, providing excellent readability for long-form text, UI elements, and dense financial tables.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4"><span className="text-lg font-sans font-medium text-white w-24">Body L</span> <span className="text-lg font-sans text-white">18px / Normal</span></div>
              <div className="flex items-center gap-4"><span className="text-base font-sans text-white w-24">Body M</span> <span className="text-base font-sans text-white">16px / Normal</span></div>
              <div className="flex items-center gap-4"><span className="text-sm font-sans text-white w-24">Body S</span> <span className="text-sm font-sans text-white">14px / Normal</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* UI Components */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Layout className="text-brand-warning" size={24} />
          <h2 className="text-2xl font-heading font-black text-white">Component Language</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-surfaceElevated border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <span className="text-xs text-brand-textMuted uppercase font-bold tracking-widest">Buttons</span>
            <button className="px-6 py-2.5 rounded-xl bg-brand-cyan text-dark-900 font-bold hover:shadow-glow-blue transition-all">Primary Action</button>
            <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">Secondary Action</button>
          </div>
          
          <div className="bg-brand-surfaceElevated border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <span className="text-xs text-brand-textMuted uppercase font-bold tracking-widest">Inputs</span>
            <input type="text" placeholder="Focus to glow..." className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all" />
          </div>

          <div className="bg-brand-surfaceElevated border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <span className="text-xs text-brand-textMuted uppercase font-bold tracking-widest">Badges</span>
            <div className="flex gap-2">
              <span className="bg-brand-success/20 text-brand-success border border-brand-success/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1"><CheckCircle size={10} /> Active</span>
              <span className="bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">Pro Tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Branding */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Zap className="text-white" size={24} />
          <h2 className="text-2xl font-heading font-black text-white">Motion Branding</h2>
        </div>
        
        <div className="bg-brand-surfaceElevated/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <p className="text-brand-textMuted text-sm mb-8 leading-relaxed max-w-3xl">
            TradeOXX AI motion design is fast, fluid, and elegant. Every animation improves usability, guides attention, and creates a premium experience. 
            We target 60 FPS using GPU-accelerated CSS transforms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-brand-cyan/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/20 mb-4 group-hover:scale-110 group-hover:shadow-glow-blue transition-all duration-300"></div>
              <h4 className="text-sm font-bold text-white">Hover Scale & Glow</h4>
              <p className="text-xs text-brand-textMuted mt-1">Duration: 300ms | Ease: Spring</p>
            </div>
            
            <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-purple/30 transition-colors">
              <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-brand-purple w-full skeleton-shimmer"></div>
              </div>
              <h4 className="text-sm font-bold text-white">Skeleton Shimmer</h4>
              <p className="text-xs text-brand-textMuted mt-1">Continuous Linear Gradient Animation</p>
            </div>
            
            <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-gradient opacity-20 animate-aurora"></div>
              <h4 className="text-sm font-bold text-white relative z-10">Aurora Backgrounds</h4>
              <p className="text-xs text-brand-textMuted mt-1 relative z-10">20s Ease-In-Out Loop</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ColorSwatch({ name, hex, bg, border, darkText }) {
  return (
    <div className={`rounded-2xl border ${border} overflow-hidden shadow-lg`}>
      <div className={`h-24 w-full ${bg}`}></div>
      <div className="p-4 bg-brand-surfaceElevated">
        <h4 className="text-sm font-bold text-white mb-1">{name}</h4>
        <p className="text-xs font-mono text-brand-textMuted">{hex}</p>
      </div>
    </div>
  );
}
