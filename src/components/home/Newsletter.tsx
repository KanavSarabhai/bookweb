"use client";

interface NewsletterProps {
  variant?: "standalone" | "footer";
}

export function Newsletter({ variant = "standalone" }: NewsletterProps) {
  const isFooter = variant === "footer";

  return (
    <section
      className={isFooter ? "" : "py-14 lg:py-24 bg-cream border-t border-brick/20"}
      aria-labelledby="newsletter-heading"
    >
      <div className={isFooter ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
        <p className="section-label mb-4">Stay informed</p>
        {!isFooter && <hr className="hairline mb-8" />}
        <h2
          id="newsletter-heading"
          className={isFooter ? "font-display text-2xl text-cream mb-3" : "heading-section mb-6"}
        >
          Newsletter
        </h2>
        <p
          className={
            isFooter
              ? "font-ui text-sm text-carbon-muted mb-6 max-w-md"
              : "text-lead mb-8"
          }
        >
          New arrivals, bestsellers, and publisher updates—delivered to your inbox.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="flex-1 font-ui text-sm border border-brick rounded-[50px] px-5 py-3 bg-cream text-press placeholder:text-press-muted outline-none focus:ring-1 focus:ring-brick"
          />
          <button
            type="submit"
            className="font-ui text-sm font-medium border border-brick text-brick rounded-[50px] px-6 py-3 transition-opacity hover:opacity-70 shrink-0"
          >
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}
