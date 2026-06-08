import { ActionLink } from "@/components/ui/ActionLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function RetailersSection() {
  return (
    <section className="py-14 lg:py-24 bg-soft-grey" aria-labelledby="retailers-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Distribution"
          title="Retailers & distributors"
          viewAllHref="/retailers"
          viewAllLabel="Learn more →"
          id="retailers-heading"
        />
        <div className="max-w-2xl">
          <p className="text-lead mb-8">
            Shroff Publishers partners with bookstores, institutions, and distributors across India
            to deliver technical and academic titles at scale.
          </p>
          <ActionLink href="/retailers">Partner with us →</ActionLink>
        </div>
      </div>
    </section>
  );
}
