import type { Metadata } from "next";
import Link from "next/link";
import { publishers } from "@/lib/data/publishers";

export const metadata: Metadata = {
  title: "Publishers",
  description: "Browse books by publisher at Shroff Publishers and Distributors.",
};

export default function PublishersPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="py-12 lg:py-16 border-b border-brick/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">Imprints</p>
          <hr className="hairline mb-8" />
          <h1 className="heading-page mb-3">Publishers</h1>
          <p className="text-body max-w-2xl">
            Titles from O&apos;Reilly, Pragmatic Bookshelf, No Starch Press, and leading technical
            imprints.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {publishers.map((name) => (
            <Link
              key={name}
              href={`/search?publisher=${encodeURIComponent(name)}`}
              className="font-ui text-sm text-brick border border-brick rounded-[3.75px] p-4 transition-opacity hover:opacity-70"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
