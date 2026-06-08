import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-xl px-4 text-center">
        <p className="section-label mb-4">Saved titles</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-4">Wishlist</h1>
        <p className="text-body mb-8">Your wishlist is empty.</p>
        <ActionLink href="/books">Browse books →</ActionLink>
        <p className="font-ui text-sm text-press-muted mt-8">
          <a href="/account/sign-in" className="text-brick hover:opacity-70 transition-opacity">
            Sign in
          </a>{" "}
          to save books across devices.
        </p>
      </div>
    </div>
  );
}
