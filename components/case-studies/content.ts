export type CaseStudy = {
  id: string;
  tags: string[];
  role: "Solo" | "Team";
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
  // Case studies without a link yet are left out of the page entirely.
  href: string | null;
};

const ALL_CASE_STUDIES: CaseStudy[] = [
  {
    id: "peepdo",
    tags: ["C2C", "Marketplace", "0→1"],
    role: "Solo",
    title: "Peepdo",
    description:
      "A two-sided C2C marketplace, 77 screens across iOS and Android in 8 months, including a 9-step→1-step reduction in a core user flow.",
    image: "/case-studies/peepdo.png",
    imageAlt: "Peepdo app screens",
    href: "https://www.behance.net/gallery/253715509/Peepdo-UX-Case-Study",
  },
  {
    id: "asar-care",
    tags: ["Healthcare", "CMS", "Component System"],
    role: "Solo",
    title: "Asar.care",
    description:
      "Built to let non-designers publish heavy content without breaking the design, audited against an AI-generated structural baseline.",
    image: "/case-studies/asar-care.webp",
    imageAlt: "Asar.care website on a laptop",
    href: null,
  },
  {
    id: "neom",
    tags: ["E-commerce", "Redesign", "Retail"],
    role: "Solo",
    title: "Neom",
    description:
      "Redesigned product discovery, dashboard flow, and checkout upsells on a live retail site, closing gaps between browsing and buying.",
    image: "/case-studies/neom.png",
    imageAlt: "Neom e-commerce product page on a laptop",
    href: "https://www.behance.net/gallery/226409207/Neom-E-commerce-website-Redesign",
  },
  {
    id: "amorr",
    tags: ["Dashboard", "RBAC", "0→1"],
    role: "Solo",
    title: "Amorr - Admin Dashboard",
    description:
      "Dating app admin dashboard with role-based access, moderators review and ban profiles; a separate role handles user data, so no one account has both powers.",
    image: "/case-studies/amorr.png",
    imageAlt: "Amorr admin dashboard on a laptop",
    href: "https://www.behance.net/gallery/227116095/Admin-Dashboard-Amorr",
  },
];

export const CASE_STUDIES = ALL_CASE_STUDIES.filter((study) => study.href !== null);
