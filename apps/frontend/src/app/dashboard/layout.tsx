"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/dashboard/Sidebar";
import { TopNav } from "@/components/layout/dashboard/TopNav";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { cn } from "@/components/ui/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarExpanded } = useWorkspaceStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for zustand persisted state
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#02050E] text-white selection:bg-brand-purple/30">
      <Sidebar />
      <TopNav />
      <CommandPalette />
      
      <main 
        className={cn(
          "pt-16 transition-all duration-300 min-h-screen flex flex-col",
          sidebarExpanded ? "pl-64" : "pl-20"
        )}
      >
        <div className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
