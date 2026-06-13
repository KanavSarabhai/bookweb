"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalCount, totalPrice } = useCart();
  const { showToast } = useToast();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  function handleRemove(bookId: string, title: string) {
    removeItem(bookId);
    showToast(`"${title}" removed from cart`, "info");
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
            <p className="eyebrow mb-4">Your order</p>
            <h1
              className="font-display font-normal tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "var(--ink)" }}
            >
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-20">
          <div className="text-center max-w-md mx-auto">
            <div
              className="inline-flex items-center justify-center size-20 rounded-full mb-8"
              style={{ background: "rgba(196,106,58,0.08)" }}
            >
              <ShoppingBag size={36} style={{ color: "#c46a3a" }} strokeWidth={1.4} />
            </div>
            <h2
              className="font-display font-normal tracking-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--ink)" }}
            >
              Your cart is empty
            </h2>
            <p className="font-ui text-[0.9375rem] leading-relaxed mb-8" style={{ color: "var(--ink-muted)" }}>
              You haven&apos;t added any books yet. Browse our catalogue and find your next read.
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
          <p className="eyebrow mb-4">Your order</p>
          <h1
            className="font-display font-normal tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "var(--ink)" }}
          >
            Shopping Cart
            <span
              className="font-ui text-[1.2rem] font-normal ml-4 align-middle"
              style={{ color: "var(--ink-muted)" }}
            >
              ({totalCount} {totalCount === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-start">

          {/* Items list */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p
                className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#9a9a9a" }}
              >
                {totalCount} {totalCount === 1 ? "item" : "items"} in your cart
              </p>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  showToast("Cart cleared", "info");
                }}
                className="font-ui text-[0.75rem] font-medium transition-opacity hover:opacity-70"
                style={{ color: "#c46a3a" }}
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4">
              {items.map(({ book, quantity }) => (
                <div
                  key={book.id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #f0ece6",
                    padding: "20px",
                    display: "flex",
                    gap: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Cover */}
                  <Link
                    href={`/books/${book.slug}`}
                    className="shrink-0"
                    style={{ width: 72, height: 100, position: "relative", borderRadius: "6px", overflow: "hidden", background: "#faf8f5" }}
                  >
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={`${book.title} cover`}
                        fill
                        sizes="80px"
                        className="object-contain"
                        quality={85}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: book.coverColor ?? "#2a2a2a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: book.coverAccent ?? "#fff", fontSize: "0.5rem", fontWeight: 700, textAlign: "center", padding: "4px" }}>
                          {book.title.split(" ").slice(0, 3).join(" ")}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p
                          className="font-ui text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-1"
                          style={{ color: "#c46a3a" }}
                        >
                          {book.category}
                        </p>
                        <Link href={`/books/${book.slug}`}>
                          <p
                            className="font-ui text-[0.9375rem] font-medium leading-snug line-clamp-2 transition-opacity hover:opacity-70"
                            style={{ color: "#161616" }}
                          >
                            {book.title}
                          </p>
                        </Link>
                        <p className="font-ui text-[0.8125rem] mt-1" style={{ color: "#9a9a9a" }}>
                          {book.author}
                        </p>
                        <p className="font-ui text-[0.75rem] mt-0.5" style={{ color: "#b0a898" }}>
                          {book.publisher}
                        </p>
                      </div>
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => handleRemove(book.id, book.title.split(":")[0].trim())}
                        aria-label={`Remove ${book.title} from cart`}
                        className="shrink-0 flex items-center justify-center size-8 rounded-full transition-all duration-200 hover:bg-red-50"
                        style={{ color: "#c8bfb2" }}
                      >
                        <Trash2 size={15} strokeWidth={1.6} />
                      </button>
                    </div>

                    {/* Qty + Price row */}
                    <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #f0ece6" }}>
                      {/* Quantity controls */}
                      <div
                        className="inline-flex items-center"
                        style={{
                          border: "1px solid #e7e1d8",
                          borderRadius: "50px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex items-center justify-center w-8 h-8 transition-colors hover:bg-gray-50"
                          style={{ color: "#6b6b6b" }}
                        >
                          <Minus size={13} strokeWidth={2} />
                        </button>
                        <span
                          className="font-ui text-sm font-medium tabular-nums"
                          style={{ minWidth: "32px", textAlign: "center", color: "#161616" }}
                          aria-label={`Quantity: ${quantity}`}
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(book.id, quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex items-center justify-center w-8 h-8 transition-colors hover:bg-gray-50"
                          style={{ color: "#6b6b6b" }}
                        >
                          <Plus size={13} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <p
                          className="font-ui text-[0.9375rem] font-semibold tabular-nums"
                          style={{ color: "#161616" }}
                        >
                          {formatPrice(book.price * quantity)}
                        </p>
                        {quantity > 1 && (
                          <p className="font-ui text-[0.75rem] tabular-nums" style={{ color: "#9a9a9a" }}>
                            {formatPrice(book.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 font-ui text-sm transition-opacity hover:opacity-70"
                style={{ color: "#c46a3a" }}
              >
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div
            className="sticky top-24"
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #f0ece6",
              padding: "28px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06)",
            }}
          >
            <p
              className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.18em] mb-6"
              style={{ color: "#9a9a9a" }}
            >
              Order summary
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between font-ui text-sm">
                <span style={{ color: "var(--ink-muted)" }}>
                  Subtotal ({totalCount} {totalCount === 1 ? "item" : "items"})
                </span>
                <span className="tabular-nums font-medium" style={{ color: "var(--ink)" }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between font-ui text-sm">
                <span style={{ color: "var(--ink-muted)" }}>Shipping</span>
                <span style={{ color: "#16a34a", fontWeight: 500 }}>Calculated at checkout</span>
              </div>
            </div>

            <div
              className="flex justify-between font-ui text-base font-semibold py-4 mb-6"
              style={{ borderTop: "1px solid #f0ece6", borderBottom: "1px solid #f0ece6" }}
            >
              <span style={{ color: "var(--ink)" }}>Total</span>
              <span className="tabular-nums" style={{ color: "var(--ink)" }}>
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowCheckoutModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 font-ui text-[0.9375rem] font-medium py-4 rounded-full transition-all duration-200"
              style={{ background: "#c46a3a", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#a8582e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c46a3a")}
              aria-label="Proceed to checkout"
            >
              <Package size={18} aria-hidden />
              Proceed to checkout
            </button>

            <p
              className="font-ui text-[0.75rem] text-center mt-4 leading-relaxed"
              style={{ color: "#9a9a9a" }}
            >
              Secure checkout · All India delivery · GST invoice available
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl relative" style={{ transform: "translateY(0) scale(1)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <button
              type="button"
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-2 text-[#9a9a9a] hover:text-[#161616] hover:bg-black/5 rounded-full transition-colors"
              aria-label="Close"
            >
              <Trash2 size={20} strokeWidth={2} className="hidden" /> {/* Using a text 'X' or Lucide X if imported */}
              <span style={{ fontSize: "20px", fontWeight: "bold", lineHeight: 1 }}>×</span>
            </button>
            <div className="w-16 h-16 bg-[#F8F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={28} className="text-[#c46a3a]" />
            </div>
            <h3 className="font-display text-2xl text-[#161616] mb-3">Checkout Coming Soon</h3>
            <p className="font-ui text-[0.9375rem] text-[#6b6b6b] mb-8 leading-relaxed">
              We are currently upgrading our secure checkout system. Please check back later to complete your purchase.
            </p>
            <button
              type="button"
              onClick={() => setShowCheckoutModal(false)}
              className="w-full py-3.5 bg-[#161616] text-white font-ui font-medium rounded-full hover:bg-black/80 transition-colors"
            >
              Okay, got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
