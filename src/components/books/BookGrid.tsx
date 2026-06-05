import type { Book } from "@/types/book";
import { BookCard } from "@/components/books/BookCard";
import { cn } from "@/lib/utils";

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function BookGrid({ books, columns = 4, className }: BookGridProps) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="heading-section mb-2">No books found</p>
        <p className="text-body">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-5", colClass[columns], className)}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
