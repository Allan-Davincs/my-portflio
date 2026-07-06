"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { navSections } from "@/data/projects";
import { navItemIcons } from "@/data/navigation";
import { docsSectionLabels } from "@/data/docs-nav-labels";
import { NavItemIcon } from "@/components/nav-item-icon";
import { useSidebar } from "@/components/sidebar-context";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <Tooltip.Provider delayDuration={0}>
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-in-out lg:block",
          collapsed ? "w-[60px]" : "w-64"
        )}
      >
        <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
            <nav className="space-y-5">
              {navSections.map((section) => (
                <div key={section.label}>
                  {!collapsed && (
                    <div className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {docsSectionLabels[section.label] ?? section.label}
                    </div>
                  )}
                  {collapsed && (
                    <div className="mx-auto mb-2 h-px w-6 bg-border" />
                  )}
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const href = `/docs/${item.slug}`;
                      const isActive =
                        pathname === href ||
                        (item.slug === "blog" &&
                          pathname.startsWith("/docs/blog"));
                      const icon = navItemIcons[item.slug];
                      const isPost = item.method === "POST";

                      const linkContent = (
                        <Link
                          href={href}
                          className={cn(
                            "group flex items-center rounded-lg transition-colors",
                            collapsed
                              ? "justify-center px-2 py-2"
                              : "gap-2.5 px-2 py-2",
                            isActive
                              ? "bg-sidebar-active text-foreground"
                              : "text-muted-foreground hover:bg-sidebar-active hover:text-foreground"
                          )}
                        >
                          {icon && (
                            <NavItemIcon icon={icon} className="shrink-0" />
                          )}
                          {!collapsed && (
                            <>
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
                            </>
                          )}
                        </Link>
                      );

                      return (
                        <li key={item.slug}>
                          {collapsed ? (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                {linkContent}
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  side="right"
                                  sideOffset={8}
                                  className="z-50 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-foreground shadow-lg"
                                >
                                  <span
                                    className={cn(
                                      "mr-1.5 font-mono font-semibold",
                                      isPost ? "text-amber-500" : "text-emerald-500"
                                    )}
                                  >
                                    {item.method}
                                  </span>
                                  /{item.label}
                                  <Tooltip.Arrow className="fill-border" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          ) : (
                            linkContent
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="border-t border-sidebar-border p-2">
            <button
              onClick={toggleCollapsed}
              className={cn(
                "flex w-full items-center rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:bg-sidebar-active hover:text-foreground",
                collapsed ? "justify-center" : "gap-2"
              )}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <>
                  <PanelLeftClose className="h-4 w-4" />
                  <span className="font-mono text-xs">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </Tooltip.Provider>
  );
}
