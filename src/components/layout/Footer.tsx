import Link from "next/link";
import { Newsletter } from "@/components/home/Newsletter";

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
    { label: "Customer Service", href: "/customer-service" },
  ],
  account: [
    { label: "Sign in", href: "/account/sign-in" },
    { label: "Create account", href: "/account/register" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track my order", href: "/account/track-order" },
    { label: "Cart", href: "/cart" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-carbon text-cream mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <Newsletter variant="footer" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mt-14 pt-14 border-t border-cream/10">
          <div>
            <Link
              href="/"
              className="font-display text-3xl text-cream hover:opacity-80 transition-opacity"
            >
              Shroff
            </Link>
            <p className="font-ui text-xs uppercase tracking-[0.12em] text-carbon-muted mt-2">
              Publishers &amp; Distributors
            </p>
            <p className="mt-4 font-ui text-sm text-carbon-muted leading-relaxed max-w-xs">
              Technical, professional, and academic books for developers, engineers, educators,
              and students across India.
            </p>
          </div>

          <div>
            <h3 className="section-label text-brick mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-carbon-muted hover:text-brick transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label text-brick mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-carbon-muted hover:text-brick transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="section-label text-brick mb-4 mt-8">Account</h3>
            <ul className="space-y-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-carbon-muted hover:text-brick transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label text-brick mb-4">Policies</h3>
            <ul className="space-y-2.5">
              {footerLinks.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-carbon-muted hover:text-brick transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <address className="not-italic mt-8 font-ui text-sm text-carbon-muted space-y-2">
              <p>B-103, Railway Commercial Complex, Sector 3, Sanpada (East), Navi Mumbai</p>
              <p>
                <a href="tel:+912241584158" className="hover:text-brick transition-colors">
                  +91 22 41584158
                </a>
              </p>
              <p>
                <a
                  href="mailto:mail@shroffpublishers.com"
                  className="hover:text-brick transition-colors"
                >
                  mail@shroffpublishers.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs text-carbon-muted">
            © {new Date().getFullYear()} Shroff Publishers &amp; Distributors Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
