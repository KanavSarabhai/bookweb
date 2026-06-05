"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  ChevronDown,
  BookMarked,
  Sparkles,
  Award,
  Building2,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { SearchBar } from "@/components/search/SearchBar";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Books", href: "/books", icon: BookMarked },
  { label: "Bestsellers", href: "/books?sort=bestsellers", icon: Award },
  { label: "New Arrivals", href: "/books?sort=new", icon: Sparkles },
  { label: "Publishers", href: "/publishers", icon: Building2 },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm border-b border-border">
      <TopBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-8 h-16 lg:h-[4.5rem]">
          <Link
            href="/"
            className="shrink-0 font-ui hover:opacity-90 transition-opacity"
            onClick={() => setMobileOpen(false)}
          >
            <span className="block text-lg font-bold text-brown tracking-tight leading-none">
              Shroff
            </span>
            <span className="block text-[0.6875rem] font-medium tracking-wide uppercase text-charcoal-muted mt-0.5">
              Publishers
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl">
            <SearchBar variant="header" />
          </div>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-ui text-[0.9375rem] font-medium text-charcoal px-3 py-2 rounded-sm hover:bg-cream hover:text-brown transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                className="font-ui text-sm font-medium text-charcoal px-3 py-2 rounded-sm hover:bg-cream hover:text-brown transition-colors flex items-center gap-1"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
              >
                Categories
                <ChevronDown size={14} className={cn("transition-transform", categoriesOpen && "rotate-180")} />
              </button>
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-surface border border-border rounded-sm shadow-lg py-2 animate-fade-in">
                  {categories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="block px-4 py-2 font-ui text-sm text-charcoal hover:bg-cream hover:text-brown transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className="block px-4 py-2 font-ui text-sm text-gold border-t border-border mt-1 hover:bg-cream transition-colors"
                  >
                    View all categories →
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <Link
              href="/account/sign-in"
              className="hidden sm:flex items-center gap-1.5 font-ui text-sm text-charcoal px-3 py-2 rounded-sm hover:bg-cream transition-colors"
            >
              <User size={18} aria-hidden />
              <span className="hidden lg:inline">Sign in</span>
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 font-ui text-sm text-charcoal px-3 py-2 rounded-sm hover:bg-cream transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} aria-hidden />
              <span className="hidden lg:inline">Cart</span>
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-brown rounded-sm hover:bg-cream transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar variant="header" />
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface animate-fade-in">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 font-ui text-base text-charcoal px-3 py-3 rounded-sm hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={18} className="text-gold-muted" aria-hidden />
                {item.label}
              </Link>
            ))}
            <p className="font-ui text-xs uppercase tracking-wider text-charcoal-muted px-3 pt-4 pb-2">
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="block font-ui text-sm text-charcoal px-3 py-2.5 rounded-sm hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex gap-2">
              <Link
                href="/account/sign-in"
                className="flex-1 text-center font-ui text-sm py-2.5 border border-border rounded-sm hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/account/register"
                className="flex-1 text-center font-ui text-sm py-2.5 bg-brown text-ivory rounded-sm hover:bg-brown-light"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
