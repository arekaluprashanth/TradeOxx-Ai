"use client";

import { Bell, Search, Menu, Command } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/components/ui/utils";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export function TopNav() {
  const { setCommandPaletteOpen, sidebarExpanded, toggleSidebar } = useWorkspaceStore();
  const { user } = useAuthStore();

  return (
    <header 
      className={cn(
        "h-16 fixed top-0 right-0 z-30 transition-all duration-300 border-b border-white/5 bg-[#02050E]/80 backdrop-blur-xl flex items-center justify-between px-6",
        sidebarExpanded ? "w-[calc(100%-16rem)]" : "w-[calc(100%-5rem)]"
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 text-brand-textSecondary hover:text-white"
        >
          <Menu size={20} />
        </button>

        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-brand-textMuted w-full max-w-md transition-all group"
        >
          <Search size={16} className="group-hover:text-white transition-colors" />
          <span className="text-sm flex-1 text-left group-hover:text-white transition-colors">Search anything...</span>
          <div className="flex items-center gap-1 text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-brand-textSecondary">
            <Command size={10} /> K
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* AI Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20">
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></div>
          <span className="text-xs font-bold text-brand-cyan">AI Online</span>
        </div>

        {/* Notifications */}
        <NotificationCenter />

        {/* User Profile */}
        <button className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center text-xs font-bold text-white border border-white/10">
            {user?.profile?.displayName?.[0]?.toUpperCase() || "U"}
          </div>
        </button>
      </div>
    </header>
  );
}
