export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
      <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>

      <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>

      <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
    </div>
  );
}