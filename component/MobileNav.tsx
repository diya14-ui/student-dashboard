"use client";

import { motion } from "framer-motion";
import { navItems, type NavItemId } from "@/lib/nav";
import { springTransition } from "@/lib/animations";

type MobileNavProps = {
  activeId: NavItemId;
  onNavigate: (id: NavItemId) => void;
};

export default function MobileNav({ activeId, onNavigate }: MobileNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/80 bg-[#0a0a0f]/95 px-2 py-2 backdrop-blur-md md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className="relative flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 text-slate-400"
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-highlight-mobile"
                    className="absolute inset-0 rounded-xl border border-blue-500/30 bg-blue-500/15"
                    transition={springTransition}
                  />
                )}
                <Icon size={18} className="relative z-10" aria-hidden />
                <span
                  className={`relative z-10 text-[10px] font-medium ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
