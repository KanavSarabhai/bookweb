import type { Metadata } from "next";
import { CategoriesPageClient } from "@/components/categories/CategoriesPageClient";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse technical book categories at Shroff Publishers.",
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
