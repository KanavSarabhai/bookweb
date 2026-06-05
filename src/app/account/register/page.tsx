import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="bg-ivory min-h-screen py-14">
      <div className="mx-auto max-w-md px-4">
        <h1 className="heading-page mb-2 text-center">Create account</h1>
        <p className="font-ui text-sm text-charcoal-muted text-center mb-8">
          Register for a new account to get more opportunities.
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
              autoComplete="new-password"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block font-ui text-sm font-medium text-brown mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              autoComplete="new-password"
              required
              className="w-full font-ui text-sm border border-border rounded-sm px-3 py-2.5 bg-ivory focus:border-gold-muted outline-none"
            />
          </div>
          <Button type="submit" className="w-full justify-center" size="lg">
            Register
          </Button>
        </form>

        <p className="font-ui text-sm text-center text-charcoal-muted mt-6">
          Already have an account?{" "}
          <Link href="/account/sign-in" className="text-gold hover:text-brown transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
