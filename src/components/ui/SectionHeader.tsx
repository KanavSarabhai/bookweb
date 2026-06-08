import Link from "next/link";

interface SectionHeaderProps {
  label: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  id?: string;
}

export function SectionHeader({
  label,
  title,
  viewAllHref,
  viewAllLabel = "View all →",
  id,
}: SectionHeaderProps) {
  return (
    <header className="mb-10 lg:mb-14">
      <p className="section-label mb-4">{label}</p>
      <hr className="hairline mb-8 lg:mb-10" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={id} className="heading-section max-w-4xl">
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="font-ui text-sm font-medium text-brick shrink-0 transition-opacity hover:opacity-70"
          >
            {viewAllLabel}
          </Link>
        )}
      </div>
    </header>
  );
}
