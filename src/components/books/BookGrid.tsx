"use client";

import { motion } from "framer-motion";
import type { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import { cn } from "@/lib/utils";

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClass = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function BookGrid({ books, columns = 4, className }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <p className="heading-section mb-3">No books found</p>
        <p className="text-body max-w-sm mx-auto">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-5", colClass[columns], className)}>
      {books.map((book, i) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: Math.min(i * 0.06, 0.5),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <BookCard book={book} />
        </motion.div>
      ))}
    </div>
  );
}
