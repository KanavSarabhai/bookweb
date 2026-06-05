import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Book } from "@/types/book";
import { BookGrid } from "@/components/books/BookGrid";

interface BookSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  books: Book[];
  viewAllHref: string;
  variant?: "default" | "cream";
}

export function BookSection({
  id,
  title,
  subtitle,
  books,
  viewAllHref,
  variant = "default",
}: BookSectionProps) {
  return (
    <section
      id={id}
      className={variant === "cream" ? "bg-cream border-y border-border py-14 lg:py-20" : "py-14 lg:py-20"}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {subtitle && <p className="text-eyebrow mb-2">{subtitle}</p>}
            <h2 id={`${id}-heading`} className="heading-section">
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="font-ui text-sm font-medium text-gold hover:text-brown flex items-center gap-1 transition-colors shrink-0"
          >
            View all
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <BookGrid books={books} />
      </div>
    </section>
  );
}
