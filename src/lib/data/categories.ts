import type { Category } from "@/types/book";

export const categories: Category[] = [
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "AI systems, agents, and applied intelligence",
    bookCount: 420,
    icon: "brain",
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    description: "Models, training, and MLOps",
    bookCount: 380,
    icon: "network",
  },
  {
    slug: "data-science",
    name: "Data Science",
    description: "Analytics, statistics, and data engineering",
    bookCount: 310,
    icon: "chart",
  },
  {
    slug: "programming",
    name: "Programming",
    description: "Languages, frameworks, and software craft",
    bookCount: 890,
    icon: "code",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Security, privacy, and threat defense",
    bookCount: 245,
    icon: "shield",
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    description: "AWS, Azure, Kubernetes, and cloud-native",
    bookCount: 198,
    icon: "cloud",
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    description: "Architecture, design, and delivery",
    bookCount: 520,
    icon: "layers",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    description: "Theory, algorithms, and foundations",
    bookCount: 275,
    icon: "cpu",
  },
  {
    slug: "business",
    name: "Business",
    description: "Strategy, management, and leadership",
    bookCount: 340,
    icon: "briefcase",
  },
  {
    slug: "engineering",
    name: "Engineering",
    description: "Technical and applied engineering titles",
    bookCount: 410,
    icon: "wrench",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
