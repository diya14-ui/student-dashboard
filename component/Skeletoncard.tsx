type SkeletonCardProps = {
  className?: string;
};

export default function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/60 ${className}`}
      aria-hidden
    >
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="h-4 w-1/3 rounded bg-slate-800" />
        <div className="h-6 w-2/3 rounded bg-slate-800" />
        <div className="mt-auto h-3 w-full rounded bg-slate-800" />
        <div className="h-3 w-4/5 rounded bg-slate-800" />
      </div>
    </div>
  );
}
