"use client";

import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4.0 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 5.5 },
  { day: "Fri", hours: 3.0 },
  { day: "Sat", hours: 6.0 },
  { day: "Sun", hours: 2.0 },
];

const MAX_HOURS = 8;

function getBarGradient(hours: number): string {
  if (hours >= 5) return "linear-gradient(to top, #2563eb, #7c3aed)";
  if (hours >= 3) return "linear-gradient(to top, #1d4ed8, #3b82f6)";
  return "linear-gradient(to top, #1e3a5f, #2563eb)";
}

function getBarGlow(hours: number): string | undefined {
  return hours >= 5 ? "0 0 12px rgba(124,58,237,0.4)" : undefined;
}

export default function WeeklyHoursChart() {
  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);

  return (
    <BentoTile className="min-h-[240px]">
      <div className="flex h-full flex-col p-5">
        <header className="mb-2">
          <h2 className="text-lg font-semibold text-white">Weekly Study Hours</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            <span className="text-white font-bold">{totalHours}h</span> this week
          </p>
        </header>

        <div className="flex flex-1 items-end gap-2 pt-4 pb-1">
          {weeklyData.map((item, i) => {
            const heightPct = (item.hours / MAX_HOURS) * 100;
            return (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-medium">{item.hours}h</span>
                <div className="relative w-full" style={{ height: "100px" }}>
                  <div
                    className="absolute inset-x-0 bottom-0 rounded-t-sm overflow-hidden"
                    style={{ height: `${heightPct}%` }}
                  >
                    <motion.div
                      className="h-full w-full rounded-t-sm"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: i * 0.08,
                        type: "spring",
                        stiffness: 280,
                        damping: 24,
                      }}
                      style={{
                        background: getBarGradient(item.hours),
                        boxShadow: getBarGlow(item.hours),
                        transformOrigin: "bottom",
                      }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </BentoTile>
  );
}
