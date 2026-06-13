"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, User, Tag, Building2, ChevronLeft } from "lucide-react";
import { getInstantSuggestions } from "@/lib/search";
import type { SearchSuggestion } from "@/lib/search";
import { cn } from "@/lib/utils";

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  book: BookOpen,
  author: User,
  category: Tag,
  publisher: Building2,
};

export function MobileSearchOverlay({ isOpen, onClose }: MobileSearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shroff_recent_searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecentSearch = (q: string) => {
    if (!q.trim()) return;
    try {
      const updated = [q.trim(), ...recentSearches.filter((s) => s !== q.trim())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("shroff_recent_searches", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      // Slight delay for rendering focus
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      setSuggestions(getInstantSuggestions(value));
    } else {
      setSuggestions([]);
    }
  }, []);

  function navigateSearch(e?: React.FormEvent, searchStr?: string) {
    if (e) e.preventDefault();
    const finalQuery = searchStr || query.trim();
    if (!finalQuery) return;
    saveRecentSearch(finalQuery);
    const params = new URLSearchParams();
    params.set("q", finalQuery);
    router.push(`/books?${params.toString()}`);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#F8F5F0] flex flex-col animate-fade-in xl:hidden">
      {/* Search Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-[#E7E1D8] shadow-sm">
        <form onSubmit={navigateSearch} className="flex-1 flex items-center bg-[#F8F5F0] rounded-full h-12 px-4 border border-[#E7E1D8] focus-within:border-[#C46A3A] focus-within:shadow-[0_0_0_4px_rgba(196,106,58,0.1)] transition-all">
          <button type="submit" aria-label="Search" className="shrink-0 text-[#161616]/40 hover:text-[#C46A3A] transition-colors">
            <Search size={20} />
          </button>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search books, authors, ISBN..."
            className="flex-1 bg-transparent px-3 font-ui text-[1.0625rem] text-[#161616] placeholder:text-[#161616]/40 border-none outline-none w-full min-w-0"
            autoComplete="off"
            autoCapitalize="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              className="p-1 text-[#161616]/40 hover:text-[#161616] shrink-0 rounded-full"
              aria-label="Clear search"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </form>
        <button
          type="button"
          onClick={onClose}
          className="font-ui text-[0.9375rem] font-medium text-[#161616] hover:text-[#C46A3A] px-2 transition-colors shrink-0"
        >
          Cancel
        </button>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-[#F8F5F0]">
        {query.length >= 2 && suggestions.length > 0 ? (
          <ul role="listbox" className="py-2 bg-white min-h-full">
            {suggestions.map((s, i) => {
              const Icon = typeIcons[s.type];
              return (
                <li key={`${s.type}-${s.label}`} role="option" aria-selected={false}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-4 px-5 py-4 font-ui text-left hover:bg-[#F8F5F0] transition-colors border-b border-[#E7E1D8]/50"
                    onClick={() => {
                      saveRecentSearch(query.trim());
                      router.push(s.href);
                      onClose();
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg shrink-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "rgba(196,106,58,0.1)",
                        color: "#C46A3A",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="truncate font-medium text-[0.9375rem] text-[#161616]">
                        {s.label}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-wider font-semibold opacity-50 mt-0.5 text-[#161616]">
                        {s.type}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                className="w-full px-5 py-4 font-ui text-[0.9375rem] font-medium text-left transition-colors text-[#C46A3A] hover:bg-[#F8F5F0]"
                onClick={(e) => navigateSearch(e)}
              >
                View all results for &ldquo;{query}&rdquo;
              </button>
            </li>
          </ul>
        ) : query.length >= 2 ? (
          <div className="py-12 px-6 flex flex-col items-center text-center bg-white min-h-full">
            <Search size={32} className="text-[#161616]/20 mb-4" />
            <p className="font-ui text-[0.9375rem] text-[#161616]/60">
              No results found for &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="p-5">
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-ui text-[0.8125rem] font-bold uppercase tracking-wider text-[#161616]/50">
                    Recent Searches
                  </h3>
                  <button 
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem("shroff_recent_searches");
                    }}
                    className="font-ui text-[0.75rem] font-medium text-[#C46A3A] hover:opacity-70"
                  >
                    Clear
                  </button>
                </div>
                <ul className="bg-white rounded-xl shadow-sm border border-[#E7E1D8] overflow-hidden">
                  {recentSearches.map((rs, i) => (
                    <li key={i} className="border-b border-[#E7E1D8] last:border-b-0">
                      <button
                        type="button"
                        onClick={(e) => navigateSearch(e, rs)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 font-ui text-left hover:bg-[#F8F5F0] transition-colors"
                      >
                        <Search size={16} className="text-[#161616]/30" />
                        <span className="flex-1 font-medium text-[#161616] text-[0.9375rem]">{rs}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="py-8 flex flex-col items-center text-center opacity-60">
              <p className="font-ui text-[0.9375rem] text-[#161616]">
                Search by title, author, ISBN, or publisher
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
