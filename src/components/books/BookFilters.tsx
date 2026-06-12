"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { publishers } from "@/lib/data/publishers";
import { categories } from "@/lib/data/categories";
import { getAuthors } from "@/lib/data/books";

interface BookFiltersProps {
  className?: string;
  mobile?: boolean;
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

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.16em] mb-3"
        style={{ color: "#9a9a9a" }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function FiltersContent({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = {
    category: searchParams.get("category") ?? "",
    author: searchParams.get("author") ?? "",
    publisher: searchParams.get("publisher") ?? "",
    sort: searchParams.get("sort") ?? "",
  };

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/books?${params.toString()}`);
    onClose?.();
  }

  function clearFilters() {
    const q = searchParams.get("q");
    router.push(q ? `/books?q=${q}` : "/books");
    onClose?.();
  }

  const authors = getAuthors().slice(0, 12);
  const hasFilters = Object.values(current).some(Boolean);

  return (
    <div className="space-y-6">
      {/* Header row */}
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
            className="font-ui text-[0.75rem] font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "#c46a3a" }}
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <FilterSection label="Sort by">
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
      </FilterSection>

      {/* Category */}
      <FilterSection label="Category">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => updateFilter("category", "")}
            className="w-full text-left font-ui text-sm px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              background: !current.category ? "rgba(196,106,58,0.08)" : "transparent",
              color: !current.category ? "#c46a3a" : "#6b6b6b",
              fontWeight: !current.category ? 600 : 400,
            }}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              type="button"
              key={c.slug}
              onClick={() => updateFilter("category", c.slug)}
              className="w-full text-left font-ui text-sm px-3 py-2 rounded-lg transition-all duration-200"
              style={{
                background:
                  current.category === c.slug
                    ? "rgba(196,106,58,0.08)"
                    : "transparent",
                color: current.category === c.slug ? "#c46a3a" : "#6b6b6b",
                fontWeight: current.category === c.slug ? 600 : 400,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Publisher */}
      <FilterSection label="Publisher">
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
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>

      {/* Author */}
      <FilterSection label="Author">
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
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>
    </div>
  );
}

export function BookFilters({ className, mobile }: BookFiltersProps) {
  const [open, setOpen] = useState(false);

  // Mobile: collapsible pill bar
  if (mobile) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-ui text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-200 w-full justify-between"
          style={{
            background: "#fff",
            border: "1px solid #e7e1d8",
            color: "#161616",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
          aria-expanded={open}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={16} style={{ color: "#c46a3a" }} />
            Filters &amp; Sort
          </span>
          {open ? (
            <ChevronUp size={16} style={{ color: "#9a9a9a" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "#9a9a9a" }} />
          )}
        </button>

        {open && (
          <div
            className="mt-3 rounded-[16px] p-5"
            style={{
              background: "#fff",
              border: "1px solid #e7e1d8",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <FiltersContent onClose={() => setOpen(false)} />
          </div>
        )}
      </div>
    );
  }

  // Desktop: always-visible sidebar
  return (
    <aside
      className="space-y-6 sticky top-[5rem]"
      style={{ overflowY: "auto", maxHeight: "calc(100vh - 6rem)" }}
      aria-label="Product filters"
    >
      <FiltersContent />
    </aside>
  );
}
