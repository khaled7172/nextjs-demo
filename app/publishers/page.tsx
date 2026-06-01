import Link from "next/link";
import { getAllPublishers, getBooksByPublisherId } from "@/lib/data";

export default function PublishersPage() {
  const publishers = getAllPublishers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Country
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Founded
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Books
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300"></th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher, i) => {
              const bookCount = getBooksByPublisherId(publisher.id).length;
              return (
                <tr
                  key={publisher.id}
                  className={`border-t border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                    i % 2 === 0 ? "" : "bg-zinc-50 dark:bg-zinc-800/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-50">
                    {publisher.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    {bookCount}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
