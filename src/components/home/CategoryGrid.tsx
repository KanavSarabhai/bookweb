import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featuredSlugs = [
  "programming",
  "artificial-intelligence",
  "data-science",
  "cybersecurity",
  "cloud-computing",
  "engineering",
  "business",
  "academic",
];

export function CategoryGrid() {
  const featured = categories.filter((c) => featuredSlugs.includes(c.slug));

  return (
    <section className="py-14 lg:py-24 bg-soft-grey" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Browse"
          title="Popular categories"
          viewAllHref="/categories"
          id="categories-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card-editorial bg-cream border border-brick/10 transition-opacity hover:opacity-80"
            >
              <p className="section-label mb-3">{cat.name}</p>
              <p className="font-ui text-sm text-press-muted leading-relaxed line-clamp-2">
                {cat.description}
              </p>
              <p className="font-ui text-xs text-brick mt-4">{cat.bookCount}+ titles →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
