"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Share2, ChevronRight } from "lucide-react";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

interface ProductDetailProps {
  book: Book;
  related: Book[];
}

export function ProductDetail({ book, related }: ProductDetailProps) {
  return (
    <div>
      <nav className="font-ui text-sm text-charcoal-muted mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-brown transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-50" aria-hidden />
          <li>
            <Link href="/books" className="hover:text-brown transition-colors">
              Books
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-50" aria-hidden />
          <li>
            <Link
              href={`/categories/${book.categorySlug}`}
              className="hover:text-brown transition-colors"
            >
              {book.category}
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-50" aria-hidden />
          <li className="text-brown truncate max-w-[200px] sm:max-w-none">{book.title}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <BookCover book={book} size="xl" className="shadow-lg" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge>{book.category}</Badge>
            {book.isBestseller && <Badge variant="gold">Bestseller</Badge>}
            {book.isNewArrival && <Badge variant="gold">New Arrival</Badge>}
          </div>

          <h1 className="heading-page mb-2">{book.title}</h1>
          <p className="font-ui text-base text-charcoal-muted mb-1">by {book.author}</p>
          <p className="font-ui text-sm text-charcoal-muted mb-4">{book.publisher}</p>

          <Rating value={book.rating} reviewCount={book.reviewCount} size="md" className="mb-6" />

          <p className="font-ui text-2xl font-semibold text-brown tabular-nums mb-1">{formatPrice(book.price)}</p>
          <p className="font-ui text-sm text-charcoal-muted mb-6">
            {book.inStock ? (
              <span className="text-green-800">● In stock — ships in 1–2 days (India)</span>
            ) : (
              <span className="text-red-800">Out of stock</span>
            )}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button size="lg" className="gap-2">
              <ShoppingCart size={18} aria-hidden />
              Buy now
            </Button>
            <Button variant="secondary" size="lg">
              Add to cart
            </Button>
            <button
              type="button"
              className="inline-flex items-center gap-2 font-ui text-sm px-4 py-3 border border-border rounded-sm hover:bg-cream transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} aria-hidden />
              Wishlist
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 font-ui text-sm px-4 py-3 border border-border rounded-sm hover:bg-cream transition-colors"
              aria-label="Share"
            >
              <Share2 size={18} aria-hidden />
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-4 p-5 bg-cream border border-border rounded-sm font-ui text-sm mb-8">
            {book.isbn && (
              <>
                <dt className="text-charcoal-muted">ISBN</dt>
                <dd className="text-charcoal">{book.isbn}</dd>
              </>
            )}
            <dt className="text-charcoal-muted">Binding</dt>
            <dd className="text-charcoal">{book.binding ?? "Paperback"}</dd>
            <dt className="text-charcoal-muted">Language</dt>
            <dd className="text-charcoal">{book.language ?? "English"}</dd>
            <dt className="text-charcoal-muted">Publisher</dt>
            <dd className="text-charcoal">{book.publisher}</dd>
            <dt className="text-charcoal-muted">Category</dt>
            <dd>
              <Link
                href={`/categories/${book.categorySlug}`}
                className="text-gold hover:text-brown transition-colors"
              >
                {book.category}
              </Link>
            </dd>
          </dl>

          {book.description && (
            <div>
              <h2 className="font-ui text-lg font-semibold text-brown mb-3">About this book</h2>
              <p className="text-body leading-relaxed">{book.description}</p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border" aria-labelledby="related-heading">
          <h2 id="related-heading" className="heading-section mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((b) => (
              <Link
                key={b.id}
                href={`/books/${b.slug}`}
                className="flex gap-4 p-4 bg-surface border border-border rounded-sm hover:border-gold-subtle/50 hover:shadow-sm transition-all"
              >
                <BookCover book={b} size="sm" />
                <div className="min-w-0">
                  <p className="font-ui text-sm font-semibold text-charcoal line-clamp-2">{b.title}</p>
                  <p className="font-ui text-xs text-charcoal-muted mt-1">{b.author}</p>
                  <p className="font-ui text-sm font-semibold text-brown mt-2">
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
