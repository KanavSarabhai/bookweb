import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="bg-ivory min-h-screen py-14">
      <div className="mx-auto max-w-md px-4">
        <h1 className="heading-page mb-2 text-center">Sign in</h1>
        <p className="font-ui text-sm text-charcoal-muted text-center mb-8">
          Sign in to track orders, manage wishlists, and access exclusive offers.
        </p>

        <form className="space-y-4 bg-surface border border-border rounded-sm p-6">
          <div>
            <label htmlFor="email" className="block font-ui text-sm font-medium text-brown mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-ui text-sm font-medium text-brown mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <div className="flex items-center justify-between font-ui text-sm">
            <label className="flex items-center gap-2 text-charcoal-muted">
              <input type="checkbox" name="remember" className="rounded-sm border-border" />
              Remember me
            </label>
            <Link href="/account/forgot-password" className="text-gold hover:text-brown transition-colors">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full justify-center" size="lg">
            Sign in
          </Button>
        </form>

        <p className="font-ui text-sm text-center text-charcoal-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-gold hover:text-brown transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
