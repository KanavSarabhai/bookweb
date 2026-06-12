"use client";

import type { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// Tailwind v4: these classes must be full strings, not dynamically constructed
const gridClass: Record<number, string> = {
  2: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5",
  3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5",
  4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5",
};

export function BookGrid({ books, columns = 4, className }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-20 px-4">
        <div
          className="flex items-center justify-center mb-5 rounded-full"
          style={{
            width: "64px",
            height: "64px",
            background: "rgba(196,106,58,0.08)",
          }}
        >
          <BookOpen size={28} style={{ color: "#c46a3a" }} />
        </div>
        <h2
          className="font-display font-normal tracking-tight mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#161616" }}
        >
          No books found
        </h2>
        <p
          className="font-ui text-[0.9375rem] mb-6 max-w-sm"
          style={{ color: "#6b6b6b" }}
        >
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 font-ui text-sm font-medium px-6 py-3 rounded-full transition-all duration-200"
          style={{ background: "#161616", color: "#fff" }}
        >
          View all books
        </Link>
      </div>
    );
  }

  return (
    <div className={`${gridClass[columns]} ${className ?? ""}`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
