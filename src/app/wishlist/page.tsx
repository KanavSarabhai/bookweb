"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, BookHeart, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import type { Book } from "@/types/book";

function WishlistBookCard({ book }: { book: Book }) {
  const { removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const inCart = isInCart(book.id);

  function handleAddToCart() {
    if (adding) return;
    setAdding(true);
    addItem(book);
    showToast(`"${book.title.split(":")[0].trim()}" added to cart`, "cart");
    setTimeout(() => setAdding(false), 1500);
  }

  function handleRemove() {
    removeItem(book.id);
    showToast("Removed from wishlist", "info");
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f0ece6",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.09)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Cover */}
      <Link
        href={`/books/${book.slug}`}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 24px 16px",
          background: "#faf8f5",
          minHeight: "200px",
        }}
      >
        {book.coverUrl ? (
          <div style={{ position: "relative", width: 110, height: 160 }}>
            <Image
              src={book.coverUrl}
              alt={`${book.title} cover`}
              fill
              sizes="130px"
              className="object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.16)]"
              quality={85}
            />
          </div>
        ) : (
          <div
            style={{
              width: 110,
              height: 160,
              background: book.coverColor ?? "#2a2a2a",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "12px",
            }}
          >
            <span style={{ color: book.coverAccent ?? "#fff", fontSize: "0.45rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.6 }}>
              Technical
            </span>
            <p style={{ color: book.coverAccent ?? "#fff", fontSize: "0.55rem", fontWeight: 600, lineHeight: 1.4 }}>
              {book.title.split(" ").slice(0, 4).join(" ")}
            </p>
          </div>
        )}

        {/* Remove from wishlist */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); handleRemove(); }}
          aria-label="Remove from wishlist"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(196,106,58,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(196,106,58,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
          }}
        >
          <Heart size={14} fill="#c46a3a" strokeWidth={1.8} style={{ color: "#c46a3a" }} />
        </button>
      </Link>

      {/* Info */}
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#c46a3a", marginBottom: "6px", fontFamily: "var(--font-inter)" }}>
          {book.category}
        </p>
        <Link href={`/books/${book.slug}`}>
          <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#161616", lineHeight: 1.35, marginBottom: "4px", fontFamily: "var(--font-inter)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {book.title}
          </p>
        </Link>
        <p style={{ fontSize: "0.8125rem", color: "#9a9a9a", marginBottom: "16px", fontFamily: "var(--font-inter)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {book.author}
        </p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#161616", fontFamily: "var(--font-inter)", fontVariantNumeric: "tabular-nums" }}>
            {formatPrice(book.price)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: "50px",
              border: "none",
              cursor: adding ? "default" : "pointer",
              background: adding ? "rgba(196,106,58,0.14)" : inCart ? "rgba(196,106,58,0.1)" : "#161616",
              color: adding || inCart ? "#c46a3a" : "#fff",
              transition: "all 0.2s ease",
              fontFamily: "var(--font-inter)",
              opacity: adding ? 0.85 : 1,
            }}
            aria-label={inCart ? "Already in cart" : `Add ${book.title} to cart`}
          >
            {adding ? <Check size={12} aria-hidden /> : <ShoppingCart size={12} aria-hidden />}
            {adding ? "Added!" : inCart ? "In cart" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { items, toggleItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const { showToast } = useToast();

  function handleAddAllToCart() {
    const notInCart = items.filter((b) => !isInCart(b.id));
    notInCart.forEach((b) => addItem(b));
    if (notInCart.length > 0) {
      showToast(`${notInCart.length} book${notInCart.length > 1 ? "s" : ""} added to cart`, "cart");
    } else {
      showToast("All items are already in your cart", "info");
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
        <div
          style={{
            background: "linear-gradient(160deg, #f8f5f0 0%, #f2ece2 100%)",
            borderBottom: "1px solid var(--border)",
            paddingTop: "80px",
            paddingBottom: "52px",
          }}
        >
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <p className="eyebrow mb-4">Saved titles</p>
            <h1
              className="font-display font-normal tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "var(--ink)" }}
            >
              Wishlist
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-20">
          <div className="text-center max-w-md mx-auto">
            <div
              className="inline-flex items-center justify-center size-20 rounded-full mb-8"
              style={{ background: "rgba(196,106,58,0.08)" }}
            >
              <BookHeart size={36} style={{ color: "#c46a3a" }} strokeWidth={1.4} />
            </div>
            <h2
              className="font-display font-normal tracking-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--ink)" }}
            >
              Your wishlist is empty
            </h2>
            <p className="font-ui text-[0.9375rem] leading-relaxed mb-8" style={{ color: "var(--ink-muted)" }}>
              Save books you&apos;re interested in to revisit them later. Click the{" "}
              <Heart size={14} style={{ display: "inline", color: "#c46a3a" }} fill="#c46a3a" /> icon on any book to add it here.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 font-ui text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200"
              style={{ background: "#161616", color: "#fff" }}
            >
              Browse books
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #f8f5f0 0%, #f2ece2 100%)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "80px",
          paddingBottom: "52px",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="eyebrow mb-4">Saved titles</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1
              className="font-display font-normal tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "var(--ink)" }}
            >
              Wishlist
              <span
                className="font-ui text-[1.2rem] font-normal ml-4 align-middle"
                style={{ color: "var(--ink-muted)" }}
              >
                ({items.length} {items.length === 1 ? "book" : "books"})
              </span>
            </h1>

            <button
              type="button"
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 font-ui text-sm font-medium px-6 py-3 rounded-full transition-all duration-200 shrink-0"
              style={{ background: "#c46a3a", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#a8582e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c46a3a")}
            >
              <ShoppingCart size={16} aria-hidden />
              Add all to cart
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((book) => (
            <WishlistBookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
