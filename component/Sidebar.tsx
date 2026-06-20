"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { type NavItemId } from "@/lib/nav";
import { springTransition } from "@/lib/animations";

// Custom SVG icons — no Lucide dependency
const NavIcons: Record<NavItemId, React.FC<{ className?: string }>> = {
  dashboard: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  courses: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  analytics: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  settings: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
};

const navItems: { id: NavItemId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "courses", label: "Courses" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

type SidebarProps = {
  activeId: NavItemId;
  onNavigate: (id: NavItemId) => void;
};

export default function Sidebar({ activeId, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex md:shrink-0 md:flex-col border-r border-slate-800/80 bg-[#0a0a0f]/95 backdrop-blur-md transition-[width] duration-300 ${
        collapsed ? "md:w-[72px] lg:w-[72px]" : "md:w-[72px] lg:w-64"
      }`}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 p-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white text-sm font-black"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              boxShadow: "0 0 12px rgba(124,58,237,0.35)",
            }}
          >
            L
          </div>
          <span
            className={`truncate text-sm font-semibold text-white transition-opacity ${
              collapsed ? "lg:opacity-0 lg:w-0" : "hidden lg:block"
            }`}
          >
            LearnHub
          </span>
        </div>

        {/* Collapse toggle — custom SVG chevrons */}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = NavIcons[item.id];
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="relative flex items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-400 transition-colors hover:text-white"
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-xl border border-blue-500/30 bg-blue-500/15"
                  transition={springTransition}
                />
              )}
              <Icon className="relative z-10 h-5 w-5 shrink-0" />
              <span
                className={`relative z-10 truncate text-sm font-medium ${
                  collapsed ? "hidden" : "hidden lg:inline"
                } ${isActive ? "text-white" : ""}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom user area */}
      <div className="border-t border-slate-800/80 p-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
          >
            DJ
          </div>
          <div className={`min-w-0 ${collapsed ? "hidden" : "hidden lg:block"}`}>
            <p className="truncate text-xs font-medium text-white">Diya</p>
            <p className="truncate text-[10px] text-slate-500">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
