"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import BentoDashboard from "./BentoDashboard";
import Footer from "./Footer";
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
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar activeId={activeId} onNavigate={setActiveId} />

      {/* Scrollable main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto scroll-smooth">
        <main className="flex-1 px-4 py-6 pb-6 md:px-6 lg:px-8">
          <BentoDashboard
            courses={courses}
            studentName={studentName}
            streak={streak}
          />
        </main>

        <Footer />

        {/* Spacer for mobile bottom nav */}
        <div className="h-16 md:hidden" aria-hidden />
      </div>

      <MobileNav activeId={activeId} onNavigate={setActiveId} />
    </div>
  );
}
