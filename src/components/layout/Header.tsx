"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart, Search } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Categories", href: "/categories" },
  { label: "Bestsellers", href: "/books?sort=bestsellers" },
  { label: "New Arrivals", href: "/books?sort=new" },
  { label: "Sale", href: "/books?sort=sale" },
  { label: "Retailers", href: "/retailers" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0",
        headerBg
      )}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between min-h-[4rem] lg:min-h-[4.5rem] gap-4 lg:gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 group focus-visible:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <span
              className="font-display text-[1.15rem] tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-70"
              style={{ color: "var(--ink)" }}
            >
              Shroff
            </span>
            <span
              className="font-ui text-[0.65rem] font-medium uppercase tracking-[0.12em] ml-2 opacity-50"
              style={{ color: "var(--ink)" }}
            >
              Publishers
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "?");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center font-ui text-[0.8125rem] px-3.5 py-2 rounded-full transition-all duration-200",
                    active
                      ? "font-medium"
                      : "hover:bg-black/[0.04]"
                  )}
                  style={{
                    color: active ? "var(--copper)" : "var(--ink-muted)",
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "var(--copper)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <div className="hidden md:block w-[min(200px,18vw)]">
              <SearchBar variant="header" showCategoryFilter={false} />
            </div>

            {(["account/sign-in", "wishlist", "cart"] as const).map((path, i) => {
              const icons = [User, Heart, ShoppingCart];
              const labels = ["Account", "Wishlist", "Shopping cart"];
              const Icon = icons[i];
              return (
                <Link
                  key={path}
                  href={`/${path}`}
                  aria-label={labels[i]}
                  className="inline-flex items-center justify-center size-9 rounded-full transition-all duration-200 hover:bg-black/[0.05]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </Link>
              );
            })}

            {/* Mobile search icon */}
            <button
              type="button"
              className="inline-flex items-center justify-center size-9 rounded-full transition-all duration-200 hover:bg-black/[0.05] md:hidden"
              style={{ color: "var(--ink-muted)" }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Hamburger */}
            <button
              type="button"
              className="inline-flex items-center justify-center size-9 rounded-full transition-all duration-200 hover:bg-black/[0.05] lg:hidden"
              style={{ color: "var(--ink-muted)" }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
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
          <nav className="px-5 py-6 space-y-1 max-w-[1440px] mx-auto" aria-label="Mobile navigation">
            <div className="mb-5">
              <SearchBar variant="header" showCategoryFilter={false} />
            </div>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center font-ui text-[0.9375rem] px-3 py-3 rounded-xl transition-colors"
                style={{ color: "var(--ink)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-5 mt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="eyebrow px-3 mb-3">All categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="font-ui text-sm px-3 py-2.5 rounded-lg transition-colors"
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
