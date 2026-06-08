"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroBookShowcase } from "@/components/home/HeroBookShowcase";
import { HeroCTA } from "@/components/home/HeroCTA";
import { heroShowcaseBooks, heroPublishers } from "@/lib/data/hero-books";

export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "#F8F6F3" }}
      aria-label="Hero"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(232,44,42,0.025) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      {/* Trust badge */}
      <motion.div
        className="absolute top-24 sm:top-28 lg:top-32 right-4 sm:right-8 lg:right-12 z-10 hidden md:block"
        {...fadeUp(0.55)}
      >
        <div className="flex items-center justify-center size-[7.5rem] lg:size-[8.5rem] rounded-full border border-[#121212]/10 bg-white/30 backdrop-blur-md px-4 text-center">
          <p className="font-ui text-[0.625rem] lg:text-[0.6875rem] font-medium leading-snug tracking-wide text-[#121212]/55">
            Trusted by Students &amp; Professionals Worldwide
          </p>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="flex-1 flex flex-col justify-center mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 pt-28 sm:pt-32 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-6 xl:gap-10 items-center flex-1">
          {/* Left — editorial copy */}
          <div className="flex flex-col justify-center lg:pr-6 xl:pr-10 order-2 lg:order-1">
            <motion.p
              className="font-ui text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brick mb-6 sm:mb-8"
              {...fadeUp(0.1)}
            >
              Knowledge builds tomorrow
            </motion.p>

            <motion.h1
              className="font-display text-[#121212] font-normal tracking-[-0.035em] leading-[0.95] mb-8 sm:mb-10"
              style={{
                fontSize: "clamp(2.75rem, 5.5vw + 0.5rem, 5.75rem)",
              }}
              {...fadeUp(0.18)}
            >
              Books for builders of tomorrow
            </motion.h1>

            <motion.p
              className="font-ui text-[#121212]/60 text-base sm:text-[1.0625rem] leading-[1.75] max-w-md mb-10 sm:mb-12"
              {...fadeUp(0.28)}
            >
              Explore programming, artificial intelligence, data science, cybersecurity,
              engineering, business, and academic titles from trusted global publishers.
            </motion.p>

            <HeroCTA />
          </div>

          {/* Right — product showcase */}
          <motion.div
            className="relative order-1 lg:order-2 h-[42vh] sm:h-[48vh] lg:h-[min(72vh,640px)] w-full"
            {...fadeUp(0.22)}
          >
            <HeroBookShowcase books={heroShowcaseBooks} />
          </motion.div>
        </div>

        {/* Publisher wordmarks */}
        <motion.div
          className="mt-8 lg:mt-4 pt-8 lg:pt-10 border-t border-[#121212]/6"
          {...fadeUp(0.5)}
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-14 gap-y-4">
            {heroPublishers.map((name) => (
              <li key={name}>
                <span className="font-ui text-xs sm:text-sm font-medium tracking-wide text-[#121212]/25 select-none">
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
