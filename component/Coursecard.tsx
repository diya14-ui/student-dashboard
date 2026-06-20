"use client";

import ProgressBar from "./Progressbar";
import { getLucideIcon } from "@/lib/icons";
import BentoTile from "./BentoTile";

type CourseCardProps = {
  title: string;
  progress: number;
  icon_name: string;
};

export default function CourseCard({
  title,
  progress,
  icon_name,
}: CourseCardProps) {
  const Icon = getLucideIcon(icon_name);

  return (
    <BentoTile className="min-h-[200px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.12), transparent 50%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.1), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Icon size={22} aria-hidden />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        <ProgressBar progress={progress} />

        <p className="mt-3 text-sm font-medium text-slate-400">
          {progress}% complete
        </p>

        <span className="mt-auto pt-4 text-sm font-semibold text-blue-400">
          Continue learning →
        </span>
      </div>
    </BentoTile>
  );
}
