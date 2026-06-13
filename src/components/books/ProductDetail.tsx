"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight, ShoppingCart, Check, Zap } from "lucide-react";
import { useState, useCallback } from "react";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/ui/Toast";

interface ProductDetailProps {
  book: Book;
  related: Book[];
}

export function ProductDetail({ book, related }: ProductDetailProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const [addingToCart, setAddingToCart] = useState(false);

  const inCart = isInCart(book.id);
  const wished = isWishlisted(book.id);

  const handleAddToCart = useCallback(() => {
    if (addingToCart) return;
    setAddingToCart(true);
    addItem(book);
    showToast(`"${book.title.split(":")[0].trim()}" added to cart`, "cart");
    setTimeout(() => setAddingToCart(false), 1500);
  }, [addItem, addingToCart, book, showToast]);

  const handleBuyNow = useCallback(() => {
    addItem(book);
    router.push("/cart");
  }, [addItem, book, router]);

  const handleWishlist = useCallback(() => {
    toggleItem(book);
    showToast(
      wished ? "Removed from wishlist" : "Added to wishlist",
      "wishlist"
    );
  }, [toggleItem, wished, book, showToast]);

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-inter, system-ui, sans-serif)",
    fontSize: "0.9375rem",
    fontWeight: 500,
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  return (
    <div>
      <nav className="font-ui text-sm text-press-muted mb-6 sm:mb-8 overflow-hidden" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 whitespace-nowrap overflow-x-auto pb-2 scrollbar-none">
          <li>
            <Link href="/" className="text-brick hover:opacity-70 transition-opacity">Home</Link>
          </li>
          <ChevronRight size={14} className="opacity-40 shrink-0" aria-hidden />
          <li>
            <Link href="/books" className="text-brick hover:opacity-70 transition-opacity">Books</Link>
          </li>
          <ChevronRight size={14} className="opacity-40 shrink-0" aria-hidden />
          <li>
            <Link href={`/categories/${book.categorySlug}`} className="text-brick hover:opacity-70 transition-opacity">
              {book.category}
            </Link>
          </li>
          <ChevronRight size={14} className="opacity-40 shrink-0" aria-hidden />
          <li className="text-press truncate">{book.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,420px)_1fr] gap-8 sm:gap-10 lg:gap-16">
        <div className="flex justify-center items-start lg:sticky lg:top-[120px] w-full">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto">
            {/* Elegant Floating Shadow */}
            <div className="absolute inset-0 bg-black/20 blur-3xl rounded-full transform translate-y-12 scale-75 opacity-70 group-hover:opacity-100 group-hover:translate-y-16 transition-all duration-700 pointer-events-none"></div>
            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2 w-full">
              <BookCover book={book} size="xl" className="shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3),0_4px_12px_-4px_rgba(0,0,0,0.15)] mx-auto" />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 lg:mt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="muted">{book.category}</Badge>
            {book.isOnSale && <Badge variant="sale">Sale</Badge>}
            {book.isBestseller && <Badge>Bestseller</Badge>}
            {book.isNewArrival && <Badge>New</Badge>}
          </div>

          <h1 className="heading-page mb-2 sm:mb-3 text-[1.75rem] sm:text-4xl lg:text-[2.5rem] leading-[1.15]">{book.title}</h1>
          <p className="font-ui text-[1rem] sm:text-base text-press-muted mb-1">by {book.author}</p>
          <p className="font-ui text-[0.875rem] text-press-muted mb-6">{book.publisher}</p>

          <Rating value={book.rating} reviewCount={book.reviewCount} size="md" className="mb-6 sm:mb-8" />

          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <p className="font-ui text-2xl sm:text-3xl font-semibold text-press tabular-nums">
              {formatPrice(book.price)}
            </p>
            {book.originalPrice && book.originalPrice > book.price && (
              <p className="font-ui text-[1.125rem] sm:text-lg text-press-muted line-through tabular-nums">
                {formatPrice(book.originalPrice)}
              </p>
            )}
          </div>
          <p className="font-ui text-sm text-[#16a34a] font-medium mb-8">
            {book.inStock ? "In stock — ships in 1–2 days (India)" : "Out of stock"}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full">
            {/* Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full sm:w-auto justify-center"
              style={{
                ...btnBase,
                background: "#c46a3a",
                color: "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#a8582e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c46a3a")}
              aria-label={`Buy ${book.title} now`}
            >
              <Zap size={16} aria-hidden />
              Buy now
            </button>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full sm:w-auto justify-center"
              style={{
                ...btnBase,
                background: addingToCart
                  ? "rgba(196,106,58,0.12)"
                  : inCart
                  ? "#f5f0e8"
                  : "#161616",
                color: addingToCart || inCart ? "#c46a3a" : "#fff",
                border: inCart ? "1px solid rgba(196,106,58,0.3)" : "none",
                opacity: addingToCart ? 0.85 : 1,
              }}
              aria-label={inCart ? "Already in cart" : `Add ${book.title} to cart`}
            >
              {addingToCart ? (
                <Check size={16} aria-hidden />
              ) : (
                <ShoppingCart size={16} aria-hidden />
              )}
              {addingToCart ? "Added!" : inCart ? "In cart" : "Add to cart"}
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-ui text-[0.9375rem] font-medium rounded-[6px] px-6 py-3 transition-all duration-200"
              style={{
                border: wished
                  ? "1px solid rgba(196,106,58,0.5)"
                  : "1px solid var(--brick, #c46a3a)",
                color: "#c46a3a",
                background: wished ? "rgba(196,106,58,0.08)" : "transparent",
              }}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
            >
              <Heart
                size={16}
                aria-hidden
                fill={wished ? "#c46a3a" : "none"}
                style={{ color: "#c46a3a" }}
              />
              {wished ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 bg-[#F8F5F0] rounded-2xl p-6 font-ui text-[0.9375rem] mb-12 border border-[#E7E1D8]">
            {book.isbn && (
              <>
                <dt className="text-[#9a9a9a] font-medium">ISBN</dt>
                <dd className="text-[#161616] font-semibold">{book.isbn}</dd>
              </>
            )}
            <dt className="text-[#9a9a9a] font-medium">Binding</dt>
            <dd className="text-[#161616] font-semibold">{book.binding ?? "Paperback"}</dd>
            <dt className="text-[#9a9a9a] font-medium">Language</dt>
            <dd className="text-[#161616] font-semibold">{book.language ?? "English"}</dd>
            <dt className="text-[#9a9a9a] font-medium">Publisher</dt>
            <dd className="text-[#161616] font-semibold">{book.publisher}</dd>
            <dt className="text-[#9a9a9a] font-medium">Category</dt>
            <dd>
              <Link
                href={`/categories/${book.categorySlug}`}
                className="text-[#c46a3a] font-semibold hover:opacity-70 transition-opacity"
              >
                {book.category}
              </Link>
            </dd>
          </dl>

          {book.description && (
            <div className="prose prose-press max-w-none">
              <h2 className="font-display text-[1.5rem] tracking-tight text-[#161616] mb-4">About this book</h2>
              <p className="font-ui text-[1.0625rem] leading-[1.7] text-[#6b6b6b] whitespace-pre-wrap">{book.description}</p>
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
