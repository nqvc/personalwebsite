/**
 * Visual archive (/gallery).
 *
 * To add a photo: put the file in /public/images/gallery/ and add an entry with
 * `src: "/images/gallery/your-file.jpg"`, `width` and `height` (original pixels,
 * so proportions are respected), a real `alt` description, and a collection.
 *
 * Entries without `src` render as clearly-labelled placeholders.
 */

export const collections = [
  { slug: "melbourne", label: "Melbourne" },
  { slug: "travel", label: "Travel" },
  { slug: "art", label: "Art & drawings" },
  { slug: "projects", label: "Projects & experiments" },
  { slug: "everyday", label: "Everyday moments" },
] as const;

export type CollectionSlug = (typeof collections)[number]["slug"];

export type GalleryItem = {
  id: string;
  src?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  date?: string;
  collection: CollectionSlug;
};

export const gallery: GalleryItem[] = [
  { id: "mel-1", width: 4, height: 5, alt: "Placeholder for a Melbourne photograph", caption: "Melbourne — photo to be added", collection: "melbourne" },
  { id: "mel-2", width: 3, height: 2, alt: "Placeholder for a Melbourne photograph", caption: "Melbourne — photo to be added", collection: "melbourne" },
  { id: "art-1", width: 3, height: 4, alt: "Placeholder for a drawing", caption: "Drawing — scan to be added", collection: "art" },
  { id: "proj-1", width: 4, height: 3, alt: "Placeholder for a solar tracker prototype photograph", caption: "Solar tracker prototype — photo to be added", collection: "projects" },
  { id: "travel-1", width: 16, height: 10, alt: "Placeholder for a travel photograph", caption: "Travel — photo to be added", collection: "travel" },
  { id: "every-1", width: 1, height: 1, alt: "Placeholder for an everyday photograph", caption: "Everyday — photo to be added", collection: "everyday" },
  { id: "art-2", width: 4, height: 5, alt: "Placeholder for a sketchbook page", caption: "Sketchbook page — scan to be added", collection: "art" },
  { id: "mel-3", width: 2, height: 3, alt: "Placeholder for a Melbourne photograph", caption: "Melbourne — photo to be added", collection: "melbourne" },
  { id: "proj-2", width: 3, height: 2, alt: "Placeholder for a project or experiment photograph", caption: "Experiment — photo to be added", collection: "projects" },
];
