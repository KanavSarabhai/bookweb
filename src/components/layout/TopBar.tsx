import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden lg:block bg-brown text-ivory/90 border-b border-brown-light/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 text-xs font-ui">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} aria-hidden />
              Navi Mumbai, India
            </span>
            <a href="tel:+912241584158" className="flex items-center gap-1.5 hover:text-gold-subtle transition-colors">
              <Phone size={12} aria-hidden />
              +91 22 41584158
            </a>
            <a
              href="mailto:mail@shroffpublishers.com"
              className="flex items-center gap-1.5 hover:text-gold-subtle transition-colors"
            >
              <Mail size={12} aria-hidden />
              mail@shroffpublishers.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon–Sat 9:00 – 17:00</span>
            <Link href="/account/track-order" className="hover:text-gold-subtle transition-colors">
              Track my order
            </Link>
            <span className="text-ivory/50">|</span>
            <span>Currency: ₹ INR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
