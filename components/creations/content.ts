export type Tool = {
  name: string;
  color: string;
  // When set, the pill shows this logo instead of a colored initial.
  icon?: string;
};

export type AlbumImage = {
  // TODO: swap in the real image once supplied — null renders a placeholder tile
  src: string | null;
  alt: string;
};

export type AlbumItem = {
  type: "album";
  id: string;
  title: string;
  cover: string | null;
  subtitle: string;
  tools: Tool[];
  images: AlbumImage[];
};

export type LinkItem = {
  type: "link";
  id: string;
  title: string;
  cover: string | null;
  href: string;
};

export type CreationItem = AlbumItem | LinkItem;

// Small fixed base rotation per card (deg), and how far it swings on hover —
// gives each card its own resting tilt like photos scattered on a table.
export const CARD_TILTS: { rest: number; hover: number }[] = [
  { rest: -4, hover: -8 },
  { rest: 3, hover: 7 },
  { rest: -5, hover: -9 },
  { rest: 4, hover: 8 },
  { rest: -3, hover: 3 },
];

export const CREATIONS: CreationItem[] = [
  {
    type: "album",
    id: "graphics",
    title: "Graphics",
    cover: "/creations/graphics/uitopia-poster.jpg",
    // TODO: confirm real subtitle + tool list
    subtitle: "6+ clients",
    tools: [
      { name: "Canva", color: "#00C4CC", icon: "/creations/tools/canva.png" },
      { name: "Photoshop", color: "#31A8FF", icon: "/creations/tools/photoshop.png" },
      { name: "Illustrator", color: "#FF9A00", icon: "/creations/tools/illustrator.png" },
      { name: "Figma", color: "#A259FF", icon: "/creations/tools/figma.png" },
    ],
    images: [
      { src: "/creations/graphics/bacca-bucci.webp", alt: "Bacca Bucci company profile infographic" },
      { src: "/creations/graphics/grayy-tales-flatheads.png", alt: "Grayy Tales infographic on Flatheads" },
      { src: "/creations/graphics/inacan.webp", alt: "InACan company profile infographic" },
      { src: "/creations/graphics/souled-store.webp", alt: "The Souled Store company profile infographic" },
      { src: "/creations/graphics/zepto.webp", alt: "Zepto company profile infographic" },
      { src: "/creations/graphics/uitopia-poster.jpg", alt: "UItopia UI/UX workshop poster" },
      { src: "/creations/graphics/dandiya-mahotsav.webp", alt: "Dandiya Mahotsav event poster for Sewa Haat" },
      { src: "/creations/graphics/neom-monsoon-essentials.png", alt: "Neom Monsoon Essentials product poster" },
      { src: "/creations/graphics/ikora-studio.png", alt: "Ikora aerial and pilates studio flyer" },
      { src: "/creations/graphics/chai-date.png", alt: "\"Chai Date\" social media poster" },
      { src: "/creations/graphics/neom-samosa.png", alt: "Neom samosa social media poster" },
      { src: "/creations/graphics/anupam-mittal.png", alt: "Anupam Mittal infographic" },
    ],
  },
  {
    type: "album",
    id: "photography",
    title: "Photography",
    cover: "/creations/photography/photo-01.jpg",
    subtitle: "", // TODO
    tools: [],
    images: [
      { src: "/creations/photography/photo-01.jpg", alt: "Orange flower through a chain-link fence" },
      { src: "/creations/photography/photo-02.jpg", alt: "Sunlight and shadow on a wall corner" },
      { src: "/creations/photography/photo-03.jpg", alt: "Teddy bear in a dim room" },
      { src: "/creations/photography/photo-04.jpg", alt: "Sunset reflected in a wet pavement" },
      { src: "/creations/photography/photo-05.jpg", alt: "Close-up of a manhole cover" },
      { src: "/creations/photography/photo-06.jpg", alt: "Silhouette between carved stone pillars" },
      { src: "/creations/photography/photo-07.jpg", alt: "Hands holding a Nikon camera" },
      { src: "/creations/photography/photo-08.jpg", alt: "Blurred red light in the dark" },
      { src: "/creations/photography/photo-09.jpg", alt: "Cat silhouette watching a TV screen" },
      { src: "/creations/photography/photo-10.jpg", alt: "Lamp post surrounded by plumeria flowers" },
      { src: "/creations/photography/photo-11.jpg", alt: "Metal bowl mounted on a tree trunk" },
      { src: "/creations/photography/photo-12.jpg", alt: "Bird flying over a jacaranda tree" },
      { src: "/creations/photography/photo-13.jpg", alt: "Sunset framed through a small window" },
      { src: "/creations/photography/photo-14.jpg", alt: "Palm trees against a cloudy sky" },
    ],
  },
  {
    type: "album",
    id: "brandings",
    title: "Brandings",
    cover: "/creations/brandings/todzioo.webp",
    subtitle: "", // TODO
    tools: [
      { name: "Illustrator", color: "#FF9A00", icon: "/creations/tools/illustrator.png" },
      { name: "Figma", color: "#A259FF", icon: "/creations/tools/figma.png" },
      { name: "Miro", color: "#FFD02F" },
    ],
    images: [
      { src: "/creations/brandings/kiyo.webp", alt: "Kiyo brand mark" },
      { src: "/creations/brandings/fomo.webp", alt: "FOMO brand logo" },
      { src: "/creations/brandings/todzioo.webp", alt: "TodZioo brand logo" },
      { src: "/creations/brandings/butterfly.png", alt: "Pixel butterfly brand mark" },
      { src: "/creations/brandings/v-mark.png", alt: "V. brand mark" },
    ],
  },
  {
    type: "album",
    id: "art",
    title: "Art",
    cover: "/creations/art/art-01.jpg",
    subtitle: "", // TODO
    tools: [
      { name: "MediBang Paint Pro", color: "#00BFDB", icon: "/creations/tools/medibang.png" },
      { name: "Krita", color: "#3BABF0", icon: "/creations/tools/krita.svg" },
      { name: "Adobe Illustrator", color: "#FF9A00", icon: "/creations/tools/illustrator.png" },
    ],
    images: [
      { src: "/creations/art/art-01.jpg", alt: "Illustration of a girl in a yellow sweater" },
      { src: "/creations/art/art-02.jpg", alt: "Pencil portrait sketch" },
      { src: "/creations/art/art-03.webp", alt: "Digital painting in progress on a tablet and laptop" },
      { src: "/creations/art/art-04.jpg", alt: "Sketching a building outdoors" },
      { src: "/creations/art/art-05.jpg", alt: "Close-up of loom knitting in progress" },
      { src: "/creations/art/art-07.jpg", alt: "Illustration of a girl in a Santa hat" },
      { src: "/creations/art/art-08.jpg", alt: "Illustration of a horned anime girl" },
      { src: "/creations/art/art-09.jpg", alt: "Illustration of a girl with colorful hair" },
      { src: "/creations/art/art-10.jpg", alt: "Sketch of a girl sitting on clouds" },
      { src: "/creations/art/art-11.jpg", alt: "Digital painting of a mountain landscape" },
      { src: "/creations/art/art-12.jpg", alt: "Happy New Year illustration of a girl with balloons" },
      { src: "/creations/art/art-13.jpg", alt: "Illustration of a girl drawing in front of stylized letters" },
      { src: "/creations/art/art-14.png", alt: "Grid of pixel-art illustrations" },
    ],
  },
  {
    type: "link",
    id: "webtoon",
    title: "Webtoon — Coin & Unlock Flow",
    cover: "/creations/webtoon-cover.webp",
    href: "https://www.behance.net/gallery/254905227/Webtoon-User-flow-UX-Audit",
  },
];
