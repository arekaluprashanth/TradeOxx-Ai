"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { 
  Search, 
  LineChart, 
  Bot, 
  Settings, 
  FileText, 
  BookOpen,
  LogOut
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useWorkspaceStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = (command: () => void) => {
    setCommandPaletteOpen(false);
    command();
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setCommandPaletteOpen(false)}
      />
      
      <Command 
        className="w-full max-w-2xl bg-brand-surfaceElevated border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-50 flex flex-col"
        label="Global Command Palette"
      >
        <div className="flex items-center px-4 border-b border-white/5">
          <Search size={20} className="text-brand-textMuted shrink-0" />
          <Command.Input 
            autoFocus
            placeholder="Search assets, commands, pages..." 
            className="flex-1 px-4 py-4 bg-transparent text-white placeholder-brand-textMuted focus:outline-none"
          />
          <div className="text-[10px] font-mono text-brand-textMuted bg-white/5 px-2 py-1 rounded border border-white/10">ESC</div>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
          <Command.Empty className="py-6 text-center text-sm text-brand-textMuted">
            No results found.
          </Command.Empty>

          <Command.Group heading="Suggestions" className="px-2 py-3 text-xs font-bold text-brand-textMuted uppercase tracking-wider [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/dashboard/markets'))}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-textSecondary rounded-lg cursor-pointer hover:bg-brand-cyan/10 hover:text-brand-cyan data-[selected=true]:bg-brand-cyan/10 data-[selected=true]:text-brand-cyan transition-colors"
            >
              <LineChart size={16} /> Explore Markets
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/dashboard/ai'))}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-textSecondary rounded-lg cursor-pointer hover:bg-brand-purple/10 hover:text-brand-purple data-[selected=true]:bg-brand-purple/10 data-[selected=true]:text-brand-purple transition-colors"
            >
              <Bot size={16} /> Ask AI Assistant
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-white/5 my-1" />

          <Command.Group heading="Navigation" className="px-2 py-3 text-xs font-bold text-brand-textMuted uppercase tracking-wider [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/profile'))}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-textSecondary rounded-lg cursor-pointer hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
            >
              <Settings size={16} /> Settings
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/dashboard/reports'))}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-textSecondary rounded-lg cursor-pointer hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
            >
              <FileText size={16} /> Reports
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/dashboard/learning'))}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-textSecondary rounded-lg cursor-pointer hover:bg-white/5 hover:text-white data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
            >
              <BookOpen size={16} /> Learning Center
            </Command.Item>
          </Command.Group>

          <Command.Separator className="h-px bg-white/5 my-1" />
          
          <Command.Group heading="Account" className="px-2 py-3 text-xs font-bold text-brand-textMuted uppercase tracking-wider [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
            <Command.Item 
              onSelect={() => runCommand(() => { logout(); router.push('/login'); })}
              className="flex items-center gap-3 px-3 py-3 text-sm text-brand-danger rounded-lg cursor-pointer hover:bg-brand-danger/10 data-[selected=true]:bg-brand-danger/10 transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
