"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname?.startsWith("/dashboard") || 
                     pathname?.startsWith("/profile") || 
                     pathname?.startsWith("/settings");

  return (
    <>
      {!isAppRoute && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAppRoute && <Footer />}
    </>
  );
}
