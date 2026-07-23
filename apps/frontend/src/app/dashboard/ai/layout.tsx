"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAiStore } from '@/store/useAiStore';
import { 
  Bot, 
  MessageSquare, 
  Plus, 
  Folder, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

export default function AiLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { conversations, fetchConversations } = useAiStore();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-[calc(100vh-5rem)] -m-8 overflow-hidden bg-brand-bgPrimary">
      
      {/* Collapsible Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-72' : 'w-0'} flex-shrink-0 bg-brand-bgSecondary border-r border-white/5 transition-all duration-300 overflow-hidden flex flex-col relative`}
      >
        <div className="p-4 border-b border-white/5">
          <Link href="/dashboard/ai">
            <button className="w-full flex items-center justify-center gap-2 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-bgPrimary font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Plus size={18} />
              New Chat
            </button>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Specialized Agents */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-3 px-2">Agents</div>
            <Link href="/dashboard/ai" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-brand-textSecondary hover:text-white transition-colors">
              <Bot size={16} className="text-brand-cyan" />
              <span className="text-sm font-medium">TradeOXX General</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-brand-textSecondary hover:text-white transition-colors">
              <TrendingUp size={16} className="text-brand-success" />
              <span className="text-sm font-medium">Market Analyst</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-brand-textSecondary hover:text-white transition-colors">
              <GraduationCap size={16} className="text-brand-purple" />
              <span className="text-sm font-medium">Learning Coach</span>
            </button>
          </div>

          {/* Recent Conversations */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-3 px-2">Recent</div>
            {conversations.slice(0, 10).map((chat) => (
              <Link 
                key={chat.id} 
                href={`/dashboard/ai/chat/${chat.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  pathname.includes(chat.id) 
                    ? 'bg-brand-cyan/10 text-brand-cyan' 
                    : 'hover:bg-white/5 text-brand-textSecondary hover:text-white'
                }`}
              >
                <MessageSquare size={14} />
                <span className="text-sm font-medium truncate">{chat.title}</span>
              </Link>
            ))}
            {conversations.length === 0 && (
              <div className="text-xs text-brand-textMuted px-3 italic">No recent chats</div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-brand-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Folder size={16} /> Folders
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-brand-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Settings size={16} /> Settings
          </button>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 p-1.5 bg-brand-bgSecondary border border-white/10 rounded-full text-brand-textMuted hover:text-white hover:border-brand-cyan shadow-xl transition-all"
        style={{ left: isSidebarOpen ? '18rem' : '0' }}
      >
        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-cyan/5 via-transparent to-transparent">
        {children}
      </div>

    </div>
  );
}
