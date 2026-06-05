import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return (
    <div className="bg-ivory min-h-screen py-14">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="heading-page mb-4">Your cart</h1>
        <p className="text-body mb-8">Your cart is currently empty.</p>
        <Button href="/books" size="lg">
          Browse Books
        </Button>
        <p className="font-ui text-sm text-charcoal-muted mt-8">
          <Link href="/account/sign-in" className="text-gold hover:text-brown transition-colors">
            Sign in
          </Link>{" "}
          to view saved items and order history.
        </p>
      </div>
    </div>
  );
}
