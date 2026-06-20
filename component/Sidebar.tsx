"use client";

import { motion } from "framer-motion";
import { Menu, GraduationCap } from "lucide-react";
import { useState } from "react";
import { navItems, type NavItemId } from "@/lib/nav";
import { springTransition } from "@/lib/animations";

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
      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 p-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
            <GraduationCap size={18} aria-hidden />
          </div>
          <span
            className={`truncate text-sm font-semibold text-white transition-opacity ${
              collapsed ? "lg:opacity-0 lg:w-0" : "hidden lg:block"
            }`}
          >
            LearnHub
          </span>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
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
              <Icon size={20} className="relative z-10 shrink-0" aria-hidden />
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
    </aside>
  );
}
