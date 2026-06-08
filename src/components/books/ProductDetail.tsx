"use client";

import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { ActionLink } from "@/components/ui/ActionLink";
import { formatPrice } from "@/lib/utils";

interface ProductDetailProps {
  book: Book;
  related: Book[];
}

export function ProductDetail({ book, related }: ProductDetailProps) {
  return (
    <div>
      <nav className="font-ui text-sm text-press-muted mb-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="text-brick hover:opacity-70 transition-opacity">
              Home
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-40" aria-hidden />
          <li>
            <Link href="/books" className="text-brick hover:opacity-70 transition-opacity">
              Books
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-40" aria-hidden />
          <li>
            <Link
              href={`/categories/${book.categorySlug}`}
              className="text-brick hover:opacity-70 transition-opacity"
            >
              {book.category}
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-40" aria-hidden />
          <li className="text-press truncate max-w-[200px] sm:max-w-none">{book.title}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16">
        <div className="card-editorial flex justify-center items-center">
          <BookCover book={book} size="xl" className="rounded-[12px]" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="muted">{book.category}</Badge>
            {book.isOnSale && <Badge variant="sale">Sale</Badge>}
            {book.isBestseller && <Badge>Bestseller</Badge>}
            {book.isNewArrival && <Badge>New</Badge>}
          </div>

          <h1 className="heading-page mb-3">{book.title}</h1>
          <p className="font-ui text-base text-press-muted mb-1">by {book.author}</p>
          <p className="font-ui text-sm text-press-muted mb-5">{book.publisher}</p>

          <Rating value={book.rating} reviewCount={book.reviewCount} size="md" className="mb-6" />

          <div className="flex items-baseline gap-3 mb-2">
            <p className="font-ui text-2xl font-semibold text-press tabular-nums">
              {formatPrice(book.price)}
            </p>
            {book.originalPrice && book.originalPrice > book.price && (
              <p className="font-ui text-lg text-press-muted line-through tabular-nums">
                {formatPrice(book.originalPrice)}
              </p>
            )}
          </div>
          <p className="font-ui text-sm text-press-muted mb-8">
            {book.inStock ? "In stock — ships in 1–2 days (India)" : "Out of stock"}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <ActionLink href="/cart">Buy now →</ActionLink>
            <ActionLink href="/cart">Add to cart →</ActionLink>
            <Link
              href="/wishlist"
              className="inline-flex items-center gap-2 font-ui text-sm text-brick border border-brick rounded-[3.75px] px-5 py-2.5 transition-opacity hover:opacity-70"
            >
              <Heart size={16} aria-hidden />
              Wishlist
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-4 card-editorial bg-soft-grey font-ui text-sm mb-10">
            {book.isbn && (
              <>
                <dt className="text-press-muted">ISBN</dt>
                <dd className="text-press">{book.isbn}</dd>
              </>
            )}
            <dt className="text-press-muted">Binding</dt>
            <dd className="text-press">{book.binding ?? "Paperback"}</dd>
            <dt className="text-press-muted">Language</dt>
            <dd className="text-press">{book.language ?? "English"}</dd>
            <dt className="text-press-muted">Publisher</dt>
            <dd className="text-press">{book.publisher}</dd>
            <dt className="text-press-muted">Category</dt>
            <dd>
              <Link
                href={`/categories/${book.categorySlug}`}
                className="text-brick hover:opacity-70 transition-opacity"
              >
                {book.category}
              </Link>
            </dd>
          </dl>

          {book.description && (
            <div>
              <h2 className="font-ui text-base font-semibold text-press mb-3">About this book</h2>
              <p className="text-body leading-relaxed">{book.description}</p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-brick/20" aria-labelledby="related-heading">
          <p className="section-label mb-4">Related</p>
          <hr className="hairline mb-8" />
          <h2 id="related-heading" className="heading-section mb-10">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((b) => (
              <Link
                key={b.id}
                href={`/books/${b.slug}`}
                className="card-editorial flex gap-4 transition-opacity hover:opacity-80"
              >
                <BookCover book={b} size="sm" className="rounded-[8px]" />
                <div className="min-w-0">
                  <p className="font-ui text-sm font-medium text-press line-clamp-2">{b.title}</p>
                  <p className="font-ui text-xs text-press-muted mt-1">{b.author}</p>
                  <p className="font-ui text-sm font-semibold text-press mt-2 tabular-nums">
                    {formatPrice(b.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
