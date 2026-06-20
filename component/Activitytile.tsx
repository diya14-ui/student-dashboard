"use client";

import BentoTile from "./BentoTile";

const WEEKS = 12;
const DAYS = 7;

// Mock contribution data: intensity 0–4 per day
const activityGrid = Array.from({ length: WEEKS * DAYS }, (_, index) => {
  const seed = (index * 17 + 13) % 5;
  return seed;
});

const intensityClass: Record<number, string> = {
  0: "bg-slate-800/80",
  1: "bg-blue-900/80",
  2: "bg-blue-700/80",
  3: "bg-blue-500/90",
  4: "bg-violet-400/90",
};

export default function ActivityTile() {
  return (
    <BentoTile className="min-h-[220px]">
      <div className="flex h-full flex-col p-6">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-white">Learning Activity</h2>
          <p className="mt-1 text-sm text-slate-400">
            Your study sessions over the last 12 weeks
          </p>
        </header>

        <div className="flex flex-1 items-end overflow-x-auto pb-1">
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))`,
            }}
            aria-label="Weekly learning activity heatmap"
          >
            {activityGrid.map((level, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-sm ${intensityClass[level]}`}
                title={`Activity level ${level}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-3 w-3 rounded-sm ${intensityClass[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </BentoTile>
  );
}
