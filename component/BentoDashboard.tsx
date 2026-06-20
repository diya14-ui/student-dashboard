"use client";

import { motion } from "framer-motion";
import HeroTile from "./Herotile";
import ActivityTile from "./Activitytile";
import CourseCard from "./Coursecard";
import type { Course } from "@/types/courses";
import { containerVariants, itemVariants } from "@/lib/animations";

type BentoDashboardProps = {
  courses: Course[];
  studentName: string;
  streak: number;
};

export default function BentoDashboard({
  courses,
  studentName,
  streak,
}: BentoDashboardProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      aria-label="Student dashboard"
    >
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-2"
      >
        <HeroTile studentName={studentName} streak={streak} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-2"
      >
        <ActivityTile />
      </motion.div>

      <motion.header
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-4"
      >
        <h2 className="text-xl font-semibold text-white">Active Courses</h2>
        <p className="mt-1 text-sm text-slate-400">
          Continue your learning path across enrolled courses
        </p>
      </motion.header>

      {courses.map((course) => (
        <motion.div
          key={course.id}
          variants={itemVariants}
          className="md:col-span-1 lg:col-span-1"
        >
          <CourseCard
            title={course.title}
            progress={course.progress}
            icon_name={course.icon_name}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
