import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    author?: string;
    publisher?: string;
    subject?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.author) qs.set("author", params.author);
  if (params.publisher) qs.set("publisher", params.publisher);
  if (params.subject) qs.set("subject", params.subject);
  redirect(`/books?${qs.toString()}`);
}
