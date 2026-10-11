import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, NoteBadge } from "@/components/ui";
import { getAllNotes, getAllPosts, getAllProjects, getNote, renderMarkdown } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return pageMetadata({ title: n.title, description: n.plainText.slice(0, 155), path: `/notes/${n.slug}`, type: "article", publishedTime: n.date });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const { html } = await renderMarkdown(note.body);
  const posts = getAllPosts().filter((p) => note.relatedPosts.includes(p.slug));
  const projects = getAllProjects().filter((p) => note.relatedProjects.includes(p.slug));

  return (
    <article>
      <header className="container article-header">
        <p className="case-header__back">
          <Link href="/notes" className="text-button">
            ← All notes
          </Link>
        </p>
        <NoteBadge status={note.status} />
        <h1 className="article-header__title" style={{ fontSize: "var(--step-4)" }}>
          {note.title}
        </h1>
        <div className="article-header__meta">
          <p className="meta">
            Planted <time dateTime={note.date}>{formatDate(note.date)}</time>
            {note.updated && (
              <>
                {" "}
                · Tended <time dateTime={note.updated}>{formatDate(note.updated)}</time>
              </>
            )}
          </p>
          <p className="tag-list" style={{ marginTop: 0 }}>
            {note.tags.map((t) => (
              <Link key={t} href={`/notes?tag=${encodeURIComponent(t)}`} className="tag">
                #{t}
              </Link>
            ))}
          </p>
        </div>
      </header>
      <div className="container article-body">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        {(posts.length > 0 || projects.length > 0 || note.links.length > 0) && (
          <div className="note-links">
            <p className="mono-label">Connected to</p>
            {projects.map((p) => (
              <ArrowLink key={p.slug} href={`/projects/${p.slug}`}>
                Project: {p.title}
              </ArrowLink>
            ))}
            {posts.map((p) => (
              <ArrowLink key={p.slug} href={`/writing/${p.slug}`}>
                Writing: {p.title}
              </ArrowLink>
            ))}
            {note.links.map((l) => (
              <ArrowLink key={l.href} href={l.href} external>
                {l.label}
              </ArrowLink>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
