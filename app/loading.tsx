import SkeletonCard from "@/component/Skeletoncard";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800/80 md:block" />

      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          aria-busy="true"
          aria-label="Loading dashboard"
        >
          <SkeletonCard className="h-[220px] md:col-span-2 lg:col-span-2" />
          <SkeletonCard className="h-[220px] md:col-span-2 lg:col-span-2" />
          <SkeletonCard className="h-8 md:col-span-2 lg:col-span-4" />
          <SkeletonCard className="h-[200px]" />
          <SkeletonCard className="h-[200px]" />
          <SkeletonCard className="h-[200px]" />
          <SkeletonCard className="h-[200px]" />
        </div>
      </main>
    </div>
  );
}
