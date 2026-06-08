import { books } from "@/lib/data/books";
import type { Book } from "@/types/book";
import { filterBooks } from "@/lib/search";

export function getFilteredBooks(params: {
  q?: string;
  category?: string;
  author?: string;
  publisher?: string;
  subject?: string;
  sort?: string;
}): Book[] {
  let result = filterBooks(books, {
    q: params.q,
    category: params.category,
    author: params.author,
    publisher: params.publisher,
    subject: params.subject,
  });

  switch (params.sort) {
    case "bestsellers":
      result = result.filter((b) => b.isBestseller);
      break;
    case "new":
      result = result.filter((b) => b.isNewArrival);
      break;
    case "sale":
      result = result.filter((b) => b.isOnSale);
      break;
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    default:
      result = [...result].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
  }

  return result;
}
