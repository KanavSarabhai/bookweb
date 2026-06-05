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
    router.push(`/search?${next.toString()}`);
  }

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
        />
        <FilterChip
          label="Author"
          value={params.author}
          options={authors.map((a) => ({ value: a, label: a }))}
          onChange={(v) => setFilter("author", v)}
        />
        <FilterChip
          label="Publisher"
          value={params.publisher}
          options={publishers.map((p) => ({ value: p, label: p }))}
          onChange={(v) => setFilter("publisher", v)}
        />
        <FilterChip
          label="Subject"
          value={params.subject}
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          onChange={(v) => setFilter("subject", v)}
        />
      </div>

      <p className="font-ui text-sm text-charcoal-muted mb-6">
        {params.q ? (
          <>
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
            <strong className="text-brown">{params.q}</strong>&rdquo;
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
}: {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Filter by ${label}`}
      className="font-ui text-sm border border-border rounded-sm px-3 py-2 bg-surface text-charcoal hover:border-gold-muted outline-none transition-colors"
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
