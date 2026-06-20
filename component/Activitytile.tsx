"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", activity: 2 },
  { day: "Tue", activity: 4 },
  { day: "Wed", activity: 3 },
  { day: "Thu", activity: 5 },
  { day: "Fri", activity: 6 },
];

export default function ActivityTile() {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-700 h-full"
    >
      <h3 className="text-xl font-bold text-white mb-4">
        Weekly Activity
      </h3>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="activity" fill="#2563eb" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}