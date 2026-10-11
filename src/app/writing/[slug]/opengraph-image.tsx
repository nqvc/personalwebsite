import { ImageResponse } from "next/og";
import { categoryLabel, site } from "@/data/site";
import { getAllPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article preview";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F7F5F0", color: "#20211F" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, color: "#5C6043" }}>{post ? categoryLabel(post.category).toUpperCase() : "WRITING"}</div>
        <div style={{ display: "flex", fontSize: post && post.title.length > 50 ? 64 : 80, lineHeight: 1.05, letterSpacing: -1.5 }}>{post?.title ?? site.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #DFDDD5", paddingTop: 24, fontSize: 24, color: "#6B6A63" }}>
          <span>{site.name}</span>
          <span>{post ? `${formatDate(post.date)} · ${post.readingTime} min read` : ""}</span>
        </div>
      </div>
    ),
    size,
  );
}
