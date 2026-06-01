export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-80 bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-6">
        <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded mb-3 w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 w-1/2" />
        <div className="flex justify-between">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
