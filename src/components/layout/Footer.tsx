"use client";

import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "All Books", href: "/books" },
    { label: "Bestsellers", href: "/books?sort=bestsellers" },
    { label: "New Arrivals", href: "/books?sort=new" },
    { label: "Sale", href: "/books?sort=sale" },
    { label: "Categories", href: "/categories" },
    { label: "Publishers", href: "/publishers" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Retailers & Distributors", href: "/retailers" },
  ],
  account: [
    { label: "Sign in", href: "/account/sign-in" },
    { label: "Create account", href: "/account/register" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track my order", href: "/account/track-order" },
  ],
  policies: [
    { label: "Contact Us", href: "/contact" },
    { label: "Retailers", href: "/retailers" },
    { label: "Publishers", href: "/publishers" },
  ],
};

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.16em] mb-5" style={{ color: "#888" }}>
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-ui text-[0.875rem] leading-snug transition-colors duration-200"
              style={{ color: "#666" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c46a3a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "#111111", color: "#f8f5f0" }}>

      {/* Newsletter band */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#c46a3a" }}>
              Stay updated
            </p>
            <h2 className="font-display text-[2rem] sm:text-[2.6rem] font-normal leading-[1.08] tracking-[-0.025em] mb-4" style={{ color: "#f8f5f0" }}>
              New titles, every week
            </h2>
            <p className="font-ui text-[0.9375rem] mb-8" style={{ color: "#888" }}>
              Get curated picks, exclusive discounts, and publisher news delivered to your inbox.
            </p>
            <form
              className="flex gap-3 flex-col sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 font-ui text-sm px-5 py-3.5 rounded-full outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#f8f5f0",
                }}
                aria-label="Email address"
              />
              <button
                type="submit"
                className="font-ui text-sm font-medium px-6 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap"
                style={{ background: "#c46a3a", color: "#fff" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-4 group">
              <span className="font-display text-[1.6rem] tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-70" style={{ color: "#f8f5f0" }}>
                Shroff
              </span>
            </Link>
            <p className="font-ui text-[0.6875rem] uppercase tracking-[0.12em] mb-4" style={{ color: "#555" }}>
              Publishers & Distributors
            </p>
            <p className="font-ui text-[0.875rem] leading-relaxed" style={{ color: "#555", maxWidth: "20rem" }}>
              Technical, professional, and academic books for developers, engineers, educators, and students across India.
            </p>
          </div>

          <FooterCol title="Shop" links={footerLinks.shop} />
          <FooterCol title="Company" links={footerLinks.company} />
          <FooterCol title="Account" links={footerLinks.account} />

          {/* Contact + policies */}
          <div>
            <FooterCol title="Policies" links={footerLinks.policies} />
            <address className="not-italic mt-8 space-y-2.5">
              <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: "#888" }}>Contact</p>
              <p className="font-ui text-[0.875rem]" style={{ color: "#666" }}>
                B-103, Railway Commercial Complex<br />
                Sector 3, Sanpada (East), Navi Mumbai
              </p>
              <p>
                <a href="tel:+912241584158" className="font-ui text-[0.875rem] transition-colors duration-200" style={{ color: "#666" }}>
                  +91 22 41584158
                </a>
              </p>
              <p>
                <a href="mailto:mail@shroffpublishers.com" className="font-ui text-[0.875rem] transition-colors duration-200" style={{ color: "#666" }}>
                  mail@shroffpublishers.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="font-ui text-[0.8125rem]" style={{ color: "#444" }}>
            © {new Date().getFullYear()} Shroff Publishers & Distributors Pvt. Ltd.
          </p>
          <p className="font-ui text-[0.8125rem]" style={{ color: "#444" }}>
            Trusted by students and professionals across India
          </p>
        </div>
      </div>
    </footer>
  );
}
