import type { Book } from "@/types/book";
import { BookGrid } from "@/components/books/BookGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface BookSectionProps {
  id: string;
  label: string;
  title: string;
  books: Book[];
  viewAllHref: string;
  viewAllLabel?: string;
  className?: string;
}

export function BookSection({
  id,
  label,
  title,
  books,
  viewAllHref,
  viewAllLabel,
  className,
}: BookSectionProps) {
  return (
    <section
      id={id}
      className={className ?? "py-14 lg:py-24 bg-cream"}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={label}
          title={title}
          viewAllHref={viewAllHref}
          viewAllLabel={viewAllLabel}
          id={`${id}-heading`}
        />
        <BookGrid books={books} />
      </div>
    </section>
  );
}
