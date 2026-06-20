"use client";

import { motion } from "framer-motion";

type HeroTileProps = {
  totalCourses: number;
};

export default function HeroTile({
  totalCourses,
}: HeroTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-2xl p-8 shadow-xl border border-slate-700"
    >
      <h2 className="text-3xl font-bold mb-2">
        Welcome Back 👋
      </h2>

      <p className="text-lg">
        Keep learning and complete your courses.
      </p>

      <div className="mt-6">
        <span className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
          {totalCourses} Active Courses
        </span>
      </div>
    </motion.div>
  );
}