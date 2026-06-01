export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-8 animate-pulse" />
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-4 px-6 py-4 border-t border-zinc-200 dark:border-zinc-700"
          >
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
