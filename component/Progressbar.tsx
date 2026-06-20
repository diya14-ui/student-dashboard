"use client";

import { motion } from "framer-motion";
import { springTransition } from "@/lib/animations";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${progress}% complete`}
    >
      <motion.div
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ ...springTransition, delay: 0.3 }}
      />
    </div>
  );
}
