export type BioMode = "professional" | "real";

export type StackIcon = {
  src: string;
  label: string;
};

export type Bio = {
  paragraphs: string[];
  stack: StackIcon[];
};

// TODO: swap in an updated photo — keep it 4:5 (object-cover handles any source size)
export const PHOTO_SRC = "/about/me.jpeg";

export const BIO_TABS: { mode: BioMode; label: string }[] = [
  { mode: "professional", label: "Professional Me" },
  { mode: "real", label: "Real Me" },
];

export const BIOS: Record<BioMode, Bio> = {
  professional: {
    paragraphs: [
      "Product Designer with 2+ years of experience shipping across B2C, B2B, C2C, and fintech. From a startup to a marketing agency to freelance. My largest solo project, Peepdo, took a C2C marketplace from zero to a 77-screen product across iOS and Android in 8 months.",
      "I care about the parts most people skip; the states in between, the copy nobody reviews, the interaction that makes something feel considered instead of assembled.",
    ],
    stack: [
      { src: "/about/stack/figma.png", label: "Figma" },
      { src: "/about/stack/framer.png", label: "Framer" },
      { src: "/about/stack/chatgpt.png", label: "ChatGPT" },
      { src: "/about/stack/cursor.png", label: "Cursor" },
      { src: "/about/stack/claude.png", label: "Claude" },
    ],
  },
  real: {
    paragraphs: [
      "I've been making things with my hands for as long as I can remember, jewellery boxes out of popsicle sticks, windchimes out of straws, whatever scraps were lying around turned into something new. I grew up homeschooled in Saudi Arabia until I was sixteen, which meant a lot of unstructured time to just make, no real curriculum around it, just an instinct I never thought to name.",
      "When I moved back to India in 2019, I didn't know what to do with that instinct. I didn't think of myself as someone who could actually be creative for a living, it felt like a talent other people had, not a path I was allowed to take seriously. So I did the practical thing: pre-med first, then computer science. Neither one fit.",
      "Product design turned out to be exactly that intersection: structured enough to use the technical, analytical side of my brain, open enough to still let me build and shape things the way I did as a kid with popsicle sticks and straws.",
    ],
    stack: [
      { src: "/about/stack/scissors.png", label: "Scissors" },
      { src: "/about/stack/glue-gun.png", label: "Glue gun" },
      { src: "/about/stack/tape.png", label: "Tape" },
      { src: "/about/stack/pencil.png", label: "Pencil" },
      { src: "/about/stack/tablet.png", label: "Drawing tablet" },
    ],
  },
};
