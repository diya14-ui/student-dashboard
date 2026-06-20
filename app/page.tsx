import DashboardShell from "@/component/DashboardShell";
import { getCourses } from "@/lib/courses";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { courses, error } = await getCourses();

  if (error || !courses) {
    throw new Error(error ?? "Failed to load courses from Supabase.");
  }

  const studentName = process.env.NEXT_PUBLIC_STUDENT_NAME ?? "Alex";
  const streak = Number(process.env.NEXT_PUBLIC_LEARNING_STREAK ?? "12");

  return (
    <DashboardShell
      courses={courses}
      studentName={studentName}
      streak={streak}
    />
  );
}
