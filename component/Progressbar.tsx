"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({
  progress,
}: ProgressBarProps) {
  return (
    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />
    </div>
  );
}