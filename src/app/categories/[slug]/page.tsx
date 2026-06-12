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
          <nav className="font-ui text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
            <Link href="/categories" style={{ color: "var(--copper)" }} className="hover:opacity-70 transition-opacity">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--ink)" }}>{category.name}</span>
          </nav>
          <p className="eyebrow mb-4">{category.name}</p>
          <h1
            className="font-display font-normal tracking-[-0.03em] leading-[1.06] mb-3"
            style={{ fontSize: "clamp(2.6rem, 5vw + 0.5rem, 5.5rem)", color: "var(--ink)" }}
          >
            {category.name}
          </h1>
          <p className="font-ui text-[0.9375rem] mb-4" style={{ color: "var(--ink-muted)", maxWidth: "520px" }}>
            {category.description}
          </p>
          <p className="font-ui text-sm font-medium" style={{ color: "var(--copper)" }}>
            {categoryBooks.length} title{categoryBooks.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Books grid */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        {categoryBooks.length === 0 ? (
          <div className="text-center py-24">
            <p
              className="font-display font-normal tracking-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--ink)" }}
            >
              No books yet in this category
            </p>
            <p className="font-ui text-[0.9375rem] mb-8" style={{ color: "var(--ink-muted)", maxWidth: "400px", margin: "0 auto 32px" }}>
              We&apos;re adding new titles regularly. Browse our full catalogue or explore other categories.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 font-ui text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200"
                style={{ background: "#161616", color: "#fff" }}
              >
                Browse all books
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 font-ui text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200"
                style={{ background: "transparent", color: "var(--copper)", border: "1px solid var(--copper)" }}
              >
                All categories
              </Link>
            </div>
          </div>
        ) : (
          <BookGrid books={categoryBooks} />
        )}
      </div>
    </div>
  );
}
