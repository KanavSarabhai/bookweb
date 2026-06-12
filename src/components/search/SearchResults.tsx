"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BookGrid } from "@/components/books/BookGrid";
import { SearchBar } from "@/components/search/SearchBar";
import { filterBooks } from "@/lib/search";
import { books } from "@/lib/data/books";
import { categories } from "@/lib/data/categories";
import { publishers } from "@/lib/data/publishers";
import { getAuthors } from "@/lib/data/books";

export function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = {
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    author: searchParams.get("author") ?? undefined,
    publisher: searchParams.get("publisher") ?? undefined,
    subject: searchParams.get("subject") ?? undefined,
  };

  const results = filterBooks(books, params);
  const authors = getAuthors().slice(0, 15);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/books?${next.toString()}`);
  }

  const chipClass =
    "font-ui text-sm border border-brick text-brick rounded-[50px] px-4 py-2 bg-cream outline-none transition-opacity hover:opacity-70";

  return (
    <>
      <div className="max-w-2xl mb-8">
        <SearchBar variant="page" autoFocus defaultQuery={params.q ?? ""} />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <FilterChip
          label="Category"
          value={params.category}
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          onChange={(v) => setFilter("category", v)}
          className={chipClass}
        />
        <FilterChip
          label="Author"
          value={params.author}
          options={authors.map((a) => ({ value: a, label: a }))}
          onChange={(v) => setFilter("author", v)}
          className={chipClass}
        />
        <FilterChip
          label="Publisher"
          value={params.publisher}
          options={publishers.map((p) => ({ value: p, label: p }))}
          onChange={(v) => setFilter("publisher", v)}
          className={chipClass}
        />
        <FilterChip
          label="Subject"
          value={params.subject}
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          onChange={(v) => setFilter("subject", v)}
          className={chipClass}
        />
      </div>

      <p className="font-ui text-sm text-press-muted mb-8">
        {params.q ? (
          <>
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
            <strong className="text-press">{params.q}</strong>&rdquo;
          </>
        ) : (
          <>
            {results.length} book{results.length !== 1 ? "s" : ""} found
          </>
        )}
      </p>

      <BookGrid books={results} />
    </>
  );
}

function FilterChip({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className: string;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Filter by ${label}`}
      className={className}
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
