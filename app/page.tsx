import Sidebar from "../component/Sidebar";
import CourseCard from "../component/Coursecard";
import { supabase } from "../lib/supabase";
import HeroTile from "../component/Herotile";
import StatCard from "../component/Statcard";
import ActivityTile from "../component/Activitytile";
import { motion } from "framer-motion";

export default async function Home() {
  const { data: courses, error } = await supabase.from("courses").select("*");

  const totalCourses = courses?.length || 0;

  const averageProgress =
    courses?.reduce((sum, course) => sum + course.progress, 0) / totalCourses ||
    0;

  const completedCourses =
    courses?.filter((course) => course.progress >= 80).length || 0;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar />

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <HeroTile totalCourses={courses?.length || 0} />
            </div>

            <ActivityTile />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
            <StatCard title="Total Courses" value={totalCourses} />

            <StatCard
              title="Average Progress"
              value={`${Math.round(averageProgress)}%`}
            />

            <StatCard title="Completed Courses" value={completedCourses} />
          </div>

          <h1 className="text-4xl font-bold text-white mt-6 mb-6">
            My Courses
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                progress={course.progress}
                icon_name={course.icon_name}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
