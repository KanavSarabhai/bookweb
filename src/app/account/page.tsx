"use client";

import Link from "next/link";
import { User, Package, Heart, LogIn } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Order history",
    description: "Track and manage your past and pending orders.",
  },
  {
    icon: Heart,
    title: "Saved wishlist",
    description: "Access your wishlist across all devices.",
  },
  {
    icon: User,
    title: "Account details",
    description: "Manage your profile, address, and preferences.",
  },
];

export default function AccountPage() {
  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #f8f5f0 0%, #f2ece2 100%)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "80px",
          paddingBottom: "52px",
        }}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="eyebrow mb-4">My account</p>
          <h1
            className="font-display font-normal tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "var(--ink)" }}
          >
            Account
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-4xl">
          {/* Sign In Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid #f0ece6",
              padding: "40px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="inline-flex items-center justify-center size-14 rounded-full mb-6"
              style={{ background: "rgba(196,106,58,0.09)" }}
            >
              <User size={26} style={{ color: "#c46a3a" }} strokeWidth={1.5} />
            </div>

            <h2
              className="font-display font-normal tracking-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)", color: "var(--ink)" }}
            >
              Sign in
            </h2>
            <p
              className="font-ui text-[0.9375rem] leading-relaxed mb-8"
              style={{ color: "var(--ink-muted)" }}
            >
              Sign in to access your orders, saved wishlist, and account details.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="account-email"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </label>
                <input
                  id="account-email"
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    padding: "13px 16px",
                    borderRadius: "10px",
                    border: "1px solid #e7e1d8",
                    background: "#fff",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c46a3a";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,106,58,0.10)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e7e1d8";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="account-password"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Password
                </label>
                <input
                  id="account-password"
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    padding: "13px 16px",
                    borderRadius: "10px",
                    border: "1px solid #e7e1d8",
                    background: "#fff",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c46a3a";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,106,58,0.10)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e7e1d8";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 font-ui text-[0.9375rem] font-medium py-3.5 rounded-full mt-6 transition-all duration-200"
              style={{ background: "#c46a3a", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#a8582e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c46a3a")}
            >
              <LogIn size={17} aria-hidden />
              Sign in
            </button>

            <p className="font-ui text-sm text-center mt-5" style={{ color: "var(--ink-muted)" }}>
              New customer?{" "}
              <Link href="/account/register" className="text-brick hover:opacity-70 transition-opacity font-medium">
                Create an account
              </Link>
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-8">
            <p
              className="font-display font-normal tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)", color: "var(--ink)" }}
            >
              Everything in one place
            </p>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-5">
                <div
                  className="shrink-0 flex items-center justify-center size-11 rounded-[12px]"
                  style={{ background: "rgba(196,106,58,0.09)" }}
                >
                  <Icon size={20} style={{ color: "#c46a3a" }} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-ui font-semibold text-[0.9375rem] mb-1" style={{ color: "var(--ink)" }}>
                    {title}
                  </p>
                  <p className="font-ui text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
