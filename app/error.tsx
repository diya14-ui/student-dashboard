"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-6">
      <section className="max-w-md rounded-2xl border border-red-500/20 bg-slate-900/80 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle size={22} aria-hidden />
        </div>
        <h1 className="text-xl font-semibold text-white">
          Unable to load dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          We couldn&apos;t connect to your learning data. Check your Supabase
          configuration and try again.
        </p>
        <p className="mt-4 rounded-lg bg-slate-950/80 px-3 py-2 font-mono text-xs text-red-300">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          <RefreshCw size={16} aria-hidden />
          Try again
        </button>
      </section>
    </main>
  );
}
