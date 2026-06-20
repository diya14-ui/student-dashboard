"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { springTransition } from "@/lib/animations";

type BentoTileProps = {
  children: ReactNode;
  className?: string;
};

export default function BentoTile({
  children,
  className = "",
}: BentoTileProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={springTransition}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl backdrop-blur-sm will-change-transform ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.14), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-blue-500/40 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}
