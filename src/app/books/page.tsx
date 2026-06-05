import { Suspense } from "react";
import type { Metadata } from "next";
import { BookGrid } from "@/components/books/BookGrid";
import { BookFilters } from "@/components/books/BookFilters";
import { SearchBar } from "@/components/search/SearchBar";
import { getFilteredBooks } from "@/lib/books-query";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Browse technical books in programming, AI, data science, cybersecurity, and more from Shroff Publishers.",
};

interface BooksPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    author?: string;
    publisher?: string;
    subject?: string;
    sort?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const filtered = getFilteredBooks(params);

  const title =
    params.sort === "bestsellers"
      ? "Bestsellers"
      : params.sort === "new"
        ? "New Arrivals & Forthcoming"
        : "Books";

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-border py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="heading-page mb-2">{title}</h1>
          <p className="text-body mb-6 max-w-2xl">
            {filtered.length} title{filtered.length !== 1 ? "s" : ""} available
          </p>
          <div className="max-w-xl">
            <SearchBar variant="page" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <Suspense fallback={<div className="h-64 bg-cream animate-pulse rounded-sm" />}>
            <BookFilters />
          </Suspense>
          <BookGrid books={filtered} />
        </div>
      </div>
    </div>
  );
}
