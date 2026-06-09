"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { publishers } from "@/lib/data/publishers";
import { categories } from "@/lib/data/categories";
import { getAuthors } from "@/lib/data/books";
import { cn } from "@/lib/utils";

interface BookFiltersProps {
  className?: string;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block font-ui text-[0.65rem] font-semibold uppercase tracking-[0.16em] mb-3"
        style={{ color: "#9a9a9a" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-inter, system-ui, sans-serif)",
  fontSize: "0.875rem",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #e7e1d8",
  background: "#fff",
  color: "#161616",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  transition: "border-color 0.2s ease",
};

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
    <aside
      className={cn("space-y-7 sticky top-[5rem]", className)}
      aria-label="Product filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p
          className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "#9a9a9a" }}
        >
          Filters
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-ui text-[0.75rem] font-medium transition-colors duration-200"
            style={{ color: "#c46a3a" }}
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Sort by">
        <div className="relative">
          <select
            value={current.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            style={selectStyle}
            aria-label="Sort books"
            onFocus={(e) => (e.currentTarget.style.borderColor = "#c46a3a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e1d8")}
          >
            <option value="">Newest first</option>
            <option value="bestsellers">Bestsellers</option>
            <option value="new">New arrivals</option>
            <option value="sale">On sale</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>
      </FilterGroup>

      <FilterGroup label="Category">
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("category", "")}
            className="w-full text-left font-ui text-sm px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              background: !current.category ? "rgba(196,106,58,0.08)" : "transparent",
              color: !current.category ? "#c46a3a" : "#6b6b6b",
              fontWeight: !current.category ? 500 : 400,
            }}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => updateFilter("category", c.slug)}
              className="w-full text-left font-ui text-sm px-3 py-2 rounded-lg transition-all duration-200"
              style={{
                background: current.category === c.slug ? "rgba(196,106,58,0.08)" : "transparent",
                color: current.category === c.slug ? "#c46a3a" : "#6b6b6b",
                fontWeight: current.category === c.slug ? 500 : 400,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Publisher">
        <div className="relative">
          <select
            value={current.publisher}
            onChange={(e) => updateFilter("publisher", e.target.value)}
            style={selectStyle}
            aria-label="Filter by publisher"
            onFocus={(e) => (e.currentTarget.style.borderColor = "#c46a3a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e1d8")}
          >
            <option value="">All publishers</option>
            {publishers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </FilterGroup>

      <FilterGroup label="Author">
        <div className="relative">
          <select
            value={current.author}
            onChange={(e) => updateFilter("author", e.target.value)}
            style={selectStyle}
            aria-label="Filter by author"
            onFocus={(e) => (e.currentTarget.style.borderColor = "#c46a3a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e7e1d8")}
          >
            <option value="">All authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </FilterGroup>
    </aside>
  );
}
