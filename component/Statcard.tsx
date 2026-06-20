"use client";

import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
     className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700"
    >
      <h3 className="text-slate-400 text-sm">
        {title}
      </h3>

     <p className="text-3xl font-bold text-white mt-2">
        {value}
      </p>
    </motion.div>
  );
}