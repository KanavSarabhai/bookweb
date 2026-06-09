import type { Metadata } from "next";
import { RetailersPageClient } from "@/components/retailers/RetailersPageClient";

export const metadata: Metadata = {
  title: "Retailers & Distributors",
  description:
    "Partner with Shroff Publishers & Distributors — wholesale pricing, institutional orders, and distribution programs across India.",
};

export default function RetailersPage() {
  return <RetailersPageClient />;
}
