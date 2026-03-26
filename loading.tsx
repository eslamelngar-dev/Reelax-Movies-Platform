import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="pt-28 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="h-10 bg-white/5 rounded-lg w-48 mb-8 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[...Array(12)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
