export const EMAIL = "zianasaif05@gmail.com";

// Off-site profiles and the resume PDF open in a new tab; in-page anchors and
// mailto: links don't.
export function newTabProps(href: string) {
  return /^https?:\/\//.test(href) || href.endsWith(".pdf")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export const RESUME_HREF =
  "https://drive.google.com/file/d/14EYxMG-gdJAlEtoxyVaBj4gK4BnVbRZ7/view?usp=sharing";

export const CONTACT_LINKS = {
  mail: { label: "Mail", display: EMAIL, href: `mailto:${EMAIL}` },
  linkedin: {
    label: "Linkedin",
    display: "in/zianasaif",
    href: "https://www.linkedin.com/in/zianasaif",
  },
  behance: {
    label: "Behance",
    display: "behance.net/zianasaif",
    href: "https://www.behance.net/zianasaif",
  },
  instagram: {
    label: "Instagram",
    display: "@zillixy",
    href: "https://www.instagram.com/zillixy",
  },
} as const;
