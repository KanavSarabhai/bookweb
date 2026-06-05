import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookCover } from "@/components/books/BookCover";
import { getFeaturedBooks } from "@/lib/data/books";

export function Hero() {
  const featured = getFeaturedBooks(5);

  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,_#3d2914_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in max-w-xl">
            <p className="text-eyebrow mb-4">India&apos;s technical book distributor</p>
            <h1 className="heading-hero mb-5">
              Professional books for engineers, developers, and students
            </h1>
            <p className="text-lead mb-8 max-w-lg">
              Shop programming, AI, data science, cybersecurity, and engineering titles from
              O&apos;Reilly, Pragmatic Bookshelf, and other leading publishers—with delivery
              across India.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/books" size="lg">
                Browse books
                <ArrowRight size={18} aria-hidden />
              </Button>
              <Button href="/categories" variant="outline" size="lg">
                View categories
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 font-ui text-sm text-charcoal-muted">
              <div>
                <span className="block text-xl font-semibold text-brown tabular-nums">5,000+</span>
                <span className="text-body">Titles in stock</span>
              </div>
              <div>
                <span className="block text-xl font-semibold text-brown tabular-nums">50+</span>
                <span className="text-body">Partner publishers</span>
              </div>
              <div>
                <span className="block text-xl font-semibold text-brown">Pan-India</span>
                <span className="text-body">Shipping & support</span>
              </div>
            </div>
          </div>

          <div className="relative hidden sm:block h-[420px] lg:h-[480px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {featured.map((book, i) => {
                const positions = [
                  "left-[5%] top-[8%] z-10 rotate-[-6deg]",
                  "left-[22%] top-[2%] z-20 rotate-[-2deg]",
                  "left-[42%] top-0 z-30",
                  "left-[58%] top-[4%] z-20 rotate-[2deg]",
                  "left-[72%] top-[12%] z-10 rotate-[5deg]",
                ];
                return (
                  <Link
                    key={book.id}
                    href={`/books/${book.slug}`}
                    className={`absolute transition-transform duration-300 hover:-translate-y-2 hover:z-40 ${positions[i]}`}
                    style={{ transform: `scale(${1 - Math.abs(i - 2) * 0.06})` }}
                  >
                    <BookCover
                      book={book}
                      size={i === 2 ? "xl" : i === 1 || i === 3 ? "lg" : "md"}
                      className="shadow-lg"
                    />
                  </Link>
                );
              })}
            </div>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[50%] opacity-20 blur-xl"
              style={{ background: "var(--brown)" }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
