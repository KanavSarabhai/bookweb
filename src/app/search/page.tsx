import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search technical books by title, author, ISBN, publisher, or subject.",
};

export default function SearchPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-border py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="heading-page mb-6">Search</h1>
          <Suspense fallback={<p className="font-ui text-charcoal-muted">Loading search…</p>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
