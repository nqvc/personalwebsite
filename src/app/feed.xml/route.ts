import { site } from "@/data/site";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = getAllPosts().filter((p) => !p.draft);
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${site.url}/writing/${p.slug}</link>
  <guid>${site.url}/writing/${p.slug}</guid>
  <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
  <description>${esc(p.summary)}</description>
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)}</title>
  <link>${site.url}</link>
  <description>${esc(site.description)}</description>
  <language>en-au</language>
  <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
