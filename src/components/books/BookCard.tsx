"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
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
        "group flex flex-col card-editorial transition-opacity duration-200 hover:opacity-90",
        className
      )}
    >
      <Link
        href={`/books/${book.slug}`}
        className="flex justify-center mb-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
      >
        <BookCover book={book} size="md" className="rounded-[12px]" />
      </Link>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant="muted">{book.category}</Badge>
        {book.isOnSale && <Badge variant="sale">Sale</Badge>}
        {book.isBestseller && <Badge>Bestseller</Badge>}
        {book.isNewArrival && <Badge>New</Badge>}
      </div>

      <Link href={`/books/${book.slug}`} className="group/title mb-1">
        <h3 className="font-ui text-[0.9375rem] font-medium leading-snug text-press group-hover/title:opacity-70 transition-opacity line-clamp-2">
          {book.title}
        </h3>
      </Link>

      <p className="font-ui text-sm text-press-muted line-clamp-1 mb-0.5">{book.author}</p>
      <p className="font-ui text-xs text-press-muted/80 line-clamp-1 mb-3">{book.publisher}</p>

      <Rating value={book.rating} reviewCount={book.reviewCount} className="mb-4" />

      <div className="mt-auto pt-4 border-t border-brick/15">
        <div className="flex items-baseline gap-2 mb-4">
          <p className="font-ui text-base font-semibold text-press tabular-nums">
            {formatPrice(book.price)}
          </p>
          {book.originalPrice && book.originalPrice > book.price && (
            <p className="font-ui text-sm text-press-muted line-through tabular-nums">
              {formatPrice(book.originalPrice)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-1.5 font-ui text-xs font-medium border border-brick text-brick rounded-[3.75px] px-3 py-2.5 transition-opacity hover:opacity-70"
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCart size={14} aria-hidden />
            Add to cart
          </button>
          <button
            type="button"
            className="p-2.5 border border-brick text-brick rounded-[3.75px] transition-opacity hover:opacity-70"
            aria-label={`Add ${book.title} to wishlist`}
          >
            <Heart size={14} aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
