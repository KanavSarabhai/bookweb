import type { Metadata } from "next";
import Link from "next/link";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Create Account",
};

const inputClass =
  "w-full font-ui text-sm border border-brick rounded-[3.75px] px-3 py-2.5 bg-cream text-press outline-none focus:ring-1 focus:ring-brick";

export default function RegisterPage() {
  return (
    <div className="bg-cream min-h-screen py-14 lg:py-20">
      <div className="mx-auto max-w-md px-4">
        <p className="section-label mb-4 text-center">Account</p>
        <hr className="hairline mb-8" />
        <h1 className="heading-page mb-2 text-center">Create account</h1>
        <p className="text-body text-center mb-8">
          Register for a new account to get more opportunities.
        </p>

        <form className="space-y-4 card-editorial bg-soft-grey">
          <div>
            <label htmlFor="email" className="block section-label mb-2">
              Email
            </label>
            <input id="email" type="email" name="email" autoComplete="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className="block section-label mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block section-label mb-2">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              autoComplete="new-password"
              required
              className={inputClass}
            />
          </div>
          <ActionLink type="submit" className="w-full justify-center">
            Register →
          </ActionLink>
        </form>

        <p className="font-ui text-sm text-center text-press-muted mt-6">
          Already have an account?{" "}
          <Link href="/account/sign-in" className="text-brick hover:opacity-70 transition-opacity">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
