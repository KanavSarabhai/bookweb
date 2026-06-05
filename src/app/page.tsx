import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BookSection } from "@/components/home/BookSection";
import { PublisherStrip } from "@/components/home/PublisherStrip";
import { SearchPromo } from "@/components/home/SearchPromo";
import { getBestsellers, getNewArrivals } from "@/lib/data/books";

export default function HomePage() {
  const bestsellers = getBestsellers(8);
  const newArrivals = getNewArrivals(8);

  return (
    <>
      <Hero />
      <SearchPromo />
      <CategoryGrid />
      <BookSection
        id="bestsellers"
        title="Bestsellers"
        subtitle="Most popular"
        books={bestsellers}
        viewAllHref="/books?sort=bestsellers"
      />
      <BookSection
        id="new-arrivals"
        title="New Arrivals & Forthcoming"
        subtitle="Latest releases"
        books={newArrivals}
        viewAllHref="/books?sort=new"
        variant="cream"
      />
      <PublisherStrip />
    </>
  );
}
