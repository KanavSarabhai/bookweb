import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Books", href: "/books" },
    { label: "Bestsellers", href: "/books?sort=bestsellers" },
    { label: "New Arrivals", href: "/books?sort=new" },
    { label: "Categories", href: "/categories" },
    { label: "Publishers", href: "/publishers" },
  ],
  account: [
    { label: "Sign in", href: "/account/sign-in" },
    { label: "Create account", href: "/account/register" },
    { label: "Track my order", href: "/account/track-order" },
    { label: "Shopping cart", href: "/cart" },
  ],
  support: [
    { label: "Customer service", href: "/customer-service" },
    { label: "Contact us", href: "/contact" },
    { label: "Shipping information", href: "/shipping" },
    { label: "Returns policy", href: "/returns" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brown text-ivory/90 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="font-ui text-xl font-bold text-ivory tracking-tight">
              Shroff
            </Link>
            <p className="font-ui text-xs font-medium text-ivory/60 mt-1 tracking-wide uppercase">
              Publishers & Distributors
            </p>
            <p className="mt-4 font-ui text-sm text-ivory/75 leading-relaxed max-w-xs">
              Technical and professional books for developers, engineers, and educators—distributed
              across India since 1985.
            </p>
          </div>

          <div>
            <h3 className="text-eyebrow text-gold-subtle mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-ivory/80 hover:text-gold-subtle transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-gold-subtle mb-4">
              My Account
            </h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm text-ivory/80 hover:text-gold-subtle transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-gold-subtle mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm text-ivory/80">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-gold-subtle" aria-hidden />
                B-103, 1st Floor, Railway Commercial Complex, Sector 3, Sanpada (East), Navi Mumbai
              </p>
              <p>
                <a href="tel:+912241584158" className="flex items-center gap-2 hover:text-gold-subtle transition-colors">
                  <Phone size={16} className="text-gold-subtle" aria-hidden />
                  +91 22 41584158
                </a>
              </p>
              <p>
                <a href="tel:+917304487700" className="flex items-center gap-2 hover:text-gold-subtle transition-colors pl-6">
                  +91 7304487700
                </a>
              </p>
              <p>
                <a
                  href="mailto:mail@shroffpublishers.com"
                  className="flex items-center gap-2 hover:text-gold-subtle transition-colors"
                >
                  <Mail size={16} className="text-gold-subtle" aria-hidden />
                  mail@shroffpublishers.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs text-ivory/60">
            © {new Date().getFullYear()} Shroff Publishers & Distributors Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 font-ui text-xs text-ivory/60">
            <Link href="/privacy" className="hover:text-gold-subtle transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gold-subtle transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
