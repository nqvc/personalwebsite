import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/CopyLink";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArrowLink } from "@/components/ui";
import { categoryLabel, site } from "@/data/site";
import { getAdjacentPosts, getAllPosts, getAllProjects, getPost, getRelatedPosts, renderMarkdown } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.summary,
      path: `/writing/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || undefined,
      image: post.image || undefined,
    }),
    ...(post.draft ? { robots: { index: false } } : {}),
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { html, headings } = await renderMarkdown(post.body);
  const { newer, older } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post);
  const projects = getAllProjects().filter((p) => post.relatedProjects.includes(p.slug));
  const showToc = post.toc && headings.length > 2;

  return (
    <article id="article">
      <ReadingProgress targetId="article" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          ...(post.updated ? { dateModified: post.updated } : {}),
          author: { "@type": "Person", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/writing/${post.slug}`,
          ...(post.image ? { image: `${site.url}${post.image}` } : {}),
          articleSection: categoryLabel(post.category),
          keywords: post.tags.join(", "),
        }}
      />
      <header className="container article-header">
        <p className="mono-label">
          <Link href={`/writing?category=${post.category}`} className="meta__category" style={{ textDecoration: "none" }}>
            {categoryLabel(post.category)}
          </Link>
          {post.draft && <span className="badge badge--draft">Draft — not public</span>}
        </p>
        <h1 className="article-header__title">{post.title}</h1>
        {post.subtitle && <p className="article-header__subtitle">{post.subtitle}</p>}
        <div className="article-header__meta">
          <p className="meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime} min read</span>
            {post.updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            )}
          </p>
          <CopyLink title={post.title} />
        </div>
      </header>

      {post.image && (
        <figure className="container article-figure">
          <div className="media media--image">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1240px) 1240px, 100vw" />
          </div>
          {post.imageCaption && <figcaption>{post.imageCaption}</figcaption>}
        </figure>
      )}

      <div className="container article-body">
        {showToc && (
          <details className="toc" open>
            <summary>Contents</summary>
            <nav aria-label="Table of contents">
              <ol>
                {headings.map((h) => (
                  <li key={h.id} className={h.depth === 3 ? "toc__h3" : undefined}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        )}
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <footer className="article-footer">
          <p className="tag-list" style={{ marginTop: 0 }}>
            {post.tags.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </p>
          <CopyLink title={post.title} />
        </footer>
        {projects.length > 0 && (
          <p className="article-footer" style={{ borderTop: 0, marginTop: "var(--space-4)" }}>
            <span className="mono-label">Related project</span>
            {projects.map((p) => (
              <ArrowLink key={p.slug} href={`/projects/${p.slug}`}>
                {p.title}
              </ArrowLink>
            ))}
          </p>
        )}
      </div>

      <div className="container">
        {related.length > 0 && (
          <section className="related" aria-labelledby="related-title">
            <div className="section-head">
              <p className="mono-label section-head__index">Keep reading</p>
              <h2 id="related-title" className="section-head__title">
                Related writing
              </h2>
            </div>
            <ul className="related__list">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/writing/${p.slug}`}>
                    <span className="mono-label">{categoryLabel(p.category)}</span>
                    <span className="related__title">{p.title}</span>
                    <span className="meta">
                      {formatDate(p.date)} · {p.readingTime} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <nav className="pager" aria-label="Previous and next posts">
          {older ? (
            <Link href={`/writing/${older.slug}`}>
              <span className="mono-label">← Older</span>
              <span className="pager__title">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link href={`/writing/${newer.slug}`}>
              <span className="mono-label">Newer →</span>
              <span className="pager__title">{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
