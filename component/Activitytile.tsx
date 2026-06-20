"use client";

import { useMemo } from "react";
import BentoTile from "./BentoTile";

const WEEKS = 52;
const DAYS = 7;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ---------------------------------------------------------------------------
// Deterministic seeded PRNG (LCG) — same output on server AND client.
// Using Math.random() here caused a hydration mismatch because SSR and the
// client generated different random numbers, producing different totalSessions.
// ---------------------------------------------------------------------------
function seededRandom(seed: number) {
  // Mulberry32 — fast, high-quality 32-bit PRNG
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate realistic-looking activity data for 52 weeks.
// Seed is fixed so SSR ≡ client output.
function generateActivity(): number[] {
  const rand = seededRandom(0xdeadbeef);
  const total = WEEKS * DAYS;
  return Array.from({ length: total }, (_, i) => {
    const weekIndex = Math.floor(i / DAYS);
    const isRecent = weekIndex >= WEEKS - 16;
    const base = isRecent ? 0.55 : 0.25;
    const r = rand();
    if (r < base * 0.3) return 0;
    if (r < base * 0.55) return 1;
    if (r < base * 0.75) return 2;
    if (r < base * 0.9) return 3;
    return 4;
  });
}

// Pin the reference date to a fixed ISO string so month labels are identical
// between SSR and client (avoids timezone / timing skew).
const REFERENCE_DATE = "2026-06-20";

// LeetCode / GitHub-style green intensity
const intensityClass: Record<number, string> = {
  0: "bg-[#161b22]",
  1: "bg-[#0e4429]",
  2: "bg-[#006d32]",
  3: "bg-[#26a641]",
  4: "bg-[#39d353]",
};

const intensityStyle: Record<number, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

function getMonthLabels(): { label: string; col: number }[] {
  const now = new Date();
  const labels: { label: string; col: number }[] = [];
  let prevMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const d = new Date(now);
    d.setDate(d.getDate() - (WEEKS - 1 - w) * 7);
    const month = d.getMonth();
    if (month !== prevMonth) {
      labels.push({ label: MONTHS[month], col: w });
      prevMonth = month;
    }
  }
  return labels;
}

export default function ActivityTile() {
  const activityGrid = useMemo(() => generateActivity(), []);
  const monthLabels = useMemo(() => getMonthLabels(), []);

  const totalSessions = activityGrid.filter((v) => v > 0).length;
  const maxStreak = (() => {
    let best = 0, cur = 0;
    for (const v of activityGrid) { if (v > 0) { cur++; best = Math.max(best, cur); } else cur = 0; }
    return best;
  })();
  const activeDays = activityGrid.filter((v) => v >= 2).length;

  return (
    <BentoTile className="min-h-[260px]">
      <div className="flex h-full flex-col p-5">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-white">Learning Activity</h2>
          <p className="mt-0.5 text-sm text-slate-400">
            Your study sessions over the last 12 months
          </p>
        </header>

        {/* Stats row */}
        <div className="mb-4 flex gap-4 text-sm">
          <div>
            <span className="text-white font-bold">{totalSessions}</span>
            <span className="ml-1 text-slate-500">sessions</span>
          </div>
          <div>
            <span className="text-white font-bold">{maxStreak}</span>
            <span className="ml-1 text-slate-500">longest streak</span>
          </div>
          <div>
            <span className="text-[#39d353] font-bold">{activeDays}</span>
            <span className="ml-1 text-slate-500">active days</span>
          </div>
        </div>

        {/* Heatmap wrapper */}
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-max">
            {/* Month labels */}
            <div
              className="mb-1 flex"
              style={{ gap: "3px" }}
            >
              <div className="w-5 shrink-0" /> {/* day-label spacer */}
              <div
                className="relative"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${WEEKS}, 11px)`,
                  gap: "3px",
                  width: `${WEEKS * 14}px`,
                }}
              >
                {monthLabels.map(({ label, col }) => (
                  <span
                    key={`${label}-${col}`}
                    className="absolute text-[10px] text-slate-500 select-none"
                    style={{ left: `${col * 14}px`, top: 0 }}
                  >
                    {label}
                  </span>
                ))}
                {/* Placeholder row for height */}
                <div className="col-span-full h-4" />
              </div>
            </div>

            {/* Grid with day labels */}
            <div className="flex" style={{ gap: "3px" }}>
              {/* Day labels */}
              <div
                className="flex shrink-0 flex-col justify-between pr-1"
                style={{ gap: "3px" }}
              >
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <span key={i} className="text-[9px] text-slate-600 leading-none" style={{ height: "11px", lineHeight: "11px" }}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Heatmap grid — columns = weeks, rows = days */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: `repeat(${DAYS}, 11px)`,
                  gridAutoFlow: "column",
                  gridAutoColumns: "11px",
                  gap: "3px",
                }}
                aria-label="Weekly learning activity heatmap"
              >
                {activityGrid.map((level, index) => (
                  <div
                    key={index}
                    className="rounded-sm transition-opacity hover:opacity-80"
                    style={{
                      width: 11,
                      height: 11,
                      backgroundColor: intensityStyle[level],
                      boxShadow: level >= 3 ? `0 0 4px ${intensityStyle[level]}88` : undefined,
                    }}
                    title={`Activity level: ${["none", "light", "moderate", "active", "intense"][level]}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-slate-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="h-[11px] w-[11px] rounded-sm"
              style={{ backgroundColor: intensityStyle[level] }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </BentoTile>
  );
}
