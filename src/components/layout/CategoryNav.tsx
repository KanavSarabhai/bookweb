"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navCategories = [
  { label: "Programming", slug: "programming" },
  { label: "AI", slug: "artificial-intelligence" },
  { label: "Data Science", slug: "data-science" },
  { label: "Cybersecurity", slug: "cybersecurity" },
  { label: "Cloud", slug: "cloud-computing" },
  { label: "Engineering", slug: "engineering" },
  { label: "Business", slug: "business" },
  { label: "Academic", slug: "academic" },
];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-press/[0.08] bg-cream"
      aria-label="Browse by category"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto py-3.5 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navCategories.map((cat) => {
            const href = `/categories/${cat.slug}`;
            const active = pathname === href;
            return (
              <li key={cat.slug} className="shrink-0">
                <Link
                  href={href}
                  className={cn(
                    "inline-flex items-center font-ui text-sm px-3 sm:px-4 py-1 transition-opacity hover:opacity-70 whitespace-nowrap",
                    active ? "text-brick font-medium" : "text-brick"
                  )}
                >
                  {cat.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
