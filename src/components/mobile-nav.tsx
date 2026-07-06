"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navSections } from "@/data/projects";
import { docsSectionLabels } from "@/data/docs-nav-labels";
import { navItemIcons } from "@/data/navigation";
import { NavItemIcon } from "@/components/nav-item-icon";
import { useSidebar } from "@/components/sidebar-context";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!mobileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      />

      <aside className="relative flex h-full w-[min(85vw,18rem)] flex-col border-r border-sidebar-border bg-sidebar shadow-xl">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Dashboard
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-active hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <div className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {docsSectionLabels[section.label] ?? section.label}
                </div>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const href = `/docs/${item.slug}`;
                    const isActive =
                      pathname === href ||
                      (item.slug === "blog" &&
                        pathname.startsWith("/docs/blog"));
                    const icon = navItemIcons[item.slug];
                    const isPost = item.method === "POST";

                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-2 py-2.5 transition-colors",
                            isActive
                              ? "bg-sidebar-active text-foreground"
                              : "text-muted-foreground hover:bg-sidebar-active hover:text-foreground"
                          )}
                        >
                          {icon && (
                            <NavItemIcon icon={icon} className="shrink-0" />
                          )}
                          <span
                            className={cn(
                              "shrink-0 rounded px-1 py-0.5 font-mono text-[9px] font-semibold uppercase leading-none",
                              isPost
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            )}
                          >
                            {item.method}
                          </span>
                          <span className="truncate font-mono text-xs">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
}
