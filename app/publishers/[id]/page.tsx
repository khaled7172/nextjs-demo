import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getPublisherById,
  getBooksByPublisherId,
  getAuthorById,
} from "@/lib/data";

export default async function PublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publisher = getPublisherById(parseInt(id));

  if (!publisher) notFound();

  const books = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block"
      >
        ← Back to Publishers
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-6 mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {publisher.name}
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Founded:
            </span>
            <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.foundedYear}
            </span>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Country:
            </span>
            <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.country}
            </span>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Website:
            </span>

            <a
              href={publisher.website}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 font-semibold text-zinc-900 dark:text-zinc-50 hover:underline"
            >
              {publisher.website}
            </a>
          </div>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          {publisher.description}
        </p>
      </div>

      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        Books by {publisher.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => {
          const author = getAuthorById(book.authorId);
          return (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {book.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  by {author?.name}
                </p>
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                    {book.genre}
                  </span>
                  <span>{book.publishedYear}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
