"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart, Search, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { MobileSearchOverlay } from "@/components/search/MobileSearchOverlay";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const mainNav = [
  { label: "Browse Books", href: "/books" },
  { label: "Categories", href: "/categories" },
  { label: "Bestsellers", href: "/books?sort=bestsellers" },
  { label: "New Arrivals", href: "/books?sort=new" },
  { label: "Sale", href: "/books?sort=sale" },
  { label: "Contact", href: "/contact" },
];

function CountBadge({ count, isMobile = false }: { count: number; isMobile?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || count === 0) return null;
  return (
    <span
      className={cn(
        "absolute flex items-center justify-center rounded-full text-white font-bold pointer-events-none",
        isMobile ? "-top-1 -right-1 min-w-[20px] h-[20px] text-[0.7rem]" : "-top-2 -right-2 min-w-[18px] h-[18px] text-[0.65rem]"
      )}
      style={{
        background: "#c46a3a",
        padding: "0 4px",
        lineHeight: 1,
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
      }}
      aria-hidden
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const headerBg = isHome
    ? scrolled
      ? "bg-[#F8F5F0]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      : "bg-transparent"
    : "bg-[#F8F5F0]/95 backdrop-blur-xl border-b border-[#E7E1D8]";

  const navIcons = [
    { path: "account", label: "Account", Icon: User, count: 0, hideOnMobile: true },
    { path: "wishlist", label: "Wishlist", Icon: Heart, count: wishlistCount, hideOnMobile: true },
    { path: "cart", label: "Shopping cart", Icon: ShoppingCart, count: cartCount, hideOnMobile: false },
  ];

  return (
    <>
      <header
        className={cn(
          "z-[90] w-full transition-all duration-300",
          isHome ? "fixed top-0 left-0 right-0" : "sticky top-0",
          headerBg
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 h-[64px] lg:h-[76px] flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="shrink-0 group focus-visible:outline-none flex items-baseline py-2"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Shroff Publishers Home"
          >
            <span
              className="font-display text-[1.25rem] lg:text-[1.15rem] tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-70"
              style={{ color: "var(--ink)" }}
            >
              Shroff
            </span>
            <span
              className="hidden sm:inline font-ui text-[0.65rem] font-medium uppercase tracking-[0.12em] ml-2 opacity-50"
              style={{ color: "var(--ink)" }}
            >
              Publishers
            </span>
          </Link>

          {/* Center: Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8 whitespace-nowrap flex-1 justify-center px-4"
            aria-label="Main navigation"
          >
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "?");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center font-ui text-[0.875rem] py-2 transition-all duration-200",
                    active ? "font-medium" : "hover:opacity-70"
                  )}
                  style={{ color: active ? "var(--copper)" : "var(--ink)" }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "var(--copper)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-2 lg:gap-5 shrink-0">
            {/* Desktop Search (Hidden below xl) */}
            <div className="hidden xl:block w-[280px]">
              <SearchBar variant="header" showCategoryFilter={false} placeholder="Search books..." />
            </div>

            {/* Search Icon for Mobile/Tablet */}
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center transition-all duration-200 hover:opacity-70 relative p-2.5 min-w-[44px] min-h-[44px]"
              style={{ color: "var(--ink)" }}
              aria-label="Search books"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search size={24} strokeWidth={1.5} />
            </button>

            {/* User Icons */}
            {navIcons.map(({ path, label, Icon, count, hideOnMobile }) => (
              <Link
                key={path}
                href={`/${path}`}
                aria-label={`${label}${count > 0 ? ` (${count} items)` : ""}`}
                className={cn(
                  "relative inline-flex items-center justify-center transition-all duration-200 hover:opacity-70 p-2.5 min-w-[44px] min-h-[44px]",
                  hideOnMobile ? "hidden lg:flex" : "flex"
                )}
                style={{ color: "var(--ink)" }}
              >
                <Icon size={24} strokeWidth={1.5} />
                <CountBadge count={count} isMobile={!hideOnMobile} />
              </Link>
            ))}

            {/* Hamburger Menu (Hidden above lg) */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center transition-all duration-200 hover:opacity-70 relative p-2.5 min-w-[44px] min-h-[44px]"
              style={{ color: "var(--ink)" }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-[85] bg-[#F8F5F0] lg:hidden flex flex-col animate-fade-in overflow-y-auto overscroll-contain">
          <nav className="flex-1 px-5 py-6 space-y-1" aria-label="Mobile navigation">
            <div className="space-y-1 pb-6 border-b border-[#E7E1D8]/60">
              {mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "?");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between font-ui text-[1.125rem] px-4 py-3.5 rounded-xl transition-colors active:bg-[#E7E1D8]/40",
                      active ? "font-semibold text-[#C46A3A] bg-[#C46A3A]/[0.04]" : "text-[#161616]"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                    <ChevronRight size={20} className="opacity-30" />
                  </Link>
                );
              })}
            </div>

            <div className="py-6 border-b border-[#E7E1D8]/60">
              <Link
                href="/account"
                className="flex items-center gap-4 font-ui text-[1.0625rem] px-4 py-3.5 rounded-xl transition-colors active:bg-[#E7E1D8]/40 text-[#161616]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[#E7E1D8]">
                  <User size={20} className="opacity-70" />
                </div>
                My Account
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-4 font-ui text-[1.0625rem] px-4 py-3.5 rounded-xl transition-colors active:bg-[#E7E1D8]/40 text-[#161616]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-[#E7E1D8]">
                  <Heart size={20} className="opacity-70" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#C46A3A] text-white text-[0.65rem] font-bold rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                My Wishlist
              </Link>
            </div>

            <div className="pt-6">
              <p className="font-ui text-[0.75rem] font-semibold uppercase tracking-wider px-4 mb-4 text-[#161616]/40">
                Explore Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="font-ui text-[0.875rem] px-4 py-3 rounded-lg transition-colors active:bg-[#E7E1D8]/40 bg-white shadow-sm border border-[#E7E1D8]/50 text-[#161616]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-6 border-b border-[#E7E1D8]/60">
              <Link
                href="/retailers"
                className="flex items-center justify-between font-ui text-[1.125rem] px-4 py-3.5 rounded-xl transition-colors active:bg-[#E7E1D8]/40 text-[#161616]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Retailers
                <ChevronRight size={20} className="opacity-30" />
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Full-screen mobile search overlay */}
      <MobileSearchOverlay
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />
    </>
  );
}
