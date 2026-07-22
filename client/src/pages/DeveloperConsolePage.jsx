import React, { useState } from 'react';
import { 
  Server, Database, Cloud, Shield, Activity, 
  Terminal, Webhook, Box, Lock, Code2, 
  GitBranch, Zap
} from 'lucide-react';

export default function DeveloperConsolePage() {
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'Cloud Architecture', icon: Cloud },
    { id: 'blueprint', label: 'Master Blueprint', icon: Box },
    { id: 'apis', label: 'API Services', icon: Webhook },
    { id: 'security', label: 'Security & DevOps', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#05070A] text-white flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-brand-surfaceElevated/50 backdrop-blur-xl flex items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 flex items-center justify-center text-brand-textMuted">
            <Terminal size={16} />
          </div>
          <div>
            <h1 className="text-sm font-heading font-black">TradeOXX Developer Console</h1>
            <p className="text-[10px] text-brand-textMuted uppercase tracking-wider font-bold">Volumes 10 & 11 Architecture</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-brand-surface/30 p-4 flex flex-col gap-2 overflow-y-auto hidden md:flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left ${
                activeTab === tab.id 
                  ? 'bg-brand-surfaceElevated text-brand-cyan border border-brand-cyan/20 shadow-sm' 
                  : 'text-brand-textMuted hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 animate-fade-in">

          {activeTab === 'architecture' && (
            <>
              <div>
                <h2 className="text-3xl font-heading font-black text-white">Enterprise Software Architecture</h2>
                <p className="text-brand-textMuted text-sm mt-1 max-w-3xl">
                  A comprehensive overview of the TradeOXX AI cloud-native infrastructure. Designed for massive scalability, high availability, and AI-workload efficiency.
                </p>
              </div>

              {/* Architecture Map */}
              <div className="bg-brand-surfaceElevated/30 border border-white/10 rounded-3xl p-8 overflow-x-auto">
                <div className="min-w-[800px] flex flex-col items-center gap-8">
                  
                  {/* Layer 1: Client */}
                  <div className="w-full flex justify-center gap-6">
                    <ArchitectureNode icon={MonitorSmartphone} label="Web Client (React/Vite)" color="cyan" />
                    <ArchitectureNode icon={Smartphone} label="Mobile Application" color="cyan" />
                  </div>
                  
                  <div className="h-8 border-l-2 border-dashed border-white/20"></div>

                  {/* Layer 2: Gateway */}
                  <div className="w-full max-w-4xl bg-dark-900/80 border border-white/10 rounded-2xl p-4 flex justify-between items-center px-12 relative">
                    <div className="absolute inset-0 bg-brand-gradient opacity-[0.02] rounded-2xl"></div>
                    <span className="font-heading font-bold text-white relative z-10 flex items-center gap-2"><Globe2 size={18}/> API Gateway (Cloudflare)</span>
                    <span className="bg-brand-success/20 text-brand-success text-[10px] px-2 py-1 rounded font-bold uppercase relative z-10">Rate Limiting Active</span>
                  </div>

                  <div className="h-8 border-l-2 border-dashed border-white/20"></div>

                  {/* Layer 3: Microservices */}
                  <div className="w-full max-w-5xl grid grid-cols-4 gap-4">
                    <ServiceNode name="Auth Service" tech="JWT, OAuth2" />
                    <ServiceNode name="User Service" tech="Profiles, Workspaces" />
                    <ServiceNode name="AI Engine" tech="Context, Streaming" highlight />
                    <ServiceNode name="Market Data" tech="WebSockets, REST" />
                  </div>

                  <div className="h-8 border-l-2 border-dashed border-white/20"></div>

                  {/* Layer 4: Data & Cache */}
                  <div className="w-full max-w-5xl grid grid-cols-3 gap-6">
                    <div className="bg-dark-900 border border-white/10 rounded-xl p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center"><Database size={24} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Primary Database</h4>
                        <p className="text-xs text-brand-textMuted mt-1">PostgreSQL (Normalized)</p>
                      </div>
                    </div>
                    <div className="bg-dark-900 border border-white/10 rounded-xl p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-warning/20 text-brand-warning flex items-center justify-center"><Zap size={24} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Cache Layer</h4>
                        <p className="text-xs text-brand-textMuted mt-1">Redis (Market Data & Sessions)</p>
                      </div>
                    </div>
                    <div className="bg-dark-900 border border-white/10 rounded-xl p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center"><Cloud size={24} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Object Storage</h4>
                        <p className="text-xs text-brand-textMuted mt-1">AWS S3 (Exports, Media)</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

          {activeTab === 'blueprint' && (
            <>
              <div>
                <h2 className="text-3xl font-heading font-black text-white">Master Blueprint</h2>
                <p className="text-brand-textMuted text-sm mt-1 max-w-3xl">
                  The Volume 11 ultimate ecosystem design. TradeOXX AI is not a trading website; it is an AI-powered Financial Intelligence Platform focused on education, clarity, and trust.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  { title: "Product Philosophy", icon: Box, items: ["Reduce friction, increase learning", "Never fabricate market data", "Always distinguish education from advice"] },
                  { title: "AI Principles", icon: BrainCircuit, items: ["Explain observations clearly", "State limitations of models", "Avoid hype and guaranteed outcomes"] },
                  { title: "Security Protocols", icon: Lock, items: ["End-to-end encryption", "Strict Rate Limiting", "XSS & CSRF Prevention"] },
                  { title: "Performance Goals", icon: Zap, items: ["60 FPS hardware animations", "Route-based code splitting", "Virtual scrolling for large tables"] },
                  { title: "DevOps Pipeline", icon: GitBranch, items: ["Automated CI/CD Testing", "Infrastructure as Code", "Preview Deployments"] },
                  { title: "Observability", icon: Activity, items: ["Distributed Tracing", "Error Monitoring", "Real-time AI Cost Tracking"] },
                ].map((section, i) => (
                  <div key={i} className="bg-dark-900 border border-white/10 rounded-2xl p-6 hover:border-brand-cyan/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                      <div className="text-brand-cyan"><section.icon size={20} /></div>
                      <h3 className="text-lg font-heading font-bold text-white">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-brand-textMuted">
                          <CheckCircle2 size={16} className="text-brand-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon: Icon, label, color }) {
  return (
    <div className={`bg-dark-900 border border-white/10 rounded-2xl p-6 w-64 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-brand-${color}/5`}></div>
      <div className={`w-12 h-12 rounded-xl bg-brand-${color}/20 text-brand-${color} flex items-center justify-center mb-3 relative z-10`}>
        <Icon size={24} />
      </div>
      <h4 className="text-sm font-bold text-white relative z-10">{label}</h4>
    </div>
  );
}

function ServiceNode({ name, tech, highlight }) {
  return (
    <div className={`rounded-xl p-4 text-center border ${highlight ? 'bg-brand-purple/10 border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'bg-dark-900/50 border-white/10'}`}>
      <h4 className="text-sm font-bold text-white mb-1">{name}</h4>
      <p className="text-[10px] text-brand-textMuted font-mono uppercase tracking-wider">{tech}</p>
    </div>
  );
}

// Inline mock icons for components not imported at top to save space
function MonitorSmartphone(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>; }
function Smartphone(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>; }
function Globe2(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>; }
function CheckCircle2(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>; }
function BrainCircuit(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/><path d="M16 8V5c0-1.1.9-2 2-2"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/></svg>; }
