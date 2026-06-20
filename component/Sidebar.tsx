"use client";

import { Home, BookOpen, BarChart3, Settings, Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`bg-black border border-slate-800 text-white rounded-2xl p-6 transition-all duration-300 ${
        collapsed ? "w-20" : "w-full"
      }`}
    >
     <div className="flex justify-between items-center mb-8">
        {!collapsed && (
         <h2 className="text-2xl font-bold">
  Student Dashboard
</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>
      </div>
      
      <nav className="space-y-6">
        <div className="flex items-center gap-3 bg-blue-600 text-white p-3 rounded-lg">
          <Home size={20} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition">
          <BookOpen size={20} />
          <div className="flex items-center gap-3">
            {!collapsed && <span>Courses</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition">
          <BarChart3 size={20} />
          {!collapsed && <span>Analytics</span>}
        </div>

        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </div>
      </nav>
    </aside>
  );
}
