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

  const heading =
    params.sort === "bestsellers"
      ? "Bestsellers"
      : params.sort === "new"
        ? "New Arrivals"
        : params.sort === "sale"
          ? "On Sale"
          : params.q
            ? `Results for "${params.q}"`
            : params.category
              ? "Category"
              : "Discover Books That Shape Builders";

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>

      {/* ── Editorial hero header ── */}
      <div
        className="border-b"
        style={{
          background: "linear-gradient(160deg, #f8f5f0 0%, #f2ece2 100%)",
          borderColor: "var(--border)",
          paddingTop: "80px",
          paddingBottom: "52px",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="eyebrow mb-4">Catalogue</p>
          <h1
            className="font-display font-normal tracking-[-0.03em] leading-[1.06] mb-4"
            style={{
              fontSize: "clamp(2.6rem, 5vw + 0.5rem, 5.5rem)",
              color: "var(--ink)",
            }}
          >
            {heading}
          </h1>
          <p className="font-ui text-[0.9375rem] mb-8" style={{ color: "var(--ink-muted)" }}>
            {filtered.length.toLocaleString()} title{filtered.length !== 1 ? "s" : ""} available
          </p>
          <div style={{ maxWidth: "560px" }}>
            <SearchBar variant="page" />
          </div>
        </div>
      </div>

      {/* ── Content: sidebar + grid ── */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10 xl:gap-14 items-start">

          {/* Sidebar */}
          <Suspense
            fallback={
              <div
                className="h-[500px] animate-pulse rounded-[20px]"
                style={{ background: "var(--border-subtle)" }}
              />
            }
          >
            <BookFilters />
          </Suspense>

          {/* Grid */}
          <BookGrid books={filtered} />
        </div>
      </div>
    </div>
  );
}
