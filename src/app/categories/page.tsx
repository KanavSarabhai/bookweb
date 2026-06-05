import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse technical book categories at Shroff Publishers.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-border py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="heading-page mb-2">All categories</h1>
          <p className="text-body max-w-2xl">
            Browse our catalog by subject — from artificial intelligence to engineering.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex items-center justify-between p-6 bg-surface border border-border rounded-sm hover:border-gold-subtle/50 hover:shadow-md transition-all"
            >
              <div>
                <h2 className="font-ui text-lg font-semibold text-charcoal group-hover:text-brown transition-colors">
                  {cat.name}
                </h2>
                <p className="font-ui text-sm text-charcoal-muted mt-1">{cat.description}</p>
                <p className="font-ui text-xs text-gold-muted mt-2">{cat.bookCount}+ titles</p>
              </div>
              <ArrowRight
                size={20}
                className="text-charcoal-muted group-hover:text-brown shrink-0 transition-colors"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
