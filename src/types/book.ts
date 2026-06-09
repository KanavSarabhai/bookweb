export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  categorySlug: string;
  isbn?: string;
  inStock: boolean;
  coverColor: string;
  coverAccent: string;
  description?: string;
  binding?: string;
  language?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  coverUrl?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  bookCount: number;
  icon: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  author?: string;
  publisher?: string;
  subject?: string;
}
