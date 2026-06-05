import type { Metadata } from "next";
import Link from "next/link";
import { publishers } from "@/lib/data/publishers";

export const metadata: Metadata = {
  title: "Publishers",
  description: "Browse books by publisher at Shroff Publishers and Distributors.",
};

export default function PublishersPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-cream border-b border-border py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="heading-page mb-2">Publishers</h1>
          <p className="text-body max-w-2xl">
            Shroff distributes titles from O&apos;Reilly, Pragmatic Bookshelf, No Starch Press,
            and dozens of leading technical imprints.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {publishers.map((name) => (
            <Link
              key={name}
              href={`/search?publisher=${encodeURIComponent(name)}`}
              className="font-ui text-sm text-charcoal p-4 bg-surface border border-border rounded-sm hover:border-gold-subtle hover:text-brown transition-all"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
