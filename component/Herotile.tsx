"use client";

import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

type HeroTileProps = {
  studentName: string;
  streak: number;
  lastStudied?: {
    title: string;
    chapter: string;
    progress: number;
  };
};

const defaultLastStudied = {
  title: "Advanced React Patterns",
  chapter: "Chapter 7: Custom Hooks Deep Dive",
  progress: 68,
};

export default function HeroTile({
  studentName,
  streak,
  lastStudied = defaultLastStudied,
}: HeroTileProps) {
  return (
    <BentoTile className="border-blue-900/40 bg-gradient-to-br from-[#0d0d1a] via-slate-900 to-blue-950/40">
      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        {/* Top: Greeting */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
            <p className="text-xs font-medium uppercase tracking-widest text-blue-400/80">
              Learning Dashboard
            </p>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {studentName}
            </span>
          </h1>
          <p className="mt-2 max-w-lg text-slate-400 text-sm">
            Keep your momentum going — you&apos;re on a{" "}
            <span className="font-semibold text-orange-300">{streak}-day</span>{" "}
            learning streak!
          </p>
        </div>

        {/* Streak Badge Row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-orange-300">
            {/* flame SVG - no external icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C10.2 4.5 8 7 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.5-.1-1-.2-1.4C17.5 10 19 12.1 19 14.5c0 3.6-3.1 6.5-7 6.5S5 18.1 5 14.5C5 9.5 9 5.5 12 2Z"/>
            </svg>
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-emerald-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold">4 courses active</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-violet-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-semibold">142 hrs total</span>
          </div>
        </div>

        {/* Continue Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 280, damping: 22 }}
          className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
                ▶ Continue Learning
              </p>
              <p className="font-semibold text-white truncate">{lastStudied.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 truncate">{lastStudied.chapter}</p>
              {/* mini progress bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${lastStudied.progress}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">{lastStudied.progress}% complete</p>
            </div>
            <button
              type="button"
              className="mt-1 shrink-0 rounded-lg border border-blue-500/40 bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-300 transition-colors hover:bg-blue-500/30 hover:text-white"
            >
              Resume
            </button>
          </div>
        </motion.div>
      </div>
    </BentoTile>
  );
}
