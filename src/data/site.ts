/**
 * Global site configuration.
 * Edit this file to change the name, navigation, profile links and categories.
 * Empty strings are treated as "not supplied yet" and rendered as clear placeholders.
 */

export const site = {
  name: "Hasan Busalih",
  shortName: "HB",
  description:
    "Hasan Busalih — an aspiring engineer in Melbourne documenting projects, writing, experiments and observations on electrical engineering, AI, art and ideas.",
  // Set NEXT_PUBLIC_SITE_URL in production (e.g. on Vercel) so canonical URLs,
  // the sitemap and Open Graph previews point at the real domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_AU",
  location: "Melbourne, Australia",
  footerPhrase: "Made with curiosity.",
  links: {
    github: "https://github.com/nqvc",
    // To be supplied by Hasan. Leave empty until a real URL exists.
    linkedin: "",
    // To be supplied by Hasan. Leave empty until a real address exists — never invent one.
    email: "",
  },
  // Optional extra public profiles: { label: "Instagram", href: "https://…" }
  otherProfiles: [] as { label: string; href: string }[],
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

export const secondaryNav = [
  { label: "Notes", href: "/notes" },
  { label: "Gallery", href: "/gallery" },
  { label: "Now", href: "/now" },
  { label: "Archive", href: "/writing/archive" },
  { label: "Experience", href: "/about/experience" },
  { label: "Contact", href: "/contact" },
];

export const writingCategories = [
  { slug: "engineering-technology", label: "Engineering & Technology" },
  { slug: "personal-notes", label: "Personal Notes" },
  { slug: "art-interpretation", label: "Art & Interpretation" },
  { slug: "places-experiences", label: "Places & Experiences" },
  { slug: "ideas-perspectives", label: "Ideas & Perspectives" },
  { slug: "outside-the-classroom", label: "Outside the Classroom" },
] as const;

export type WritingCategory = (typeof writingCategories)[number]["slug"];

export const projectCategories = [
  { slug: "engineering", label: "Engineering" },
  { slug: "software", label: "Software" },
  { slug: "research", label: "Research" },
  { slug: "creative", label: "Creative work" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["slug"];

export function categoryLabel(slug: string) {
  return (
    writingCategories.find((c) => c.slug === slug)?.label ??
    projectCategories.find((c) => c.slug === slug)?.label ??
    slug
  );
}

/** Maturity of a note in the digital garden. */
export const noteStatuses = {
  seed: { label: "Seed", description: "A first thought. Rough, possibly wrong." },
  growing: { label: "Growing", description: "Being worked on and revised." },
  evergreen: { label: "Evergreen", description: "Settled enough to stand on its own." },
} as const;

export type NoteStatus = keyof typeof noteStatuses;

/** Stage of a project — used to separate ideas from prototypes and results. */
export const projectStatuses = {
  idea: "Idea",
  proposed: "Proposed",
  research: "Research",
  prototype: "Prototype",
  ongoing: "Ongoing",
  complete: "Complete",
  paused: "Paused",
} as const;

export type ProjectStatus = keyof typeof projectStatuses;
