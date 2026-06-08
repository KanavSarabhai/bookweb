import Link from "next/link";
import { publishers } from "@/lib/data/publishers";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PublisherStrip() {
  const featured = publishers.slice(0, 10);

  return (
    <section className="py-14 lg:py-24 bg-cream" aria-labelledby="publishers-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Imprints"
          title="Publisher highlights"
          viewAllHref="/publishers"
          id="publishers-heading"
        />

        <div className="flex flex-wrap gap-3">
          {featured.map((name) => (
            <Link
              key={name}
              href={`/search?publisher=${encodeURIComponent(name)}`}
              className="font-ui text-sm text-brick border border-brick rounded-[3.75px] px-4 py-2.5 transition-opacity hover:opacity-70"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
