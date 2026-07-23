"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { 
  LayoutDashboard, 
  LineChart, 
  PieChart, 
  Eye, 
  Bot, 
  BookOpen, 
  Newspaper, 
  CalendarDays,
  Settings,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/components/ui/utils";

const NAV_ITEMS = [
  { group: "Workspace", items: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Markets", href: "/dashboard/markets", icon: LineChart },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: PieChart },
    { name: "Watchlists", href: "/dashboard/watchlists", icon: Eye },
  ]},
  { group: "Intelligence", items: [
    { name: "AI Assistant", href: "/dashboard/ai", icon: Bot },
    { name: "News", href: "/dashboard/news", icon: Newspaper },
    { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
    { name: "Learning", href: "/dashboard/learning", icon: BookOpen },
  ]},
];

const BOTTOM_ITEMS = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarExpanded, toggleSidebar } = useWorkspaceStore();

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-white/5 bg-[#02050E]/80 backdrop-blur-xl flex flex-col",
        sidebarExpanded ? "w-64" : "w-20"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
        <Link href="/dashboard" className={cn("flex items-center gap-2 overflow-hidden", !sidebarExpanded && "justify-center w-full")}>
          <div className="w-8 h-8 rounded-lg bg-brand-cyan shrink-0 flex items-center justify-center font-bold text-brand-bgPrimary">
            T
          </div>
          {sidebarExpanded && (
            <span className="font-heading font-black text-lg tracking-tight whitespace-nowrap text-white">
              TradeOXX <span className="text-brand-cyan">AI</span>
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 no-scrollbar">
        {NAV_ITEMS.map((group, i) => (
          <div key={i} className="px-4">
            {sidebarExpanded && (
              <h4 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-3 px-2">
                {group.group}
              </h4>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={!sidebarExpanded ? item.name : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                      isActive 
                        ? "bg-brand-cyan/10 text-brand-cyan" 
                        : "text-brand-textSecondary hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon size={20} className={cn("shrink-0", isActive ? "text-brand-cyan" : "text-brand-textMuted group-hover:text-white")} />
                    {sidebarExpanded && (
                      <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 shrink-0 flex flex-col gap-1">
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={!sidebarExpanded ? item.name : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-brand-textSecondary hover:bg-white/5 hover:text-white transition-all group"
          >
            <item.icon size={20} className="shrink-0 text-brand-textMuted group-hover:text-white" />
            {sidebarExpanded && (
              <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
            )}
          </Link>
        ))}
        
        <button
          onClick={toggleSidebar}
          className="mt-2 flex items-center justify-center h-10 rounded-xl border border-white/10 text-brand-textMuted hover:bg-white/5 hover:text-white transition-all"
        >
          {sidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </aside>
  );
}
