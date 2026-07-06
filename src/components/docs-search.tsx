"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { allSearchItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface DocsSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSearchItems;
    return allSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        router.push(results[activeIndex].href);
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, router, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm">
      <button
        className="absolute inset-0"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            results.map((item, index) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors",
                    index === activeIndex
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium",
                        item.method === "POST"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      )}
                    >
                      {item.method}
                    </span>
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
          <span>↑↓ navigate · Enter open · Esc close</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
