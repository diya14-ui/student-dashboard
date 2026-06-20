"use client";

import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

interface Goal {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  emoji: string;
}

const goals: Goal[] = [
  { label: "Hours This Week", current: 24.5, target: 30, unit: "h", color: "#38bdf8", emoji: "⏱" },
  { label: "Chapters Read", current: 18, target: 25, unit: "", color: "#34d399", emoji: "📖" },
  { label: "Quiz Score Avg", current: 82, target: 90, unit: "%", color: "#a78bfa", emoji: "🎯" },
  { label: "Days Studied", current: 22, target: 30, unit: "d", color: "#f59e0b", emoji: "📅" },
];

function RadialProgress({ value, max, color, size = 64 }: { value: number; max: number; color: string; size?: number }) {
  const pct = Math.min(value / max, 1);
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} className="rotate-[-90deg]" aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
      />
    </svg>
  );
}

export default function GoalsTile() {
  return (
    <BentoTile className="min-h-[220px]">
      <div className="flex h-full flex-col p-5">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-white">Monthly Goals</h2>
          <p className="text-sm text-slate-400 mt-0.5">Track your targets for June 2026</p>
        </header>

        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 280, damping: 22 }}
              className="flex items-center gap-3 rounded-lg border border-slate-800/60 bg-slate-900/40 p-3"
            >
              <div className="relative shrink-0">
                <RadialProgress value={goal.current} max={goal.target} color={goal.color} size={52} />
                <span className="absolute inset-0 flex items-center justify-center text-[13px]">
                  {goal.emoji}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 leading-tight">{goal.label}</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {goal.current}
                  <span className="text-xs font-normal text-slate-500">
                    {goal.unit} / {goal.target}{goal.unit}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
