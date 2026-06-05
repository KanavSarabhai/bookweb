import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BookGrid } from "@/components/books/BookGrid";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import { getBooksByCategory } from "@/lib/data/books";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryBooks = getBooksByCategory(slug);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-border py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="font-ui text-sm text-charcoal-muted mb-4">
            <Link href="/categories" className="hover:text-brown transition-colors">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brown">{category.name}</span>
          </nav>
          <h1 className="heading-page mb-2">{category.name}</h1>
          <p className="text-body max-w-2xl">{category.description}</p>
          <p className="font-ui text-sm text-gold-muted mt-3">
            {categoryBooks.length} title{categoryBooks.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <BookGrid books={categoryBooks} />
      </div>
    </div>
  );
}
