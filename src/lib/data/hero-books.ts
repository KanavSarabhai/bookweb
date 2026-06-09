export interface HeroBook {
  slug: string;
  title: string;
  author: string;
  /** Local path under /public, e.g. /books/fluent-python-2nd-edition.jpg */
  coverUrl: string;
  spineColor: string;
  depth: "forward" | "behind";
  position: number;
}

export const heroShowcaseBooks: HeroBook[] = [
  {
    slug: "fluent-python-2nd-edition",
    title: "Fluent Python",
    author: "Luciano Ramalho",
    coverUrl: "/books/fluent python.jpg",
    spineColor: "#1e3d32",
    depth: "forward",
    position: 0,
  },
  {
    slug: "designing-machine-learning-systems",
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    coverUrl: "/books/designing-ml.jpg",
    spineColor: "#2a2420",
    depth: "behind",
    position: 1,
  },
  {
    slug: "kubernetes-book-2026",
    title: "The Kubernetes Book",
    author: "Nigel Poulton",
    coverUrl: "/books/kubernetes-book-2026.jpg",
    spineColor: "#1a4d8c",
    depth: "forward",
    position: 2,
  },
  {
    slug: "system-design-interview",
    title: "System Design Interview",
    author: "Alex Xu",
    coverUrl: "/books/system design.jpg",
    spineColor: "#1a1a2e",
    depth: "behind",
    position: 3,
  },
];

export const heroPublishers = [
  "O'Reilly",
  "Manning",
  "Wiley",
  "Packt",
  "Pearson",
  "Springer",
  "McGraw Hill",
] as const;
