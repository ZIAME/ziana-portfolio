export const HEADLINE_WORDS = [
  "Ziana Saif",
  "Product Designer",
  "UX/UI",
  "Creative thinker",
  "Coffee lover",
  "Artist",
];

export const DESCRIPTION =
  "I design products end-to-end, from 0→1 builds to fixing what's already broken. With product thinking baked into every decision, not bolted on after.";

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
