import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <p className="section-label mb-4">Get in touch</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-6">Contact</h1>
        <p className="text-lead mb-10">
          For orders, institutional enquiries, and distributor partnerships, reach our team in Navi
          Mumbai.
        </p>

        <address className="not-italic space-y-4 font-ui text-sm text-press-muted mb-10">
          <p>
            B-103, 1st Floor, Railway Commercial Complex
            <br />
            Sector 3, Sanpada (East), Navi Mumbai
          </p>
          <p>
            <a href="tel:+912241584158" className="text-brick hover:opacity-70 transition-opacity">
              +91 22 41584158
            </a>
            <br />
            <a href="tel:+917304487700" className="text-brick hover:opacity-70 transition-opacity">
              +91 7304487700
            </a>
          </p>
          <p>
            <a
              href="mailto:mail@shroffpublishers.com"
              className="text-brick hover:opacity-70 transition-opacity"
            >
              mail@shroffpublishers.com
            </a>
          </p>
          <p>Mon–Sat, 9:00 – 17:00 IST</p>
        </address>

        <ActionLink href="/account/track-order">Track my order →</ActionLink>
      </div>
    </div>
  );
}
