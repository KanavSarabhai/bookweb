import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/books/ProductDetail";
import { getBookBySlug, books } from "@/lib/data/books";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.description ?? `${book.title} by ${book.author} — ${book.publisher}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = books
    .filter((b) => b.categorySlug === book.categorySlug && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="bg-cream min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetail book={book} related={related} />
      </div>
    </div>
  );
}
