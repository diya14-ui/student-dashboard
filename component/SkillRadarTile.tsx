"use client";

import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

interface SkillBar {
  label: string;
  value: number; // 0–100
  color: string;
}

const skills: SkillBar[] = [
  { label: "React / Next.js", value: 82, color: "#38bdf8" },
  { label: "TypeScript", value: 74, color: "#818cf8" },
  { label: "System Design", value: 51, color: "#34d399" },
  { label: "Node.js / APIs", value: 67, color: "#f59e0b" },
  { label: "CSS / Animation", value: 88, color: "#f472b6" },
];

export default function SkillRadarTile() {
  return (
    <BentoTile className="min-h-[220px]">
      <div className="flex h-full flex-col p-5">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-white">Skill Proficiency</h2>
          <p className="text-sm text-slate-400 mt-0.5">Based on quiz scores &amp; chapter completions</p>
        </header>

        <div className="flex flex-col gap-3">
          {skills.map((skill, i) => (
            <div key={skill.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-300">{skill.label}</span>
                <span className="text-xs font-bold" style={{ color: skill.color }}>
                  {skill.value}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}88` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.value}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
