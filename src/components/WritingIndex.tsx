"use client";

import Link from "next/link";
import { useMemo } from "react";
import { writingCategories } from "@/data/site";
import { formatDate } from "@/lib/format";
import { useQueryState } from "@/lib/useQueryState";
import { FilterBar } from "./FilterBar";

export type PostSummary = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  date: string;
  readingTime: number;
  featured: boolean;
  draft: boolean;
  image: string;
  imageAlt: string;
  text: string;
};

export function WritingIndex({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useQueryState("category");
  const [query, setQuery] = useQueryState("q");

  const counts = Object.fromEntries(writingCategories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug).length]));

  const visible = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter(
      (p) =>
        (!category || p.category === category) &&
        terms.every((t) => `${p.title} ${p.summary} ${p.text}`.toLowerCase().includes(t)),
    );
  }, [posts, category, query]);

  const lead = !query && !category ? visible.find((p) => p.featured) : undefined;
  const rest = visible.filter((p) => p !== lead);

  return (
    <>
      <div className="index-controls index-controls--writing">
        <FilterBar label="Filter writing by category" options={[...writingCategories]} value={category} onChange={setCategory} counts={counts} />
        <label className="search-field">
          <span className="sr-only">Search writing by title or content</span>
          <input type="search" placeholder="Search writing…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "post" : "posts"} shown
      </p>

      {visible.length === 0 ? (
        <div className="empty-state">
          <p>Nothing matches{query ? <> &ldquo;{query}&rdquo;</> : null} in this category yet.</p>
          <button type="button" className="text-button" onClick={() => { setQuery(""); setCategory(""); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {lead && (
            <Link href={`/writing/${lead.slug}`} className="writing-lead">
              <span className="mono-label">Featured · {lead.categoryLabel}</span>
              <span className="writing-lead__title">{lead.title}</span>
              <span className="writing-lead__summary">{lead.summary}</span>
              <span className="meta">
                {formatDate(lead.date)} · {lead.readingTime} min read
              </span>
            </Link>
          )}
          <ol className="writing-list">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/writing/${p.slug}`} className="writing-row">
                  <time className="writing-row__date mono-label" dateTime={p.date}>
                    {formatDate(p.date, "short")}
                  </time>
                  <span className="writing-row__body">
                    <span className="writing-row__cat mono-label">
                      {p.categoryLabel}
                      {p.draft && <span className="badge badge--draft">Draft</span>}
                    </span>
                    <span className="writing-row__title">{p.title}</span>
                    <span className="writing-row__summary">{p.summary}</span>
                  </span>
                  <span className="writing-row__time mono-label">{p.readingTime} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
