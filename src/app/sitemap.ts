import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllNotes, getAllPosts, getAllProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/writing", "/writing/archive", "/notes", "/about", "/about/experience", "/gallery", "/now", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
  }));
  return [
    ...pages,
    ...getAllProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...getAllPosts()
      .filter((p) => !p.draft)
      .map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: p.updated || p.date })),
    ...getAllNotes().map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: n.updated || n.date })),
  ];
}
