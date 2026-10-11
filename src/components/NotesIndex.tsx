"use client";

import Link from "next/link";
import { noteStatuses } from "@/data/site";
import { formatDate } from "@/lib/format";
import { useQueryState } from "@/lib/useQueryState";
import { FilterBar } from "./FilterBar";

export type NoteSummary = { slug: string; title: string; date: string; tags: string[]; status: keyof typeof noteStatuses; excerpt: string };

export function NotesIndex({ notes }: { notes: NoteSummary[] }) {
  const [status, setStatus] = useQueryState("status");
  const [tag, setTag] = useQueryState("tag");
  const options = Object.entries(noteStatuses).map(([slug, s]) => ({ slug, label: s.label }));
  const counts = Object.fromEntries(options.map((o) => [o.slug, notes.filter((n) => n.status === o.slug).length]));
  const visible = notes.filter((n) => (!status || n.status === status) && (!tag || n.tags.includes(tag)));

  return (
    <>
      <div className="index-controls">
        <FilterBar label="Filter notes by maturity" options={options} value={status} onChange={setStatus} counts={counts} />
        {tag && (
          <button type="button" className="text-button" onClick={() => setTag("")}>
            Tagged “{tag}” — clear ×
          </button>
        )}
      </div>
      {visible.length === 0 ? (
        <p className="empty-state">No notes here yet.</p>
      ) : (
        <ol className="notes-list">
          {visible.map((n) => (
            <li key={n.slug} className="notes-list__item">
              <time className="mono-label" dateTime={n.date}>
                {formatDate(n.date, "short")}
              </time>
              <div>
                <Link href={`/notes/${n.slug}`} className="notes-list__title">
                  {n.title}
                </Link>
                <p className="notes-list__excerpt">{n.excerpt}</p>
                <p className="tag-list">
                  {n.tags.map((t) => (
                    <button key={t} type="button" className="tag" onClick={() => setTag(t)} aria-pressed={tag === t}>
                      #{t}
                    </button>
                  ))}
                </p>
              </div>
              <span className={`badge badge--note-${n.status}`}>
                <span className="badge__dot" aria-hidden /> {noteStatuses[n.status]?.label}
              </span>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
