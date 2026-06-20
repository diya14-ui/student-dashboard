"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import BentoDashboard from "./BentoDashboard";
import type { Course } from "@/types/courses";
import type { NavItemId } from "@/lib/nav";

type DashboardShellProps = {
  courses: Course[];
  studentName: string;
  streak: number;
};

export default function DashboardShell({
  courses,
  studentName,
  streak,
}: DashboardShellProps) {
  const [activeId, setActiveId] = useState<NavItemId>("dashboard");

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar activeId={activeId} onNavigate={setActiveId} />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 px-4 py-6 pb-24 md:px-6 md:pb-6 lg:px-8">
          <BentoDashboard
            courses={courses}
            studentName={studentName}
            streak={streak}
          />
        </main>
      </div>

      <MobileNav activeId={activeId} onNavigate={setActiveId} />
    </div>
  );
}
