import Link from "next/link";
import { publishers } from "@/lib/data/publishers";

export function PublisherStrip() {
  const featured = publishers.slice(0, 8);

  return (
    <section className="py-12 bg-surface border-y border-border" aria-labelledby="publishers-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-eyebrow mb-2">Partner publishers</p>
          <h2 id="publishers-heading" className="heading-section">
            Books from leading imprints
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {featured.map((name) => (
            <Link
              key={name}
              href={`/search?publisher=${encodeURIComponent(name)}`}
              className="font-ui text-sm text-charcoal px-4 py-2.5 bg-cream border border-border rounded-sm hover:border-gold-subtle hover:text-brown transition-colors duration-200"
            >
              {name}
            </Link>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link
            href="/publishers"
            className="font-ui text-sm text-gold hover:text-brown transition-colors"
          >
            Browse all publishers →
          </Link>
        </p>
      </div>
    </section>
  );
}
