"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "bg-foreground text-background border-4 border-foreground",
        "shadow-[6px_6px_0_0] shadow-accent-orange",
        "font-mono text-base md:text-lg",
        "w-full",
        "transition-all duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b-4 border-background/20">
        <span className="w-3 h-3 rounded-full bg-accent-orange" />
        <span className="w-3 h-3 rounded-full bg-accent-green" />
        <span className="w-3 h-3 rounded-full bg-background" />
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-2">
        {children}
      </div>
    </div>
  );
}

interface TerminalLineProps {
  children: React.ReactNode;
  delay?: number;
}

export function TerminalLine({ children, delay = 0 }: TerminalLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.6, 0.01, 0.05, 0.95] }}
      className="leading-relaxed"
    >
      {children}
    </motion.div>
  );
}