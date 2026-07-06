"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import { profile } from "@/data/profile";

interface SplashScreenProps {
  onComplete: () => void;
}

const bootLines = [
  "$ initializing developer-docs v2.0.0...",
  "$ loading modules: react, next, typescript...",
  "$ establishing secure connection...",
  "$ connection established ✓",
  "$ developer mode: enabled",
  `> Hello, I'm ${profile.name}`,
  `> ${profile.role}`,
  `> "${profile.tagline}"`,
];

const SPLASH_VIDEO =
  "https://res.cloudinary.com/ddlegxejs/video/upload/v1782485628/293508100735416900_esldvb.mp4";

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setProgress(((visibleLines + 1) / bootLines.length) * 100);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowEnter(true), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showEnter && (e.key === "Enter" || e.key === " ")) {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showEnter, onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#09090b]">
      {/* Looping background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden
      >
        <source src={SPLASH_VIDEO} type="video/mp4" />
      </video>

      {/* Dark overlay — dims video so terminal text stays readable */}
      <div className="absolute inset-0 bg-[#09090b]/75 backdrop-blur-[1px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl px-6">
          <div className="mb-6 flex items-center gap-3">
            <Terminal className="h-5 w-5 text-zinc-300 drop-shadow-md" />
            <span className="font-mono text-sm text-zinc-300 drop-shadow-md">
              allan-enock@docs:~
            </span>
          </div>

          <div className="mb-8 min-h-[280px] space-y-2 font-mono text-sm">
            <AnimatePresence>
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.startsWith(">")
                      ? "text-zinc-50 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
                      : line.includes("✓")
                        ? "text-emerald-400 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
                        : "text-zinc-400 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
                  }
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleLines < bootLines.length && (
              <span className="inline-block h-4 w-2 animate-pulse bg-zinc-300 drop-shadow-md" />
            )}
          </div>

          <div className="mb-6 h-1 overflow-hidden rounded-full bg-zinc-800/80">
            <motion.div
              className="h-full bg-zinc-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence>
            {showEnter && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onComplete}
                className="group flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 font-mono text-sm text-zinc-50 shadow-lg backdrop-blur-sm transition-colors hover:border-zinc-500 hover:bg-zinc-800/90"
              >
                Enter Documentation
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
