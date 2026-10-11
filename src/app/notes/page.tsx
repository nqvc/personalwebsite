import { NotesIndex } from "@/components/NotesIndex";
import { NoteBadge, PageHeader } from "@/components/ui";
import { noteStatuses, type NoteStatus } from "@/data/site";
import { getAllNotes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Notes",
  description: "A small digital garden: observations, unfinished ideas, questions and things being learned.",
  path: "/notes",
});

export default function NotesPage() {
  const notes = getAllNotes();
  return (
    <>
      <PageHeader
        label="Notes · Digital garden"
        title={
          <>
            Unfinished <em>thoughts</em>, kept on purpose.
          </>
        }
        intro={
          <>
            <p>
              Short observations, concepts I&rsquo;m learning, questions worth exploring and ideas that might become full posts later. They&rsquo;re
              published early and revised in place.
            </p>
            <div className="notes-legend">
              {(Object.keys(noteStatuses) as NoteStatus[]).map((s) => (
                <div key={s}>
                  <NoteBadge status={s} /> <span>{noteStatuses[s].description}</span>
                </div>
              ))}
            </div>
          </>
        }
      />
      <div className="container">
        <NotesIndex notes={notes.map((n) => ({ slug: n.slug, title: n.title, date: n.updated || n.date, tags: n.tags, status: n.status, excerpt: n.plainText.slice(0, 160) + (n.plainText.length > 160 ? "…" : "") }))} />
      </div>
    </>
  );
}
