import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/courses";

export async function getCourses(): Promise<{
  courses: Course[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return { courses: null, error: error.message };
  }

  return { courses: data as Course[], error: null };
}
