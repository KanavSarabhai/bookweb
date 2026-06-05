"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col bg-surface border border-border rounded-sm overflow-hidden transition-all duration-300 hover:border-gold-subtle/60 hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/books/${book.slug}`}
        className="block p-4 pb-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-muted"
      >
        <div className="flex justify-center">
          <BookCover book={book} size="md" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-3 gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="muted">{book.category}</Badge>
          {book.isBestseller && <Badge variant="gold">Bestseller</Badge>}
          {book.isNewArrival && <Badge variant="gold">New</Badge>}
        </div>

        <Link href={`/books/${book.slug}`} className="group/title">
          <h3 className="font-ui text-[0.9375rem] font-semibold leading-snug text-charcoal group-hover/title:text-brown transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>

        <p className="font-ui text-sm text-charcoal-muted line-clamp-1">{book.author}</p>
        <p className="font-ui text-xs text-charcoal-muted line-clamp-1">{book.publisher}</p>

        <Rating value={book.rating} reviewCount={book.reviewCount} />

        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-border/60">
          <div>
            <p className="font-ui text-base font-semibold text-brown tabular-nums">{formatPrice(book.price)}</p>
            <p className="font-ui text-xs text-charcoal-muted">
              {book.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 font-ui text-sm font-medium px-3 py-2 bg-brown text-ivory rounded-sm hover:bg-brown-light transition-colors duration-200"
            aria-label={`Add ${book.title} to cart`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ShoppingCart size={16} aria-hidden />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
