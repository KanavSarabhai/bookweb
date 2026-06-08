"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { publishers } from "@/lib/data/publishers";
import { categories } from "@/lib/data/categories";
import { getAuthors } from "@/lib/data/books";
import { cn } from "@/lib/utils";

interface BookFiltersProps {
  className?: string;
}

const selectClass =
  "w-full font-ui text-sm border border-brick rounded-[3.75px] px-3 py-2.5 bg-cream text-press outline-none focus:ring-1 focus:ring-brick";

export function BookFilters({ className }: BookFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = {
    category: searchParams.get("category") ?? "",
    author: searchParams.get("author") ?? "",
    publisher: searchParams.get("publisher") ?? "",
    subject: searchParams.get("subject") ?? "",
    sort: searchParams.get("sort") ?? "",
  };

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/books?${params.toString()}`);
  }

  function clearFilters() {
    const q = searchParams.get("q");
    router.push(q ? `/books?q=${q}` : "/books");
  }

  const authors = getAuthors().slice(0, 12);
  const hasFilters = Object.values(current).some(Boolean);

  return (
    <aside className={cn("space-y-6", className)} aria-label="Product filters">
      <div className="flex items-center justify-between">
        <h2 className="section-label">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-ui text-xs text-brick hover:opacity-70 transition-opacity"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Sort by">
        <select
          value={current.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className={selectClass}
          aria-label="Sort books"
        >
          <option value="">Newest first</option>
          <option value="bestsellers">Bestsellers</option>
          <option value="new">New arrivals</option>
          <option value="sale">Sale</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </FilterGroup>

      <FilterGroup label="Category">
        <select
          value={current.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Subject">
        <select
          value={current.subject}
          onChange={(e) => updateFilter("subject", e.target.value)}
          className={selectClass}
          aria-label="Filter by subject"
        >
          <option value="">All subjects</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Author">
        <select
          value={current.author}
          onChange={(e) => updateFilter("author", e.target.value)}
          className={selectClass}
          aria-label="Filter by author"
        >
          <option value="">All authors</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Publisher">
        <select
          value={current.publisher}
          onChange={(e) => updateFilter("publisher", e.target.value)}
          className={selectClass}
          aria-label="Filter by publisher"
        >
          <option value="">All publishers</option>
          {publishers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block section-label mb-2">{label}</label>
      {children}
    </div>
  );
}
