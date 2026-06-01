"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Book, Author } from "@/lib/data";

const PAGE_SIZE = 6;

interface BooksClientProps {
  initialBooks: Book[];
  authors: Author[];
}

export default function BooksClient({
  initialBooks,
  authors,
}: BooksClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "all";
  const currentPage = Number(searchParams.get("page") ?? "1");

  const genres = useMemo(() => {
    const genreSet = new Set(initialBooks.map((book) => book.genre));
    return ["all", ...Array.from(genreSet)];
  }, [initialBooks]);

  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authors
          .find((a) => a.id === book.authorId)
          ?.name.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "all" || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [initialBooks, searchQuery, selectedGenre, authors]);

  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateUrl(genre: string, search: string, page: number) {
    const params = new URLSearchParams();
    if (genre !== "all") params.set("genre", genre);
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    router.push(`/books${params.toString() ? "?" + params.toString() : ""}`);
  }

  function setGenre(genre: string) {
    updateUrl(genre, searchQuery, 1);
  }

  function setSearch(query: string) {
    updateUrl(selectedGenre, query, 1);
  }

  function setPage(page: number) {
    updateUrl(selectedGenre, searchQuery, page);
    window.scrollTo(0, 0);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <div className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedGenre === genre
                ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {genre === "all" ? "All Genres" : genre}
          </button>
        ))}
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {paginatedBooks.length} of {filteredBooks.length}{" "}
        {filteredBooks.length === 1 ? "book" : "books"}
      </p>

      {paginatedBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No books found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBooks.map((book) => {
            const author = authors.find((a) => a.id === book.authorId);
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
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {book.title}
                  </h2>
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
