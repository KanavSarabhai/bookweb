import { Hero } from "@/components/home/Hero";
import { BookSection } from "@/components/home/BookSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PublisherStrip } from "@/components/home/PublisherStrip";
import { RetailersSection } from "@/components/home/RetailersSection";
import { Newsletter } from "@/components/home/Newsletter";
import {
  getBestsellers,
  getNewArrivals,
  getFeaturedBooks,
  getSaleBooks,
} from "@/lib/data/books";

export default function HomePage() {
  const featured = getFeaturedBooks(8);
  const bestsellers = getBestsellers(8);
  const newArrivals = getNewArrivals(8);
  const saleBooks = getSaleBooks(8);

  return (
    <>
      <Hero />
      <BookSection
        id="featured"
        label="Curated"
        title="Featured technical books"
        books={featured}
        viewAllHref="/books"
      />
      <BookSection
        id="bestsellers"
        label="Top sellers"
        title="Bestsellers"
        books={bestsellers}
        viewAllHref="/books?sort=bestsellers"
        className="py-14 lg:py-24 bg-soft-grey"
      />
      <BookSection
        id="new-arrivals"
        label="Just in"
        title="New arrivals"
        books={newArrivals}
        viewAllHref="/books?sort=new"
      />
      <BookSection
        id="sale"
        label="Offers"
        title="Sale books"
        books={saleBooks}
        viewAllHref="/books?sort=sale"
        className="py-14 lg:py-24 bg-soft-grey"
      />
      <CategoryGrid />
      <PublisherStrip />
      <RetailersSection />
      <Newsletter />
    </>
  );
}
