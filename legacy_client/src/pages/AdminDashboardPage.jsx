import React, { useState } from 'react';
import { 
  Activity, Users, Cpu, ShieldAlert, BarChart3, 
  Settings, CreditCard, Search, ArrowUpRight, 
  ArrowDownRight, Server, Globe2, BookOpen, Clock,
  MoreVertical
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('executive');

  const tabs = [
    { id: 'executive', label: 'Executive Metrics', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'ai', label: 'AI Control Center', icon: Cpu },
    { id: 'security', label: 'Security & Auth', icon: ShieldAlert },
    { id: 'system', label: 'System Health', icon: Server }
  ];

  return (
    <div className="min-h-screen bg-[#05070A] text-white flex flex-col font-sans">
      
      {/* Admin Topbar */}
      <header className="h-16 border-b border-white/10 bg-brand-surfaceElevated/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow-blue">
            <ShieldAlert size={16} />
          </div>
          <div>
            <h1 className="text-sm font-heading font-black">TradeOXX Enterprise</h1>
            <p className="text-[10px] text-brand-textMuted uppercase tracking-wider font-bold">Volume 7 Operations Center</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search users, reports, logs (Ctrl+K)..." 
              className="w-80 bg-dark-900/80 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-brand-cyan/50 transition-colors"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div>
            <span className="text-xs text-brand-textMuted font-bold uppercase tracking-wider">All Systems Operational</span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center">
            <span className="text-xs font-bold text-brand-cyan">AD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-brand-surface/30 p-4 flex flex-col gap-2 overflow-y-auto hidden md:flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left ${
                activeTab === tab.id 
                  ? 'bg-brand-surfaceElevated text-white border border-white/10 shadow-sm' 
                  : 'text-brand-textMuted hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? 'text-brand-cyan' : ''} />
              {tab.label}
            </button>
          ))}
          
          <div className="mt-auto pt-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-brand-textMuted hover:text-white transition-all w-full text-left">
              <Settings size={16} /> Global Settings
            </button>
          </div>
        </aside>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          {activeTab === 'executive' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-heading font-black text-white">Executive Dashboard</h2>
                  <p className="text-brand-textMuted text-sm mt-1">Real-time overview of TradeOXX AI platform health and metrics.</p>
                </div>
                <Button variant="secondary" size="sm">Export Report</Button>
              </div>

              {/* Top Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard title="Total Active Users" value="24,592" change="+12.5%" isPositive icon={Users} color="cyan" />
                <MetricCard title="Monthly Recurring Rev" value="$1.2M" change="+8.4%" isPositive icon={CreditCard} color="success" />
                <MetricCard title="AI Tokens Processed" value="48.2B" change="+24.1%" isPositive icon={Cpu} color="purple" />
                <MetricCard title="System Uptime" value="99.99%" change="-0.01%" isPositive={false} icon={Activity} color="warning" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-brand-surfaceElevated/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                  <h3 className="text-sm font-heading font-bold text-white mb-6 uppercase tracking-wider">User Growth & Retention</h3>
                  <div className="h-64 flex items-end gap-2 justify-between">
                    {/* Simulated Bars */}
                    {[40, 45, 30, 60, 75, 65, 80, 95, 85, 100, 90, 110].map((h, i) => (
                      <div key={i} className="w-full bg-brand-cyan/20 rounded-t-sm hover:bg-brand-cyan/40 transition-colors relative group" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark-900 border border-white/10 px-2 py-1 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          {h}K
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Workload */}
                <div className="bg-brand-surfaceElevated/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
                  <h3 className="text-sm font-heading font-bold text-white mb-6 uppercase tracking-wider">AI Operations Status</h3>
                  
                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>Market Analysis Engine</span>
                        <span className="text-brand-success">98% Load</span>
                      </div>
                      <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-success w-[98%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>Personal Assistant Node</span>
                        <span className="text-brand-cyan">65% Load</span>
                      </div>
                      <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-cyan w-[65%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>Pattern Detection Core</span>
                        <span className="text-brand-warning">88% Load</span>
                      </div>
                      <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-warning w-[88%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-brand-surfaceElevated/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-sm font-heading font-bold text-white mb-6 uppercase tracking-wider">System Activity Stream</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs text-brand-textMuted uppercase tracking-wider">
                        <th className="pb-3 font-bold">Event</th>
                        <th className="pb-3 font-bold">Service</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold">Time</th>
                        <th className="pb-3 text-right font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-bold flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-purple/20 text-brand-purple flex items-center justify-center"><Server size={14} /></div>
                          Cluster Scaling Event
                        </td>
                        <td className="py-4 text-brand-textMuted">AWS us-east-1</td>
                        <td className="py-4"><span className="bg-brand-success/20 text-brand-success text-[10px] px-2 py-1 rounded font-bold uppercase">Success</span></td>
                        <td className="py-4 text-brand-textMuted">2 mins ago</td>
                        <td className="py-4 text-right"><button className="text-brand-textMuted hover:text-white"><MoreVertical size={16} /></button></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-bold flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-cyan/20 text-brand-cyan flex items-center justify-center"><Users size={14} /></div>
                          Enterprise Signup: ACME Corp
                        </td>
                        <td className="py-4 text-brand-textMuted">Auth Service</td>
                        <td className="py-4"><span className="bg-brand-success/20 text-brand-success text-[10px] px-2 py-1 rounded font-bold uppercase">Success</span></td>
                        <td className="py-4 text-brand-textMuted">15 mins ago</td>
                        <td className="py-4 text-right"><button className="text-brand-textMuted hover:text-white"><MoreVertical size={16} /></button></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-bold flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-brand-warning/20 text-brand-warning flex items-center justify-center"><ShieldAlert size={14} /></div>
                          Suspicious Login Detected
                        </td>
                        <td className="py-4 text-brand-textMuted">Security Center</td>
                        <td className="py-4"><span className="bg-brand-warning/20 text-brand-warning text-[10px] px-2 py-1 rounded font-bold uppercase">Blocked</span></td>
                        <td className="py-4 text-brand-textMuted">1 hour ago</td>
                        <td className="py-4 text-right"><button className="text-brand-textMuted hover:text-white"><MoreVertical size={16} /></button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'users' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in opacity-50">
              <Users size={48} className="text-brand-textMuted" />
              <div>
                <h3 className="text-xl font-bold text-white">User Management</h3>
                <p className="text-sm text-brand-textMuted mt-2">Search, filter, and manage user accounts and roles.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon: Icon, color }) {
  const colorMap = {
    cyan: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20',
    success: 'text-brand-success bg-brand-success/10 border-brand-success/20',
    purple: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20',
    warning: 'text-brand-warning bg-brand-warning/10 border-brand-warning/20',
    danger: 'text-brand-danger bg-brand-danger/10 border-brand-danger/20',
  };

  return (
    <div className="bg-brand-surfaceElevated/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:-translate-y-1 transition-transform cursor-default group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl border ${colorMap[color]} flex items-center justify-center transition-colors`}>
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-brand-success/20 text-brand-success' : 'bg-brand-danger/20 text-brand-danger'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-textMuted mb-1">{title}</p>
        <p className="text-3xl font-heading font-black text-white">{value}</p>
      </div>
    </div>
  );
}
