"use client";

import { useEffect, useState } from "react";
import { DocsHeader } from "@/components/docs-header";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSearch } from "@/components/docs-search";
import { MobileNav } from "@/components/mobile-nav";
import { SidebarProvider } from "@/components/sidebar-context";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SidebarProvider>
      <DocsHeader onOpenSearch={() => setSearchOpen(true)} />
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileNav />
      <div className="flex">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
