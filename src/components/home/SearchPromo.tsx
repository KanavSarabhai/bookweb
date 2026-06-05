import { SearchBar } from "@/components/search/SearchBar";

export function SearchPromo() {
  return (
    <section className="py-10 bg-brown">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h2 className="font-ui text-xl sm:text-2xl font-semibold text-ivory mb-2 tracking-tight">
          Search the catalog
        </h2>
        <p className="font-ui text-sm text-ivory/75 mb-6">
          Find books by title, author, ISBN, publisher, or subject
        </p>
        <SearchBar variant="hero" className="max-w-2xl mx-auto" />
      </div>
    </section>
  );
}
