import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search technical books by title, author, ISBN, publisher, or subject.",
};

export default function SearchPage() {
  return (
    <div className="bg-cream min-h-screen py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="section-label mb-4">Find a book</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-8">Search</h1>
        <Suspense fallback={<p className="text-body">Loading search…</p>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
