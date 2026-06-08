import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse technical book categories at Shroff Publishers.",
};

export default function CategoriesPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="py-12 lg:py-16 border-b border-brick/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">Browse</p>
          <hr className="hairline mb-8" />
          <h1 className="heading-page mb-3">All categories</h1>
          <p className="text-body max-w-2xl">
            Browse our catalogue by subject — from artificial intelligence to academic titles.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card-editorial bg-soft-grey transition-opacity hover:opacity-80"
            >
              <p className="section-label mb-2">{cat.name}</p>
              <p className="text-body">{cat.description}</p>
              <p className="font-ui text-xs text-brick mt-4">{cat.bookCount}+ titles →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
