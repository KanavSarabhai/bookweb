"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, User, Tag, Building2 } from "lucide-react";
import { getInstantSuggestions } from "@/lib/search";
import type { SearchSuggestion } from "@/lib/search";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "header" | "hero" | "page";
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  defaultQuery?: string;
}

const typeIcons = {
  book: BookOpen,
  author: User,
  category: Tag,
  publisher: Building2,
};

export function SearchBar({
  variant = "header",
  placeholder = "Search books, authors, ISBN, subjects…",
  className,
  autoFocus,
  defaultQuery = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      router.push(suggestions[activeIndex].href);
      setOpen(false);
      return;
    }
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
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

  const sizeClasses = {
    header: "h-10 text-sm",
    hero: "h-12 text-base",
    page: "h-12 text-base",
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} role="search">
        <div
          className={cn(
            "flex items-center gap-2 bg-surface border border-border rounded-sm transition-colors duration-200 focus-within:border-gold-muted focus-within:shadow-sm",
            variant === "hero" && "shadow-md border-cream-dark",
            sizeClasses[variant]
          )}
        >
          <Search
            className="ml-3 shrink-0 text-charcoal-muted"
            size={variant === "header" ? 18 : 20}
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
            className="flex-1 bg-transparent font-ui text-charcoal placeholder:text-charcoal-muted/60 outline-none pr-2"
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
              className="mr-2 p-1 text-charcoal-muted hover:text-brown transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface border border-border rounded-sm shadow-lg overflow-hidden animate-fade-in"
        >
          {suggestions.map((s, i) => {
            const Icon = typeIcons[s.type];
            return (
              <li key={`${s.type}-${s.label}`} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 font-ui text-sm text-left transition-colors",
                    i === activeIndex ? "bg-cream text-brown" : "hover:bg-cream/80 text-charcoal"
                  )}
                  onMouseDown={() => {
                    router.push(s.href);
                    setOpen(false);
                  }}
                >
                  <Icon size={16} className="shrink-0 text-gold-muted" aria-hidden />
                  <span className="flex-1 truncate">{s.label}</span>
                  <span className="text-xs text-charcoal-muted capitalize">{s.type}</span>
                </button>
              </li>
            );
          })}
          <li className="border-t border-border">
            <button
              type="button"
              className="w-full px-4 py-2.5 font-ui text-sm text-gold hover:bg-cream/50 text-left transition-colors"
              onMouseDown={() => {
                router.push(`/search?q=${encodeURIComponent(query)}`);
                setOpen(false);
              }}
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
