import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { markdownToPlainText, readingTime, renderMarkdown } from "./markdown";
import type { NoteStatus, ProjectCategory, ProjectStatus, WritingCategory } from "@/data/site";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Drafts (`draft: true`) are visible while running `npm run dev`
 * and hidden from production builds unless SHOW_DRAFTS=true.
 */
const SHOW_DRAFTS = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "true";

type Raw = { slug: string; data: Record<string, unknown>; body: string };

function readCollection(dir: string): Raw[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), "utf8"));
      const slug = (data.slug as string) || file.replace(/\.mdx?$/, "");
      return { slug, data, body: content };
    });
}

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : v instanceof Date ? v.toISOString().slice(0, 10) : fallback);
const arr = <T = string>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

/* ------------------------------------------------------------------ */
/* Writing                                                             */
/* ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: WritingCategory;
  tags: string[];
  date: string;
  updated: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  draft: boolean;
  featured: boolean;
  toc: boolean;
  related: string[];
  relatedProjects: string[];
  readingTime: number;
  plainText: string;
  body: string;
};

export const getAllPosts = cache((): Post[] =>
  readCollection("writing")
    .map(({ slug, data, body }) => ({
      slug,
      title: str(data.title, slug),
      subtitle: str(data.subtitle),
      summary: str(data.summary),
      category: str(data.category, "personal-notes") as WritingCategory,
      tags: arr(data.tags),
      date: str(data.date),
      updated: str(data.updated),
      image: str(data.image),
      imageAlt: str(data.imageAlt),
      imageCaption: str(data.imageCaption),
      draft: data.draft === true,
      featured: data.featured === true,
      toc: data.toc === true,
      related: arr(data.related),
      relatedProjects: arr(data.relatedProjects),
      readingTime: readingTime(markdownToPlainText(body)),
      plainText: markdownToPlainText(body),
      body,
    }))
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
);

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return { newer: i > 0 ? posts[i - 1] : undefined, older: i >= 0 ? posts[i + 1] : undefined };
}

export function getRelatedPosts(post: Post, limit = 3) {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const explicit = post.related.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as Post[];
  const scored = all
    .filter((p) => !explicit.includes(p))
    .map((p) => ({
      p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
  const picked = [...explicit, ...scored];
  // Fall back to the most recent posts so the section is never empty.
  for (const p of all) if (picked.length < limit && !picked.includes(p)) picked.push(p);
  return picked.slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Spec = { label: string; value: string; note?: string };
export type GalleryImage = { src?: string; alt: string; caption?: string; ratio?: string };
export type Reference = { label: string; href?: string };
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  date: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  visual: string;
  image: string;
  imageAlt: string;
  tools: string[];
  specs: Spec[];
  gallery: GalleryImage[];
  references: Reference[];
  links: ProjectLink[];
  relatedPosts: string[];
  draft: boolean;
  plainText: string;
  body: string;
};

export const getAllProjects = cache((): Project[] =>
  readCollection("projects")
    .map(({ slug, data, body }) => ({
      slug,
      title: str(data.title, slug),
      summary: str(data.summary),
      category: str(data.category, "engineering") as ProjectCategory,
      tags: arr(data.tags),
      year: data.year ? String(data.year) : "",
      date: str(data.date),
      status: str(data.status, "idea") as ProjectStatus,
      featured: data.featured === true,
      order: typeof data.order === "number" ? data.order : 99,
      visual: str(data.visual, "grid"),
      image: str(data.image),
      imageAlt: str(data.imageAlt),
      tools: arr(data.tools),
      specs: arr<Spec>(data.specs),
      gallery: arr<GalleryImage>(data.gallery),
      references: arr<Reference>(data.references),
      links: arr<ProjectLink>(data.links),
      relatedPosts: arr(data.relatedPosts),
      draft: data.draft === true,
      plainText: markdownToPlainText(body),
      body,
    }))
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => a.order - b.order),
);

export function getProject(slug: string) {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}

/* ------------------------------------------------------------------ */
/* Notes (digital garden)                                              */
/* ------------------------------------------------------------------ */

export type Note = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  tags: string[];
  status: NoteStatus;
  relatedPosts: string[];
  relatedProjects: string[];
  links: ProjectLink[];
  draft: boolean;
  plainText: string;
  body: string;
};

export const getAllNotes = cache((): Note[] =>
  readCollection("notes")
    .map(({ slug, data, body }) => ({
      slug,
      title: str(data.title, slug),
      date: str(data.date),
      updated: str(data.updated),
      tags: arr(data.tags),
      status: str(data.status, "seed") as NoteStatus,
      relatedPosts: arr(data.relatedPosts),
      relatedProjects: arr(data.relatedProjects),
      links: arr<ProjectLink>(data.links),
      draft: data.draft === true,
      plainText: markdownToPlainText(body),
      body,
    }))
    .filter((n) => SHOW_DRAFTS || !n.draft)
    .sort((a, b) => ((a.updated || a.date) < (b.updated || b.date) ? 1 : -1)),
);

export function getNote(slug: string) {
  return getAllNotes().find((n) => n.slug === slug);
}

export { renderMarkdown };

/* ------------------------------------------------------------------ */
/* Search index                                                        */
/* ------------------------------------------------------------------ */

export type SearchItem = {
  type: "Writing" | "Project" | "Note" | "Page";
  title: string;
  href: string;
  summary: string;
  meta: string;
  text: string;
};

export const getSearchIndex = cache((): SearchItem[] => [
  ...getAllPosts().map((p) => ({
    type: "Writing" as const,
    title: p.title,
    href: `/writing/${p.slug}`,
    summary: p.summary,
    meta: p.date,
    text: `${p.tags.join(" ")} ${p.plainText}`.slice(0, 4000),
  })),
  ...getAllProjects().map((p) => ({
    type: "Project" as const,
    title: p.title,
    href: `/projects/${p.slug}`,
    summary: p.summary,
    meta: p.year,
    text: `${p.tags.join(" ")} ${p.tools.join(" ")} ${p.plainText}`.slice(0, 4000),
  })),
  ...getAllNotes().map((n) => ({
    type: "Note" as const,
    title: n.title,
    href: `/notes/${n.slug}`,
    summary: n.plainText.slice(0, 140),
    meta: n.date,
    text: `${n.tags.join(" ")} ${n.plainText}`.slice(0, 2000),
  })),
  ...[
    { title: "About", href: "/about", summary: "Who I am, where I'm from and what I'm interested in." },
    { title: "Now", href: "/now", summary: "What I'm focused on at the moment." },
    { title: "Gallery", href: "/gallery", summary: "Photographs, sketches and visual experiments." },
    { title: "Experience", href: "/about/experience", summary: "Programmes, participation, volunteering and awards." },
    { title: "Contact", href: "/contact", summary: "How to get in touch." },
    { title: "Writing archive", href: "/writing/archive", summary: "Every post, by year and month." },
  ].map((p) => ({ ...p, type: "Page" as const, meta: "", text: "" })),
]);
