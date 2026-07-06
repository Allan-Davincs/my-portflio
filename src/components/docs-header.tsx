"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, PanelLeft } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSidebar } from "@/components/sidebar-context";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface DocsHeaderProps {
  onOpenSearch: () => void;
}

export function DocsHeader({ onOpenSearch }: DocsHeaderProps) {
  const pathname = usePathname();
  const { toggleMobileOpen } = useSidebar();

  const currentTitle =
    pathname === "/docs/introduction"
      ? "Introduction"
      : pathname.includes("/docs/")
        ? pathname
            .split("/docs/")[1]
            ?.replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Docs"
        : "Docs";

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleMobileOpen}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <Link
          href="/docs/introduction"
          className="truncate text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name.split(" ")[0]} Docs
        </Link>
        <span className="hidden text-muted-foreground sm:inline">/</span>
        <span className="hidden truncate text-xs text-muted-foreground sm:inline">
          {currentTitle}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          className={cn(
            "flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            "min-w-[140px] md:min-w-[200px]"
          )}
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden flex-1 text-left text-xs md:inline">
            Search docs...
          </span>
          <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">
            ⌘K
          </kbd>
        </button>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="GitHub"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
