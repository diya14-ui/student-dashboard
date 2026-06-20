"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import BentoTile from "./BentoTile";

type HeroTileProps = {
  studentName: string;
  streak: number;
};

export default function HeroTile({ studentName, streak }: HeroTileProps) {
  return (
    <BentoTile className="min-h-[220px] border-blue-900/40 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40">
      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400/80">
            Learning Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Welcome back, {studentName}
          </h1>
          <p className="mt-2 max-w-lg text-slate-400">
            Pick up where you left off and keep your momentum going today.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-orange-300">
            <Flame className="h-4 w-4" aria-hidden />
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
