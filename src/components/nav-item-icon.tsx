"use client";

import {
  BookOpen,
  Briefcase,
  Code2,
  Mail,
  Terminal,
  User,
} from "lucide-react";
import type { NavIcon } from "@/data/navigation";
import { cn } from "@/lib/utils";

const lucideMap = {
  introduction: User,
  skills: Code2,
  experience: Briefcase,
  contact: Mail,
  blog: BookOpen,
  terminal: Terminal,
} as const;

interface NavItemIconProps {
  icon: NavIcon;
  size?: "sm" | "md";
  className?: string;
}

export function NavItemIcon({ icon, size = "sm", className }: NavItemIconProps) {
  const dim = size === "sm" ? "h-5 w-5" : "h-6 w-6";

  if (icon.type === "image") {
    return (
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-[#0c0c0e]",
          dim,
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon.src}
          alt={icon.alt}
          className="h-full w-full object-contain p-0.5"
        />
      </span>
    );
  }

  if (icon.type === "letter") {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md font-semibold",
          dim,
          className
        )}
        style={{
          backgroundColor: icon.bg ?? "#1d4ed8",
          color: icon.fg ?? "#ffffff",
          fontSize: size === "sm" ? "11px" : "13px",
        }}
      >
        {icon.letter}
      </span>
    );
  }

  const LucideIcon = lucideMap[icon.icon] ?? BookOpen;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground",
        dim,
        className
      )}
    >
      <LucideIcon className="h-3 w-3" />
    </span>
  );
}
