"use client";

import { motion } from "framer-motion";
import ProgressBar from "./Progressbar";
import BentoTile from "./BentoTile";

type CourseCardProps = {
  title: string;
  progress: number;
  icon_name: string;
};

// Custom abstract subject icons using inline SVG — no external icon libraries
interface GlyphData {
  svg: React.ReactNode;
  gradient: [string, string]; // [from, to] hex
  glow: string;
  textColor: string;
}

const subjectGlyph: Record<string, GlyphData> = {
  BookOpen: {
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    gradient: ["#2563eb", "#22d3ee"],
    glow: "rgba(59,130,246,0.45)",
    textColor: "#60a5fa",
  },
  Code: {
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    gradient: ["#7c3aed", "#a855f7"],
    glow: "rgba(139,92,246,0.45)",
    textColor: "#a78bfa",
  },
  Layers: {
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
      </svg>
    ),
    gradient: ["#059669", "#34d399"],
    glow: "rgba(16,185,129,0.45)",
    textColor: "#34d399",
  },
  Monitor: {
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 7.409a2.25 2.25 0 0 1-1.07-1.916V5.25" />
      </svg>
    ),
    gradient: ["#d97706", "#fbbf24"],
    glow: "rgba(217,119,6,0.45)",
    textColor: "#fbbf24",
  },
  Palette: {
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
    gradient: ["#db2777", "#f472b6"],
    glow: "rgba(219,39,119,0.45)",
    textColor: "#f472b6",
  },
};

const fallbackGlyph = subjectGlyph.BookOpen;

export default function CourseCard({ title, progress, icon_name }: CourseCardProps) {
  const glyph = subjectGlyph[icon_name] ?? fallbackGlyph;
  const [fromColor, toColor] = glyph.gradient;

  return (
    <BentoTile className="min-h-[200px]">
      {/* Ambient gradient layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at 0% 0%, ${glyph.glow.replace("0.45)", "0.10)")}, transparent 50%), radial-gradient(circle at 100% 100%, ${glyph.glow.replace("0.45)", "0.07)")}, transparent 45%)`,
        }}
      />
      {/* Subtle noise grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="flex h-full flex-col p-6">
        {/* Icon + title */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            style={{
              background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
              boxShadow: `0 0 14px ${glyph.glow}`,
            }}
          >
            {glyph.svg}
          </div>
          <h3 className="text-base font-semibold text-white leading-tight">{title}</h3>
        </div>

        <ProgressBar progress={progress} />

        <p className="mt-2 text-sm font-medium text-slate-400">{progress}% complete</p>
        <p className="mt-0.5 text-xs text-slate-600">
          ~{Math.round(progress / 8.33)} of 12 chapters done
        </p>

        <motion.span
          className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: glyph.textColor }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Continue learning
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </motion.span>
      </div>
    </BentoTile>
  );
}
