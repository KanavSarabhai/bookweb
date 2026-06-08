"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CategoryNav } from "@/components/layout/CategoryNav";
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

const iconBtnClass =
  "inline-flex items-center justify-center size-10 text-[#121212]/70 transition-opacity hover:opacity-60";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50 w-full",
        isHome
          ? "absolute top-0 left-0 right-0 bg-[#F8F6F3]/70 backdrop-blur-md"
          : "sticky top-0 bg-cream border-b border-press/[0.06]"
      )}
    >
      {!isHome && <AnnouncementBar />}

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between min-h-[4.25rem] lg:min-h-[4.75rem] gap-4 lg:gap-10">
          <Link
            href="/"
            className="shrink-0 font-ui text-sm font-semibold tracking-tight text-[#121212] hover:opacity-70 transition-opacity"
            onClick={() => setMobileOpen(false)}
          >
            Shroff Publishers
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center font-ui text-[0.8125rem] xl:text-sm text-[#121212]/75 px-3 xl:px-4 py-2 transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div className="hidden md:block w-[min(220px,20vw)]">
              <SearchBar variant="header" showCategoryFilter={false} />
            </div>
            <Link href="/account/sign-in" className={iconBtnClass} aria-label="Account">
              <User size={19} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className={iconBtnClass} aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className={iconBtnClass} aria-label="Shopping cart">
              <ShoppingCart size={19} strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              className={cn(iconBtnClass, "lg:hidden")}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {!isHome && <CategoryNav />}

      {mobileOpen && (
        <div
          className={cn(
            "lg:hidden border-t animate-fade-in",
            isHome ? "border-[#121212]/8 bg-[#F8F6F3]/95 backdrop-blur-md" : "border-press/10 bg-cream"
          )}
        >
          <nav className="px-5 py-5 space-y-0.5 max-w-[1440px] mx-auto" aria-label="Mobile navigation">
            <div className="md:hidden mb-4">
              <SearchBar variant="header" showCategoryFilter={false} />
            </div>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block font-ui text-base text-[#121212]/80 px-2 py-3 transition-opacity hover:opacity-60"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!isHome && (
              <>
                <p className="section-label px-2 pt-5 pb-2">All categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block font-ui text-sm text-press px-2 py-2.5 transition-opacity hover:opacity-70"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
