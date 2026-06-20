"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60 bg-[#0a0a0f]/80 px-6 py-5 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          {/* Custom logo mark — no external icons */}
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-xs font-black"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              boxShadow: "0 0 12px rgba(124,58,237,0.35)",
            }}
          >
            L
          </div>
          <span className="text-sm font-semibold text-white">LearnHub</span>
          <span className="hidden sm:block text-slate-600 text-xs">
            — Next-Gen Learning Dashboard
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-4 text-xs text-slate-500" aria-label="Footer navigation">
          {["Dashboard", "Courses", "Analytics", "Settings", "Help"].map((link) => (
            <button
              key={link}
              type="button"
              className="transition-colors hover:text-slate-300 focus:outline-none focus-visible:text-white"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Status + copyright */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>All systems normal</span>
          </div>
          <span className="text-slate-700">·</span>
          <span>© {year} LearnHub</span>
        </div>
      </div>
    </footer>
  );
}
