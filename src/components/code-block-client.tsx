"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockClientProps {
  html: string;
  rawCode: string;
  title?: string;
}

export function CodeBlockClient({ html, rawCode, title }: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-[#0c0c0e] dark:bg-[#0c0c0e]">
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {title}
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <button
            onClick={handleCopy}
            className={cn(
              "absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded border border-border bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground opacity-0 backdrop-blur transition-all hover:text-foreground group-hover:opacity-100"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}
        <div
          className="shiki-wrapper overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
