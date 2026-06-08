"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, User, Tag, Building2 } from "lucide-react";
import { getInstantSuggestions } from "@/lib/search";
import type { SearchSuggestion } from "@/lib/search";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "header" | "hero" | "page";
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  defaultQuery?: string;
  showCategoryFilter?: boolean;
}

const typeIcons = {
  book: BookOpen,
  author: User,
  category: Tag,
  publisher: Building2,
};

export function SearchBar({
  variant = "header",
  placeholder = "Search by title, author, ISBN, or category...",
  className,
  autoFocus,
  defaultQuery = "",
  showCategoryFilter = true,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSuggestions = useCallback((value: string) => {
    setSuggestions(getInstantSuggestions(value));
    setOpen(value.length >= 2);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function navigateSearch() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push(`/search?${params.toString()}`);
    setOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      router.push(suggestions[activeIndex].href);
      setOpen(false);
      return;
    }
    navigateSearch();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const isPill = variant === "hero" || variant === "page";
  const heightClass = variant === "header" ? "h-9" : "h-14";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} role="search" className="flex flex-col sm:flex-row gap-3">
        <div
          className={cn(
            "flex flex-1 items-center gap-2 bg-white/50 border border-[#121212]/10 transition-all focus-within:border-[#121212]/20 focus-within:bg-white/80",
            isPill ? "rounded-[50px]" : "rounded-[50px]",
            heightClass
          )}
        >
          <Search
            className="ml-3 shrink-0 text-[#121212]/40"
            size={variant === "header" ? 16 : 20}
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateSuggestions(e.target.value);
            }}
            onFocus={() => query.length >= 2 && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            autoComplete="off"
            aria-label="Search books"
            aria-expanded={open}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            className="flex-1 bg-transparent font-ui text-sm text-press placeholder:text-press-muted/50 outline-none pr-2"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="mr-3 p-1 text-press-muted hover:text-brick transition-opacity"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {showCategoryFilter && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className={cn(
              "font-ui text-sm border border-brick text-brick bg-cream px-4 outline-none transition-opacity hover:opacity-70",
              isPill ? "rounded-[50px] h-11 sm:h-14" : "rounded-[50px] h-11"
            )}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </form>

      {open && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 top-full left-0 right-0 mt-2 bg-cream border border-brick rounded-[12px] overflow-hidden animate-fade-in"
        >
          {suggestions.map((s, i) => {
            const Icon = typeIcons[s.type];
            return (
              <li key={`${s.type}-${s.label}`} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 font-ui text-sm text-left transition-opacity",
                    i === activeIndex ? "bg-soft-grey opacity-100" : "hover:opacity-70 text-press"
                  )}
                  onMouseDown={() => {
                    router.push(s.href);
                    setOpen(false);
                  }}
                >
                  <Icon size={16} className="shrink-0 text-brick" aria-hidden />
                  <span className="flex-1 truncate">{s.label}</span>
                  <span className="text-xs text-press-muted capitalize">{s.type}</span>
                </button>
              </li>
            );
          })}
          <li className="border-t border-brick/20">
            <button
              type="button"
              className="w-full px-4 py-3 font-ui text-sm text-brick text-left transition-opacity hover:opacity-70"
              onMouseDown={navigateSearch}
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
