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
  placeholder = "Search books...",
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
    
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  function navigateSearch() {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push(`/books?${params.toString()}`);
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

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-full", className)}>
      <form onSubmit={handleSubmit} role="search" className="flex flex-col sm:flex-row gap-3 w-full">
        <div
          className={cn(
            "flex flex-1 items-center gap-3 px-4 transition-all duration-300 rounded-full overflow-hidden group",
            "h-[44px] md:h-[46px]",
            "bg-[#FFFFFF] border border-[#E7E1D8]",
            "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
            "hover:border-[#C46A3A] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
            "focus-within:border-[#C46A3A] focus-within:shadow-[0_0_0_4px_rgba(196,106,58,0.1)] focus-within:bg-[#FFFFFF]"
          )}
        >
          <button
            type="submit"
            aria-label="Search"
            className="shrink-0 text-[#121212]/40 group-hover:text-[#C46A3A] group-focus-within:text-[#C46A3A] transition-colors duration-300"
          >
            <Search
              size={18}
              strokeWidth={1.5}
              aria-hidden
            />
          </button>
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
            className="flex-1 min-w-0 bg-transparent font-ui text-[0.9375rem] text-[#161616] placeholder:text-[#161616]/40 border-none outline-none"
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
              className="p-1.5 text-[#161616]/40 hover:text-[#C46A3A] transition-colors rounded-full shrink-0"
              aria-label="Clear search"
            >
              <X size={16} strokeWidth={2} />
            </button>
          )}
        </div>

        {showCategoryFilter && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className={cn(
              "font-ui text-sm border border-[#E7E1D8] text-[#161616] bg-white px-4 outline-none transition-all hover:border-[#C46A3A] rounded-full focus:border-[#C46A3A] focus:shadow-[0_0_0_4px_rgba(196,106,58,0.1)]",
              variant === "header" ? "h-11" : "h-14"
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
          className="absolute z-50 top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E7E1D8] rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] animate-fade-in"
        >
          {suggestions.map((s, i) => {
            const Icon = typeIcons[s.type];
            return (
              <li key={`${s.type}-${s.label}`} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 font-ui text-sm text-left transition-colors",
                    i === activeIndex ? "bg-[#F8F5F0]" : "hover:bg-[#F8F5F0]"
                  )}
                  style={{ color: "#161616" }}
                  onMouseDown={() => {
                    router.push(s.href);
                    setOpen(false);
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(196,106,58,0.1)",
                      color: "#C46A3A",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.5} aria-hidden />
                  </div>
                  <span className="flex-1 truncate font-medium">{s.label}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-40">
                    {s.type}
                  </span>
                </button>
              </li>
            );
          })}
          <li className="border-t border-[#E7E1D8]">
            <button
              type="button"
              className="w-full px-4 py-3.5 font-ui text-sm font-medium text-left transition-colors hover:bg-[#F8F5F0]"
              style={{ color: "#C46A3A" }}
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
