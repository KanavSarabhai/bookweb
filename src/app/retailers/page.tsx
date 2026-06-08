import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Retailers & Distributors",
};

export default function RetailersPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="section-label mb-4">Partnerships</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-6">Retailers &amp; distributors</h1>
        <div className="space-y-6 text-body">
          <p>
            Shroff Publishers &amp; Distributors supplies technical, professional, and academic books
            to bookstores, colleges, training institutes, and corporate buyers across India.
          </p>
          <p>
            We work with leading imprints including O&apos;Reilly, Pragmatic Bookshelf, No Starch
            Press, and dozens of specialist publishers—offering reliable fulfilment and dedicated
            account support.
          </p>
          <p>
            To discuss wholesale pricing, institutional orders, or distribution partnerships, contact
            our team.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <ActionLink href="/contact">Contact us →</ActionLink>
          <ActionLink href="mailto:mail@shroffpublishers.com" variant="text">
            mail@shroffpublishers.com →
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
