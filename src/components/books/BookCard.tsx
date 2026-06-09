"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Book } from "@/types/book";
import { formatPrice, cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const hasCover = !!book.coverUrl;
  const discount =
    book.originalPrice && book.originalPrice > book.price
      ? Math.round((1 - book.price / book.originalPrice) * 100)
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article
      className={cn("group flex flex-col", className)}
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #f0ece6",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Cover area */}
      <Link
        href={`/books/${book.slug}`}
        className="relative flex items-center justify-center p-6 pb-4"
        style={{ background: "#faf8f5", minHeight: "220px" }}
        tabIndex={0}
      >
        {hasCover ? (
          <div className="relative" style={{ width: 130, height: 192 }}>
            <Image
              src={book.coverUrl!}
              alt={`${book.title} cover`}
              fill
              sizes="160px"
              className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
              quality={90}
            />
          </div>
        ) : (
          /* Fallback illustrated cover */
          <div
            className="flex flex-col justify-between p-4 rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            style={{
              width: 130,
              height: 192,
              background: book.coverColor ?? "#2a2a2a",
            }}
          >
            <span
              className="font-ui text-[0.5rem] font-semibold uppercase tracking-widest opacity-60"
              style={{ color: book.coverAccent ?? "#fff" }}
            >
              Technical
            </span>
            <div>
              <p
                className="font-ui text-[0.625rem] font-semibold leading-snug"
                style={{ color: book.coverAccent ?? "#fff" }}
              >
                {book.title.split(" ").slice(0, 4).join(" ")}
              </p>
              <p
                className="font-ui mt-1.5 text-[0.55rem] opacity-50"
                style={{ color: book.coverAccent ?? "#fff" }}
              >
                {book.author.split(",")[0]}
              </p>
            </div>
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.preventDefault(); setWished(!wished); }}
          className="absolute top-4 right-4 flex items-center justify-center size-8 rounded-full transition-all duration-200"
          style={{
            background: wished ? "rgba(196,106,58,0.12)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Heart
            size={14}
            strokeWidth={1.8}
            style={{ color: wished ? "#c46a3a" : "#9a9a9a" }}
            fill={wished ? "#c46a3a" : "none"}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {discount && (
            <span
              className="font-ui text-[0.6rem] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#c46a3a", color: "#fff" }}
            >
              −{discount}%
            </span>
          )}
          {book.isNewArrival && (
            <span
              className="font-ui text-[0.6rem] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#161616", color: "#fff" }}
            >
              New
            </span>
          )}
          {book.isBestseller && (
            <span
              className="font-ui text-[0.6rem] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(196,106,58,0.14)", color: "#c46a3a" }}
            >
              Bestseller
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 px-5 pt-3 pb-5">
        {/* Category tag */}
        <p
          className="font-ui text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-2"
          style={{ color: "#c46a3a" }}
        >
          {book.category}
        </p>

        {/* Title */}
        <Link href={`/books/${book.slug}`} className="mb-1 group/title">
          <h3
            className="font-ui text-[0.9375rem] font-medium leading-snug line-clamp-2 transition-colors duration-200"
            style={{ color: "#161616" }}
          >
            {book.title}
          </h3>
        </Link>

        <p className="font-ui text-[0.8125rem] line-clamp-1 mb-4" style={{ color: "#9a9a9a" }}>
          {book.author}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-ui text-[0.9375rem] font-semibold tabular-nums" style={{ color: "#161616" }}>
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="font-ui text-[0.8125rem] line-through tabular-nums" style={{ color: "#c8bfb2" }}>
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
            className="inline-flex items-center gap-1.5 font-ui text-[0.75rem] font-medium px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: added ? "rgba(196,106,58,0.14)" : "#161616",
              color: added ? "#c46a3a" : "#fff",
            }}
          >
            <ShoppingCart size={12} aria-hidden />
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
