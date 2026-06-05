import { books } from "@/lib/data/books";
import type { Book } from "@/types/book";

export interface SearchSuggestion {
  type: "book" | "author" | "category" | "publisher";
  label: string;
  href: string;
}

export function getInstantSuggestions(query: string, limit = 8): SearchSuggestion[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const suggestions: SearchSuggestion[] = [];
  const seen = new Set<string>();

  for (const book of books) {
    if (book.title.toLowerCase().includes(q) && suggestions.length < limit) {
      const key = `book-${book.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({
          type: "book",
          label: book.title,
          href: `/books/${book.slug}`,
        });
      }
    }
  }

  for (const book of books) {
    if (book.author.toLowerCase().includes(q) && suggestions.length < limit) {
      const key = `author-${book.author}`;
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({
          type: "author",
          label: book.author,
          href: `/search?q=${encodeURIComponent(book.author)}`,
        });
      }
    }
  }

  const categories = [
    "Artificial Intelligence",
    "Machine Learning",
    "Programming",
    "Data Science",
    "Cybersecurity",
  ];
  for (const cat of categories) {
    if (cat.toLowerCase().includes(q) && suggestions.length < limit) {
      const slug = cat.toLowerCase().replace(/\s+/g, "-");
      const key = `cat-${slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({
          type: "category",
          label: cat,
          href: `/categories/${slug}`,
        });
      }
    }
  }

  return suggestions.slice(0, limit);
}

export function filterBooks(
  allBooks: Book[],
  params: {
    q?: string;
    category?: string;
    author?: string;
    publisher?: string;
    subject?: string;
  }
): Book[] {
  return allBooks.filter((book) => {
    if (params.category && book.categorySlug !== params.category) return false;
    if (params.author && !book.author.toLowerCase().includes(params.author.toLowerCase()))
      return false;
    if (
      params.publisher &&
      !book.publisher.toLowerCase().includes(params.publisher.toLowerCase())
    )
      return false;
    if (params.subject && book.categorySlug !== params.subject) return false;
    if (params.q) {
      const q = params.q.toLowerCase();
      const match =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}
