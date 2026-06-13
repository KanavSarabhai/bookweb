"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState, useCallback } from "react";
import type { Book } from "@/types/book";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/ui/Toast";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const [addingToCart, setAddingToCart] = useState(false);

  const wished = isWishlisted(book.id);
  const inCart = isInCart(book.id);

  const hasCover = !!book.coverUrl;
  const discount =
    book.originalPrice && book.originalPrice > book.price
      ? Math.round((1 - book.price / book.originalPrice) * 100)
      : null;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (addingToCart) return;
      setAddingToCart(true);
      addItem(book);
      showToast(`"${book.title.split(":")[0].trim()}" added to cart`, "cart");
      setTimeout(() => setAddingToCart(false), 1500);
    },
    [addItem, addingToCart, book, showToast]
  );

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleItem(book);
      showToast(
        wished ? `Removed from wishlist` : `Added to wishlist`,
        "wishlist"
      );
    },
    [toggleItem, wished, book, showToast]
  );

  return (
    <article
      className={cn("flex flex-col", className)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f0ece6",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── Cover area ── */}
      <div
        className="relative"
        style={{
          background: "#faf8f5",
          height: "240px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/books/${book.slug}`}
          aria-label={`View ${book.title}`}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: "24px" }}
        >
          {hasCover ? (
            <Image
              src={book.coverUrl!}
              alt={`${book.title} cover`}
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 32px), 220px"
              className="object-contain"
              style={{ padding: "20px" }}
              quality={75}
            />
          ) : (
            /* Fallback illustrated cover */
            <div
              style={{
                width: "120px",
                height: "180px",
                background: book.coverColor ?? "#2a2a2a",
                borderRadius: "6px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter, system-ui, sans-serif)",
                  fontSize: "0.5rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  opacity: 0.6,
                  color: book.coverAccent ?? "#fff",
                }}
              >
                Technical
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter, system-ui, sans-serif)",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: book.coverAccent ?? "#fff",
                  }}
                >
                  {book.title.split(" ").slice(0, 5).join(" ")}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter, system-ui, sans-serif)",
                    fontSize: "0.55rem",
                    opacity: 0.5,
                    marginTop: "6px",
                    color: book.coverAccent ?? "#fff",
                  }}
                >
                  {book.author.split(",")[0]}
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* ── Info block ── */}
      <div
        style={{
          padding: "16px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "8px",
        }}
      >
        {/* Badges & Category */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
          <span
            style={{
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c46a3a",
            }}
          >
            {book.category}
          </span>
          {discount && (
            <span
              style={{
                fontFamily: "var(--font-inter, system-ui, sans-serif)",
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "999px",
                background: "#c46a3a",
                color: "#fff",
                display: "inline-block",
              }}
            >
              −{discount}%
            </span>
          )}
          {book.isNewArrival && (
            <span
              style={{
                fontFamily: "var(--font-inter, system-ui, sans-serif)",
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "999px",
                background: "#161616",
                color: "#fff",
                display: "inline-block",
              }}
            >
              New
            </span>
          )}
          {book.isBestseller && (
            <span
              style={{
                fontFamily: "var(--font-inter, system-ui, sans-serif)",
                fontSize: "0.6rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "999px",
                background: "rgba(196,106,58,0.14)",
                color: "#c46a3a",
                display: "inline-block",
              }}
            >
              Bestseller
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/books/${book.slug}`} tabIndex={-1} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "#161616",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              margin: 0,
            }}
          >
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        <p
          style={{
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
            fontSize: "0.8125rem",
            color: "#9a9a9a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "8px",
          }}
        >
          {book.author}
        </p>

        {/* Price + CTA — always at bottom */}
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-2 pt-2">
          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontFamily: "var(--font-inter, system-ui, sans-serif)",
                fontSize: "1rem",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: "#161616",
              }}
            >
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span
                style={{
                  fontFamily: "var(--font-inter, system-ui, sans-serif)",
                  fontSize: "0.8125rem",
                  textDecoration: "line-through",
                  fontVariantNumeric: "tabular-nums",
                  color: "#c8bfb2",
                }}
              >
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={`Add ${book.title} to cart`}
              disabled={addingToCart}
              className="flex-1 sm:flex-none"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                fontFamily: "var(--font-inter, system-ui, sans-serif)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                padding: "10px 16px",
                borderRadius: "999px",
                border: "none",
                cursor: addingToCart ? "default" : "pointer",
                transition: "all 0.2s ease",
                background: addingToCart
                  ? "rgba(196,106,58,0.14)"
                  : inCart
                  ? "rgba(196,106,58,0.10)"
                  : "#161616",
                color: addingToCart || inCart ? "#c46a3a" : "#fff",
                opacity: addingToCart ? 0.8 : 1,
              }}
            >
              {addingToCart ? (
                <Check size={14} aria-hidden />
              ) : (
                <ShoppingCart size={14} aria-hidden />
              )}
              {addingToCart ? "Added!" : inCart ? "In cart" : "Add"}
            </button>
            <button
              type="button"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlist}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: wished ? "rgba(196,106,58,0.15)" : "#f8f5f0",
                border: wished ? "1px solid rgba(196,106,58,0.3)" : "1px solid #e7e1d8",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              <Heart
                size={16}
                strokeWidth={1.8}
                style={{ color: wished ? "#c46a3a" : "#161616" }}
                fill={wished ? "#c46a3a" : "none"}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
