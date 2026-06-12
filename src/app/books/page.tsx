import { Suspense } from "react";
import type { Metadata } from "next";
import { BookGrid } from "@/components/books/BookGrid";
import { BookFilters } from "@/components/books/BookFilters";
import { getFilteredBooks } from "@/lib/books-query";
import { getCategoryBySlug } from "@/lib/data/categories";

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

  // Build a readable heading
  let heading = "All Books";
  if (params.sort === "bestsellers") heading = "Bestsellers";
  else if (params.sort === "new") heading = "New Arrivals";
  else if (params.sort === "sale") heading = "On Sale";
  else if (params.q) heading = `Results for "${params.q}"`;
  else if (params.category) {
    const cat = getCategoryBySlug(params.category);
    heading = cat ? cat.name : "Category";
  }

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>

      {/* ── Page header — compact ── */}
      <div
        style={{
          background: "linear-gradient(160deg, #f8f5f0 0%, #f2ece2 100%)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "32px",
          paddingBottom: "28px",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 xl:px-16">
          <p className="eyebrow mb-2">Catalogue</p>
          <h1
            className="font-display font-normal tracking-[-0.025em] leading-[1.1] mb-2"
            style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", color: "var(--ink)" }}
          >
            {heading}
          </h1>
          <p className="font-ui text-sm" style={{ color: "var(--ink-muted)" }}>
            {filtered.length.toLocaleString()} title{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* ── Content: sidebar + grid ── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 xl:px-16 py-6 lg:py-10">

        {/* Mobile filters — shown inline above grid on small screens */}
        <div className="block lg:hidden mb-6">
          <Suspense fallback={null}>
            <BookFilters mobile />
          </Suspense>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8 xl:gap-12 items-start">

          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <Suspense
              fallback={
                <div
                  className="h-[400px] animate-pulse rounded-[16px]"
                  style={{ background: "var(--border-subtle)" }}
                />
              }
            >
              <BookFilters />
            </Suspense>
          </div>

          {/* Book grid */}
          <div className="min-w-0">
            <BookGrid books={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
