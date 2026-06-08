"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface HeroCTAProps {
  className?: string;
}

export function HeroCTA({ className }: HeroCTAProps) {
  const reducedMotion = useReducedMotion();

  const hover = reducedMotion
    ? {}
    : { scale: 1.02, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } };

  const tap = reducedMotion ? {} : { scale: 0.98 };

  return (
    <div className={className}>
      <motion.div
        className="flex flex-wrap items-center gap-3 sm:gap-4"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <motion.div whileHover={hover} whileTap={tap}>
          <Link
            href="/books"
            className="inline-flex items-center justify-center font-ui text-sm font-medium tracking-wide bg-[#121212] text-[#F8F6F3] px-7 sm:px-8 py-3.5 rounded-full transition-colors hover:bg-[#2a2a2a]"
          >
            Browse Books
          </Link>
        </motion.div>
        <motion.div whileHover={hover} whileTap={tap}>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center font-ui text-sm font-medium tracking-wide text-[#121212] border border-[#121212]/15 bg-white/40 backdrop-blur-sm px-7 sm:px-8 py-3.5 rounded-full transition-colors hover:border-[#121212]/30 hover:bg-white/70"
          >
            Explore Categories
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
