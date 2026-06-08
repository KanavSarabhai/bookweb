import { SearchBar } from "@/components/search/SearchBar";

export function SearchPromo() {
  return (
    <section className="bg-cream border-y border-brick/20 py-10 lg:py-14" aria-label="Search">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="section-label text-center mb-6">Search the catalogue</p>
        <SearchBar variant="hero" />
      </div>
    </section>
  );
}
