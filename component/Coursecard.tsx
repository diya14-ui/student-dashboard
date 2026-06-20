"use client";
import ProgressBar from "./Progressbar";
import { BookOpen, Monitor, Palette, Code } from "lucide-react";
import { motion } from "framer-motion";

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
  const icons = {
    BookOpen,
    Monitor,
    Palette,
    Code,
  };

  const Icon =
    icons[icon_name as keyof typeof icons] || BookOpen;

  return (
   <motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  whileHover={{
    scale: 1.03,
    y: -5,
  }}
      transition={{
        duration: 0.2,
      }}
      className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-700"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon size={28} className="text-blue-600" />

        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
      </div>

      <ProgressBar progress={progress} />

      <p className="mt-4 text-slate-300 font-medium">
        {progress}% Complete
      </p>

      <button className="mt-4 text-blue-400 font-semibold hover:text-blue-300">
        Continue Learning →
      </button>
    </motion.div>
  );
}