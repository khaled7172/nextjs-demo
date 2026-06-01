import SkeletonCard from "@/components/SkeletonCard";

export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-8 animate-pulse" />
      <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 animate-pulse" />
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
