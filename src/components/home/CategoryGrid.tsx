import Link from "next/link";
import {
  Brain,
  Network,
  BarChart3,
  Code2,
  Shield,
  Cloud,
  Layers,
  Cpu,
  Briefcase,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  brain: Brain,
  network: Network,
  chart: BarChart3,
  code: Code2,
  shield: Shield,
  cloud: Cloud,
  layers: Layers,
  cpu: Cpu,
  briefcase: Briefcase,
  wrench: Wrench,
};

export function CategoryGrid() {
  return (
    <section className="py-14 lg:py-20" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-eyebrow mb-2">Browse by subject</p>
            <h2 id="categories-heading" className="heading-section">
              Explore categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="font-ui text-sm font-medium text-gold hover:text-brown flex items-center gap-1 transition-colors"
          >
            View all categories
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={cn(
                  "group flex flex-col p-5 bg-surface border border-border rounded-sm",
                  "transition-all duration-300 hover:border-gold-subtle/50 hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-sm bg-cream text-brown group-hover:bg-beige/50 transition-colors">
                    <Icon size={20} aria-hidden />
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-charcoal-muted opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  />
                </div>
                <h3 className="font-ui text-base font-semibold text-charcoal mb-1">{cat.name}</h3>
                <p className="text-body text-xs line-clamp-2 flex-1">
                  {cat.description}
                </p>
                <p className="font-ui text-xs font-medium text-gold mt-3">{cat.bookCount}+ titles</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
