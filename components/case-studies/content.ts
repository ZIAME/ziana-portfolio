export type CaseStudy = {
  id: string;
  tags: string[];
  role: "Solo" | "Team";
  title: string;
  description: string;
  // TODO: swap in the real project image
  image: string | null;
  imageAlt: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "peepdo",
    tags: ["C2C", "Marketplace", "Scheduling"],
    role: "Solo",
    title: "Peepdo",
    description: "A C2C service marketplace connecting two user roles. Built 0→1",
    image: "/case-studies/peepdo.png",
    imageAlt: "Peepdo app screens",
  },
  {
    id: "asar-care",
    tags: ["Healthcare", "Design System", "CMS"],
    role: "Solo",
    title: "Asar.care",
    description: "A healthcare tourism site built to scale with heavy, CMS-driven content.",
    image: "/case-studies/asar-care.webp",
    imageAlt: "Asar.care website on a laptop",
  },
  {
    id: "neom",
    tags: ["E-commerce", "Redesign", "Retail"],
    role: "Team",
    title: "Neom",
    description: "Improving product discovery, dashboard flow, and checkout upsells.",
    image: "/case-studies/neom.png",
    imageAlt: "Neom e-commerce product page on a laptop",
  },
  {
    id: "amorr",
    tags: ["Dashboard", "RBAC", "0→1"],
    role: "Solo",
    title: "Amorr - Admin Dashboard",
    description: "Track, compare, and reuse iterations in AI-driven design workflows.",
    image: "/case-studies/amorr.png",
    imageAlt: "Amorr admin dashboard on a laptop",
  },
];
