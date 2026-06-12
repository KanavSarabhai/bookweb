"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart, Search } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
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

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span
      className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[0.65rem] font-bold pointer-events-none"
      style={{
        background: "#c46a3a",
        color: "#fff",
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = isHome
    ? scrolled
      ? "bg-[#F8F5F0]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      : "bg-transparent"
    : "bg-[#F8F5F0]/95 backdrop-blur-xl border-b border-[#E7E1D8]";

  const navIcons = [
    { path: "account", label: "Account", Icon: User, count: 0 },
    { path: "wishlist", label: "Wishlist", Icon: Heart, count: wishlistCount },
    { path: "cart", label: "Shopping cart", Icon: ShoppingCart, count: cartCount },
  ];

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0",
        headerBg
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 h-[76px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="shrink-0 group focus-visible:outline-none flex items-baseline"
          onClick={() => setMobileOpen(false)}
          aria-label="Shroff Publishers Home"
        >
          <span
            className="font-display text-[1.15rem] tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-70"
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
                  active
                    ? "font-medium"
                    : "hover:opacity-70"
                )}
                style={{
                  color: active ? "var(--copper)" : "var(--ink)",
                }}
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
        <div className="flex items-center gap-5 shrink-0">
          {/* Desktop Search (Hidden below xl) */}
          <div className="hidden xl:block w-[280px]">
            <SearchBar variant="header" showCategoryFilter={false} placeholder="Search books..." />
          </div>

          {/* Search Icon for Mobile/Tablet */}
          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center transition-all duration-200 hover:opacity-70 relative"
            style={{ color: "var(--ink)" }}
            aria-label="Search books"
            onClick={() => router.push("/books")}
          >
            <Search size={22} strokeWidth={1.5} />
          </button>

          {/* User Icons */}
          {navIcons.map(({ path, label, Icon, count }) => (
            <Link
              key={path}
              href={`/${path}`}
              aria-label={`${label}${count > 0 ? ` (${count} items)` : ""}`}
              className="relative inline-flex items-center justify-center transition-all duration-200 hover:opacity-70"
              style={{ color: "var(--ink)" }}
            >
              <Icon size={22} strokeWidth={1.5} />
              <CountBadge count={count} />
            </Link>
          ))}

          {/* Hamburger Menu (Hidden above lg) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center transition-all duration-200 hover:opacity-70 relative ml-1"
            style={{ color: "var(--ink)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t animate-fade-in"
          style={{
            background: "rgba(248,245,240,0.97)",
            backdropFilter: "blur(20px)",
            borderColor: "var(--border)",
          }}
        >
          <nav className="px-6 py-6 space-y-1 max-w-[1440px] mx-auto" aria-label="Mobile navigation">
            <div className="mb-5 w-full">
              <SearchBar variant="header" showCategoryFilter={false} placeholder="Search books..." />
            </div>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center font-ui text-[0.9375rem] py-3 transition-colors hover:opacity-70"
                style={{ color: "var(--ink)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-5 mt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="eyebrow py-1 mb-3">All categories</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="font-ui text-sm py-2 transition-colors hover:opacity-70"
                    style={{ color: "var(--ink-muted)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
