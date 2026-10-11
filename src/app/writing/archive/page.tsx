import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { categoryLabel } from "@/data/site";
import { getAllPosts } from "@/lib/content";
import { monthName, pad } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Writing archive", description: "Every post, organised by year and month.", path: "/writing/archive" });

export default function ArchivePage() {
  const posts = getAllPosts();
  const byYear = new Map<number, Map<number, typeof posts>>();
  for (const p of posts) {
    const [y, m] = p.date.split("-").map(Number);
    if (!byYear.has(y)) byYear.set(y, new Map());
    const months = byYear.get(y)!;
    if (!months.has(m)) months.set(m, []);
    months.get(m)!.push(p);
  }

  return (
    <>
      <PageHeader label="Writing · Archive" title="The archive." intro={<p>Everything published here, newest first.</p>} />
      <div className="container">
        {posts.length === 0 && <p className="empty-state">Nothing published yet.</p>}
        {[...byYear.entries()].map(([year, months]) => (
          <section key={year} className="archive-year" aria-labelledby={`y-${year}`}>
            <h2 id={`y-${year}`} className="archive-year__label">
              {year}
            </h2>
            <div>
              {[...months.entries()].map(([month, items]) => (
                <div key={month} className="archive-month">
                  <h3 className="mono-label">{monthName(month)}</h3>
                  <ul>
                    {items.map((p) => (
                      <li key={p.slug}>
                        <span className="mono-label">{pad(Number(p.date.split("-")[2]))}</span>
                        <span>
                          <Link href={`/writing/${p.slug}`}>{p.title}</Link>{" "}
                          <span className="mono-label">· {categoryLabel(p.category)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
