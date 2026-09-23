export const HEADLINE_WORDS = [
  "Ziana Saif",
  "Product Designer",
  "UX/UI",
  "Creative thinker",
  "Coffee lover",
  "Artist",
];

export const DESCRIPTION =
  "2+ years designing products, from 0→1 builds to fixing what was already out in the world. I design for the user and for whoever's paying for the product to exist.";

// TODO: replace with final services list
export const SERVICES = [
  "UX Research",
  "UI Design",
  "Design Systems",
  "Prototyping",
  "0→1 Design",
];

import { CONTACT_LINKS, RESUME_HREF } from "@/lib/contact";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Resume", href: RESUME_HREF },
];

export const SOCIAL_LINKS = [
  { label: "Email", href: CONTACT_LINKS.mail.href },
  { label: "Behance", href: CONTACT_LINKS.behance.href },
  { label: "LinkedIn", href: CONTACT_LINKS.linkedin.href },
  { label: "Instagram", href: CONTACT_LINKS.instagram.href },
] as const;
