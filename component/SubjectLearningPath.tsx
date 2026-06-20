"use client";

import { motion } from "framer-motion";
import BentoTile from "./BentoTile";

interface Subject {
  name: string;
  color: string;
  glowColor: string;
  chapters: {
    name: string;
    completed: boolean;
    locked?: boolean;
  }[];
  totalCompleted: number;
  total: number;
}

const subjects: Subject[] = [
  {
    name: "Advanced React Patterns",
    color: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59,130,246,0.35)",
    totalCompleted: 7,
    total: 12,
    chapters: [
      { name: "Compound Components", completed: true },
      { name: "Render Props Pattern", completed: true },
      { name: "Custom Hook Architecture", completed: true },
      { name: "Context + useReducer", completed: true },
      { name: "Zustand State Patterns", completed: true },
      { name: "Suspense & Error Boundaries", completed: true },
      { name: "React Query Deep Dive", completed: true },
      { name: "Server Components (RSC)", completed: false },
      { name: "Streaming & Partial Rendering", completed: false },
      { name: "Animation Systems", completed: false },
      { name: "Performance Profiling", completed: false, locked: true },
      { name: "Production Patterns", completed: false, locked: true },
    ],
  },
  {
    name: "TypeScript Mastery",
    color: "from-violet-500 to-purple-400",
    glowColor: "rgba(139,92,246,0.35)",
    totalCompleted: 5,
    total: 10,
    chapters: [
      { name: "Type System Fundamentals", completed: true },
      { name: "Generics & Constraints", completed: true },
      { name: "Utility Types", completed: true },
      { name: "Conditional Types", completed: true },
      { name: "Mapped & Template Literal Types", completed: true },
      { name: "Declaration Merging", completed: false },
      { name: "Module Augmentation", completed: false },
      { name: "Type Guards & Narrowing", completed: false },
      { name: "Decorators & Metadata", completed: false, locked: true },
      { name: "Compiler API", completed: false, locked: true },
    ],
  },
  {
    name: "System Design",
    color: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.35)",
    totalCompleted: 3,
    total: 9,
    chapters: [
      { name: "Scalability Principles", completed: true },
      { name: "CAP Theorem", completed: true },
      { name: "Database Sharding", completed: true },
      { name: "Load Balancing Strategies", completed: false },
      { name: "Caching Architecture", completed: false },
      { name: "Message Queues", completed: false },
      { name: "Microservices Patterns", completed: false, locked: true },
      { name: "API Gateway Design", completed: false, locked: true },
      { name: "Distributed Tracing", completed: false, locked: true },
    ],
  },
];

function SubjectPath({ subject, delay }: { subject: Subject; delay: number }) {
  const completionPct = Math.round((subject.totalCompleted / subject.total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 280, damping: 24 }}
      className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4"
    >
      {/* Subject header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-sm truncate">{subject.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {subject.totalCompleted} / {subject.total} chapters
          </p>
        </div>
        <span
          className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#a3adc2",
          }}
        >
          {completionPct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${completionPct}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          style={{ boxShadow: `0 0 8px ${subject.glowColor}` }}
        />
      </div>

      {/* Chapter dots timeline */}
      <div className="flex flex-wrap gap-2">
        {subject.chapters.map((ch, i) => (
          <div key={i} className="flex items-center gap-1.5 group/ch" title={ch.name}>
            <div
              className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold transition-transform group-hover/ch:scale-110"
              style={
                ch.completed
                  ? {
                      background: `linear-gradient(135deg, ${subject.glowColor.replace("0.35", "0.6")}, transparent)`,
                      borderColor: subject.glowColor.replace("0.35", "0.8"),
                      color: "#fff",
                    }
                  : ch.locked
                  ? { background: "rgba(15,23,42,0.8)", borderColor: "#1e293b", color: "#334155" }
                  : { background: "rgba(30,41,59,0.6)", borderColor: "#334155", color: "#64748b" }
              }
            >
              {ch.completed ? (
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : ch.locked ? (
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 1a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6A5 5 0 0 0 12 1zm0 2a3 3 0 0 1 3 3v2H9V6a3 3 0 0 1 3-3z"/>
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span
              className="hidden lg:block text-[10px] truncate max-w-[80px] text-slate-400"
              title={ch.name}
            >
              {ch.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SubjectLearningPath() {
  return (
    <BentoTile className="md:col-span-2 lg:col-span-4">
      <div className="flex h-full flex-col p-5">
        <header className="mb-5">
          <h2 className="text-xl font-semibold text-white">Subject Learning Paths</h2>
          <p className="mt-1 text-sm text-slate-400">
            Chapter-by-chapter progress across all active subjects
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {subjects.map((subject, i) => (
            <SubjectPath key={subject.name} subject={subject} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
