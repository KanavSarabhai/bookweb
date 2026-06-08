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
        ? "New arrivals"
        : params.sort === "sale"
          ? "Sale books"
          : "Books";

  return (
    <div className="bg-cream min-h-screen">
      <div className="py-12 lg:py-16 border-b border-brick/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">Catalogue</p>
          <hr className="hairline mb-8" />
          <h1 className="heading-page mb-3">{title}</h1>
          <p className="text-body mb-8">
            {filtered.length} title{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="max-w-2xl">
            <SearchBar variant="page" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <Suspense fallback={<div className="h-64 bg-soft-grey animate-pulse rounded-[25px]" />}>
            <BookFilters />
          </Suspense>
          <BookGrid books={filtered} />
        </div>
      </div>
    </div>
  );
}
