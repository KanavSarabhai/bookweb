"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBookShowcase } from "@/components/home/HeroBookShowcase";
import { heroShowcaseBooks, heroPublishers } from "@/lib/data/hero-books";

function fadeUp(delay: number, reduced: boolean | null) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.90, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-x-hidden"
      style={{ background: "var(--surface)" }}
      aria-label="Hero"
    >
      {/* ── Layered warm-cream background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(158deg, #fdfaf6 0%, #f5ede0 50%, #f8f5f0 100%)",
            "radial-gradient(ellipse 75% 55% at 72% 8%, rgba(255,255,255,0.70) 0%, transparent 65%)",
            "radial-gradient(ellipse 55% 45% at 18% 88%, rgba(240,227,208,0.40) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 35% at 60% 50%, rgba(196,106,58,0.04) 0%, transparent 70%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 flex-1 flex flex-col mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-20 pt-24 sm:pt-28 lg:pt-20 pb-0">

        {/* ── 2-col grid ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[45%_55%] items-center gap-10 lg:gap-4 xl:gap-10">

          {/* ════ LEFT ════ */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-8 xl:pr-16 pb-10 lg:pb-0">

            {/* Eyebrow */}
            <motion.p
              className="font-ui font-semibold uppercase mb-5 sm:mb-6"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.20em", color: "var(--copper)" }}
              {...fadeUp(0.08, reduced)}
            >
              Knowledge builds tomorrow
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="font-display font-normal leading-[1.05] tracking-[-0.03em] mb-7 sm:mb-8"
              style={{ fontSize: "clamp(2.6rem, 5vw + 0.6rem, 5.8rem)", color: "var(--ink)" }}
              {...fadeUp(0.18, reduced)}
            >
              Books for builders<br className="hidden sm:block" /> of tomorrow
            </motion.h1>

            {/* Body */}
            <motion.p
              className="font-ui leading-[1.85] mb-10 sm:mb-12"
              style={{ fontSize: "clamp(0.95rem, 1vw + 0.4rem, 1.0625rem)", color: "var(--ink-muted)", maxWidth: "420px" }}
              {...fadeUp(0.30, reduced)}
            >
              Explore programming, artificial intelligence, data science,
              cybersecurity, engineering, business, and academic titles from
              trusted global publishers.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap items-center gap-3 sm:gap-4" {...fadeUp(0.42, reduced)}>

              {/* Primary — dark */}
              <motion.div
                whileHover={reduced ? {} : { scale: 1.025, transition: { duration: 0.22 } }}
                whileTap={reduced ? {} : { scale: 0.975 }}
              >
                <Link
                  href="/books"
                  className="inline-flex items-center justify-center font-ui font-medium rounded-full"
                  style={{ fontSize: "0.875rem", padding: "14px 30px", background: "var(--ink)", color: "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2d2d2d")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
                >
                  Browse Books
                </Link>
              </motion.div>

              {/* Secondary — ghost */}
              <motion.div
                whileHover={reduced ? {} : { scale: 1.025, transition: { duration: 0.22 } }}
                whileTap={reduced ? {} : { scale: 0.975 }}
              >
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center font-ui font-medium rounded-full"
                  style={{
                    fontSize: "0.875rem",
                    padding: "13px 28px",
                    color: "var(--ink)",
                    border: "1px solid rgba(22,22,22,0.16)",
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(22,22,22,0.32)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(22,22,22,0.16)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.55)";
                  }}
                >
                  Explore Categories
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ════ RIGHT — showcase ════ */}
          <div className="order-1 lg:order-2 w-full flex items-center justify-center">
            <HeroBookShowcase books={heroShowcaseBooks} />
          </div>
        </div>

        {/* ── Publisher strip ── */}
        <motion.div
          className="pt-7 lg:pt-9"
          style={{ borderTop: "1px solid var(--border)" }}
          {...fadeUp(0.62, reduced)}
        >
          <p
            className="font-ui font-semibold uppercase text-center lg:text-left mb-4"
            style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "var(--ink-faint)" }}
          >
            Titles from leading publishers
          </p>
          <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 sm:gap-x-10 gap-y-3 pb-10 lg:pb-12">
            {heroPublishers.map((name) => (
              <li key={name}>
                <span
                  className="font-ui font-medium select-none"
                  style={{ fontSize: "0.8125rem", letterSpacing: "0.03em", color: "rgba(22,22,22,0.22)" }}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
